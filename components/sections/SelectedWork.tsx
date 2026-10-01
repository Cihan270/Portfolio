import { MethodMatrix } from "@/components/MethodMatrix";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { caseStudies, otherProjects } from "@/data/projects";

export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="container-page py-20 md:py-28">
      <SectionHeading
        id="work-title"
        index="02"
        eyebrow="Work"
        title="Selected work"
        description="A selection of consulting projects at the intersection of business, technology and organizational change."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 3) * 0.06}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      <MethodMatrix />
      <OtherWork />
    </section>
  );
}

function OtherWork() {
  return (
    <Reveal className="mt-20 md:mt-24">
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h3 className="text-2xl font-medium tracking-tight text-ink">Other work</h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
            Shorter projects completed as part of the Windesheim programme.
          </p>
        </div>
        <ul className="border-t border-ink lg:col-span-8">
          {otherProjects.map((p) => (
            <li
              key={p.organization}
              className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 border-b border-line py-5 sm:grid-cols-[1.2fr_1fr_auto] sm:items-baseline"
            >
              <span className="text-lg font-medium tracking-tight text-ink">{p.organization}</span>
              <span className="order-3 col-span-2 text-sm text-muted sm:order-none sm:col-span-1">{p.category}</span>
              <span className="label text-right">{p.year}</span>
              {p.description && <p className="order-4 col-span-full text-sm text-ink-2">{p.description}</p>}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
