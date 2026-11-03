import { useEffect, useRef, useState } from "react";
import { Corners } from "./Bits";
import house from "@/assets/hero-house-clean.jpg";

/** Clean elevation traced to the rendered house in the same 1536x768 image coordinates. */
const construction = [
  "M0 100 H1536 M0 371 H1536 M0 637 H1536 M0 676 H1536",
  "M246 0 V768 M701 0 V768 M849 0 V768 M1298 0 V768",
];
const structure = [
  "M246 100 H1298 V150 H246 Z M1037 100 V54 H1187 V100",
  "M246 371 H1298 V419 H246 Z",
  "M250 637 H1298 V676 H250 Z",
  "M326 150 V371 M346 150 V371 M1200 150 V371 M1213 150 V371",
  "M326 419 V637 M346 419 V637 M1200 419 V637 M1213 419 V637",
  "M701 150 V371 H849 V150 M620 419 V637 H835 V419",
  "M125 676 V560 L230 397 H288 V419 M150 676 V575 L246 430",
];
const details = [
  "M346 192 H682 V371 M854 192 H1200",
  "M458 192 V371 M570 192 V371 M966 192 V371 M1083 192 V371",
  "M346 311 H701 M849 311 H1200",
  "M346 442 H457 V637 M499 442 H595 V637 M499 442 V637 M839 442 H1200 V637 M839 442 V637",
  "M401 442 V637 M346 540 H457 M960 442 V637 M1080 442 V637 M839 540 H1200",
  "M150 600 H250 M165 575 H250 M180 550 H250 M195 525 H250 M210 500 H250 M225 475 H250 M240 450 H250",
  "M0 690 H1536",
];

export function HeroStage() {
  const [phase, setPhase] = useState<"draw" | "reveal" | "done">("draw");
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
      const elapsed = t - t0;
      const p = Math.min(100, (elapsed / 4400) * 100);
      if (elapsed >= 2600 && p < 100) setPhase("reveal");
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

  // The same traveling line hands each band from drawing to built render.
  const rv = Math.max(0, Math.min(100, ((pct - 59) / 41) * 100));

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
        <svg viewBox="0 0 1536 768" className="h-full w-full" fill="none" stroke="var(--foreground)" strokeWidth="2" strokeLinejoin="miter" strokeLinecap="square" role="img" aria-label="Construction lines resolve into a finished monochrome architectural building" data-hero-drawing data-complete={phase === "done"}>
          <g className="hero-construction-layer" style={phase === "reveal" ? { clipPath: `inset(0 0 ${rv}% 0)` } : undefined}>
          <g stroke="var(--line)" strokeWidth="1" className="hero-draft-grid">
            {Array.from({ length: 17 }, (_, i) => <path key={`v${i}`} d={`M${i * 100} 0 V800`} />)}
            {Array.from({ length: 9 }, (_, i) => <path key={`h${i}`} d={`M0 ${i * 100} H1600`} />)}
          </g>
          <g stroke="var(--border)" strokeWidth="0.75" vectorEffect="non-scaling-stroke">
            {construction.map((d, i) => <path key={d} d={d} pathLength={1} vectorEffect="non-scaling-stroke" className="hero-draft-edge" style={{ animationDelay: `${250 + i * 140}ms` }} />)}
          </g>
          <g strokeWidth="1.25">
            {structure.map((d, i) => <path key={d} d={d} pathLength={1} vectorEffect="non-scaling-stroke" className="hero-draft-edge" style={{ animationDelay: `${650 + i * 100}ms` }} />)}
          </g>
          <g strokeWidth="0.75" stroke="color-mix(in oklab, var(--foreground) 70%, transparent)">
            {details.map((d, i) => <path key={d} d={d} pathLength={1} vectorEffect="non-scaling-stroke" className="hero-draft-edge" style={{ animationDelay: `${1200 + i * 50}ms` }} />)}
          </g>
          </g>
          <image href={house} x="0" y="0" width="1536" height="768" className="hero-building-render" style={phase === "reveal" ? { clipPath: `inset(${100 - rv}% 0 0 0)`, opacity: 1 } : undefined} />
          {phase === "reveal" && <path d={`M0 ${768 - rv * 7.68} H1536`} stroke="var(--primary)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />}
          {phase === "done" && <g fill="var(--primary)" stroke="none" className="fade-in"><rect x="623" y="448" width="8" height="8" /><rect x="1051" y="542" width="8" height="8" /></g>}
        </svg>
      </div>

      {phase === "draw" && (
        <div className="pointer-events-none absolute inset-x-0 h-px bg-primary" style={{ top: `${100 - pct * 1.45}%` }}>
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
