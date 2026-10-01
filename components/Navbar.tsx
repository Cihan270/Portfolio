"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowDownToLine, Menu, X } from "lucide-react";
import { navItems, site, type NavItem } from "@/data/site";

/** Tracks which homepage section is currently in view. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const ids = navItems.map((i) => i.section).filter(Boolean) as string[];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        setActive(best);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.01, 0.25, 0.5, 1] },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeSection = useActiveSection(isHome);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  // Lock scroll, handle Escape and move focus while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    document.documentElement.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  const isActive = (item: NavItem) => {
    if (item.section === "work" && pathname.startsWith("/work")) return true;
    return isHome && item.section !== undefined && item.section === activeSection;
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || open
          ? "border-b border-line bg-paper/90 backdrop-blur-md"
          : "border-b border-transparent bg-paper/0"
      }`}
    >
      <nav aria-label="Main" className="container-page flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className={`text-[0.95rem] font-semibold tracking-tight text-ink transition-opacity duration-300 ${
            isHome && !scrolled ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          aria-label={`${site.name} — home`}
        >
          {site.name}
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink item={item} active={isActive(item)} />
            </li>
          ))}
        </ul>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-paper md:hidden"
      >
        <ul className="container-page flex flex-col py-6">
          {navItems.map((item) => (
            <li key={item.label} className="border-b border-line">
              {item.download ? (
                <a
                  href={item.href}
                  download=""
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-4 text-3xl font-medium tracking-tight text-ink"
                >
                  <span>Download CV</span>
                  <span className="label">PDF</span>
                </a>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item) ? "true" : undefined}
                  className="flex items-baseline justify-between py-4 text-3xl font-medium tracking-tight text-ink"
                >
                  <span>{item.label}</span>
                  <span className="label">
                    {String(navItems.filter((n) => !n.download).indexOf(item) + 1).padStart(2, "0")}
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ul>
        <div className="container-page flex flex-col gap-2 pb-10 text-sm text-muted">
          <a href={`mailto:${site.email}`} className="text-ink">
            {site.email}
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-ink">
            LinkedIn
          </a>
        </div>
      </div>
    </header>
  );
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const base =
    "relative inline-flex items-center gap-1.5 px-3 py-2 text-sm transition-colors duration-200";

  if (item.download) {
    return (
      <a
        href={item.href}
        download=""
        className={`${base} ml-2 border border-line-strong text-ink hover:border-ink hover:bg-ink hover:text-paper`}
      >
        {item.label}
        <ArrowDownToLine size={14} strokeWidth={1.75} aria-hidden />
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      aria-current={active ? "true" : undefined}
      className={`${base} ${active ? "text-ink" : "text-muted hover:text-ink"}`}
    >
      {item.label}
      <span
        aria-hidden
        className={`absolute inset-x-3 -bottom-px h-px origin-left bg-ink transition-transform duration-300 ${
          active ? "scale-x-100" : "scale-x-0"
        }`}
      />
    </Link>
  );
}
