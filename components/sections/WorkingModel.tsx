import { Reveal } from "@/components/motion/Reveal";
import { workingModel } from "@/data/profile";

/**
 * The site's recurring motif: Business → Analysis → Technology → Change.
 */
export function WorkingModel() {
  return (
    <section aria-labelledby="working-model-title" className="border-y border-line bg-surface">
      <div className="container-page py-14 md:py-20">
        <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
          <h2 id="working-model-title" className="label !text-ink">
            How I approach a problem
          </h2>
          <p className="label hidden md:block" aria-hidden>
            {workingModel.map((s) => s.label).join(" → ")}
          </p>
        </div>

        <Reveal>
        <ol className="mt-10 grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
          {workingModel.map((step, i) => (
            <li key={step.label} className="relative bg-surface p-4 sm:p-6 sm:pr-8 md:p-8">
              <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 flex items-center gap-2 text-xl font-medium tracking-tight text-ink sm:mt-6 sm:gap-3 sm:text-2xl">
                {step.label}
                {i < workingModel.length - 1 && (
                  <span aria-hidden className="text-base text-faint">
                    →
                  </span>
                )}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:mt-3 sm:text-[0.95rem]">{step.description}</p>
            </li>
          ))}
        </ol>
        </Reveal>
      </div>
    </section>
  );
}
