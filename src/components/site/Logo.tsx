export function LogoMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
      <path d="M8 12 L20 6 L32 12 L32 28 L20 34 L8 28 Z" />
      <path d="M8 12 L20 18 L32 12 M20 18 L20 34" />
      <path d="M13 15 L13 27 M27 15 L27 27 M13 21 L27 21" strokeWidth="1.4" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <LogoMark className="h-7 w-7" />
      <span className="text-[15px] font-bold tracking-tight">HERON AI</span>
    </span>
  );
}
