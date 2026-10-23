import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Reveal } from "@/components/site/Bits";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Heron AI" },
      { name: "description", content: "Start free, then let Heron work inside your tools. Move up, down, or cancel whenever you like." },
      { property: "og:title", content: "Pricing — Pay for the hours you get back" },
      { property: "og:description", content: "Free, Standard, Business and Enterprise plans for Heron AI." },
    ],
  }),
  component: Pricing,
});

const plans = [
  { n: "Free", d: "For individuals exploring Heron's chat and suggestions.", m: 0, cta: "Get started", dark: false },
  { n: "Standard", d: "For individuals and small firms ready to let Heron edit inside Revit.", m: 99, cta: "Contact us", dark: false },
  { n: "Business", d: "For medium firms and collaborative, multi-office teams.", m: 295, cta: "Contact us", dark: true },
  { n: "Enterprise", d: "For large firms, universities, and multi-office deployments.", m: null, cta: "Contact us", dark: false },
];
const rows: [string, (string | boolean)[]][] = [
  ["Chat widget: ask about your model", [true, true, true, true]],
  ["Projects", ["1 project", "Unlimited", "Unlimited", "Unlimited"]],
  ["In-tool agent in Revit", [false, true, true, true]],
  ["Dashboard & approvals", [false, true, true, true]],
  ["Seats", ["1", "Up to 5", "Up to 50", "Custom"]],
  ["SSO & audit log", [false, false, true, true]],
  ["Support", ["Community", "Email", "Priority", "Dedicated"]],
];

function Pricing() {
  const [yearly, setYearly] = useState(false);
  return (
    <>
      <Header />
      <main>
        <section className="grid md:grid-cols-[1fr_3fr]">
          <div className="hidden md:block" />
          <div className="border-l border-border px-4 pb-8 pt-12 text-center">
            <h1 className="display text-[clamp(2rem,3.8vw,3.6rem)]"><Reveal>Pay for the hours</Reveal><Reveal delay={120}>you get back</Reveal></h1>
            <p className="mt-3 text-[15px] fade-in [animation-delay:400ms]">Start free, then let Heron work inside your tools. Move up, down, or cancel whenever you like.</p>
          </div>
        </section>
        <div className="grid border-t border-border md:grid-cols-[1fr_3fr]">
          <div className="hidden md:block" />
          <div className="grid grid-cols-2 border-l border-border">
            {[false, true].map((y) => (
              <button key={String(y)} onClick={() => setYearly(y)} className={`py-2 label transition-colors ${yearly === y ? "bg-ink text-ink-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {y ? <><span className="text-primary">✦</span> Yearly (save 15%)</> : "Monthly"}
              </button>
            ))}
          </div>
        </div>
        <div className="grid border-t border-border md:grid-cols-[1fr_repeat(4,0.75fr)]">
          <div className="hidden md:block" />
          {plans.map((p, i) => (
            <div key={p.n} className="flex flex-col border-l border-border p-4 fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <span className="text-[11px] font-bold uppercase">{p.n}</span>
              <span className="mt-1 min-h-8 text-[10px] leading-tight text-muted-foreground">{p.d}</span>
              <span className="mt-5 text-2xl font-semibold tracking-tight">
                {p.m === null ? "CUSTOM" : `$${yearly ? Math.round(p.m * 0.85) : p.m}`}
                {p.m ? <span className="ml-1 font-mono text-[7px] uppercase">/month</span> : null}
              </span>
              <Link to="/contact-us" className={`group mt-4 flex items-center justify-between px-2 py-2 label transition-colors ${p.dark ? "bg-ink text-ink-foreground hover:bg-primary" : "bg-primary text-primary-foreground hover:bg-ink"}`}>
                {p.cta}<span className="border-l border-current/30 pl-2 transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          ))}
        </div>
        {rows.map(([k, vals]) => (
          <div key={k} className="grid border-t border-border md:grid-cols-[1fr_repeat(4,0.75fr)]">
            <div className="p-4 text-[12px]">{k}</div>
            {vals.map((v, i) => (
              <div key={i} className="border-l border-border p-4 text-[12px]">
                {v === true ? <span className="inline-flex h-3 w-3 items-center justify-center bg-muted-foreground text-[8px] text-background">✓</span> : v === false ? <span className="text-muted-foreground">—</span> : v}
              </div>
            ))}
          </div>
        ))}
      </main>
    </>
  );
}
