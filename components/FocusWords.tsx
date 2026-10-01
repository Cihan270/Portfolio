"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** Hydration-safe reduced-motion check (false on the server). */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

/**
 * Shows all focus words at once and slowly moves emphasis between them.
 * Nothing moves position; only colour changes. With reduced motion the
 * cycle is disabled and all words are shown at full strength.
 */
export function FocusWords({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const reduce = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setActive((i) => (i + 1) % words.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [reduce, words.length, interval]);

  return (
    <p className="flex flex-wrap gap-x-4 gap-y-1 text-2xl font-medium tracking-tight sm:text-3xl">
      {words.map((word, i) => {
        const on = reduce || i === active;
        return (
          <span
            key={word}
            className={`relative transition-colors duration-700 ${on ? "text-ink" : "text-faint"}`}
          >
            {word}
            <span
              aria-hidden
              className={`absolute -bottom-1 left-0 h-px bg-accent transition-[width] duration-700 ease-out ${
                !reduce && on ? "w-full" : "w-0"
              }`}
            />
          </span>
        );
      })}
    </p>
  );
}
