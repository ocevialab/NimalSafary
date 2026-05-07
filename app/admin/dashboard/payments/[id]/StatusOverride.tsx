"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/app/Components/Skeleton";

export default function StatusOverride({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  if (currentStatus === "PAID") return null;

  async function override(status: "PAID" | "FAILED") {
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/payments/${id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Failed");
      setMsg(`Marked as ${status}`);
      router.refresh();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-wrap items-center gap-3">
      <span className="text-sm text-amber-800 font-medium flex-1">
        Admin override — use for testing when webhooks cannot reach localhost.
      </span>
      {msg && (
        <span className="text-sm font-semibold text-green-700">{msg}</span>
      )}
      <button
        onClick={() => override("PAID")}
        disabled={loading}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
      >
        {loading && <Spinner size={14} className="text-white" />}
        Mark as PAID
      </button>
      <button
        onClick={() => override("FAILED")}
        disabled={loading}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
      >
        {loading && <Spinner size={14} className="text-white" />}
        Mark as FAILED
      </button>
    </div>
  );
}
