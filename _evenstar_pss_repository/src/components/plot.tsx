import { useMemo, useState, type MouseEvent } from "react";

export type PlotPoint = { x: number; y: number };
export type PlotSeries = {
  id: string;
  label: string;
  color: string;
  points: PlotPoint[];
  dashed?: boolean;
};
export type PlotMarker = { x: number; y: number; label: string; color: string };

function bounds(series: PlotSeries[], markers: PlotMarker[]) {
  const xs = [...series.flatMap((s) => s.points.map((p) => p.x)), ...markers.map((m) => m.x)].filter(Number.isFinite);
  const ys = [...series.flatMap((s) => s.points.map((p) => p.y)), ...markers.map((m) => m.y)].filter(Number.isFinite);
  if (!xs.length || !ys.length) return { x0: 0, x1: 1, y0: 0, y1: 1 };
  const padX = (Math.max(...xs) - Math.min(...xs)) * 0.08 || 1;
  const padY = (Math.max(...ys) - Math.min(...ys)) * 0.12 || 1;
  return {
    x0: Math.min(...xs) - padX,
    x1: Math.max(...xs) + padX,
    y0: Math.max(0, Math.min(...ys) - padY),
    y1: Math.max(...ys) + padY,
  };
}

function ticks(a: number, b: number, n = 5) {
  const span = b - a || 1;
  const step = span / (n - 1);
  return Array.from({ length: n }, (_, i) => a + i * step);
}

export function Plot({
  title,
  xLabel,
  yLabel,
  series,
  markers = [],
  method,
}: {
  title: string;
  xLabel: string;
  yLabel: string;
  series: PlotSeries[];
  markers?: PlotMarker[];
  method?: string;
}) {
  const [hover, setHover] = useState<{ x: number; y: number; label: string } | null>(null);
  const box = { l: 52, r: 16, t: 28, b: 42, w: 640, h: 320 };
  const innerW = box.w - box.l - box.r;
  const innerH = box.h - box.t - box.b;
  const { x0, x1, y0, y1 } = useMemo(() => bounds(series, markers), [series, markers]);
  const sx = (x: number) => box.l + ((x - x0) / (x1 - x0 || 1)) * innerW;
  const sy = (y: number) => box.t + innerH - ((y - y0) / (y1 - y0 || 1)) * innerH;
  const xt = ticks(x0, x1);
  const yt = ticks(y0, y1);

  function onMove(event: MouseEvent<SVGSVGElement>) {
    const svg = event.currentTarget;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const pt = svg.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
    const loc = pt.matrixTransform(ctm.inverse());
    const x = x0 + ((loc.x - box.l) / innerW) * (x1 - x0);
    let best: { d: number; p: PlotPoint; label: string } | null = null;
    for (const s of series) {
      for (const p of s.points) {
        const d = Math.abs(p.x - x);
        if (!best || d < best.d) best = { d, p, label: s.label };
      }
    }
    if (best) setHover({ x: best.p.x, y: best.p.y, label: best.label });
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-panel">
      <div className="flex items-start justify-between gap-3 border-b border-line px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold">{title}</h2>
          {method && <p className="mt-0.5 text-[11px] text-muted">{method}</p>}
        </div>
        <div className="flex flex-wrap justify-end gap-3 text-[11px] text-muted">
          {series.map((s) => (
            <span key={s.id} className="inline-flex items-center gap-1.5">
              <span className="h-0.5 w-3.5 rounded-full" style={{ background: s.color, opacity: s.dashed ? 0.6 : 1 }} />
              {s.label}
            </span>
          ))}
        </div>
      </div>
      <div className="relative bg-ink/40">
        <svg
          viewBox={`0 0 ${box.w} ${box.h}`}
          className="h-[280px] w-full cursor-crosshair"
          onMouseMove={onMove}
          onMouseLeave={() => setHover(null)}
          role="img"
          aria-label={title}
        >
          {xt.map((x) => (
            <g key={`x${x}`}>
              <line x1={sx(x)} x2={sx(x)} y1={box.t} y2={box.t + innerH} stroke="var(--line)" strokeWidth="1" />
              <text x={sx(x)} y={box.h - 16} textAnchor="middle" fill="var(--muted)" fontSize="10" fontFamily="JetBrains Mono, monospace">
                {x.toFixed(Math.abs(x) >= 100 ? 0 : 1)}
              </text>
            </g>
          ))}
          {yt.map((y) => (
            <g key={`y${y}`}>
              <line x1={box.l} x2={box.l + innerW} y1={sy(y)} y2={sy(y)} stroke="var(--line)" strokeWidth="1" />
              <text x={box.l - 8} y={sy(y) + 3} textAnchor="end" fill="var(--muted)" fontSize="10" fontFamily="JetBrains Mono, monospace">
                {y.toFixed(Math.abs(y) >= 100 ? 0 : 2)}
              </text>
            </g>
          ))}
          <text x={box.w / 2} y={box.h - 4} textAnchor="middle" fill="var(--muted)" fontSize="11">{xLabel}</text>
          <text x="14" y={box.h / 2} fill="var(--muted)" fontSize="11" transform={`rotate(-90 14 ${box.h / 2})`}>{yLabel}</text>
          {series.map((s) => {
            const d = s.points.map((p, i) => `${i === 0 ? "M" : "L"}${sx(p.x).toFixed(2)},${sy(p.y).toFixed(2)}`).join(" ");
            return (
              <path
                key={s.id}
                d={d}
                fill="none"
                stroke={s.color}
                strokeWidth="2"
                strokeDasharray={s.dashed ? "5 4" : undefined}
              />
            );
          })}
          {markers.map((m) => (
            <g key={m.label}>
              <circle cx={sx(m.x)} cy={sy(m.y)} r="5" fill={m.color} stroke="var(--paper)" strokeWidth="1.5" />
              <text x={sx(m.x) + 8} y={sy(m.y) - 8} fill={m.color} fontSize="10" fontFamily="Inter, sans-serif">{m.label}</text>
            </g>
          ))}
          {hover && (
            <g>
              <circle cx={sx(hover.x)} cy={sy(hover.y)} r="3.5" fill="var(--paper)" stroke="var(--teal)" />
            </g>
          )}
        </svg>
        {hover && (
          <div className="pointer-events-none absolute right-3 top-3 rounded-md border border-line bg-panel px-2 py-1 font-mono text-[11px]">
            {hover.label}: {hover.x.toFixed(2)} / {hover.y.toFixed(3)}
          </div>
        )}
      </div>
    </div>
  );
}
