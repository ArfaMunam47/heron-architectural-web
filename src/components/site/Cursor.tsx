import { useEffect, useRef } from "react";

/** Reference-style follower. Native pointers remain available for precise input. */
export function Cursor() {
  const layer = useRef<HTMLDivElement>(null);
  const sq = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const m = { x: 0, y: 0 };
    const p = { x: 0, y: 0 };
    let visible = false;
    let previous = 0;
    let raf = 0;
    const hide = () => {
      visible = false;
      if (layer.current) layer.current.style.opacity = '0';
      cancelAnimationFrame(raf);
      raf = 0;
      previous = 0;
    };
    const tick = (time: number) => {
      const dt = previous ? Math.min(time - previous, 40) : 16;
      previous = time;
      const ease = 1 - Math.exp(-dt / 65);
      p.x += (m.x - p.x) * ease;
      p.y += (m.y - p.y) * ease;
      if (layer.current) layer.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      const dist = Math.hypot(m.x - p.x, m.y - p.y);
      if (path.current) {
        const x = m.x - p.x;
        const y = m.y - p.y;
        path.current.setAttribute('d', `M0,0 Q${x * .5 - y * .12},${y * .5 + x * .12} ${x},${y}`);
        path.current.style.opacity = String(Math.min(.6, dist / 80));
      }
      raf = dist > .2 && visible ? requestAnimationFrame(tick) : 0;
      if (!raf) previous = 0;
    };
    const move = (e: PointerEvent) => {
      if (!media.matches || e.pointerType !== 'mouse') { hide(); return; }
      const target = e.target instanceof Element ? e.target : null;
      // Don't layer decorative feedback over text entry or the model crosshair.
      if (target?.closest('input, textarea, select, [contenteditable="true"], [data-cursor="native"]')) { hide(); return; }
      m.x = e.clientX; m.y = e.clientY;
      if (!visible) { p.x = m.x; p.y = m.y; }
      visible = true;
      if (layer.current) {
        layer.current.style.opacity = '1';
        layer.current.dataset['active'] = String(Boolean(target?.closest('a, button:not(:disabled), [role="button"], summary')));
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const press = () => { if (layer.current) layer.current.dataset['pressed'] = 'true'; };
    const release = () => { if (layer.current) layer.current.dataset['pressed'] = 'false'; };
    const leave = (e: PointerEvent) => { if (!e.relatedTarget) hide(); };
    const visibility = () => { if (document.hidden) hide(); };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', press, { passive: true });
    window.addEventListener('pointerup', release, { passive: true });
    window.addEventListener('pointerout', leave);
    window.addEventListener('blur', hide);
    document.addEventListener('visibilitychange', visibility);
    media.addEventListener('change', hide);
    return () => {
      hide();
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointerout', leave);
      window.removeEventListener('blur', hide);
      document.removeEventListener('visibilitychange', visibility);
      media.removeEventListener('change', hide);
    };
  }, []);
  return (
    <div ref={layer} className="cursor-follower" aria-hidden="true">
      <svg className="absolute left-0 top-0 h-px w-px overflow-visible">
        <path ref={path} fill="none" stroke="var(--primary)" strokeWidth="1" />
      </svg>
      <div ref={sq} className="cursor-follower-mark" />
    </div>
  );
}
