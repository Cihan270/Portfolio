import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/case/CaseStudyLayout";
import { caseStudies, getCaseStudy, getNextCaseStudy } from "@/data/projects";

/** Only the slugs in data/projects.ts exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) return {};
  const title = `${project.organization} — ${project.category}`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/work/${project.slug}`,
      title,
      description: project.summary,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) notFound();
  return <CaseStudyLayout project={project} next={getNextCaseStudy(slug)} />;
}
