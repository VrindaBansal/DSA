import React from 'react';
import type { ChartData } from '@/lib/types';

// Data-interpretation charts in the GRE's plain style: grayscale fills,
// hatching to tell series apart, labelled axes and gridlines. Pure SVG, no
// client code, so it renders the same in lessons, the bank, and tests.

const FILLS = ['#3f4650', 'url(#chart-hatch)', '#c6ccd4', '#ffffff', '#68707c', 'url(#chart-dots)'];
const W = 560;

const fmt = (v: number, unit = '') => {
  const s = Number.isInteger(v) ? v.toLocaleString('en-US') : String(Math.round(v * 100) / 100);
  return unit === '$' ? `$${s}` : `${s}${unit}`;
};

function niceMax(max: number): { top: number; step: number } {
  const raw = max / 5;
  const pow = 10 ** Math.floor(Math.log10(raw || 1));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * pow).find((s) => s >= raw) ?? 10 * pow;
  return { top: Math.ceil(max / step) * step, step };
}

function Patterns() {
  return (
    <defs>
      <pattern id="chart-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="6" height="6" fill="#ffffff" />
        <line x1="0" y1="0" x2="0" y2="6" stroke="#3f4650" strokeWidth="2" />
      </pattern>
      <pattern id="chart-dots" width="5" height="5" patternUnits="userSpaceOnUse">
        <rect width="5" height="5" fill="#ffffff" />
        <circle cx="2.5" cy="2.5" r="1.1" fill="#3f4650" />
      </pattern>
    </defs>
  );
}

function Legend({ names, line }: { names: string[]; line?: boolean }) {
  if (names.length < 2) return null;
  return (
    <div className="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-1 font-mono text-[11px] text-ink-soft">
      {names.map((n, i) => (
        <span key={n} className="inline-flex items-center gap-1.5">
          <svg width="22" height="12" aria-hidden>
            <Patterns />
            {line ? (
              <>
                <line x1="1" y1="6" x2="21" y2="6" stroke="#191c21" strokeWidth="1.5" strokeDasharray={DASHES[i % DASHES.length]} />
                <Marker kind={i} x={11} y={6} />
              </>
            ) : (
              <rect x="4" y="1" width="14" height="10" fill={FILLS[i % FILLS.length]} stroke="#191c21" strokeWidth="1" />
            )}
          </svg>
          {n}
        </span>
      ))}
    </div>
  );
}

const DASHES = ['', '5 3', '2 2', '8 3 2 3'];

function Marker({ kind, x, y }: { kind: number; x: number; y: number }) {
  switch (kind % 4) {
    case 0:
      return <circle cx={x} cy={y} r={3.5} fill="#191c21" />;
    case 1:
      return <rect x={x - 3.5} y={y - 3.5} width={7} height={7} fill="#ffffff" stroke="#191c21" strokeWidth={1.4} />;
    case 2:
      return <polygon points={`${x},${y - 4.5} ${x + 4.2},${y + 3} ${x - 4.2},${y + 3}`} fill="#191c21" />;
    default:
      return <circle cx={x} cy={y} r={3.5} fill="#ffffff" stroke="#191c21" strokeWidth={1.4} />;
  }
}

function XYChart({ c }: { c: ChartData }) {
  const H = 300;
  const m = { l: c.yLabel ? 64 : 50, r: 14, t: 14, b: c.xLabel ? 58 : 40 };
  const pw = W - m.l - m.r;
  const ph = H - m.t - m.b;
  const all = c.series.flatMap((s) => s.values);
  const auto = niceMax(Math.max(...all, 0));
  const top = c.yMax ?? auto.top;
  const step = c.yStep ?? (c.yMax ? niceMax(c.yMax).step : auto.step);
  const y = (v: number) => m.t + ph - (v / top) * ph;
  const n = c.categories.length;
  const gw = pw / n;
  const showValues = c.showValues ?? false;
  const ticks: number[] = [];
  for (let v = 0; v <= top + 1e-9; v += step) ticks.push(Math.round(v * 1e6) / 1e6);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full max-w-[560px]" role="img" aria-label={c.title}>
      <Patterns />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={m.l} x2={W - m.r} y1={y(t)} y2={y(t)} stroke="#e2e5e9" strokeWidth={1} />
          <text x={m.l - 6} y={y(t) + 3.5} textAnchor="end" fontSize="11" fill="#3f4650" fontFamily="var(--font-mono)">
            {fmt(t, c.unit)}
          </text>
        </g>
      ))}
      <line x1={m.l} x2={m.l} y1={m.t} y2={m.t + ph} stroke="#191c21" />
      <line x1={m.l} x2={W - m.r} y1={m.t + ph} y2={m.t + ph} stroke="#191c21" />
      {c.categories.map((cat, i) => (
        <text
          key={cat}
          x={m.l + gw * i + gw / 2}
          y={m.t + ph + 16}
          textAnchor="middle"
          fontSize="11"
          fill="#191c21"
          fontFamily="var(--font-mono)"
        >
          {cat}
        </text>
      ))}
      {c.yLabel && (
        <text
          transform={`translate(14 ${m.t + ph / 2}) rotate(-90)`}
          textAnchor="middle"
          fontSize="11"
          fill="#3f4650"
          fontFamily="var(--font-mono)"
        >
          {c.yLabel}
        </text>
      )}
      {c.xLabel && (
        <text x={m.l + pw / 2} y={H - 10} textAnchor="middle" fontSize="11" fill="#3f4650" fontFamily="var(--font-mono)">
          {c.xLabel}
        </text>
      )}

      {c.type === 'bar'
        ? c.series.map((s, si) => {
            const bw = (gw * 0.7) / c.series.length;
            return s.values.map((v, i) => {
              const x = m.l + gw * i + gw * 0.15 + bw * si;
              return (
                <g key={`${si}-${i}`}>
                  <rect
                    x={x}
                    y={y(v)}
                    width={bw}
                    height={m.t + ph - y(v)}
                    fill={FILLS[si % FILLS.length]}
                    stroke="#191c21"
                    strokeWidth={1}
                  />
                  {showValues && (
                    <text x={x + bw / 2} y={y(v) - 4} textAnchor="middle" fontSize="10.5" fill="#191c21" fontFamily="var(--font-mono)">
                      {fmt(v, c.unit)}
                    </text>
                  )}
                </g>
              );
            });
          })
        : c.series.map((s, si) => {
            const pts = s.values.map((v, i) => [m.l + gw * i + gw / 2, y(v)] as const);
            // With several lines, label the lowest point at each x below it so labels don't collide.
            const below = (i: number) =>
              c.series.length > 1 && c.series.every((o, oi) => oi === si || o.values[i] > s.values[i]);
            return (
              <g key={si}>
                <polyline
                  points={pts.map((p) => p.join(',')).join(' ')}
                  fill="none"
                  stroke="#191c21"
                  strokeWidth={1.6}
                  strokeDasharray={DASHES[si % DASHES.length]}
                />
                {pts.map(([px, py], i) => (
                  <g key={i}>
                    <Marker kind={si} x={px} y={py} />
                    {showValues && (
                      <text x={px} y={below(i) ? py + 17 : py - 8} textAnchor="middle" fontSize="10.5" fill="#191c21" fontFamily="var(--font-mono)">
                        {fmt(s.values[i], c.unit)}
                      </text>
                    )}
                  </g>
                ))}
              </g>
            );
          })}
    </svg>
  );
}

function PieChart({ c }: { c: ChartData }) {
  const H = 290;
  const cx = W / 2;
  const cy = H / 2;
  const r = 105;
  const vals = c.series[0].values;
  const total = vals.reduce((a, b) => a + b, 0);
  let angle = -Math.PI / 2;
  const showValues = c.showValues ?? true;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full max-w-[560px]" role="img" aria-label={c.title}>
      <Patterns />
      {vals.map((v, i) => {
        const a0 = angle;
        const a1 = angle + (2 * Math.PI * v) / total;
        angle = a1;
        const large = a1 - a0 > Math.PI ? 1 : 0;
        const p0 = [cx + r * Math.cos(a0), cy + r * Math.sin(a0)];
        const p1 = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)];
        const mid = (a0 + a1) / 2;
        const lx = cx + (r + 16) * Math.cos(mid);
        const ly = cy + (r + 16) * Math.sin(mid);
        const anchor = Math.cos(mid) > 0.15 ? 'start' : Math.cos(mid) < -0.15 ? 'end' : 'middle';
        return (
          <g key={i}>
            <path
              d={`M${cx},${cy} L${p0[0]},${p0[1]} A${r},${r} 0 ${large} 1 ${p1[0]},${p1[1]} Z`}
              fill={FILLS[(i + 2) % FILLS.length]}
              stroke="#191c21"
              strokeWidth={1}
            />
            <text
              x={lx}
              y={ly + 4}
              textAnchor={anchor}
              fontSize="11.5"
              fill="#191c21"
              fontFamily="var(--font-mono)"
            >
              {c.categories[i]}
              {showValues ? ` ${fmt(v, c.unit)}` : ''}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function Chart({ c }: { c: ChartData }) {
  return (
    <figure className="rounded border border-line bg-panel px-3 py-2.5">
      <figcaption className="mb-1 text-center font-mono text-[11.5px] font-semibold text-ink">{c.title}</figcaption>
      <div className="flex justify-center">{c.type === 'pie' ? <PieChart c={c} /> : <XYChart c={c} />}</div>
      {c.type !== 'pie' && <Legend names={c.series.map((s) => s.name)} line={c.type === 'line'} />}
    </figure>
  );
}
