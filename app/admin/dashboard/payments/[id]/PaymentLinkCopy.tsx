"use client";

import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

export default function PaymentLinkCopy({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const waMessage = encodeURIComponent(
    `Hello! Please use this secure link to complete your Nimal Safari booking payment:\n${url}`,
  );

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Share this link with the customer
      </label>
      <div className="flex items-stretch gap-2">
        <input
          readOnly
          value={url}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
        />
        <button
          onClick={copy}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-muted font-semibold rounded-lg hover:bg-accent/90 transition-colors"
        >
          {copied ? <FiCheck /> : <FiCopy />}
          {copied ? "Copied" : "Copy"}
        </button>
        <a
          href={`https://wa.me/?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
