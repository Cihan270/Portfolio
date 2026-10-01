import { renderOgImage, ogSize } from "@/lib/og";
import { site } from "@/data/site";

export const alt = site.title;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "Portfolio",
    title: site.name,
    subtitle: "Business IT & Management · Technology Consulting · Business Analysis",
  });
}
