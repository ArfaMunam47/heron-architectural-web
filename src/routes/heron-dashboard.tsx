import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Brands } from "@/components/site/Brands";
import { DiscoverMore, Reveal } from "@/components/site/Bits";
import landscape from "@/assets/landscape.jpg";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { TaskDemo } from "@/components/site/TaskDemo";

export const Route = createFileRoute("/heron-dashboard")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Heron Dashboard — Every change, flag and approval in one place" },
      { name: "description", content: "See what the agent is doing across all your projects: issues flagged, edits made, and approvals waiting." },
      { property: "og:title", content: "Heron Dashboard" },
      { property: "og:description", content: "Every change, flag, and approval in one place." },
    ],
  }),
  component: Dashboard,
});

const stats = [["Active", "8"], ["Pending", "4"], ["Model health", "94%"], ["Time saved", "16.8h"]];
const activity = ["Duplicate wall types detected", "Door family missing parameter", "Unused families found", "Naming standards passed"];
const pending = ["Rename 284 rooms", "Merge 17 duplicate families", "Delete 39 unused types"];

function Dashboard() {
  const [review, setReview] = useState<string | null>(null);
  const [approved, setApproved] = useState<string[]>([]);
  return (
    <>
      <Header />
      <main>
        <section className="grid min-h-[calc(100vh-7.5rem)] md:grid-cols-2">
          <div className="flex flex-col">
            <div className="flex-1 p-4">
              <p className="label text-muted-foreground fade-in">Your view over everything Heron does</p>
              <h1 className="display mt-2 text-[clamp(2rem,3.6vw,3.6rem)]">
                <Reveal>See every</Reveal><Reveal delay={80}>change, flag,</Reveal><Reveal delay={160}>and approval in</Reveal><Reveal delay={240}>one place</Reveal>
              </h1>
            </div>
            <div className="grid grid-cols-[1.4fr_1fr] border-t border-border">
              <p className="p-4 text-[15px] leading-snug">Heron Dashboard shows you what the agent is doing across all your projects: the issues it's flagged, the edits it's made, and what's waiting for your approval.</p>
              <div className="border-l border-border"><DiscoverMore to="/pricing" /></div>
            </div>
          </div>
          <div className="relative min-h-[420px] overflow-hidden border-l border-border">
            <img src={landscape} width={1200} height={1008} alt="Black and white mountain valley" className="absolute inset-x-0 bottom-0 h-1/2 w-full object-cover grayscale" loading="lazy" />
            <div className="relative mx-auto mt-8 w-[66%] min-w-72 border border-border bg-background p-2 fade-in [animation-delay:300ms]">
              <div className="grid grid-cols-4 gap-1.5">
                {stats.map(([k, v]) => (
                  <div key={k} className="relative border border-border p-1.5">
                    <span className="absolute right-1 top-1 h-1.5 w-1.5 bg-primary" />
                    <div className="font-mono text-[6px] uppercase text-muted-foreground">{k}</div>
                    <div className="mt-2 text-sm font-semibold">{v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-2 h-1 bg-ink" />
              <p className="mt-2 text-[8px] font-semibold uppercase">Welcome back, David</p>
              <div className="mt-3 flex justify-between text-[8px] font-bold uppercase"><span>AI Activity</span><span className="font-mono text-primary">View all</span></div>
              <ul className="mt-1">
                {activity.map((a, i) => (
                  <li key={a} className="flex items-center gap-2 border-b border-border py-1.5 fade-in" style={{ animationDelay: `${600 + i * 150}ms` }}>
                    <span className="flex h-5 w-5 items-center justify-center border border-border text-[8px] text-primary">◇</span>
                    <span className="text-[7px] font-semibold uppercase">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative z-10 mx-auto my-6 w-[86%] border border-ink bg-background fade-in [animation-delay:900ms] md:absolute md:bottom-[14%] md:right-[8%] md:m-0 md:w-[38%] md:min-w-52">
              <div className="flex justify-between bg-ink px-2 py-1 font-mono text-[7px] uppercase text-ink-foreground"><span>Pending approval (3)</span><span>View all</span></div>
              {pending.map((p) => (
                <div key={p} className="flex items-center justify-between border-b border-border px-2 py-2">
                  <span className="text-[7px] font-bold uppercase">{p}</span>
                  <Button size="sm" disabled={approved.includes(p)} onClick={() => setReview(p)} className="h-7 px-2 font-mono text-[9px] uppercase shadow-none">{approved.includes(p) ? "Approved" : "Review →"}</Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Brands />
        <TaskDemo />
        <Dialog open={review !== null} onOpenChange={open => { if (!open) setReview(null); }}>
          <DialogContent className="max-w-[calc(100%-2rem)] shadow-none sm:max-w-lg">
            <p className="label text-primary">Illustrative approval / Sample model</p>
            <DialogTitle className="display pr-6 text-2xl">{review}</DialogTitle>
            <DialogDescription>This is a simulated review. Approving updates this preview only; no real model is changed.</DialogDescription>
            <div className="grid grid-cols-2 border-y border-border text-sm"><div className="p-4"><p className="label text-muted-foreground">Before</p><p className="mt-3">{review?.startsWith('Rename') ? 'Mixed room names' : review?.startsWith('Merge') ? 'Repeated family definitions' : 'Unreferenced types'}</p></div><div className="border-l border-border p-4"><p className="label text-primary">Proposed</p><p className="mt-3">{review?.startsWith('Rename') ? 'Consistent project naming' : review?.startsWith('Merge') ? 'One definition per family' : 'Remove unused types'}</p></div></div>
            <Button onClick={() => { if (review) setApproved(a => [...a, review]); setReview(null); }} className="label shadow-none">Approve sample change →</Button>
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
}
