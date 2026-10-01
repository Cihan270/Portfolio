import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { education } from "@/data/profile";

const AXIS_START = 2023;
const AXIS_END = 2028;
const pct = (year: number) => ((year - AXIS_START) / (AXIS_END - AXIS_START)) * 100;

/** Current position on the axis, as a decimal year (evaluated at build time). */
function nowAsYear() {
  const d = new Date();
  return d.getFullYear() + d.getMonth() / 12;
}

export function EducationJourney() {
  const now = Math.min(nowAsYear(), AXIS_END);
  const years = Array.from({ length: AXIS_END - AXIS_START }, (_, i) => AXIS_START + i);

  return (
    <section id="education" aria-labelledby="education-title" className="container-page py-20 md:py-28">
      <SectionHeading
        id="education-title"
        index="05"
        eyebrow="Education"
        title="From applied Business IT to academic depth"
        description="An applied bachelor in the Netherlands, a semester in the United States and a pre-master at the University of Twente."
      />

      {/* Timeline chart */}
      <Reveal>
        <figure className="border border-line bg-surface p-5 sm:p-8">
          <div className="relative">
            <div aria-hidden className="absolute inset-0">
              {years.map((y) => (
                <div key={y} className="absolute top-0 bottom-0 border-l border-line" style={{ left: `${pct(y)}%` }}>
                  <span className="label absolute top-0 left-1.5 sm:left-2">
                    <span className="sm:hidden">’{String(y).slice(2)}</span>
                    <span className="hidden sm:inline">{y}</span>
                  </span>
                </div>
              ))}
              <div
                className="absolute top-0 bottom-0 border-l border-dashed border-accent"
                style={{ left: `${pct(now)}%` }}
              >
                <span className="label absolute bottom-0 left-1.5 !text-accent">Now</span>
              </div>
            </div>

            <ul className="relative space-y-6 pt-10 pb-8">
              {education.map((e) => {
                const left = pct(e.start);
                const solidEnd = e.ongoing ? Math.min(now, e.end) : e.end;
                const solidWidth = Math.max(pct(solidEnd) - left, 1.2);
                const tailWidth = e.ongoing ? Math.max(pct(e.end) - pct(solidEnd), 0) : 0;
                return (
                  <li key={e.shortName}>
                    <p
                      className="mb-2 text-sm font-medium whitespace-nowrap text-ink"
                      style={{ marginLeft: `min(${left}%, calc(100% - 5.5rem))` }}
                    >
                      {e.shortName}
                    </p>
                    <div className="relative h-2.5">
                      <span
                        className={`absolute inset-y-0 ${e.shortName === "Windesheim" ? "bg-ink" : "bg-accent"}`}
                        style={{ left: `${left}%`, width: `${solidWidth}%` }}
                      />
                      {tailWidth > 0 && (
                        <span
                          aria-hidden
                          className="absolute inset-y-0 border border-dashed border-line-strong"
                          style={{ left: `${left + solidWidth}%`, width: `${tailWidth}%` }}
                        />
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <figcaption className="mt-2 text-xs text-muted">
            Timeline of Windesheim, Widener University and the University of Twente. Solid: completed or in progress ·
            Dashed: expected.
          </figcaption>
        </figure>
      </Reveal>

      {/* Journey steps */}
      <ol className="mt-10 grid gap-10 lg:grid-cols-3 lg:gap-0">
        {education.map((e, i) => (
          <Reveal
            as="li"
            key={e.institution}
            delay={i * 0.08}
            className={`relative border-t border-ink pt-6 lg:pr-10 ${i > 0 ? "lg:pl-10" : ""}`}
          >
            {i < education.length - 1 && (
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                aria-hidden
                className="absolute top-6 right-0 hidden text-faint lg:block"
              />
            )}
            <p className="label">
              <span className="text-ink">{String(i + 1).padStart(2, "0")}</span> · {e.period}
            </p>
            <h3 className="mt-4 text-2xl font-medium tracking-tight text-ink">{e.institution}</h3>
            <p className="mt-2 text-ink-2">{e.programme}</p>
            <p className="mt-1 text-sm text-muted">{e.location}</p>
            {e.note && <p className="mt-4 text-sm leading-relaxed text-muted">{e.note}</p>}
            {e.courses && (
              <div className="mt-5">
                <p className="label">Relevant courses</p>
                <ul className="mt-2 space-y-1 text-sm text-ink-2">
                  {e.courses.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
            {e.activities && (
              <div className="mt-5">
                <p className="label">Activities</p>
                <ul className="mt-2 space-y-1 text-sm text-ink-2">
                  {e.activities.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
