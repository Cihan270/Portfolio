import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { StatusBadge } from "@/components/StatusBadge";
import { Reveal } from "@/components/motion/Reveal";
import { graduation } from "@/data/profile";
import { site } from "@/data/site";

export function GraduationCTA() {
  return (
    <section id="graduation" aria-labelledby="graduation-title" className="bg-accent text-white">
      <div className="container-page py-20 md:py-28">
        <SectionHeading id="graduation-title" index="06" eyebrow="Graduation 2027" title={graduation.heading} inverted />

        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <StatusBadge inverted>{site.status}</StatusBadge>
            <p className="mt-8 text-xl leading-relaxed text-white/90 sm:text-2xl sm:leading-snug">{graduation.intro}</p>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5 lg:col-start-8">
            <dl className="border-t border-white/20">
              {graduation.facts.map((f) => (
                <div key={f.label} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-white/20 py-3.5 text-sm">
                  <dt className="label !text-white/60">{f.label}</dt>
                  <dd className="text-white">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal className="mt-16">
          <h3 className="label !text-white/60">Areas I am particularly interested in</h3>
          <ul className="mt-5 grid grid-cols-2 gap-px border border-white/15 bg-white/15 lg:grid-cols-4">
            {graduation.interests.map((interest, i) => (
              <li key={interest} className="flex min-h-28 flex-col justify-between gap-6 bg-accent p-4 sm:min-h-32 sm:p-6">
                <span className="font-mono text-xs text-white/55">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-base leading-snug font-medium tracking-tight sm:text-lg">{interest}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-16 flex flex-col gap-6 border-t border-white/20 pt-10 md:flex-row md:items-center md:justify-between">
          <p className="text-3xl font-medium tracking-tight sm:text-4xl">Have a relevant challenge? Let’s talk.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={`mailto:${site.email}`} variant="inverted">
              <Mail size={16} strokeWidth={1.75} aria-hidden />
              Email me
            </Button>
            <Button href={site.linkedin} external variant="inverted-outline">
              LinkedIn
              <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
