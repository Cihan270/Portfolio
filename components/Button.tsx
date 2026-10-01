import Link from "next/link";

type Variant = "primary" | "secondary" | "inverted" | "inverted-outline";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  /** Opens external links in a new tab. */
  external?: boolean;
  download?: boolean;
  className?: string;
}

const styles: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-accent",
  secondary: "border border-line-strong text-ink hover:border-ink",
  inverted: "bg-paper text-ink hover:bg-white",
  "inverted-outline": "border border-white/30 text-white hover:border-white",
};

/** Link styled as a button. Internal links use next/link, files and external URLs use <a>. */
export function Button({ href, children, variant = "primary", external, download, className = "" }: ButtonProps) {
  const cls = `group inline-flex h-12 items-center justify-center gap-2 px-5 text-sm font-medium tracking-tight transition-colors duration-200 ${styles[variant]} ${className}`;
  const isPlainAnchor = external || download || href.startsWith("mailto:") || /\.[a-z0-9]+$/i.test(href);

  if (isPlainAnchor) {
    return (
      <a
        href={href}
        className={cls}
        download={download ? "" : undefined}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
