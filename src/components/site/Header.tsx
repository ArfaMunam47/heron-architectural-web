import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo, LogoMark } from "./Logo";
import { BackToDashboard } from "./Bits";

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(null); setMobileOpen(false); }, [pathname]);
  return (
    <header onKeyDown={e => { if (e.key === 'Escape') { setOpen(null); setMobileOpen(false); } }} className="sticky top-0 z-40 flex h-10 border-b border-border bg-background">
      <Link to="/" className="flex items-center px-4" aria-label="Heron AI home">
        {compact ? <LogoMark className="h-7 w-7" /> : <Logo />}
      </Link>
      <div className="flex flex-1 items-center">
        {pathname !== "/" && pathname !== "/heron-dashboard" && (
          <div className="flex h-10 items-center border-l border-border px-3"><BackToDashboard /></div>
        )}
      </div>
      <nav aria-label="Main navigation" className="hidden md:flex">
        {items.map((it) => {
          const active = pathname === it.to || it.children?.some((c) => c.to === pathname);
          return (
            <div key={it.label} className="nav-cell relative" onMouseEnter={() => setOpen(it.label)} onMouseLeave={() => setOpen(null)} onFocus={() => setOpen(it.label)} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(null); }}>
              <Link
                to={it.to}
                className={`nav-cell-link relative flex h-10 w-[92px] border-l border-border px-1.5 pt-1.5 label lg:w-[92px] ${active ? "text-foreground" : "text-muted-foreground"}`}
              >
                <span className="relative">{it.label}</span>
              </Link>
              {it.children && <Button variant="ghost" size="icon" aria-label={`Toggle ${it.label} menu`} aria-expanded={open === it.label} aria-controls={`nav-${it.label.toLowerCase()}`} onClick={() => setOpen(current => current === it.label ? null : it.label)} className="nav-cell-toggle absolute bottom-0 right-0 h-5 w-5 text-muted-foreground [&_svg]:size-3"><ChevronDown /></Button>}
              {it.children && open === it.label && (
                <div id={`nav-${it.label.toLowerCase()}`} className="absolute left-0 top-10 w-[146px] border border-border bg-background fade-in [animation-duration:200ms]">
                  {it.children.map((c) => (
                    <Link
                      key={c.label}
                      onClick={() => setOpen(null)}
                      to={c.to}
                      {...(c.hash ? { hash: c.hash } : {})}
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
      <Button variant="ghost" size="icon" className="h-10 w-10 border-l border-border md:hidden" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} onClick={() => setMobileOpen(o => !o)}>{mobileOpen ? <X /> : <Menu />}</Button>
      {mobileOpen && <nav aria-label="Mobile navigation" className="absolute inset-x-0 top-10 border-b border-border bg-background md:hidden">{items.map(it => <div key={it.label} className="border-t border-border"><Link to={it.to} onClick={() => setMobileOpen(false)} className="block px-4 py-3 label">{it.label} ↗</Link>{it.children && <div className="grid grid-cols-2 border-t border-border">{it.children.map(c => <Link key={c.label} to={c.to} {...(c.hash ? { hash: c.hash } : {})} onClick={() => setMobileOpen(false)} className="border-r border-border px-4 py-3 label text-muted-foreground">{c.label}</Link>)}</div>}</div>)}<Link to="/contact-us" onClick={() => setMobileOpen(false)} className="block border-t border-border px-4 py-3 label text-primary">Contact us →</Link></nav>}
    </header>
  );
}
