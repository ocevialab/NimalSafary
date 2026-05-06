import { NextRequest, NextResponse } from "next/server";
import {
  getPaymentRequestById,
  recordPaymentAndSetStatus,
} from "@/lib/payment-storage";
import {
  mapOnePayStatus,
  verifyWebhookSignature,
  type OnePayWebhookPayload,
} from "@/lib/onepay";

export const dynamic = "force-dynamic";

/**
 * OnePay server-to-server webhook (aka "IPG notify URL").
 *
 * This endpoint is the single source of truth for payment status — the
 * browser redirect back from OnePay is treated as display-only.
 *
 * Responsibilities:
 *   1. Parse + verify signature.
 *   2. Match the request (our `reference` = payment_requests.id).
 *   3. Confirm the amount equals what we stored.
 *   4. Atomically record the payment and flip the request status.
 *   5. Always respond 200 quickly (even on duplicates) so OnePay doesn't retry
 *      forever.
 */
export async function POST(request: NextRequest) {
  let payload: OnePayWebhookPayload;
  try {
    payload = (await request.json()) as OnePayWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!verifyWebhookSignature(payload)) {
    console.warn("[onepay] webhook signature mismatch", payload);
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const reference = String(payload.reference ?? "");
  if (!reference) {
    return NextResponse.json({ error: "Missing reference" }, { status: 400 });
  }

  const pr = getPaymentRequestById(reference);
  if (!pr) {
    console.warn("[onepay] webhook for unknown reference", reference);
    return NextResponse.json({ error: "Unknown reference" }, { status: 404 });
  }

  const gatewayStatus = mapOnePayStatus(payload.status);

  const amountMajor = Number(payload.amount ?? 0);
  const expectedMajor = pr.amount / 100;
  if (
    gatewayStatus === "SUCCESS" &&
    Math.abs(amountMajor - expectedMajor) > 0.01
  ) {
    console.error(
      `[onepay] amount mismatch for ${reference}: got ${amountMajor}, expected ${expectedMajor}`,
    );
    return NextResponse.json({ error: "Amount mismatch" }, { status: 400 });
  }

  const txnId = String(payload.ipg_transaction_id ?? "");
  if (!txnId) {
    return NextResponse.json(
      { error: "Missing ipg_transaction_id" },
      { status: 400 },
    );
  }

  try {
    recordPaymentAndSetStatus({
      paymentRequestId: pr.id,
      transactionId: txnId,
      status: gatewayStatus,
      amount: Math.round(amountMajor * 100),
      currency: pr.currency,
      rawResponse: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("[onepay] failed to record payment:", err);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
