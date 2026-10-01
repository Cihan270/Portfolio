import { Reveal } from "@/components/motion/Reveal";

interface SectionHeadingProps {
  /** Small index shown above the title, e.g. "01". */
  index?: string;
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
  /** Use on dark backgrounds. */
  inverted?: boolean;
}

/**
 * Editorial section header: numbered label on a hairline, large title,
 * optional supporting sentence on the right at larger sizes.
 */
export function SectionHeading({ index, eyebrow, title, description, id, inverted }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div
        className={`flex items-center gap-4 border-t pt-4 ${inverted ? "border-white/20" : "border-ink"}`}
      >
        {index && (
          <span className={`label ${inverted ? "text-white/60" : "text-ink"}`}>{index}</span>
        )}
        <span className={`label ${inverted ? "text-white/60" : ""}`}>{eyebrow}</span>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-end">
        <h2
          id={id}
          className={`text-4xl font-medium tracking-[-0.035em] sm:text-5xl lg:col-span-7 lg:text-6xl ${
            inverted ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`max-w-md text-base leading-relaxed lg:col-span-5 lg:justify-self-end ${
              inverted ? "text-white/70" : "text-muted"
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
