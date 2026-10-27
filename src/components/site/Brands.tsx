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
  return <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">{shapes[i % shapes.length]}</svg>;
}

/** Single continuous band; the sequence is rendered twice so translateX(-50%) loops without a jump. */
export function Brands() {
  return (
    <div className="relative overflow-hidden border-t border-border" aria-label="Sample brand names">
      <div className="flex w-max marquee [animation-duration:40s] hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => brands.map((b, i) => (
          <div key={`${copy}-${b.n}`} aria-hidden={copy === 1} className="flex h-20 w-[150px] shrink-0 flex-col items-center justify-center gap-0.5 border-r border-border px-2 text-foreground/80 md:w-[190px]">
            <Mark i={i} />
            <span className="text-center text-[10px] font-bold">{b.n}</span>
            {b.s && <span className="text-center text-[6px] text-muted-foreground">{b.s}</span>}
          </div>
        )))}
      </div>
    </div>
  );
}
