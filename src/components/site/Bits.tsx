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

export function DiscoverMore({ to = "/pricing" }: { to?: "/pricing" | "/heron-dashboard" | "/heron-chat-widget" | "/about-us" }) {
  return (
    <Link to={to} className="group relative flex h-full min-h-20 flex-col justify-between p-2 label text-primary transition-[color,font-weight] duration-300 hover:font-bold hover:text-foreground focus-visible:font-bold focus-visible:text-foreground focus-visible:outline-offset-[-3px]">
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 dither" />
      <span className="relative">Discover more</span>
      <span className="relative self-end transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1">→</span>
    </Link>
  );
}

export function BackToDashboard() {
  return (
    <Link to="/heron-dashboard" className="group inline-flex items-center gap-1.5 label text-primary transition-[color,font-weight] duration-300 hover:font-bold hover:text-foreground focus-visible:font-bold focus-visible:text-foreground">
      <span className="transition-transform duration-300 group-hover:-translate-x-0.5">←</span>
      <span>Back to dashboard</span>
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
    <aside aria-label="Award: Site of the Day" className="fixed bottom-4 right-3 z-30 flex w-8 flex-col items-stretch border border-foreground bg-background md:bottom-auto md:right-3 md:top-1/2 md:w-9 md:-translate-y-1/2">
      <span className="flex h-8 items-center justify-center bg-primary text-[12px] font-bold text-primary-foreground md:h-9">W.</span>
      <span className="hidden items-center justify-center px-1 py-3 text-[9px] font-semibold uppercase tracking-[0.08em] [writing-mode:vertical-rl] rotate-180 md:flex">Site of the Day</span>
    </aside>
  );
}
