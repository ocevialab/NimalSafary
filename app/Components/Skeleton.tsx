/**
 * Shared skeleton + spinner primitives.
 * Usage:
 *   <Sk className="h-4 w-32 rounded" />          — raw block
 *   <SkText lines={3} />                          — text lines
 *   <Spinner size={20} className="text-accent" /> — inline spinner
 */

export function Sk({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );
}

export function SkText({
  lines = 1,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  const widths = ["w-full", "w-5/6", "w-4/6", "w-3/4", "w-2/3"];
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Sk key={i} className={`h-4 ${widths[i % widths.length]}`} />
      ))}
    </div>
  );
}

export function Spinner({
  size = 18,
  className = "text-accent",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      style={{ width: size, height: size }}
      className={`animate-spin shrink-0 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

/** Full-page centred spinner — for auth-gate / route-level waits */
export function PageSpinner({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-3">
      <Spinner size={40} className="text-accent" />
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}

/** Skeleton row for a data table: n columns */
export function SkTableRow({ cols = 5 }: { cols?: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Sk className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

/** Skeleton stat card — mirrors the dashboard card shape */
export function SkStatCard() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 space-y-3">
      <div className="flex items-center justify-between">
        <div className="space-y-2 flex-1">
          <Sk className="h-3 w-24" />
          <Sk className="h-8 w-16" />
        </div>
        <Sk className="h-12 w-12 rounded-lg" />
      </div>
    </div>
  );
}
