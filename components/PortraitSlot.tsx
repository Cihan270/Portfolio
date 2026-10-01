import { site } from "@/data/site";

/**
 * Portrait area in the hero. Set `site.portrait` in data/site.ts to show a
 * photo; until then an editorial monogram card is shown.
 */
export function PortraitSlot() {
  if (site.portrait) {
    const { base, widths, alt } = site.portrait;
    return (
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${base}-${widths[widths.length - 1]}.webp`}
          srcSet={widths.map((w) => `${base}-${w}.webp ${w}w`).join(", ")}
          sizes="(min-width: 1024px) 34vw, 100vw"
          alt={alt}
          className="h-full w-full object-cover object-center"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="bg-grid @container relative flex aspect-[5/4] w-full flex-col justify-between border border-line bg-surface p-5 sm:aspect-[4/5] sm:p-6"
    >
      {/* corner ticks */}
      <span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-ink" />
      <span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-ink" />
      <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-ink" />
      <span className="absolute right-0 bottom-0 h-3 w-3 border-r border-b border-ink" />

      <div className="flex justify-between">
        <span className="label">Business × Technology</span>
        <span className="label">NL</span>
      </div>
      <span className="text-[34cqw] leading-none font-medium tracking-[-0.06em] text-ink">RCU</span>
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
        <span className="label whitespace-nowrap">Apeldoorn, NL</span>
        <span className="label whitespace-nowrap">52.21° N · 5.97° E</span>
      </div>
    </div>
  );
}
