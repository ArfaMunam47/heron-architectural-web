import { useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

/** Sparse grid-panel wipe that plays on every route change. */
export function RouteTransition() {
  const { pathname } = useLocation();
  const first = useRef(true);
  const sequence = useRef(0);
  const [k, setK] = useState(0);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    sequence.current += 1;
    setK(sequence.current);
    const timer = window.setTimeout(() => setK(0), 1150);
    return () => window.clearTimeout(timer);
  }, [pathname]);
  if (k === 0) return null;
  return (
    <div key={k} data-route-transition className="pointer-events-none fixed inset-x-0 bottom-0 top-10 z-50 grid grid-cols-5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="relative border-l border-border">
          <div className="absolute inset-0 bg-background" style={{ animation: `wipe-down 900ms var(--ease-arch) ${i * 50}ms both` }} />
          {i === 2 && <div className="absolute left-0 top-[42%] h-6 w-1/2 bg-ink" style={{ animation: `fade-in 300ms ease both, wipe-down 900ms var(--ease-arch) both` }} />}
        </div>
      ))}
    </div>
  );
}
