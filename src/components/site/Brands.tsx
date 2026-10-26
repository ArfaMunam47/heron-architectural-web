import { useState } from "react";
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
  const shown = Array.from({ length: 6 }, (_, k) => brands[(k + off) % brands.length]).filter(b => b !== undefined);
  return (
    <div className="grid grid-cols-[40px_minmax(0,1fr)_minmax(0,1fr)_40px] border-t border-border sm:grid-cols-[40px_repeat(3,minmax(0,1fr))_40px] lg:grid-cols-[44px_repeat(6,minmax(0,1fr))_44px]">
      <Button variant="ghost" aria-label="Previous sample brands" title="Previous sample brands" onClick={() => setOff((o) => (o + brands.length - 1) % brands.length)} className="h-20 p-0 text-muted-foreground hover:text-primary"><ArrowLeft /></Button>
      {shown.map((b, k) => (
        <div key={b.n + k} className={`h-20 min-w-0 flex-col items-center justify-center gap-0.5 border-l border-border px-1 text-foreground/80 fade-in ${k < 2 ? 'flex' : k === 2 ? 'hidden sm:flex' : 'hidden lg:flex'}`}>
          <Mark i={(k + off) % brands.length} />
          <span className="max-w-full text-center text-[10px] font-bold">{b.n}</span>
          {b.s && <span className="text-center text-[6px] text-muted-foreground">{b.s}</span>}
        </div>
      ))}
      <Button variant="ghost" aria-label="Next sample brands" title="Next sample brands" onClick={() => setOff((o) => (o + 1) % brands.length)} className="h-20 border-l border-border p-0 text-muted-foreground hover:text-primary"><ArrowRight /></Button>
    </div>
  );
}
