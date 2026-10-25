import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { HeroStage } from "@/components/site/HeroStage";
import { DiscoverMore, Reveal, Ticker } from "@/components/site/Bits";
import { LogoMark } from "@/components/site/Logo";
import { HomeStory } from "@/components/site/Story";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Heron AI — An AI agent that works inside your design tools" },
      { name: "description", content: "Heron reviews your model, identifies issues and proposes solutions. Upon approval, it edits automatically." },
      { property: "og:title", content: "Heron AI — An AI agent inside your design tools" },
      { property: "og:description", content: "Heron reviews your model, identifies issues and edits automatically on approval." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <main>
        <HeroStage />
        <section className="grid border-t border-border md:grid-cols-[1.15fr_0.65fr_0.2fr]">
          <h1 className="display p-4 text-[clamp(1.8rem,3.4vw,3.6rem)] md:pt-3">
            <Reveal>An AI agent that works</Reveal>
            <Reveal delay={120}>inside your design tools</Reveal>
          </h1>
          <div className="flex flex-col border-l border-border">
            <p className="flex-1 p-2 text-[13px] leading-snug fade-in [animation-delay:400ms]">
              Heron reviews your model, identifies issues, and proposes solutions. Upon approval, it edits automatically. This concept crafted by <a className="font-semibold underline" href="https://bearplus.com" target="_blank" rel="noreferrer">Bearplus agency</a>, the award-winning design agency.
            </p>
          </div>
          <div className="border-l border-border"><DiscoverMore to="/heron-chat-widget" /></div>
        </section>
        <Ticker />

        <section className="grid border-t border-border md:grid-cols-2">
          <div className="flex flex-col justify-end p-4">
            <h2 className="display text-[clamp(1.8rem,3vw,2.8rem)]">Designed<br />by Bearplus,<br />the award-winning<br />design agency</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 border-l border-border p-4 font-mono text-[9px] uppercase leading-relaxed text-muted-foreground">
            <dl className="space-y-1">
              <div className="text-foreground">Welcome to Heron AI</div>
              <div className="grid grid-cols-[64px_1fr]"><dt>Type</dt><dd>: Technology/AI software company</dd></div>
              <div className="grid grid-cols-[64px_1fr]"><dt>Founded</dt><dd>: 2026</dd></div>
              <div className="grid grid-cols-[64px_1fr]"><dt>Focus</dt><dd>: AI-powered building code compliance for architects (BIM / Revit integration)</dd></div>
              <div className="grid grid-cols-[64px_1fr]"><dt>Location</dt><dd>: 1601 California St. Suite 2400, Denver, CO 80202</dd></div>
            </dl>
            <ol className="space-y-0.5">
              {["Initialize core system", "Load AI models", "Configure data pipelines", "Sync distributed nodes", "Validate input streams", "Optimize inference engine", "Deploy test environment", "Enable real-time processing"].map((s, i) => (
                <li key={s} className="fade-in" style={{ animationDelay: `${i * 140}ms` }}>{String(i + 1).padStart(3, "0")} {s}</li>
              ))}
            </ol>
          </div>
        </section>

        <HomeStory />
      </main>
    </>
  );
}
