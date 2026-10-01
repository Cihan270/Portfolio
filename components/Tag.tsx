/** Restrained text label for methods and topics. */
export function Tag({ children, inverted }: { children: React.ReactNode; inverted?: boolean }) {
  return (
    <span
      className={`inline-flex items-center border px-2.5 py-1 text-xs leading-none tracking-tight ${
        inverted ? "border-white/25 text-white/80" : "border-line-strong text-ink-2"
      }`}
    >
      {children}
    </span>
  );
}
