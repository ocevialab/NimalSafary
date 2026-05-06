import crypto from "crypto";

/**
 * OnePay (onepay.lk) Checkout V3 integration.
 *
 * Docs reference (as used when building this module):
 *   POST https://api.onepay.lk/v3/checkout/link/
 *   Headers:
 *     Authorization: <APP_TOKEN>
 *     Content-Type:  application/json
 *   Body fields (camelCase in their docs, snake_case on the wire — we match
 *   their snake_case):
 *     currency, app_id, hash, amount, reference,
 *     customer_first_name, customer_last_name, customer_phone_number,
 *     customer_email, transaction_redirect_url, additional_data
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
 *   development -> sandbox OnePay
 *   qa          -> sandbox OnePay
 *   production  -> live OnePay
 */
export type AppEnv = "development" | "qa" | "production";

const ONEPAY_ENDPOINTS: Record<AppEnv, string> = {
  development: "https://sandbox.onepay.lk/v3/checkout/link/",
  qa:          "https://sandbox.onepay.lk/v3/checkout/link/",
  production:  "https://api.onepay.lk/v3/checkout/link/",
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
  const apiUrl = process.env.ONEPAY_API_URL || ONEPAY_ENDPOINTS[appEnv];
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
  reference: string;              // our payment_request id (or token)
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
  const amount = formatAmount(req.amountMinor);
  const hash = signCheckoutRequest({
    appId: env.appId,
    currency: req.currency,
    amount,
    hashSalt: env.hashSalt,
  });

  const body: Record<string, unknown> = {
    currency: req.currency,
    app_id: env.appId,
    hash,
    amount: Number(amount),
    reference: req.reference,
    customer_first_name: req.customer.firstName,
    customer_last_name: req.customer.lastName,
    customer_phone_number: req.customer.phone,
    customer_email: req.customer.email,
    transaction_redirect_url: req.redirectUrl,
    additional_data: req.additionalData ?? "",
  };
  if (req.notifyUrl) {
    body.ipg_notify_url = req.notifyUrl;
  }

  const res = await fetch(env.apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
    };
  };

  if (!res.ok || data.status !== 1000 || !data.data?.gateway?.redirect_url) {
    throw new Error(
      `OnePay checkout link creation failed: ${res.status} ${
        data.message ?? "unknown error"
      }`,
    );
  }

  return {
    redirectUrl: data.data.gateway.redirect_url,
    ipgTransactionId: data.data.ipg_transaction_id ?? "",
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
  status?: number | string;
  amount?: number | string;
  status_message?: string;
  reference?: string;
  signature?: string;
  [key: string]: unknown;
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
): "SUCCESS" | "FAILED" {
  const s = String(raw ?? "").trim();
  if (s === "1000" || s === "200" || s.toUpperCase() === "SUCCESS") {
    return "SUCCESS";
  }
  return "FAILED";
}
