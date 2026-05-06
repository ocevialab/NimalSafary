import { NextRequest, NextResponse } from "next/server";
import {
  getPaymentRequestByToken,
  refreshExpiryIfNeeded,
} from "@/lib/payment-storage";
import { createCheckoutLink } from "@/lib/onepay";

export const dynamic = "force-dynamic";

/**
 * Customer-initiated: build an OnePay checkout link for a pending request
 * and return the redirect URL. The amount is always read from the DB, never
 * from the request body — the client cannot influence it.
 */
export async function POST(
  request: NextRequest,
  ctx: { params: Promise<{ token: string }> },
) {
  const { token } = await ctx.params;
  const raw = getPaymentRequestByToken(token);
  if (!raw) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const pr = refreshExpiryIfNeeded(raw);
  if (pr.status !== "PENDING" && pr.status !== "FAILED") {
    return NextResponse.json(
      { error: `This payment link is ${pr.status.toLowerCase()}.` },
      { status: 409 },
    );
  }

  // Split name into first/last as OnePay requires both.
  const parts = pr.customerName.trim().split(/\s+/);
  const firstName = parts[0] ?? "Customer";
  const lastName = parts.slice(1).join(" ") || "-";

  const origin =
    process.env.PUBLIC_APP_URL?.replace(/\/$/, "") ||
    new URL(request.url).origin;
  const redirectUrl = `${origin}/pay/${pr.token}/status`;

  try {
    const notifyUrl = `${origin}/api/payments/onepay/callback`;

    const checkout = await createCheckoutLink({
      reference: pr.id,
      amountMinor: pr.amount,
      currency: pr.currency,
      customer: {
        firstName,
        lastName,
        phone: pr.phone ?? "",
        email: pr.email ?? "",
      },
      redirectUrl,
      notifyUrl,
      additionalData: pr.packageName ?? undefined,
    });

    return NextResponse.json({
      redirectUrl: checkout.redirectUrl,
      ipgTransactionId: checkout.ipgTransactionId,
    });
  } catch (err) {
    console.error("OnePay initiate error:", err);
    return NextResponse.json(
      {
        error:
          "Could not start payment. Please try again or contact the operator.",
      },
      { status: 502 },
    );
  }
}
