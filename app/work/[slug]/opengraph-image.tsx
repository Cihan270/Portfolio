import { renderOgImage, ogSize } from "@/lib/og";
import { caseStudies, getCaseStudy } from "@/data/projects";

export const alt = "Case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  return renderOgImage({
    eyebrow: project ? `Case study · ${project.category}` : "Case study",
    title: project?.organization ?? "Case study",
    subtitle: project?.summary ?? "",
  });
}
