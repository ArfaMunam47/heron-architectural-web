import { useEffect, useRef } from "react";

/** Precise dot and lightly eased ring; native pointers remain available. */
export function Cursor() {
  const layer = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
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
      if (layer.current) layer.current.dataset['pressed'] = 'false';
    };
    const tick = (time: number) => {
      const dt = previous ? Math.min(time - previous, 40) : 16;
      previous = time;
      const ease = 1 - Math.exp(-dt / 28);
      p.x += (m.x - p.x) * ease;
      p.y += (m.y - p.y) * ease;
      if (ring.current) ring.current.style.transform = `translate3d(${p.x - m.x}px, ${p.y - m.y}px, 0)`;
      const dist = Math.hypot(m.x - p.x, m.y - p.y);
      raf = dist > .2 && visible ? requestAnimationFrame(tick) : 0;
      if (!raf) {
        previous = 0;
        if (ring.current) ring.current.style.transform = 'translate3d(0, 0, 0)';
      }
    };
    const move = (e: PointerEvent) => {
      if (!media.matches || e.pointerType !== 'mouse' || e.buttons !== 0 || window.getSelection()?.isCollapsed === false) { hide(); return; }
      const target = e.target instanceof Element ? e.target : null;
      // Don't layer decorative feedback over text entry or the model crosshair.
      if (target?.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), [data-cursor="native"]')) { hide(); return; }
      m.x = e.clientX; m.y = e.clientY;
      if (!visible) { p.x = m.x; p.y = m.y; }
      visible = true;
      if (layer.current) {
        layer.current.style.transform = `translate3d(${m.x}px, ${m.y}px, 0)`;
        layer.current.style.opacity = '1';
        const interactive = target?.closest('a[href], button, [role="button"], summary');
        layer.current.dataset['active'] = String(Boolean(interactive && !interactive.matches(':disabled, [aria-disabled="true"]')));
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const press = () => { if (layer.current) layer.current.dataset['pressed'] = 'true'; };
    const release = () => { if (layer.current) layer.current.dataset['pressed'] = 'false'; };
    const leave = (e: PointerEvent) => { if (!e.relatedTarget) hide(); };
    const visibility = () => { if (document.hidden) hide(); };
    const selection = () => { if (window.getSelection()?.isCollapsed === false) hide(); };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', press, { passive: true });
    window.addEventListener('pointerup', release, { passive: true });
    window.addEventListener('pointerout', leave);
    window.addEventListener('blur', hide);
    window.addEventListener('scroll', hide, { passive: true, capture: true });
    document.addEventListener('visibilitychange', visibility);
    document.addEventListener('selectionchange', selection);
    media.addEventListener('change', hide);
    return () => {
      hide();
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointerout', leave);
      window.removeEventListener('blur', hide);
      window.removeEventListener('scroll', hide, true);
      document.removeEventListener('visibilitychange', visibility);
      document.removeEventListener('selectionchange', selection);
      media.removeEventListener('change', hide);
    };
  }, []);
  return (
    <div ref={layer} className="cursor-follower" aria-hidden="true">
      <div ref={ring} className="cursor-follower-ring"><div className="cursor-follower-ring-outline" /></div>
      <div className="cursor-follower-mark" />
    </div>
  );
}
