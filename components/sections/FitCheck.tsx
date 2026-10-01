"use client";

import { useMemo, useState } from "react";
import { Mail, RotateCcw } from "lucide-react";
import { fitBands, fitCopy, fitCriteria, fitPresets } from "@/data/fit";
import { site } from "@/data/site";
import { SectionHeading } from "@/components/SectionHeading";

const IMPORTANCE = ["Not relevant", "Minor", "Useful", "Important", "Very important", "Decisive"];

export function FitCheck() {
  const [weights, setWeights] = useState<Record<string, number>>(() => fitPresets[0].weights);
  const [preset, setPreset] = useState<string | null>(fitPresets[0].label);

  const result = useMemo(() => {
    const total = fitCriteria.reduce((sum, c) => sum + (weights[c.id] ?? 0), 0);
    if (total === 0) return null;

    const rows = fitCriteria
      .map((c) => {
        const weight = (weights[c.id] ?? 0) / total;
        return { ...c, weight, contribution: weight * c.score };
      })
      .sort((a, b) => b.contribution - a.contribution);

    const weighted = rows.reduce((sum, r) => sum + r.contribution, 0); // 1..5
    const score = ((weighted - 1) / 4) * 10; // 0..10
    const band = fitBands.find((b) => score >= b.min) ?? fitBands[fitBands.length - 1];
    const used = rows.filter((r) => r.weight > 0);

    return {
      rows,
      score,
      band,
      strongest: used.filter((r) => r.score >= 4).slice(0, 2),
      weakest: used.length > 1 ? used[used.length - 1] : null,
    };
  }, [weights]);

  const setWeight = (id: string, value: number) => {
    setPreset(null);
    setWeights((w) => ({ ...w, [id]: value }));
  };

  const applyPreset = (label: string) => {
    const found = fitPresets.find((p) => p.label === label);
    if (!found) return;
    setPreset(label);
    setWeights(found.weights);
  };

  return (
    <section id="fit" aria-labelledby="fit-title" className="container-page py-16 md:py-20">
      <SectionHeading
        id="fit-title"
        index="03"
        eyebrow={fitCopy.eyebrow}
        title={fitCopy.title}
        description={fitCopy.intro}
      />

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Controls */}
        <div className="lg:col-span-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="label mr-1">Start from</span>
            {fitPresets.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => applyPreset(p.label)}
                aria-pressed={preset === p.label}
                className={`border px-2.5 py-1 text-[0.8rem] transition-colors ${
                  preset === p.label
                    ? "border-ink bg-ink text-paper"
                    : "border-line-strong text-ink-2 hover:border-ink hover:text-ink"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {fitCriteria.map((c) => {
              const value = weights[c.id] ?? 0;
              return (
                <li key={c.id}>
                  <div className="flex items-baseline justify-between gap-3">
                    <label htmlFor={`fit-${c.id}`} className="text-sm font-medium text-ink">
                      {c.label}
                    </label>
                    <span className="label shrink-0 !text-[0.65rem]" aria-hidden>
                      {IMPORTANCE[value]}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs leading-snug text-muted">{c.description}</p>
                  <input
                    id={`fit-${c.id}`}
                    type="range"
                    min={0}
                    max={5}
                    step={1}
                    value={value}
                    onChange={(e) => setWeight(c.id, Number(e.target.value))}
                    aria-valuetext={`${IMPORTANCE[value]} for ${c.label}`}
                    className="mt-2 h-1 w-full cursor-pointer appearance-none rounded-full bg-line-strong accent-ink"
                    style={{ accentColor: "var(--color-ink)" }}
                  />
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={() => applyPreset(fitPresets[0].label)}
            className="mt-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <RotateCcw size={14} strokeWidth={1.75} aria-hidden />
            Reset
          </button>
        </div>

        {/* Result */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 border border-ink bg-surface">
            <div className="border-b border-line p-5 sm:p-6">
              <p className="label">Weighted result</p>
              {result ? (
                <>
                  <p className="mt-4 flex items-baseline gap-2">
                    <span className="text-5xl font-medium tracking-[-0.04em] text-ink tabular-nums">
                      {result.score.toFixed(1)}
                    </span>
                    <span className="text-lg text-muted">/ 10</span>
                  </p>
                  <div
                    aria-hidden
                    className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-paper-2"
                  >
                    <div
                      className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out"
                      style={{ width: `${Math.max(2, result.score * 10)}%` }}
                    />
                  </div>
                  <div aria-live="polite">
                    <h3 className="mt-5 text-lg font-medium tracking-tight text-ink">
                      {result.band.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-2">{result.band.body}</p>
                  </div>
                  {result.band.invite && (
                    <a
                      href={`mailto:${site.email}?subject=${encodeURIComponent("Assignment — possible fit")}`}
                      className="mt-5 inline-flex h-10 items-center gap-2 bg-ink px-4 text-sm font-medium text-paper transition-colors hover:bg-accent"
                    >
                      <Mail size={16} strokeWidth={1.75} aria-hidden />
                      Email me about this assignment
                    </a>
                  )}
                </>
              ) : (
                <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">
                  Set at least one area to a level above “not relevant” to see the result.
                </p>
              )}
            </div>

            {result && (
              <div className="p-5 sm:p-6">
                <p className="label">How that is calculated</p>
                <ul className="mt-3 space-y-2">
                  {result.rows
                    .filter((r) => r.weight > 0)
                    .map((r) => (
                      <li key={r.id} className="grid grid-cols-[1fr_auto_auto] items-baseline gap-3 text-[0.82rem]">
                        <span className="truncate text-ink-2">{r.label}</span>
                        <span className="text-muted tabular-nums">{Math.round(r.weight * 100)}%</span>
                        <span className="w-10 text-right text-ink tabular-nums">{r.score}/5</span>
                      </li>
                    ))}
                </ul>
                {result.strongest.length > 0 && (
                  <p className="mt-4 border-t border-line pt-3 text-[0.82rem] leading-relaxed text-muted">
                    Weight sits mostly on{" "}
                    <span className="text-ink">
                      {result.strongest.map((r) => r.label.toLowerCase()).join(" and ")}
                    </span>
                    {result.weakest && result.weakest.score <= 3 ? (
                      <>
                        , while{" "}
                        <span className="text-ink">{result.weakest.label.toLowerCase()}</span> is the part
                        I would be growing into.
                      </>
                    ) : (
                      "."
                    )}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="mt-8 max-w-2xl text-xs leading-relaxed text-muted">{fitCopy.note}</p>
    </section>
  );
}
