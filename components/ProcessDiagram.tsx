import type { ProcessStep } from "@/data/types";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Numbered process flow. Horizontal with connecting rail on large screens,
 * vertical with a left rail on small screens.
 */
export function ProcessDiagram({ steps }: { steps: ProcessStep[] }) {
  const cols =
    steps.length >= 5 ? "lg:grid-cols-5" : steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <ol className={`relative grid gap-0 lg:gap-6 ${cols}`}>
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        return (
          <Reveal as="li" key={step.title} delay={i * 0.08} className="relative flex gap-5 pb-8 lg:block lg:pb-0">
            {/* Vertical rail (mobile) */}
            {!last && <span aria-hidden className="absolute top-9 bottom-0 left-[17px] w-px bg-line-strong lg:hidden" />}
            {/* Horizontal rail (desktop) */}
            {!last && (
              <span
                aria-hidden
                className="absolute top-[17px] right-[-1.5rem] left-9 hidden h-px bg-line-strong lg:block"
              />
            )}
            <span
              className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center border font-mono text-xs ${
                last ? "border-accent bg-accent text-white" : "border-ink bg-paper text-ink"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="pt-1.5 lg:pt-6 lg:pr-2">
              <h3 className="text-lg font-medium tracking-tight text-ink">{step.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{step.description}</p>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
