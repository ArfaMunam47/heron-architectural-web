import { useEffect, useRef, useState } from "react";
import house from "@/assets/hero-house.jpg";
import { Corners } from "./Bits";

/** Line-drawing paths approximating the house elevation (viewBox 1600x800). */
const lines = [
  "M260 105 H1355 V155 H260 Z", "M1080 58 H1237 V105",
  "M260 390 H1355 V440 H260 Z", "M340 155 V665 M1255 155 V665",
  "M365 200 H710 V385 H365 Z", "M905 200 H1225 V385 H905 Z",
  "M730 155 H885 V385 H730 Z", "M650 440 H870 V665 H650 Z",
  "M520 465 H615 V665", "M905 465 H1225 V665 H905 Z",
  "M150 705 L235 415 H295 V665 M150 705 H300",
  "M300 665 H1355 V705 H300", "M60 710 H1590",
  "M445 200 V385 M555 200 V385 M985 200 V385 M1065 200 V385 M1145 200 V385",
  "M365 290 H710 M905 290 H1225",
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
        <svg viewBox="0 0 1600 800" className={`absolute h-full w-full transition-opacity duration-1000 ${phase === "done" ? "opacity-0" : "opacity-100"}`} fill="none" stroke="var(--foreground)" strokeWidth="2">
          {lines.map((d, i) => (
            <path key={i} d={d} pathLength={1} className="draw-line" style={{ animationDelay: `${i * 110}ms` }} />
          ))}
        </svg>
        <img
          src={house} width={1600} height={800} alt="Architectural elevation of a concrete house between bare trees"
          className={`relative max-h-full w-auto object-contain mix-blend-multiply transition-all duration-[1400ms] ${phase === "done" ? "opacity-100 [clip-path:inset(0_0_0_0)]" : "opacity-0 [clip-path:inset(100%_0_0_0)]"}`}
          draggable={false}
        />
        {phase === "done" && (
          <>
            <span className="absolute left-[33%] top-[52%] h-2 w-2 bg-primary fade-in" />
            <span className="absolute left-[60%] top-[56%] h-2 w-2 bg-primary fade-in" />
          </>
        )}
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
