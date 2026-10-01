import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { experience } from "@/data/profile";
import { caseStudies } from "@/data/projects";

export function ExperienceTimeline() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="container-page py-20 md:py-28">
      <SectionHeading id="experience-title" index="01" eyebrow="Experience" title="Experience" />

      <ol className="relative">
        {experience.map((item, i) => {
          const primary = item.emphasis === "primary";
          const caseLink = caseStudies.find((c) => c.organization === item.organization);
          return (
            <Reveal
              as="li"
              key={item.role + item.organization}
              delay={i * 0.08}
              className="grid gap-3 border-t border-line py-8 md:grid-cols-12 md:gap-8 md:py-10"
            >
              <p className="label pt-1 md:col-span-3">{item.period}</p>
              <div className="md:col-span-9 lg:col-span-7">
                <h3
                  className={`font-medium tracking-tight text-ink ${primary ? "text-3xl" : "text-xl"}`}
                >
                  {item.role}
                  <span className="block text-muted sm:inline">
                    <span className="hidden sm:inline"> · </span>
                    {item.organization}
                  </span>
                </h3>
                <p className={`mt-3 leading-relaxed ${primary ? "text-lg text-ink-2" : "text-base text-muted"}`}>
                  {item.description}
                </p>
                {item.responsibilities.length > 0 && (
                  <ul className="mt-5 space-y-2.5">
                    {item.responsibilities.map((r) => (
                      <li key={r} className="flex gap-3 text-[0.98rem] leading-relaxed text-ink-2">
                        <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-ink" />
                        {r}
                      </li>
                    ))}
                  </ul>
                )}
                {(caseLink || item.website) && (
                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-ink">
                    {caseLink && (
                      <Link href={`/work/${caseLink.slug}`} className="inline-flex items-center gap-1.5">
                        <span className="link-underline">More about {caseLink.organization}</span>
                        <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden />
                      </Link>
                    )}
                    {item.website && (
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5"
                      >
                        <span className="link-underline">{new URL(item.website).hostname}</span>
                        <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
