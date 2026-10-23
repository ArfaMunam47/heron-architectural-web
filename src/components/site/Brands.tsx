import { useState } from "react";

const brands = [
  { n: "VANTAR", s: "" },
  { n: "NORTHLINE", s: "CAD SOLUTIONS" },
  { n: "MERIDIAN", s: "" },
  { n: "ORIONIX", s: "SYSTEMS" },
  { n: "FJORD & CO.", s: "ARCHITECTS" },
  { n: "BLUEPRINT NEXUS", s: "" },
  { n: "CASCADE", s: "ENGINEERING GROUP" },
  { n: "ARAVEL", s: "INTERIORS" },
];

function Mark({ i }: { i: number }) {
  const shapes = [
    <path key="a" d="M4 4 L12 20 L20 4 M9 4 L12 10 L15 4" />,
    <path key="b" d="M4 20 V4 L20 20 V4" />,
    <path key="c" d="M3 20 V5 L12 14 L21 5 V20" />,
    <path key="d" d="M5 16 a7 7 0 0 1 14 0 M9 16 v-3 h6 v3" />,
    <path key="e" d="M3 19 L10 6 L14 13 L16 9 L21 19 Z" />,
    <path key="f" d="M5 20 V4 L19 20 V4" strokeWidth="4" />,
    <path key="g" d="M4 8 L12 4 L20 8 V16 L12 20 L4 16 Z M8 10 V14" />,
    <path key="h" d="M12 3 L5 20 M12 3 L19 20 M8 14 H16" />,
  ];
  return <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">{shapes[i % shapes.length]}</svg>;
}

export function Brands() {
  const [off, setOff] = useState(0);
  const shown = Array.from({ length: 6 }, (_, k) => brands[(k + off) % brands.length]);
  return (
    <div className="grid grid-cols-[44px_repeat(6,1fr)_44px] border-t border-border">
      <button aria-label="Previous" onClick={() => setOff((o) => (o + brands.length - 1) % brands.length)} className="flex items-center justify-center text-muted-foreground transition-colors hover:text-primary">←</button>
      {shown.map((b, k) => (
        <div key={b.n + k} className="flex h-20 flex-col items-center justify-center gap-0.5 border-l border-border text-foreground/80 fade-in transition-colors hover:text-primary">
          <Mark i={(k + off) % brands.length} />
          <span className="text-[11px] font-bold tracking-[0.15em]">{b.n}</span>
          {b.s && <span className="text-[6px] tracking-[0.3em] text-muted-foreground">{b.s}</span>}
        </div>
      ))}
      <button aria-label="Next" onClick={() => setOff((o) => (o + 1) % brands.length)} className="flex items-center justify-center border-l border-border text-muted-foreground transition-colors hover:text-primary">→</button>
    </div>
  );
}
