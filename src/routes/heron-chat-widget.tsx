import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/site/Header";
import { Brands } from "@/components/site/Brands";
import { DiscoverMore, Reveal } from "@/components/site/Bits";
import tower from "@/assets/tower.jpg";

export const Route = createFileRoute("/heron-chat-widget")({
  head: () => ({
    meta: [
      { title: "Heron Chat Widget — Ask, and Heron does it for you" },
      { name: "description", content: "Heron Chat sits on top of your design tool. Ask about your model or tell it what to change." },
      { property: "og:title", content: "Heron Chat Widget" },
      { property: "og:description", content: "Ask about your model or tell it what to change — Heron makes the edit once you approve." },
    ],
  }),
  component: ChatPage,
});

const prompt = "How much tempered glass is required on level 4?";

function ChatPage() {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => { i = (i + 1) % (prompt.length + 30); setTyped(prompt.slice(0, Math.min(i, prompt.length))); }, 90);
    return () => clearInterval(id);
  }, []);
  return (
    <>
      <Header />
      <main>
        <section className="grid min-h-[calc(100vh-7.5rem)] md:grid-cols-2">
          <div className="flex flex-col">
            <div className="flex-1 p-4">
              <p className="label text-muted-foreground fade-in">Your AI design agent, right in the tool</p>
              <h1 className="display mt-2 text-[clamp(2rem,3.6vw,3.6rem)]">
                <Reveal>Ask, and Heron</Reveal><Reveal delay={120}>does it for you</Reveal>
              </h1>
            </div>
            <div className="grid grid-cols-[1.4fr_1fr] border-t border-border">
              <p className="p-4 text-[15px] leading-snug">Heron Chat sits on top of your design tool. Ask about your model or tell it what to change, and it makes the edit itself once you approve, without pulling you out of your work.</p>
              <div className="border-l border-border"><DiscoverMore to="/heron-dashboard" /></div>
            </div>
          </div>
          <div className="relative overflow-hidden border-l border-border">
            <img src={tower} width={1200} height={1008} alt="Line-drawn tower on a perspective grid with red geometric shapes" className="h-full w-full object-cover mix-blend-multiply fade-in [animation-duration:1.4s]" />
            <div className="absolute bottom-3 right-3 w-[42%] min-w-56 border-b-4 border-ink bg-background shadow-[0_0_0_1px_var(--color-border)] fade-in [animation-delay:600ms]">
              <div className="bg-ink px-2 py-1.5 label text-ink-foreground">Heron Chat</div>
              <div className="h-40 space-y-2 p-2">
                <div className="ml-auto w-fit max-w-[85%] bg-muted px-2 py-1 text-[10px]">Flag any doors under 900mm on level 2.</div>
                <div className="w-fit max-w-[85%] border-l-2 border-primary px-2 py-1 text-[10px]">Found 3 doors below minimum width. Resize to 920mm? <span className="label text-primary">Approve →</span></div>
              </div>
              <div className="m-2 flex border border-border">
                <span className="flex-1 truncate px-2 py-1.5 font-mono text-[8px] text-muted-foreground">{typed || "Ask me anything about your design ..."}<span className="animate-[blink_1s_steps(1)_infinite]">|</span></span>
                <span className="flex w-6 items-center justify-center border-l border-border text-[9px] text-primary">▶</span>
              </div>
            </div>
          </div>
        </section>
        <Brands />
      </main>
    </>
  );
}
