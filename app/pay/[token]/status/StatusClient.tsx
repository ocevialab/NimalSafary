"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiCheckCircle, FiXCircle, FiLoader } from "react-icons/fi";

type Status = "PENDING" | "PAID" | "FAILED" | "EXPIRED";

interface PublicPayment {
  token: string;
  customerName: string;
  packageName: string | null;
  amount: number;
  currency: string;
  status: Status;
}

function money(minor: number, currency: string) {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(minor / 100);
}

export default function StatusClient({ token }: { token: string }) {
  const [data, setData] = useState<PublicPayment | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout> | null = null;
    let attempts = 0;

    const tick = async () => {
      try {
        const res = await fetch(`/api/payments/${token}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Not found");
        const json = (await res.json()) as PublicPayment;
        if (cancelled) return;
        setData(json);
        attempts += 1;
        if (json.status === "PENDING" && attempts < 30) {
          timeout = setTimeout(tick, 2000);
        } else if (json.status === "PENDING") {
          setTimedOut(true);
        }
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };

    tick();
    return () => {
      cancelled = true;
      if (timeout) clearTimeout(timeout);
    };
  }, [token]);

  if (error) {
    return <Shell title="Something went wrong" intent="error" body={error} />;
  }

  if (!data) {
    return (
      <Shell
        title="Checking payment status..."
        intent="pending"
        body="Please wait while we confirm your payment with OnePay."
      />
    );
  }

  if (data.status === "PAID") {
    return (
      <Shell
        title="Payment Successful"
        intent="success"
        body={
          <>
            Thank you, {data.customerName}! Your booking payment of{" "}
            <strong>{money(data.amount, data.currency)}</strong> has been
            received.
            {data.packageName && (
              <>
                {" "}
                Package: <strong>{data.packageName}</strong>.
              </>
            )}
            <br />
            A confirmation will follow from the Nimal Safari team.
          </>
        }
      />
    );
  }

  if (data.status === "FAILED") {
    return (
      <Shell
        title="Payment Failed"
        intent="error"
        body={
          <>
            Your payment could not be completed. You can retry from your
            payment link.
            <br />
            <Link
              href={`/pay/${data.token}`}
              className="inline-block mt-3 bg-accent hover:bg-accent/90 text-muted font-semibold px-5 py-2 rounded-lg"
            >
              Retry Payment
            </Link>
          </>
        }
      />
    );
  }

  if (data.status === "EXPIRED") {
    return (
      <Shell
        title="Link Expired"
        intent="error"
        body="This payment link has expired. Please contact Nimal Safari for a new link."
      />
    );
  }

  if (timedOut) {
    return (
      <Shell
        title="Still confirming..."
        intent="pending"
        body={
          <>
            We haven&apos;t received a confirmation from OnePay yet. Your
            payment may still be processing.
            <br />
            <br />
            Please{" "}
            <button
              onClick={() => {
                setTimedOut(false);
                setData(null);
                window.location.reload();
              }}
              className="text-accent font-semibold underline"
            >
              refresh this page
            </button>{" "}
            in a minute, or contact us if you were charged and the status
            hasn&apos;t updated.
          </>
        }
      />
    );
  }

  return (
    <Shell
      title="Verifying your payment..."
      intent="pending"
      body="We're waiting for confirmation from OnePay. This usually takes a few seconds."
    />
  );
}

function Shell({
  title,
  body,
  intent,
}: {
  title: string;
  body: React.ReactNode;
  intent: "success" | "error" | "pending";
}) {
  const icon =
    intent === "success" ? (
      <FiCheckCircle className="text-green-500 mx-auto" size={64} />
    ) : intent === "error" ? (
      <FiXCircle className="text-red-500 mx-auto" size={64} />
    ) : (
      <FiLoader className="text-accent mx-auto animate-spin" size={64} />
    );

  return (
    <main className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center space-y-4">
        {icon}
        <h1 className="text-2xl font-bold text-primary">{title}</h1>
        <div className="text-gray-600 text-sm leading-relaxed">{body}</div>
        <Link
          href="/"
          className="inline-block text-accent font-semibold hover:underline"
        >
          Back to Nimal Safari
        </Link>
      </div>
    </main>
  );
}
