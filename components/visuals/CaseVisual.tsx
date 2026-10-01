import type { CaseVisualKey } from "@/data/types";

/**
 * Abstract, recreated diagrams for each case. They illustrate the *shape*
 * of the problem only — no client data, screenshots or internal material.
 */

const T = "font-mono uppercase";
const nodeCls = "fill-surface stroke-ink";
const lineCls = "stroke-ink";

function Unive() {
  const teams = [
    { x: 30, y: 30 },
    { x: 330, y: 30 },
    { x: 30, y: 214 },
    { x: 330, y: 214 },
  ];
  return (
    <>
      <g className={lineCls} strokeWidth="1" strokeDasharray="3 4" fill="none">
        <path d="M165 128 L150 86" />
        <path d="M315 128 L330 86" />
        <path d="M165 172 L150 214" />
        <path d="M315 172 L330 214" />
      </g>
      {teams.map((t, i) => (
        <g key={i}>
          <rect x={t.x} y={t.y} width="120" height="56" className={nodeCls} strokeWidth="1" />
          <text x={t.x + 10} y={t.y + 18} className={`${T} fill-muted`} fontSize="9" letterSpacing="0.08em">
            Feature team
          </text>
          {[0, 1, 2].map((j) => (
            <rect key={j} x={t.x + 10 + j * 16} y={t.y + 30} width="10" height="10" className="fill-line-strong" />
          ))}
          <rect x={t.x + 58} y={t.y + 30} width="10" height="10" className="fill-accent" />
        </g>
      ))}
      <rect x="165" y="128" width="150" height="44" className="fill-accent" />
      <text x="240" y="147" textAnchor="middle" className={`${T} fill-white`} fontSize="9.5" letterSpacing="0.1em">
        Architecture
      </text>
      <text x="240" y="161" textAnchor="middle" className={`${T} fill-white`} fontSize="9.5" letterSpacing="0.1em">
        knowledge
      </text>
    </>
  );
}

function Nedap() {
  const ys = [36, 86, 136, 186, 236];
  return (
    <>
      <g className={lineCls} strokeWidth="1" fill="none" opacity="0.55">
        {ys.map((y) => (
          <path key={y} d={`M92 ${y + 12} C 150 ${y + 12}, 150 150, 200 150`} />
        ))}
      </g>
      {ys.map((y, i) => (
        <g key={y}>
          <rect x="24" y={y} width="68" height="24" className={nodeCls} strokeWidth="1" />
          <text x="34" y={y + 15.5} className={`${T} fill-muted`} fontSize="8.5" letterSpacing="0.08em">
            Source {i + 1}
          </text>
        </g>
      ))}
      <rect x="200" y="104" width="124" height="92" className={nodeCls} strokeWidth="1.25" />
      <text x="212" y="124" className={`${T} fill-ink`} fontSize="9" letterSpacing="0.08em">
        Integrated
      </text>
      <text x="212" y="137" className={`${T} fill-ink`} fontSize="9" letterSpacing="0.08em">
        environment
      </text>
      <rect x="212" y="160" width="100" height="22" className="fill-accent-soft stroke-accent" strokeWidth="1" />
      <circle cx="225" cy="170" r="4.5" className="stroke-accent" strokeWidth="1.25" fill="none" />
      <path d="M228.5 173.5 L232 177" className="stroke-accent" strokeWidth="1.25" />
      <text x="240" y="174.5" className={`${T} fill-accent`} fontSize="8.5" letterSpacing="0.08em">
        AI search
      </text>
      <path d="M324 150 L384 150" className={lineCls} strokeWidth="1" />
      <path d="M378 145 L384 150 L378 155" className={lineCls} strokeWidth="1" fill="none" />
      <circle cx="420" cy="136" r="11" className={nodeCls} strokeWidth="1.25" />
      <path d="M400 170 C 400 152, 440 152, 440 170" className={nodeCls} strokeWidth="1.25" />
      <text x="420" y="192" textAnchor="middle" className={`${T} fill-muted`} fontSize="8.5" letterSpacing="0.08em">
        Employee
      </text>
    </>
  );
}

function Duo() {
  return (
    <>
      <text x="24" y="40" className={`${T} fill-muted`} fontSize="9" letterSpacing="0.1em">
        From
      </text>
      <g className={lineCls} strokeWidth="1" fill="none">
        <path d="M88 108 L88 124 L37 124 L37 150" />
        <path d="M88 124 L88 150" />
        <path d="M88 124 L139 124 L139 150" />
      </g>
      <rect x="52" y="84" width="72" height="24" className={nodeCls} strokeWidth="1" />
      {[14, 65, 116].map((x) => (
        <rect key={x} x={x} y="150" width="46" height="24" className={nodeCls} strokeWidth="1" />
      ))}

      <path d="M186 130 L276 130" className={lineCls} strokeWidth="1" />
      <path d="M270 125 L276 130 L270 135" className={lineCls} strokeWidth="1" fill="none" />
      <g>
        <path d="M200 112 L206 102 L212 112 Z" className="fill-none stroke-ink" strokeWidth="1" />
        <text x="218" y="111" className={`${T} fill-muted`} fontSize="8" letterSpacing="0.06em">
          Role ambiguity
        </text>
        <path d="M200 158 L206 148 L212 158 Z" className="fill-none stroke-ink" strokeWidth="1" />
        <text x="218" y="157" className={`${T} fill-muted`} fontSize="8" letterSpacing="0.06em">
          Governance
        </text>
      </g>

      <text x="300" y="40" className={`${T} fill-muted`} fontSize="9" letterSpacing="0.1em">
        Toward team-oriented
      </text>
      <circle cx="400" cy="104" r="34" className={nodeCls} strokeWidth="1" />
      <circle cx="366" cy="160" r="34" className={nodeCls} strokeWidth="1" />
      <circle cx="424" cy="168" r="34" className={nodeCls} strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="338" cy="100" r="30" className="fill-accent" />
      <text x="338" y="103.5" textAnchor="middle" className={`${T} fill-white`} fontSize="9" letterSpacing="0.1em">
        Pilot
      </text>
      <text x="300" y="248" className={`${T} fill-ink`} fontSize="9" letterSpacing="0.08em">
        CTO Office pilot first
      </text>
    </>
  );
}

function Police() {
  const nodes = [
    { cx: 240, cy: 66, label: "Business" },
    { cx: 146, cy: 190, label: "Dev" },
    { cx: 334, cy: 190, label: "Ops" },
  ];
  return (
    <>
      <g className={lineCls} strokeWidth="1" fill="none">
        <path d="M206 88 C 170 110, 150 130, 146 150" />
        <path d="M184 196 C 215 214, 265 214, 296 196" />
        <path d="M334 150 C 330 130, 310 110, 274 88" />
        <path d="M141 144 L146 151 L151 144" />
        <path d="M290 191 L297 196 L290 201" />
        <path d="M279 84 L273 88 L278 94" />
      </g>
      {nodes.map((n) => (
        <g key={n.label}>
          <circle cx={n.cx} cy={n.cy} r="38" className={nodeCls} strokeWidth="1.25" />
          <text x={n.cx} y={n.cy + 3.5} textAnchor="middle" className={`${T} fill-ink`} fontSize="9.5" letterSpacing="0.1em">
            {n.label}
          </text>
        </g>
      ))}
      <text x="240" y="146" textAnchor="middle" className={`${T} fill-muted`} fontSize="8.5" letterSpacing="0.08em">
        Shared way
      </text>
      <text x="240" y="158" textAnchor="middle" className={`${T} fill-muted`} fontSize="8.5" letterSpacing="0.08em">
        of working
      </text>
      <rect x="90" y="252" width="300" height="26" className="fill-accent" />
      <text x="240" y="268.5" textAnchor="middle" className={`${T} fill-white`} fontSize="9" letterSpacing="0.1em">
        Supporting tooling
      </text>
    </>
  );
}

function Geniuz() {
  const xs = [20, 112, 204, 296, 388];
  const opportunity = new Set([1, 3]);
  return (
    <>
      <text x="20" y="92" className={`${T} fill-muted`} fontSize="9" letterSpacing="0.1em">
        Business process
      </text>
      {xs.map((x, i) => (
        <g key={x}>
          <rect
            x={x}
            y="110"
            width="72"
            height="44"
            className={opportunity.has(i) ? "fill-accent-soft stroke-accent" : nodeCls}
            strokeWidth="1"
          />
          <text x={x + 10} y="128" className={`${T} fill-muted`} fontSize="8.5" letterSpacing="0.08em">
            Step {i + 1}
          </text>
          {opportunity.has(i) && <circle cx={x + 62} cy="120" r="3.5" className="fill-accent" />}
          {i < xs.length - 1 && (
            <g className={lineCls} strokeWidth="1" fill="none">
              <path d={`M${x + 72} 132 L${x + 92} 132`} />
              <path d={`M${x + 87} 128 L${x + 92} 132 L${x + 87} 136`} />
            </g>
          )}
        </g>
      ))}
      <g className="stroke-accent" strokeWidth="1" fill="none" strokeDasharray="3 3">
        <path d="M148 162 L148 196 L332 196 L332 162" />
      </g>
      <text x="240" y="220" textAnchor="middle" className={`${T} fill-accent`} fontSize="9" letterSpacing="0.1em">
        AI / automation opportunities
      </text>
    </>
  );
}

const visuals: Record<CaseVisualKey, { render: () => React.ReactNode; label: string }> = {
  unive: { render: Unive, label: "Abstract diagram: architecture knowledge connected to four feature teams" },
  nedap: {
    render: Nedap,
    label: "Abstract diagram: several information sources brought together in an integrated environment with AI search",
  },
  duo: {
    render: Duo,
    label: "Abstract diagram: transition toward team-oriented ICT management, starting with a pilot",
  },
  police: {
    render: Police,
    label: "Abstract diagram: business, development and operations in one cycle, with supporting tooling",
  },
  geniuz: {
    render: Geniuz,
    label: "Abstract diagram: a business process with steps marked as AI or automation opportunities",
  },
};

export function CaseVisual({ name, className = "" }: { name: CaseVisualKey; className?: string }) {
  const v = visuals[name];
  return (
    <svg
      viewBox="0 0 480 300"
      role="img"
      aria-label={v.label}
      className={`h-auto w-full ${className}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {v.render()}
    </svg>
  );
}
