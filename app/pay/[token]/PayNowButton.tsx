"use client";

import { useState } from "react";
import { Spinner } from "@/app/Components/Skeleton";

export default function PayNowButton({ token }: { token: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pay = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/payments/${token}/initiate`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok || !data.redirectUrl) {
        throw new Error(data.error || "Could not start payment.");
      }
      window.location.href = data.redirectUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
          {error}
        </div>
      )}
      <button
        onClick={pay}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 bg-accent hover:bg-accent/90 text-muted font-bold text-lg py-4 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading && <Spinner size={22} className="text-muted" />}
        {loading ? "Redirecting to OnePay..." : "Pay Now"}
      </button>
    </div>
  );
}
