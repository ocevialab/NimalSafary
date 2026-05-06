"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiPlus, FiRefreshCw } from "react-icons/fi";

interface PaymentRequest {
  id: string;
  token: string;
  customerName: string;
  packageName: string | null;
  amount: number;
  currency: string;
  status: "PENDING" | "PAID" | "FAILED" | "EXPIRED";
  createdAt: string;
  expiresAt: string;
}

const STATUS_STYLES: Record<PaymentRequest["status"], string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PAID: "bg-green-100 text-green-800",
  FAILED: "bg-red-100 text-red-800",
  EXPIRED: "bg-gray-200 text-gray-700",
};

function formatMoney(minor: number, currency: string) {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(minor / 100);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString();
}

export default function PaymentsListPage() {
  const [rows, setRows] = useState<PaymentRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/payments", { cache: "no-store" });
      if (res.ok) {
        setRows(await res.json());
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Payment Links</h1>
          <p className="text-gray-600">
            Create and track OnePay payment links for customer bookings.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FiRefreshCw size={16} />
            Refresh
          </button>
          <Link
            href="/admin/dashboard/payments/create"
            className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-muted font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <FiPlus size={18} />
            New Payment Link
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading...</div>
        ) : rows.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No payment links yet. Click{" "}
            <span className="font-semibold">New Payment Link</span> to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="text-left px-4 py-3">Customer</th>
                  <th className="text-left px-4 py-3">Package</th>
                  <th className="text-left px-4 py-3">Amount</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Created</th>
                  <th className="text-left px-4 py-3">Expires</th>
                  <th className="text-right px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {r.customerName}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {r.packageName ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-800">
                      {formatMoney(r.amount, r.currency)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${STATUS_STYLES[r.status]}`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {formatDate(r.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {formatDate(r.expiresAt)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/dashboard/payments/${r.id}`}
                        className="text-accent font-semibold hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
