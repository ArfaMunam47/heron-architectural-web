import { createFileRoute, useLocation, useNavigate } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Plus } from "@/components/site/Bits";
import a1 from "@/assets/art1.jpg";
import a2 from "@/assets/art2.jpg";
import a3 from "@/assets/art3.jpg";
import a4 from "@/assets/art4.jpg";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Insights on AI and architecture | Heron AI" },
      { name: "description", content: "Insights, AI practices and design workflows from the Heron team." },
      { property: "og:title", content: "Heron AI Resources" },
      { property: "og:description", content: "Insights, AI practices and design workflows." },
    ],
  }),
  component: Resources,
});

type Cat = "insights" | "ai-practices" | "design-workflows";
const posts: { t: string; d: string; date: string; img: string; cat: Cat; flip?: boolean }[] = [
  { t: "The difference between a tool and a teammate", d: "Most software waits to be used. The most useful kind pays attention even when nobody asked it to.", date: "31 July 2026", img: a1, cat: "insights" },
  { t: "Why the best AI feels invisible", d: "The AI tools people talk about the most are rarely the ones doing the most useful work.", date: "30 July 2026", img: a2, cat: "insights" },
  { t: "The hidden cost of repetitive modelling", d: "The busywork that never shows up on a timesheet is quietly costing firms more than they think.", date: "29 July 2026", img: a3, cat: "insights" },
  { t: "AI doesn't replace architects. It removes the busywork", d: "The debate about AI taking over design misses what's actually on the table: not the design, but everything around it.", date: "28 July 2026", img: a4, cat: "insights" },
  { t: "Code compliance as a background process", d: "What changes when every model is checked continuously instead of at the deadline.", date: "27 July 2026", img: a2, cat: "ai-practices", flip: true },
  { t: "Approvals, not autopilot", d: "Why keeping the architect in the loop is the feature, not the limitation.", date: "26 July 2026", img: a1, cat: "ai-practices", flip: true },
  { t: "Naming standards that survive a project", d: "A practical workflow for keeping families and rooms consistent across teams.", date: "25 July 2026", img: a4, cat: "design-workflows", flip: true },
  { t: "From markup to model in one step", d: "Turning review comments directly into edits.", date: "24 July 2026", img: a3, cat: "design-workflows", flip: true },
];
const tabs: { k: Cat | "all"; l: string }[] = [
  { k: "all", l: "All" }, { k: "insights", l: "Insights" }, { k: "ai-practices", l: "AI Practices" }, { k: "design-workflows", l: "Design Workflows" },
];

function Resources() {
  const { hash } = useLocation();
  const nav = useNavigate();
  const active = (tabs.find((t) => t.k === hash)?.k ?? "all") as Cat | "all";
  const list = posts.filter((p) => active === "all" || p.cat === active);
  return (
    <>
      <Header compact />
      <main>
        <div className="h-8" />
        <div className="flex justify-center gap-8 border-y border-border py-2">
          {tabs.map((t) => (
            <button key={t.k} onClick={() => nav({ to: "/resources", hash: t.k === "all" ? "" : t.k })} className={`label transition-colors ${active === t.k ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              {t.l}<sup className="ml-0.5 text-[7px]">[{t.k === "all" ? posts.length : posts.filter((p) => p.cat === t.k).length}]</sup>
            </button>
          ))}
        </div>
        <div key={active} className="grid sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p, i) => (
            <article key={p.t} className="group relative -mb-px -mr-px cursor-pointer border-b border-r border-border p-2 transition-colors duration-300 hover:bg-ink hover:text-ink-foreground fade-in" style={{ animationDelay: `${i * 80}ms` }}>
              <Plus className="left-1 top-1 opacity-0 group-hover:opacity-100" />
              <Plus className="right-1 top-1 opacity-0 group-hover:opacity-100" />
              <div className="overflow-hidden">
                <img src={p.img} width={912} height={736} loading="lazy" alt="" className={`aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${p.flip ? "-scale-x-100 group-hover:-scale-x-[1.04]" : ""}`} />
              </div>
              <p className="mt-4 font-mono text-[7px] uppercase text-muted-foreground group-hover:text-ink-foreground/70">{p.cat.replace("-", " ")} | {p.date}</p>
              <h2 className="display mt-1 line-clamp-2 text-[17px] leading-none tracking-[-0.03em]">{p.t}</h2>
              <p className="mt-1.5 line-clamp-2 text-[10px] leading-tight opacity-75">{p.d}</p>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
