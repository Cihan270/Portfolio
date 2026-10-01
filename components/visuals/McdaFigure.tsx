/**
 * Illustrative structure of a multi-criteria decision analysis.
 * Deliberately shows no criteria names, weights or scores.
 */
export function McdaFigure({ alternatives, criteria = 5 }: { alternatives: number; criteria?: number }) {
  const alts = Array.from({ length: alternatives }, (_, i) => String.fromCharCode(65 + i));
  const rows = Array.from({ length: criteria }, (_, i) => `Criterion ${i + 1}`);
  const grid = { gridTemplateColumns: `minmax(7rem, 1.4fr) repeat(${alternatives}, minmax(0, 1fr))` };

  return (
    <figure>
      <div className="border border-line bg-surface">
        <div className="grid border-b border-line" style={grid}>
          <div className="label p-3">Criteria × weight</div>
          {alts.map((a) => (
            <div key={a} className="label border-l border-line p-3 text-center !text-ink">
              Alt. {a}
            </div>
          ))}
        </div>
        {rows.map((r) => (
          <div key={r} className="grid border-b border-line" style={grid}>
            <div className="p-3 text-sm text-muted">{r}</div>
            {alts.map((a) => (
              <div key={a} className="flex items-center justify-center border-l border-line p-3">
                <span aria-hidden className="h-2.5 w-2.5 rounded-full border border-line-strong" />
              </div>
            ))}
          </div>
        ))}
        <div className="grid" style={grid}>
          <div className="p-3 text-sm font-medium text-ink">Weighted result</div>
          {alts.map((a) => (
            <div key={a} className="flex items-center justify-center border-l border-line p-3">
              <span aria-hidden className="h-px w-5 bg-ink" />
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-muted">
        Structure of the evaluation of {alternatives} alternatives. Illustrative only — the actual criteria, weights and
        scores are not shown.
      </figcaption>
    </figure>
  );
}
