import { useEffect, useRef, useState } from "react";
import { Corners } from "./Bits";
import house from "@/assets/hero-house.jpg";

/** Construction edges trace the rendered elevation in the same image coordinates. */
const construction = [
  "M0 101 H1536 M0 373 H1536 M0 640 H1536 M0 680 H1536",
  "M246 0 V768 M700 0 V768 M849 0 V768 M1300 0 V768",
  "M0 149 H1536 M330 0 V768 M1200 0 V768",
];
const structure = [
  "M246 101 H1300 V149 H246 Z M246 149 L300 194 H700 M849 194 H1200 L1300 149",
  "M300 149 V373 M330 149 V373 M1200 149 V640 M1220 149 V640",
  "M700 149 V373 H849 V149 M700 194 H849",
  "M246 373 H1300 V418 H246 Z M246 418 L285 448 H623 M837 448 H1220 L1300 418",
  "M285 418 V640 H325 V448 M623 418 V640 H837 V418",
  "M250 640 H1300 V680 H250 Z M1042 101 V54 H1188 V101 M1042 54 L1035 72 V101",
];
const details = [
  "M350 194 H682 V373 H350 Z M868 194 H1174 V373 H868 Z",
  "M350 242 H682 M350 290 H682 M350 338 H682 M868 242 H1174 M868 290 H1174 M868 338 H1174",
  "M458 194 V373 M530 194 V373 M606 194 V373 M974 194 V373 M1100 194 V373",
  "M349 448 H459 V640 H349 Z M497 448 H590 V640 H497 Z M867 448 H1173 V640 H867 Z",
  "M349 497 H459 M349 541 H459 M349 591 H459 M399 448 V640 M927 448 V640 M1051 448 V640 M867 542 H1173",
  "M1220 309 H1274 V373 M350 310 H700 M849 310 H1200",
  "M128 680 L205 397 L246 420 M141 680 L219 427 L285 450 M0 695 H1536",
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
        <svg viewBox="0 0 1536 768" className="h-full w-full" fill="none" stroke="var(--foreground)" strokeWidth="2" strokeLinejoin="miter" role="img" aria-label="Construction lines resolve into a finished monochrome architectural building" data-hero-drawing data-complete={phase === "done"}>
          <g className="hero-construction-layer" style={phase === "reveal" ? { clipPath: `inset(0 0 ${rv}% 0)` } : undefined}>
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
