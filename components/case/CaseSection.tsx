import { Reveal } from "@/components/motion/Reveal";

interface CaseSectionProps {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
  /** Wide sections (e.g. the process diagram) use the full column width. */
  wide?: boolean;
}

export function CaseSection({ id, index, title, children, wide }: CaseSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-12 first-of-type:border-t-0 md:py-16">
      <Reveal>
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-muted">{index}</span>
          <h2 id={`${id}-title`} className="text-3xl font-medium tracking-[-0.03em] text-ink sm:text-4xl">
            {title}
          </h2>
        </div>
        <div
          className={`mt-8 space-y-5 text-[1.05rem] leading-relaxed text-ink-2 ${wide ? "" : "max-w-[42rem]"}`}
        >
          {children}
        </div>
      </Reveal>
    </section>
  );
}
