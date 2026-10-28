import { useEffect, useRef, useState } from "react";
import { Corners } from "./Bits";

/** Grid, elevation and depth edges all use the same 100-unit drawing module. */
const construction = [
  "M200 100 H1500 M200 400 H1500 M100 700 H1500",
  "M300 50 V750 M800 50 V750 M1300 50 V750",
  "M200 750 L1500 100 M200 450 L1000 50 M800 750 L1500 400",
];
const structure = [
  "M300 150 H1300 L1400 100 H400 Z",
  "M300 150 V200 H1300 V150 M1300 200 L1400 150 V100",
  "M400 200 V700 M1200 200 V700 M1400 150 V650 L1300 700",
  "M300 400 H1300 V450 H300 Z M1300 400 L1400 350 V400 L1300 450",
  "M300 700 H1300 V750 H300 Z M1300 750 L1400 700 V650 M1300 700 L1400 650",
  "M1100 150 V100 H1200 V150 M1100 100 L1200 50 H1300 V100 L1200 150 M1200 100 H1300",
];
const details = [
  "M450 250 H700 V400 H450 Z M900 250 H1150 V400 H900 Z",
  "M750 200 H850 V400 H750 Z M650 450 H850 V700 H650 Z",
  "M450 500 H600 V700 H450 Z M900 500 H1150 V700 H900 Z",
  "M500 250 V400 M600 250 V400 M950 250 V400 M1050 250 V400",
  "M450 350 H700 M900 350 H1150 M950 500 V700 M1050 500 V700",
  "M1320 250 L1380 220 V330 L1320 360 Z M1320 500 L1380 470 V600 L1320 630 Z",
  "M100 750 H1500 M200 750 L300 450 H400 M200 750 H300 M250 600 H400",
];

export function HeroStage() {
  const [phase, setPhase] = useState<"draw" | "done">("draw");
  const [pct, setPct] = useState(0);
  const [m, setM] = useState<{ x: number; y: number } | null>(null);
  const [drag, setDrag] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("heron-intro")) { setPhase("done"); setPct(100); return; }
    } catch { /* The intro still works when browser storage is unavailable. */ }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setPhase('done'); setPct(100); return; }
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(100, ((t - t0) / 2600) * 100);
      setPct(Math.round(p));
      if (p < 100) raf = requestAnimationFrame(tick);
      else {
        setPhase("done");
        try { sessionStorage.setItem("heron-intro", "1"); } catch { /* Optional intro preference. */ }
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const pos = (e: React.MouseEvent) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return { x: 0, y: 0 };
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <div
      ref={box}
      data-intro-phase={phase}
      data-cursor="native"
      className="relative h-[calc(100svh-14rem)] min-h-[260px] md:h-[calc(100svh-10rem)] md:min-h-[360px] cursor-crosshair select-none overflow-hidden"
      onMouseMove={(e) => {
        const p = pos(e); setM(p);
        if (start.current) setDrag({ x: Math.min(p.x, start.current.x), y: Math.min(p.y, start.current.y), w: Math.abs(p.x - start.current.x), h: Math.abs(p.y - start.current.y) });
      }}
      onMouseLeave={() => { setM(null); start.current = null; setDrag(null); }}
      onMouseDown={(e) => { start.current = pos(e); setDrag(null); }}
      onMouseUp={() => { start.current = null; setTimeout(() => setDrag(null), 1400); }}
    >
      <Corners />
      <div className="absolute inset-x-[10%] inset-y-[8%] flex items-center justify-center">
        <svg viewBox="0 0 1600 800" className="h-full w-full" fill="none" stroke="var(--foreground)" strokeWidth="2" strokeLinejoin="miter" role="img" aria-label="Architectural house drafted directly on a shared construction grid" data-hero-drawing data-complete={phase === "done"}>
          <g stroke="var(--line)" strokeWidth="1" className="hero-draft-grid">
            {Array.from({ length: 17 }, (_, i) => <path key={`v${i}`} d={`M${i * 100} 0 V800`} />)}
            {Array.from({ length: 9 }, (_, i) => <path key={`h${i}`} d={`M0 ${i * 100} H1600`} />)}
          </g>
          <g stroke="var(--border)" strokeWidth="1">
            {construction.map((d, i) => <path key={d} d={d} pathLength={1} className="hero-draft-edge" style={{ animationDelay: `${250 + i * 140}ms` }} />)}
          </g>
          <g>
            {structure.map((d, i) => <path key={d} d={d} pathLength={1} className="hero-draft-edge" style={{ animationDelay: `${650 + i * 100}ms` }} />)}
          </g>
          <g strokeWidth="1.25">
            {details.map((d, i) => <path key={d} d={d} pathLength={1} className="hero-draft-edge" style={{ animationDelay: `${1200 + i * 50}ms` }} />)}
          </g>
          {phase === "done" && <g fill="var(--primary)" stroke="none" className="fade-in"><rect x="650" y="450" width="8" height="8" /><rect x="1050" y="500" width="8" height="8" /></g>}
        </svg>
      </div>

      {phase === "draw" && (
        <div className="pointer-events-none absolute inset-x-0 h-px bg-primary" style={{ top: `${100 - pct * 0.85}%` }}>
          <span className="absolute -top-4 left-4 label text-primary">{pct}%</span>
        </div>
      )}

      {m && phase === "done" && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 h-px bg-line" style={{ top: m.y }} />
          <div className="absolute inset-y-0 w-px bg-line" style={{ left: m.x }} />
          <div className="absolute flex items-start gap-1" style={{ left: Math.min(m.x + 6, (box.current?.clientWidth ?? 200) - 180), top: Math.min(m.y + 6, (box.current?.clientHeight ?? 100) - 40) }}>
            <span className="font-mono text-[8px] leading-tight text-muted-foreground">X:{Math.round(m.x)}PX<br />Y:{Math.round(m.y)}PX</span>
            {!drag && <span className="bg-ink px-1.5 py-1 font-mono text-[8px] uppercase leading-tight text-ink-foreground">Model study / Selection</span>}
          </div>
        </div>
      )}
      {drag && drag.w > 8 && (
        <div className="pointer-events-none absolute border border-primary bg-primary/10" style={{ left: drag.x, top: drag.y, width: drag.w, height: drag.h }}>
          <span className="absolute -top-4 left-0 bg-primary px-1 font-mono text-[8px] uppercase text-primary-foreground">
            {Math.max(1, Math.round((drag.w * drag.h) / 9000))} sample flags
          </span>
        </div>
      )}
    </div>
  );
}
