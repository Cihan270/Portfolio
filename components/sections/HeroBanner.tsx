import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ScratchReveal } from "@/components/ScratchReveal";
import { heroOverlay } from "@/data/profile";
import { site } from "@/data/site";

/**
 * Full-bleed band at the top of the page: scratch the plain image away to
 * reveal the one underneath. The overlay sits above the canvas; only its
 * buttons capture the pointer, so the rest of the band stays scratchable.
 *
 * Set site.heroBanner.enabled to false to remove the whole band.
 */
export function HeroBanner() {
  const banner = site.heroBanner;
  if (!banner.enabled) return null;

  return (
    <section aria-label="Introduction" className="border-b border-line">
      <ScratchReveal
        top={banner.top}
        bottom={banner.bottom}
        widths={banner.widths}
        alt={banner.alt}
        className="aspect-[4/3] w-full sm:aspect-[16/9] md:aspect-[2000/833] md:min-h-[26rem] lg:min-h-[32rem]"
      >
        {/* Scrims: keep the text readable over both the light and the dark image */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-paper/70 via-transparent to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-paper/90 via-paper/55 to-transparent"
        />

        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-5 sm:p-8 lg:p-12">
          {/* Top row: name and contact */}
          <div className="flex items-start justify-between gap-4">
            <p className="text-sm font-semibold tracking-tight text-ink sm:text-base">{site.name}</p>
            <Link
              href={heroOverlay.contact.href}
              className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-ink/25 bg-paper/75 px-3.5 py-1.5 text-xs font-medium text-ink backdrop-blur-[2px] transition-colors hover:border-ink hover:bg-ink hover:text-paper sm:px-4 sm:py-2 sm:text-sm"
            >
              {heroOverlay.contact.label}
              <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
            </Link>
          </div>

          {/* Bottom block: role, statement and actions */}
          <div className="max-w-2xl">
            <p className="inline-flex rounded-full border border-ink/15 bg-paper/70 px-3 py-1 text-[0.65rem] tracking-[0.1em] text-ink-2 uppercase backdrop-blur-[2px]">
              {heroOverlay.role}
            </p>
            <h1 className="mt-3 text-[clamp(1.6rem,4.2vw,3.4rem)] leading-[1.05] font-medium tracking-[-0.035em] text-ink sm:mt-4">
              {heroOverlay.heading}
            </h1>
            <p className="mt-2 hidden text-sm text-ink-2 sm:block sm:text-base">{heroOverlay.sub}</p>
            <div className="mt-4 flex flex-wrap gap-2.5 sm:mt-6 sm:gap-3">
              <Link
                href={heroOverlay.primary.href}
                className="pointer-events-auto group inline-flex h-10 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-paper transition-colors hover:bg-accent sm:h-11"
              >
                {heroOverlay.primary.label}
                <ArrowRight
                  size={15}
                  strokeWidth={1.75}
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href={heroOverlay.secondary.href}
                className="pointer-events-auto inline-flex h-10 items-center rounded-full border border-ink/25 bg-paper/70 px-5 text-sm font-medium text-ink backdrop-blur-[2px] transition-colors hover:border-ink sm:h-11"
              >
                {heroOverlay.secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </ScratchReveal>
      {banner.label && (
        <p className="container-page py-2 text-right text-[0.65rem] tracking-[0.08em] text-muted uppercase">
          {banner.label}
        </p>
      )}
    </section>
  );
}
