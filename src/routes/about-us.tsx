import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { Header } from "@/components/site/Header";
import { Corners, Reveal } from "@/components/site/Bits";
import workflow from "@/assets/art-workflow.jpg";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About — Heron AI" },
      { name: "description", content: "Heron AI helps architects catch building-code issues and clear repetitive model upkeep through a reviewed AI workflow." },
      { property: "og:title", content: "About Heron AI — Less busywork. More building." },
      { property: "og:description", content: "An AI agent that inspects your model, proposes corrections and applies them only after you approve." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

/** Adds data-in="true" once the element scrolls into view; drives the draw reveals. */
function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView] as const;
}

function Draw({ on, d, delay = 0, w = 1.5, color = "var(--foreground)" }: { on: boolean; d: string; delay?: number; w?: number; color?: string }) {
  return <path d={d} pathLength={1} stroke={color} strokeWidth={w} fill="none" className={on ? "draw-line" : "opacity-0"} style={{ animationDelay: `${delay}ms` }} />;
}

function HeroDrawing() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" fill="none" strokeLinejoin="round" role="img" aria-label="Line drawing of a building section with a flagged element">
      {Array.from({ length: 9 }, (_, i) => <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" stroke="var(--line)" />)}
      {Array.from({ length: 9 }, (_, i) => <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="var(--line)" />)}
      <Draw on d="M60 340 V140 L200 70 L340 140 V340 Z" w={3} />
      <Draw on d="M60 240 H340 M200 70 V340 M130 340 V270 H170 V340" delay={400} />
      <Draw on d="M240 170 H300 V215 H240 Z M90 170 H150 V215 H90 Z" delay={700} />
      <rect x="240" y="270" width="60" height="70" fill="var(--primary)" className="fade-in [animation-delay:1400ms]" />
      <Draw on d="M300 270 L360 220 H392" delay={1600} w={1} color="var(--primary)" />
      <text x="330" y="212" className="label" fill="var(--primary)" fontSize="10">DOOR D-14</text>
      <Draw on d="M60 365 H340 M60 358 V372 M340 358 V372" delay={900} w={1} />
      <text x="178" y="390" fontSize="9" fill="var(--muted-foreground)" fontFamily="var(--font-mono)">28 400 MM</text>
    </svg>
  );
}

const steps: { n: string; title: string; label: string; copy: string; art: (on: boolean) => ReactNode }[] = [
  { n: "01", title: "Inspect the model", label: "READ / BIM", copy: "Heron reads geometry, levels and parameters directly inside your design tool.", art: (on) => <><Draw on={on} d="M20 100 V40 L60 20 L100 40 V100 Z" /><Draw on={on} d="M20 40 L60 60 L100 40 M60 60 V100" delay={300} w={1} /><Draw on={on} d="M10 10 H110" delay={500} w={1} color="var(--primary)" /></> },
  { n: "02", title: "Identify an issue", label: "FLAG / CODE", copy: "Elements that conflict with the rules you set are flagged and located on plan.", art: (on) => <><Draw on={on} d="M15 15 H105 V105 H15 Z" w={1} /><Draw on={on} d="M15 60 H105 M60 15 V105" delay={200} w={1} /><circle cx="82" cy="38" r="14" stroke="var(--primary)" strokeWidth="2" className={on ? "fade-in [animation-delay:700ms]" : "opacity-0"} /></> },
  { n: "03", title: "Review the correction", label: "COMPARE / DIFF", copy: "Each proposal shows the current state beside the suggested change, nothing hidden.", art: (on) => <><Draw on={on} d="M10 30 H52 V90 H10 Z" w={1} /><Draw on={on} d="M68 30 H110 V90 H68 Z" delay={250} /><rect x="76" y="56" width="26" height="26" fill="var(--primary)" className={on ? "fade-in [animation-delay:800ms]" : "opacity-0"} /><Draw on={on} d="M54 60 H66" delay={500} w={1} /></> },
  { n: "04", title: "Approve the change", label: "APPLY / LOG", copy: "Nothing is edited until you say yes. Every applied change stays on the record.", art: (on) => <><Draw on={on} d="M20 20 H100 V100 H20 Z" w={1} /><Draw on={on} d="M38 62 L54 78 L84 42" delay={300} w={3} color="var(--primary)" /></> },
];

function Step({ s, i }: { s: (typeof steps)[number]; i: number }) {
  const [ref, on] = useInView<HTMLLIElement>();
  return (
    <li ref={ref} className={`grid border-t border-border md:grid-cols-[120px_1fr_1fr_200px] ${i % 2 ? "md:bg-card" : ""}`}>
      <span style={{ "--editorial-size": "4.5rem" } as React.CSSProperties} className="display p-4 text-6xl text-primary md:text-7xl">{s.n}</span>
      <h3 style={{ "--editorial-size": "1.9rem" } as React.CSSProperties} className="display self-end p-4 text-2xl md:border-l md:border-border md:text-3xl">{s.title}</h3>
      <div className="flex flex-col justify-between gap-4 p-4 md:border-l md:border-border">
        <span className="label text-muted-foreground">{s.label}</span>
        <p className="max-w-xs text-[14px] leading-snug">{s.copy}</p>
      </div>
      <svg viewBox="0 0 120 120" className="h-36 w-full border-t border-border p-4 md:h-auto md:border-l md:border-t-0" strokeLinejoin="round" aria-hidden="true">{s.art(on)}</svg>
    </li>
  );
}

function Centerpiece() {
  const [ref, on] = useInView<HTMLDivElement>();
  return (
    <section className="relative border-t border-border">
      <div className="flex items-center justify-between border-b border-border px-4 py-2 label text-muted-foreground"><span>Plate 04 — Exploded study</span><span>Scale 1:200</span></div>
      <div ref={ref} className="relative grid md:grid-cols-[1fr_1.4fr]">
        <div className="relative aspect-square overflow-hidden border-b border-border md:border-b-0 md:border-r">
          <img src={workflow} alt="Exploded axonometric model with separated floor plates" loading="lazy" width={1200} height={912} className={`h-full w-full object-cover grayscale transition-[clip-path] duration-[1600ms] ease-[var(--ease-arch)] ${on ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]"}`} />
          <div className={`absolute bottom-[12%] right-[10%] h-[22%] w-[22%] bg-primary mix-blend-multiply transition-transform duration-[1200ms] ease-[var(--ease-arch)] [transition-delay:600ms] ${on ? "scale-100" : "scale-0"}`} />
        </div>
        <div className="grid min-h-[320px] grid-rows-[minmax(240px,1fr)_auto]">
          <div className="relative min-h-0">
          <svg viewBox="0 0 600 420" className="absolute inset-0 h-full w-full" strokeLinejoin="round" aria-hidden="true" data-sheet-wireframe>
            {Array.from({ length: 13 }, (_, i) => <line key={i} x1={i * 50} y1="0" x2={i * 50} y2="420" stroke="var(--line)" />)}
            <Draw on={on} d="M80 330 L300 220 L520 330 L300 400 Z" w={2} />
            <Draw on={on} d="M80 250 L300 140 L520 250 L300 320 Z" delay={250} w={2} />
            <Draw on={on} d="M80 170 L300 60 L520 170 L300 240 Z" delay={500} w={2} />
            <Draw on={on} d="M80 170 V330 M300 240 V400 M520 170 V330 M300 60 V140" delay={800} w={1} />
            <Draw on={on} d="M300 140 L360 110 L420 140 L360 170 Z" delay={1100} w={2} color="var(--primary)" />
            <Draw on={on} d="M420 140 L560 80" delay={1300} w={1} color="var(--primary)" />
          </svg>
          <span className="absolute right-4 top-[14%] label text-primary">Flag — stair core clearance</span>
          </div>
          <p style={{ "--editorial-size": "clamp(1.6rem,3.2vw,3rem)" } as React.CSSProperties} className="display border-t border-border bg-background p-4 text-[clamp(1.6rem,3.2vw,3rem)]" data-sheet-headline>Every floor,<br />checked.</p>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <>
      <Header />
      <main>
        <section className="relative grid border-b border-border md:grid-cols-[1.3fr_1fr]">
          <Corners />
          <div className="flex flex-col justify-between gap-10 p-6 pt-10 md:p-8 md:pt-14">
            <p className="label text-muted-foreground">About Heron AI / Sheet A-000</p>
            <h1 style={{ "--editorial-size": "clamp(4rem,8vw,7.5rem)" } as React.CSSProperties} className="display text-[clamp(2.8rem,8vw,7.5rem)]">
              <Reveal>Less</Reveal><Reveal delay={120}>busywork.</Reveal><Reveal delay={240}><span className="text-primary">More</span></Reveal><Reveal delay={360}>building.</Reveal>
            </h1>
            <div className="grid grid-cols-2 border-t border-border pt-3 label text-muted-foreground">
              <span>Agent inside BIM &amp; Revit</span><span>Reviews · Proposes · Waits for yes</span>
            </div>
          </div>
          <div className="aspect-square border-t border-border p-4 md:aspect-auto md:border-l md:border-t-0"><HeroDrawing /></div>
        </section>

        <section className="grid md:grid-cols-[1fr_1fr]">
          <h2 style={{ "--editorial-size": "clamp(2rem,3.6vw,3.6rem)" } as React.CSSProperties} className="display p-6 text-[clamp(1.8rem,4vw,3.6rem)] md:p-8">An extra set of eyes on the model — that never edits without asking.</h2>
          <div className="grid border-t border-border md:border-l md:border-t-0">
            <p className="p-6 text-[15px] leading-snug md:p-8">Heron AI helps architects and design professionals find building-code compliance issues and handle repetitive model-maintenance tasks. It works inside the tools you already use, proposes each fix, and applies it only once you approve.</p>
            <dl className="grid grid-cols-2 border-t border-border">
              {[["Finds", "Code conflicts"], ["Handles", "Model upkeep"], ["Shows", "Before / after"], ["Waits", "For your approval"]].map(([k, v], i) => (
                <div key={k} className={`p-4 ${i % 2 ? "border-l border-border" : ""} ${i > 1 ? "border-t border-border" : ""}`}><dt className="label text-primary">{k}</dt><dd className="mt-2 text-[14px] font-semibold">{v}</dd></div>
              ))}
            </dl>
          </div>
        </section>

        <section className="border-t border-border">
          <div className="flex flex-wrap items-end justify-between gap-4 p-6 md:p-8"><h2 style={{ "--editorial-size": "3rem" } as React.CSSProperties} className="display text-3xl md:text-5xl">Four steps,<br />one approval.</h2><span className="label text-muted-foreground">Process / General workflow</span></div>
          <ol>{steps.map((s, i) => <Step key={s.n} s={s} i={i} />)}</ol>
        </section>

        <Centerpiece />

        <section className="grid border-t border-border md:grid-cols-[2fr_1fr]">
          <div className="p-6 md:p-8"><p className="label mb-4 text-primary">Next sheet</p><h2 style={{ "--editorial-size": "clamp(2.4rem,4.6vw,4.5rem)" } as React.CSSProperties} className="display text-[clamp(2rem,5vw,4.5rem)]">Hand over the busywork.<br />Keep the design.</h2></div>
          <div className="grid border-t border-border md:border-l md:border-t-0">
            <Link to="/heron-dashboard" className="group flex items-center justify-between p-4 label text-primary transition-colors hover:bg-primary hover:text-primary-foreground">See the dashboard demo <span className="transition-transform group-hover:translate-x-1">→</span></Link>
            <Link to="/pricing" className="group flex items-center justify-between border-t border-border p-4 label transition-colors hover:bg-ink hover:text-ink-foreground">View pricing <span className="transition-transform group-hover:translate-x-1">→</span></Link>
            <Link to="/contact-us" className="group flex items-center justify-between border-t border-border p-4 label transition-colors hover:bg-ink hover:text-ink-foreground">Contact us <span className="transition-transform group-hover:translate-x-1">→</span></Link>
          </div>
        </section>
      </main>
    </>
  );
}
