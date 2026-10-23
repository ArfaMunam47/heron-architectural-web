import { useEffect, useRef } from "react";

/** Red square that trails the pointer, tethered by a thin curved red line. */
export function Cursor() {
  const sq = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const m = { x: -100, y: -100 };
    const p = { x: -100, y: -100 };
    const c = { x: -100, y: -100 };
    let raf = 0;
    const move = (e: MouseEvent) => { m.x = e.clientX; m.y = e.clientY; };
    const tick = () => {
      p.x += (m.x - p.x) * 0.09; p.y += (m.y - p.y) * 0.09;
      c.x += (m.x - c.x) * 0.2; c.y += (m.y - c.y) * 0.2;
      if (sq.current) sq.current.style.transform = `translate(${p.x - 4}px, ${p.y - 4}px)`;
      const dist = Math.hypot(m.x - p.x, m.y - p.y);
      if (path.current) {
        path.current.setAttribute("d", `M${m.x},${m.y} Q${c.x + (c.y - p.y) * 0.4},${c.y + (p.x - c.x) * 0.4} ${p.x},${p.y}`);
        path.current.style.opacity = String(Math.min(1, dist / 40));
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", move); };
  }, []);
  return (
    <>
      <svg className="pointer-events-none fixed inset-0 z-[90] h-full w-full" aria-hidden>
        <path ref={path} fill="none" stroke="var(--primary)" strokeWidth="1" />
      </svg>
      <div ref={sq} className="pointer-events-none fixed left-0 top-0 z-[91] h-2 w-2 bg-primary" aria-hidden />
    </>
  );
}
