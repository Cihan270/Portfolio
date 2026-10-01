/** Availability pill with a small status dot. */
export function StatusBadge({ children, inverted }: { children: React.ReactNode; inverted?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-2.5 border px-3 py-1.5 text-xs font-medium tracking-tight sm:text-sm ${
        inverted ? "border-white/25 text-white" : "border-line-strong bg-surface text-ink"
      }`}
    >
      <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-signal" />
      {children}
    </p>
  );
}
