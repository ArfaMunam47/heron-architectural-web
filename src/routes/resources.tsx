import { createFileRoute, Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Plus } from "@/components/site/Bits";
import { articles, type Category } from "@/lib/articles";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Resources — Insights on AI and architecture | Heron AI" },
      { name: "description", content: "Insights, AI practices and design workflows from the Heron team." },
      { property: "og:title", content: "Heron AI Resources" },
      { property: "og:description", content: "Insights, AI practices and design workflows." },
    ],
  }),
  component: Resources,
});

type Cat = Category;
const posts = articles;
const tabs: { k: Cat | "all"; l: string }[] = [
  { k: "all", l: "All" }, { k: "insights", l: "Insights" }, { k: "ai-practices", l: "AI Practices" }, { k: "design-workflows", l: "Design Workflows" },
];

function Resources() {
  const { hash } = useLocation();
  const nav = useNavigate();
  const active = (tabs.find((t) => t.k === hash)?.k ?? "all") as Cat | "all";
  const list = posts.filter((p) => active === "all" || p.category === active);
  return (
    <>
      <Header compact />
      <main>
        <div className="h-8" />
        <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 border-y border-border py-2">
          {tabs.map((t) => (
            <Button variant="ghost" size="sm" key={t.k} onClick={() => nav({ to: "/resources", hash: t.k === "all" ? "" : t.k })} className={`label transition-colors ${active === t.k ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              {t.l}<sup className="ml-0.5 text-[9px]">[{t.k === "all" ? posts.length : posts.filter((p) => p.category === t.k).length}]</sup>
            </Button>
          ))}
        </div>
        <div key={active} className="grid sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p, i) => (
            <Link to="/resources/$slug" params={{ slug: p.slug }} key={p.slug} className="group relative -mb-px -mr-px cursor-pointer border-b border-r border-border p-2 transition-colors duration-300 hover:bg-ink hover:text-ink-foreground fade-in" style={{ animationDelay: `${i * 80}ms` }}>
              <Plus className="left-1 top-1 opacity-0 group-hover:opacity-100" />
              <Plus className="right-1 top-1 opacity-0 group-hover:opacity-100" />
              <div className="overflow-hidden">
                <img src={p.image} width={912} height={736} loading="lazy" alt="" className={`aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${i % 3 === 1 ? "aspect-[4/5]" : ""}`} />
              </div>
              <p className="mt-4 font-mono text-[9px] uppercase text-muted-foreground group-hover:text-ink-foreground/70">{p.category.replaceAll("-", " ")} / Sample editorial</p>
              <h2 className="display mt-1 line-clamp-2 text-[17px] leading-none ">{p.title}</h2>
              <p className="mt-1.5 line-clamp-2 text-xs leading-snug opacity-75">{p.summary}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
