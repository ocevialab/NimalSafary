import crypto from "crypto";

/**
 * OnePay (onepay.lk) Checkout V3 integration.
 *
 * Docs reference (as used when building this module):
 *   POST https://api.onepay.lk/v3/checkout/link/
 *
 * NOTE: OnePay docs mention https://api-sandbox.onepay.lk for sandbox, but that
 * hostname does not resolve in public DNS (NXDOMAIN). Sandbox vs live is
 * determined by the App ID / token / hash from the merchant portal (sandbox
 * IPG app credentials on the same production API host).
 *   Headers:
 *     Authorization: <APP_TOKEN>
 *     Content-Type:  application/json
 *   Body fields (camelCase in their docs, snake_case on the wire — we match
 *   their snake_case):
 *     currency, app_id, hash, amount, reference,
 *     customer_first_name, customer_last_name, customer_phone_number,
 *     customer_email, transaction_redirect_url, additionalData (optional),
 *     items (optional)
 *
 * Hash formula (sandbox & production, per OnePay docs):
 *     SHA256(app_id + currency + amount_as_string + hash_salt)
 *   where amount_as_string is the decimal amount (e.g. "1500.00").
 *
 * NOTE: OnePay's exact field order for the signature can vary by merchant
 * plan. If the first sandbox call returns a "hash mismatch" error, confirm
 * the formula in your merchant portal and adjust `signCheckoutRequest`.
 */

export interface OnePayEnv {
  apiUrl: string;
  appId: string;
  appToken: string;
  hashSalt: string;
  appEnv: AppEnv;
  isLive: boolean;
}

/**
 * App deployment stage. Chosen independently of Node's NODE_ENV because
 * QA runs a production build on a staging server — from Node's perspective
 * both QA and production are NODE_ENV=production, so we need our own flag.
 *
 *   development -> sandbox *credentials* (same API host as production)
 *   qa          -> sandbox *credentials*
 *   production  -> live *credentials*
 */
export type AppEnv = "development" | "qa" | "production";

/** Single checkout endpoint; sandbox/live is chosen by credentials, not hostname. */
const ONEPAY_CHECKOUT_URL = "https://api.onepay.lk/v3/checkout/link/";

const ONEPAY_ENDPOINTS: Record<AppEnv, string> = {
  development: ONEPAY_CHECKOUT_URL,
  qa: ONEPAY_CHECKOUT_URL,
  production: ONEPAY_CHECKOUT_URL,
};

export function resolveAppEnv(): AppEnv {
  const raw = (process.env.APP_ENV ?? "development").toLowerCase();
  if (raw === "production" || raw === "qa" || raw === "development") {
    return raw;
  }
  // Unknown value — default to sandbox so the worst-case failure is
  // "payments don't go through with real money".
  return "development";
}

export function getOnePayEnv(): OnePayEnv {
  const appEnv = resolveAppEnv();
  // ONEPAY_API_URL acts as an explicit override (e.g. for OnePay giving you a
  // merchant-specific endpoint). Otherwise we pick based on APP_ENV.
  const rawUrl = process.env.ONEPAY_API_URL || ONEPAY_ENDPOINTS[appEnv];
  // Docs mention api-sandbox.onepay.lk but it does not exist in public DNS.
  const apiUrl = rawUrl
    .replace(/^https:\/\/api-sandbox\.onepay\.lk/i, "https://api.onepay.lk")
    .replace(/^https:\/\/sandbox\.onepay\.lk/i, "https://api.onepay.lk");
  const appId = process.env.ONEPAY_APP_ID;
  const appToken = process.env.ONEPAY_APP_TOKEN;
  const hashSalt = process.env.ONEPAY_HASH_SALT;

  if (!appId || !appToken || !hashSalt) {
    throw new Error(
      "OnePay is not configured. Set ONEPAY_APP_ID, ONEPAY_APP_TOKEN, ONEPAY_HASH_SALT in the environment.",
    );
  }
  return { apiUrl, appId, appToken, hashSalt, appEnv, isLive: appEnv === "production" };
}

/**
 * Format an amount in minor units (e.g. LKR cents) as the decimal string
 * OnePay expects, e.g. 150000 -> "1500.00".
 */
export function formatAmount(amountMinor: number): string {
  const value = amountMinor / 100;
  return value.toFixed(2);
}

export function signCheckoutRequest(args: {
  appId: string;
  currency: string;
  amount: string;     // already formatted via formatAmount
  hashSalt: string;
}): string {
  const payload = `${args.appId}${args.currency}${args.amount}${args.hashSalt}`;
  return crypto.createHash("sha256").update(payload).digest("hex");
}

export interface CheckoutRequest {
  reference: string;              // OnePay max 21 chars — caller must truncate/shorten
  amountMinor: number;
  currency: string;               // "LKR" | "USD"
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  redirectUrl: string;            // where customer returns after pay
  notifyUrl?: string;             // server-to-server webhook URL
  additionalData?: string;
}

export interface CheckoutResponse {
  redirectUrl: string;            // hosted OnePay gateway URL
  ipgTransactionId: string;       // OnePay's txn id
  raw: unknown;
}

export async function createCheckoutLink(
  req: CheckoutRequest,
): Promise<CheckoutResponse> {
  const env = getOnePayEnv();
  const amountStr = formatAmount(req.amountMinor);
  const hash = signCheckoutRequest({
    appId: env.appId,
    currency: req.currency,
    amount: amountStr,
    hashSalt: env.hashSalt,
  });

  // Docs: https://docs.onepay.lk — redirect URL must be HTTPS.
  if (
    !req.redirectUrl.startsWith("https://") &&
    process.env.ONEPAY_ALLOW_HTTP_REDIRECT !== "1"
  ) {
    throw new Error(
      "OnePay requires transaction_redirect_url to use HTTPS. " +
        "Set PUBLIC_APP_URL to an https URL (e.g. ngrok) for local testing, " +
        "or set ONEPAY_ALLOW_HTTP_REDIRECT=1 only for temporary debugging.",
    );
  }

  // Official docs specify amount as a JSON number with two decimal places.
  const amountNum = Number(amountStr);

  const body: Record<string, unknown> = {
    currency: req.currency,
    app_id: env.appId,
    hash,
    amount: amountNum,
    reference: req.reference,
    customer_first_name: req.customer.firstName,
    customer_last_name: req.customer.lastName,
    customer_phone_number: req.customer.phone,
    customer_email: req.customer.email,
    transaction_redirect_url: req.redirectUrl,
  };
  if (req.additionalData?.trim()) {
    body.additionalData = req.additionalData.trim();
  }
  // Optional server-to-server notify URL. Not in the public PHP SDK schema;
  // some merchant plans accept it — enable only if OnePay confirms the key.
  if (
    req.notifyUrl &&
    process.env.ONEPAY_SEND_NOTIFY_URL_IN_CHECKOUT === "1"
  ) {
    body.ipg_notify_url = req.notifyUrl;
  }

  console.log(
    `[onepay] → calling checkout API  ref=${req.reference}  amount=${amountStr} ${req.currency}  url=${env.apiUrl}`,
  );
  console.log("[onepay] request body:", JSON.stringify(body));

  const res = await fetch(env.apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: env.appToken,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = (await res.json().catch(() => ({}))) as {
    status?: number;
    message?: string;
    data?: {
      gateway?: { redirect_url?: string };
      ipg_transaction_id?: string;
      ipgTransactionId?: string;
    };
  };

  console.log(
    `[onepay] ← feedback received  httpStatus=${res.status}  apiStatus=${data.status}  message="${data.message ?? ""}"`,
  );

  // OnePay returns status 1000 (some docs) or 200 (observed) on success.
  const apiOk =
    res.ok && (data.status === 1000 || data.status === 200) && !!data.data;

  const redirectUrl =
    data.data?.gateway?.redirect_url ??
    (data.data as Record<string, unknown> | undefined)?.[
      "redirect_url"
    ] as string | undefined;

  if (!apiOk || !redirectUrl) {
    console.error("[onepay] ✗ checkout link failed", {
      httpStatus: res.status,
      apiStatus: data.status,
      message: data.message,
    });
    throw new Error(
      `OnePay checkout link creation failed: ${res.status} ${
        data.message ?? "unknown error"
      }`,
    );
  }

  const ipgTransactionId =
    data.data?.ipg_transaction_id ??
    data.data?.ipgTransactionId ??
    "";

  console.log(
    `[onepay] ✓ checkout link created  ref=${req.reference}  ipgTxn=${ipgTransactionId}`,
  );

  return {
    redirectUrl,
    ipgTransactionId,
    raw: data,
  };
}

/**
 * Verify a signed webhook payload from OnePay. OnePay posts a JSON body and
 * includes a signature field computed as:
 *     SHA256(ipg_transaction_id + status + amount + hash_salt)
 *
 * We allow a small number of field layouts to be tolerant of merchant-plan
 * differences; if none match we reject.
 */
export interface OnePayWebhookPayload {
  ipg_transaction_id?: string;
  transaction_id?: string;
  status?: number | string;
  amount?: number | string;
  status_message?: string;
  reference?: string;
  signature?: string;
  callback_token?: string;
  [key: string]: unknown;
}

/** Whether the request carries the portal "Callback Token" (header or JSON). */
export function verifyOnePayCallbackToken(
  request: Request,
  body: OnePayWebhookPayload,
): boolean {
  const secret = process.env.ONEPAY_CALLBACK_TOKEN?.trim();
  if (!secret) return false;

  const fromBody =
    typeof body.callback_token === "string" ? body.callback_token.trim() : "";
  if (fromBody === secret) return true;

  const auth = request.headers.get("authorization")?.trim() ?? "";
  if (auth === secret) return true;
  if (/^Bearer\s+/i.test(auth) && auth.replace(/^Bearer\s+/i, "").trim() === secret) {
    return true;
  }

  const headerToken =
    request.headers.get("x-callback-token")?.trim() ??
    request.headers.get("x-onepay-callback-token")?.trim() ??
    "";
  return headerToken === secret;
}

export function verifyWebhookSignature(payload: OnePayWebhookPayload): boolean {
  const env = getOnePayEnv();
  const provided = String(payload.signature ?? "").toLowerCase();
  if (!provided) return false;

  const id = String(payload.ipg_transaction_id ?? "");
  const status = String(payload.status ?? "");
  const amount = String(payload.amount ?? "");

  const candidate = crypto
    .createHash("sha256")
    .update(`${id}${status}${amount}${env.hashSalt}`)
    .digest("hex")
    .toLowerCase();

  try {
    return crypto.timingSafeEqual(
      Buffer.from(provided, "hex"),
      Buffer.from(candidate, "hex"),
    );
  } catch {
    return false;
  }
}

/**
 * OnePay status code 200/1000 typically means success. Map their status to
 * our internal gateway status. Adjust if your merchant plan uses different
 * codes.
 */
export function mapOnePayStatus(
  raw: unknown,
  statusMessage?: unknown,
): "SUCCESS" | "FAILED" {
  const msg = String(statusMessage ?? "").trim().toUpperCase();
  if (msg === "SUCCESS") {
    return "SUCCESS";
  }
  if (typeof raw === "number" && raw === 1) {
    return "SUCCESS";
  }
  const s = String(raw ?? "").trim();
  if (s === "1" || s === "1000" || s === "200" || s.toUpperCase() === "SUCCESS") {
    return "SUCCESS";
  }
  return "FAILED";
}
