import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function Plus({ className = "" }: { className?: string }) {
  return <span className={`pointer-events-none absolute text-[11px] leading-none text-muted-foreground ${className}`}>+</span>;
}

export function Corners() {
  return (
    <>
      <Plus className="left-2 top-1.5" />
      <Plus className="right-2 top-1.5" />
      <Plus className="bottom-1.5 left-2" />
      <Plus className="bottom-1.5 right-2" />
    </>
  );
}

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <span className="block rise" style={{ animationDelay: `${delay}ms` }}>{children}</span>
    </span>
  );
}

export function DiscoverMore({ to = "/pricing" }: { to?: "/pricing" | "/heron-dashboard" | "/heron-chat-widget" }) {
  return (
    <Link to={to} className="group relative flex h-full min-h-20 flex-col justify-between p-2 label text-primary">
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dither" />
      <span className="relative">Discover more</span>
      <span className="relative self-end transition-transform group-hover:translate-x-1">→</span>
    </Link>
  );
}

const words = ["Faster iterations", "Fewer mistakes", "Less busywork"];
export function Ticker() {
  const row = [...words, ...words, ...words, ...words];
  return (
    <div className="overflow-hidden border-t border-border py-1.5">
      <div className="flex w-max marquee">
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-1.5 px-2 label text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-full border border-muted-foreground" />{w}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SiteOfTheDay() {
  return (
    <div className="fixed right-0 top-1/3 z-30 hidden w-7 flex-col items-center border border-r-0 border-border bg-background md:flex">
      <span className="flex h-7 w-7 items-center justify-center bg-primary text-[11px] font-bold text-primary-foreground">W.</span>
      <span className="py-2 text-[9px] font-medium [writing-mode:vertical-rl] rotate-180">Site of the Day</span>
    </div>
  );
}
