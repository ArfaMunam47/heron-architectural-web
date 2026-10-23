import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Logo, LogoMark } from "./Logo";

type Item = { label: string; to: string; children?: { label: string; to: string; hash?: string }[] };

const items: Item[] = [
  { label: "Product", to: "/heron-chat-widget", children: [
    { label: "Heron Chat Widget", to: "/heron-chat-widget" },
    { label: "Heron Dashboard", to: "/heron-dashboard" },
  ] },
  { label: "Pricing", to: "/pricing" },
  { label: "Resources", to: "/resources", children: [
    { label: "Insights", to: "/resources", hash: "insights" },
    { label: "AI Practices", to: "/resources", hash: "ai-practices" },
    { label: "Design Workflows", to: "/resources", hash: "design-workflows" },
  ] },
  { label: "About", to: "/about-us" },
];

export function Header({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState<string | null>(null);
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-40 flex h-10 border-b border-border bg-background">
      <Link to="/" className="flex flex-1 items-center px-4" aria-label="Heron AI home">
        {compact ? <LogoMark className="h-7 w-7" /> : <Logo />}
      </Link>
      <nav className="hidden md:flex">
        {items.map((it) => {
          const active = pathname === it.to || it.children?.some((c) => c.to === pathname);
          return (
            <div key={it.label} className="relative" onMouseEnter={() => setOpen(it.label)} onMouseLeave={() => setOpen(null)}>
              <Link
                to={it.to}
                className={`group relative flex h-10 w-[92px] border-l border-border px-1.5 pt-1.5 label transition-colors lg:w-[92px] ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dither" />
                <span className="relative">{it.label}</span>
                {active && <span className="absolute right-2 top-1/2 h-1 w-1 bg-foreground" />}
                {it.children && <span className="absolute bottom-1 right-1 h-1.5 w-1.5 border-b border-r border-muted-foreground" />}
              </Link>
              {it.children && open === it.label && (
                <div className="absolute left-0 top-10 w-[146px] border border-border bg-background fade-in [animation-duration:200ms]">
                  {it.children.map((c) => (
                    <Link
                      key={c.label}
                      to={c.to}
                      hash={c.hash}
                      className="block border-b border-border px-1.5 py-1.5 label text-muted-foreground transition-colors last:border-b-0 hover:bg-ink hover:text-ink-foreground"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        <Link
          to="/contact-us"
          className={`group relative flex h-10 w-[110px] border-l border-border px-1.5 pt-1.5 label transition-colors ${pathname === "/contact-us" ? "bg-primary text-primary-foreground" : "text-primary hover:bg-primary hover:text-primary-foreground"}`}
        >
          Contact Us
          <span className="absolute bottom-1 right-1.5 text-[11px] transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </nav>
    </header>
  );
}
