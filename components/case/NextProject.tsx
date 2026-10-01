import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/data/types";
import { CaseVisual } from "@/components/visuals/CaseVisual";

export function NextProject({ project }: { project: CaseStudy }) {
  return (
    <nav aria-label="More work" className="mt-16 border-t border-line bg-surface md:mt-24">
      <div className="container-page">
        <Link
          href={`/work/${project.slug}`}
          className="group grid items-center gap-8 py-14 md:grid-cols-12 md:py-20"
        >
          <div className="md:col-span-7">
            <p className="label">Next case · {project.category}</p>
            <p className="mt-4 text-4xl font-medium tracking-[-0.04em] text-ink sm:text-6xl">
              {project.organization}
              <ArrowRight
                size={36}
                strokeWidth={1.25}
                aria-hidden
                className="ml-3 inline-block align-baseline transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </p>
            <p className="mt-4 max-w-lg text-muted">{project.summary}</p>
          </div>
          <div className="bg-grid hidden border border-line bg-paper-2 p-8 transition-colors group-hover:border-ink md:col-span-4 md:col-start-9 md:block">
            <CaseVisual name={project.visual} />
          </div>
        </Link>
        <div className="border-t border-line py-6">
          <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-ink">
            <ArrowLeft size={15} strokeWidth={1.75} aria-hidden />
            <span className="link-underline">Back to all work</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
