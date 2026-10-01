import { BadgeCheck } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { certifications, toolkit } from "@/data/profile";

export function ToolkitGrid() {
  return (
    <section id="toolkit" aria-labelledby="toolkit-title" className="border-y border-line bg-surface">
      <div className="container-page py-20 md:py-28">
        <SectionHeading
          id="toolkit-title"
          index="04"
          eyebrow="Toolkit"
          title="Consulting toolkit"
          description="The methods and tools I use to move from a business question to a well-founded recommendation — and, where needed, to a working solution."
        />

        <Reveal className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
          {toolkit.map((cat, i) => (
            <div key={cat.title} className="bg-surface p-4 sm:p-6 md:p-8">
              <p className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 text-lg font-medium tracking-tight text-ink sm:text-xl">{cat.title}</h3>
              <ul className="mt-4 sm:mt-6">
                {cat.items.map((item) => (
                  <li key={item} className="border-t border-line py-2 text-sm text-ink-2 sm:py-2.5 sm:text-[0.95rem]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>

        <ul className="mt-8 flex flex-wrap gap-4">
          {certifications.map((c) => (
            <li key={c.name} className="inline-flex items-center gap-3 border border-line-strong px-4 py-3 text-sm">
              <BadgeCheck size={18} strokeWidth={1.5} className="text-accent" aria-hidden />
              <span className="font-medium text-ink">{c.name}</span>
              <span className="text-muted">— {c.issuer}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
