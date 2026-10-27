import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/site/Header";
import { Corners } from "@/components/site/Bits";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "About — Heron AI" },
      { name: "description", content: "Heron AI builds an AI agent for architects that works inside BIM and Revit." },
      { property: "og:title", content: "About Heron AI" },
      { property: "og:description", content: "An AI agent for architects, working inside your design tools." },
    ],
  }),
  component: About,
});

/** Geometric logo animation: floor-plan hexagon morphs into the isometric H mark. */
function About() {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setStage(1); return; }
    const id = setInterval(() => setStage((s) => (s + 1) % 2), 4200);
    return () => clearInterval(id);
  }, []);
  return (
    <>
      <Header />
      <main className="relative flex min-h-[calc(100vh-2.5rem)] flex-col">
        <Corners />
        <div className="flex flex-1 items-center justify-center py-16">
          <svg key={stage} viewBox="0 0 300 300" className="h-[min(55vh,420px)] w-auto" fill="none" stroke="var(--foreground)" strokeLinejoin="round">
            {stage === 0 ? (
              <g strokeWidth="5">
                <rect x="70" y="40" width="160" height="200" stroke="var(--border)" strokeWidth="1" pathLength={1} className="draw-line" />
                <path d="M150 50 L230 95 V200 L150 245 L70 200 V95 Z" pathLength={1} className="draw-line" />
                <path d="M70 140 L120 110 M150 50 L185 150 M110 200 L150 160 L230 160" pathLength={1} className="draw-line [animation-delay:400ms]" />
                <rect x="58" y="60" width="44" height="34" fill="var(--primary)" stroke="none" className="fade-in [animation-delay:900ms]" />
                <rect x="210" y="125" width="26" height="22" fill="var(--primary)" stroke="none" className="fade-in [animation-delay:1100ms]" />
                <rect x="120" y="210" width="34" height="28" fill="var(--primary)" stroke="none" className="fade-in [animation-delay:1300ms]" />
                <rect x="50" y="160" width="40" height="12" fill="var(--foreground)" stroke="none" className="fade-in [animation-delay:1500ms]" />
              </g>
            ) : (
              <g strokeWidth="6">
                <path d="M60 90 L130 55 L170 75 V125 L200 110 V60 L240 80 V200 L170 240 V185 L140 200 V255 L60 215 Z" pathLength={1} className="draw-line" />
                <path d="M60 90 L130 125 V255 M130 125 L170 105 M200 110 L240 130 M170 185 L200 170 V110" pathLength={1} className="draw-line [animation-delay:500ms]" />
                <path d="M50 95 L130 50 L250 110 L250 205 L140 265 L50 220 Z" stroke="var(--foreground)" strokeWidth="1" strokeDasharray="3 3" className="fade-in [animation-delay:1200ms]" />
                <path d="M200 140 C 240 120, 270 150, 230 200 S 120 250, 110 200 S 160 120, 200 140" stroke="var(--primary)" strokeWidth="1" pathLength={1} className="draw-line [animation-delay:1400ms] [animation-duration:2.4s]" />
                <rect x="166" y="136" width="7" height="7" fill="var(--primary)" stroke="none" />
              </g>
            )}
          </svg>
        </div>
        <section className="grid border-t border-border md:grid-cols-[1fr_1fr]">
          <h1 className="display p-4 text-[clamp(1.8rem,3vw,2.8rem)]">Built by architects<br />who hated busywork</h1>
          <p className="border-l border-border p-4 text-[14px] leading-snug">Heron is an AI agent for building code compliance and model upkeep. It reads your BIM model, flags what's wrong and fixes it once you say yes — so the hours go back into design.</p>
        </section>
      </main>
    </>
  );
}
