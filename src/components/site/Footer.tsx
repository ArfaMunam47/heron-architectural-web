import { Link } from '@tanstack/react-router';
import { Logo } from './Logo';

export function Footer() {
  return <footer className="border-t border-border">
    <div className="grid gap-0 md:grid-cols-[2fr_1fr_1fr]">
      <div className="flex flex-col justify-between gap-8 p-6"><Link to="/" aria-label="Heron AI home"><Logo /></Link><p className="max-w-xs text-sm text-muted-foreground">An AI agent that works inside your design tools.</p></div>
      <nav aria-label="Footer product" className="border-t border-border p-6 md:border-l md:border-t-0"><p className="label mb-4 text-muted-foreground">Product</p><div className="flex flex-col gap-3 text-sm"><Link to="/heron-chat-widget">Chat Widget ↗</Link><Link to="/heron-dashboard">Dashboard ↗</Link><Link to="/pricing">Pricing ↗</Link></div></nav>
      <nav aria-label="Footer company" className="border-t border-border p-6 md:border-l md:border-t-0"><p className="label mb-4 text-muted-foreground">Explore</p><div className="flex flex-col gap-3 text-sm"><Link to="/resources">Resources ↗</Link><Link to="/about-us">About ↗</Link><Link to="/contact-us">Contact ↗</Link></div></nav>
    </div><div className="flex flex-wrap justify-between gap-3 border-t border-border px-6 py-3 label text-muted-foreground"><span>© 2026 Heron AI</span><span>Frontend concept · Design reference by Bearplus</span></div>
  </footer>;
}