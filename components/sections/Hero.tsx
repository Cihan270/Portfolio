import { ArrowDownToLine } from "lucide-react";
import { Button } from "@/components/Button";
import { FocusWords } from "@/components/FocusWords";
import { PortraitSlot } from "@/components/PortraitSlot";
import { StatusBadge } from "@/components/StatusBadge";
import { hero } from "@/data/profile";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="container-page pt-8 pb-16 md:pt-14 md:pb-24">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <StatusBadge>{site.status}</StatusBadge>
        <span className="label hidden sm:inline">Portfolio · {site.location}</span>
      </div>

      <p
        id="hero-title"
        className="animate-rise mt-8 flex flex-wrap gap-x-5 gap-y-1 border-t border-line pt-4 text-sm text-ink-2 sm:gap-x-3 sm:text-base md:mt-10 [animation-delay:80ms]"
      >
        {site.positioning.map((p, i) => (
          <span key={p} className="flex items-center gap-3">
            {i > 0 && <span aria-hidden className="hidden text-faint sm:inline">·</span>}
            {p}
          </span>
        ))}
      </p>

      <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
        <div className="animate-rise lg:col-span-7 [animation-delay:160ms]">
          <FocusWords words={hero.focusWords} />
          <p className="mt-10 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{hero.intro}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href={site.cvPath} download>
              Download CV
              <ArrowDownToLine size={16} strokeWidth={1.75} aria-hidden />
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline text-ink">
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="link-underline text-ink">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.venture.href} target="_blank" rel="noopener noreferrer" className="link-underline text-ink">
                {site.venture.name} — my AI consultancy ↗
              </a>
            </li>
          </ul>
        </div>

        <div className="animate-rise lg:col-span-4 lg:col-start-9 [animation-delay:240ms]">
          <PortraitSlot />
        </div>
      </div>
    </section>
  );
}
