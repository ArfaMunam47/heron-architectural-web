import { useEffect, useState } from 'react';
import { ArrowRight, RotateCcw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const sampleTasks = ['Resize flagged doors to 920 mm', 'Rename rooms using the project convention', 'Review duplicate wall types'];
export function TaskDemo() {
  const [task, setTask] = useState(sampleTasks[0]);
  const [phase, setPhase] = useState<'ready' | 'processing' | 'review' | 'approved'>('ready');
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (phase !== 'processing') return;
    const id = setInterval(() => setProgress(p => Math.min(100, p + 10)), 120);
    return () => clearInterval(id);
  }, [phase]);
  useEffect(() => { if (phase === 'processing' && progress === 100) setPhase('review'); }, [phase, progress]);
  const reset = () => { setPhase('ready'); setProgress(0); };
  const isDoor = task === sampleTasks[0];
  const active = phase !== 'ready';
  const done = phase === 'review' || phase === 'approved';
  const steps = [['Task received', active], ['Element identified', done || progress >= 40], ['Modification prepared', done || progress >= 80], ['Ready for review', done]] as const;
  const status = phase === 'ready' ? 'Ready' : phase === 'processing' ? 'Working' : phase === 'review' ? 'Approval required' : 'Approved';
  const mark = 'var(--primary)';
  return <section id="demo" className="scroll-mt-14 grid border-t border-border lg:grid-cols-[0.85fr_1.4fr]">
    <div className="flex flex-col border-border">
      <div className="p-6 md:p-8"><p className="label mb-4 text-primary">Interactive study / 01</p><h2 className="display text-3xl md:text-5xl">A small task.<br />A visible result.</h2></div>
      <div className="border-t border-border p-6 md:px-8"><label className="label text-muted-foreground" htmlFor="demo-task">01 / Design task</label><select id="demo-task" value={task} disabled={phase !== 'ready'} onChange={e => setTask(e.target.value)} className="mt-3 w-full border-0 border-b border-foreground bg-transparent py-2 text-base font-medium outline-none transition-colors hover:border-primary focus:border-primary">{sampleTasks.map(t => <option key={t}>{t}</option>)}</select><p className="mt-3 font-mono text-[9px] uppercase text-muted-foreground">Scope: Level 02 · Sample model</p></div>
      <ol className="border-t border-border px-6 py-4 font-mono text-[10px] uppercase md:px-8" aria-label="Simulation progress">{steps.map(([l, on], k) => <li key={l} className="flex items-center gap-3 py-1.5"><span className={`size-1.5 transition-colors duration-300 ${on ? 'bg-primary' : 'border border-border'}`} /><span className="text-muted-foreground">{String(k + 1).padStart(2, '0')}</span><span className={`transition-colors duration-300 ${on ? 'text-foreground' : 'text-muted-foreground'}`}>{l}</span></li>)}</ol>
      <p className="mt-auto border-t border-border p-6 text-sm text-muted-foreground md:px-8">Simulated model workflow. No live AI or design-tool connection; changes stay within this demonstration.</p>
    </div>
    <div className="flex flex-col border-t border-border lg:border-l lg:border-t-0">
      <div className="flex items-center justify-between border-b border-border px-6 py-3 md:px-8"><span className="label">Heron / Sample model</span><span className="label flex items-center gap-2 text-primary"><span className={`size-1.5 bg-primary ${phase === 'processing' ? 'animate-pulse' : ''}`} />{status}</span></div>
      <div className="relative flex flex-1 items-center justify-center bg-muted/30 px-6 py-10 md:px-10">
        <span className="absolute left-6 top-4 font-mono text-[9px] uppercase text-muted-foreground md:left-8">Plan / Level 02</span><span className="absolute right-6 top-4 font-mono text-[9px] uppercase text-muted-foreground md:right-8">Model study / Not to scale</span>
        <svg viewBox="0 0 240 200" className="w-full max-w-[480px]" fill="none" stroke="var(--foreground)" strokeLinecap="square" role="img" aria-label="Sample floor plan, level 02">
          <g transform="translate(20 10)">
            <path d="M17 17H183V163H17Z M21 21V159H179V21Z" fill="var(--foreground)" fillRule="evenodd" stroke="none"/>
            <g fill="var(--background)" stroke="none"><path d="M44 16.5H60V21.5H44Z M120 16.5H150V21.5H120Z M178.5 50H183.5V64H178.5Z M16.5 120H21.5V136H16.5Z"/></g>
            <g stroke="var(--foreground)" strokeWidth=".4"><path d="M44 19H60 M120 19H150 M181 50V64 M19 120V136"/></g>
            <g stroke="var(--foreground)" strokeWidth="1.4"><path d="M100 21V65 M100 95V159 M21 90H65 M85 90H179 M140 91V120 M140 145V159"/></g>
            <g stroke="var(--muted-foreground)" strokeWidth=".45"><path d="M100 65L128.2 75 M65 90L71.5 109 M140 120L161.7 132"/><path d="M100 95A30 30 0 0 0 128.2 75 M85 90A20 20 0 0 1 71.5 109 M140 145A25 25 0 0 0 161.7 132"/></g>
            <path key={phase} d="M100 65V95 M65 90H85 M140 120V145" stroke={mark} strokeWidth={phase === 'approved' ? 3 : 2} strokeDasharray={phase === 'ready' ? '3 2' : undefined} pathLength={phase === 'processing' ? 1 : undefined} className={phase === 'processing' ? 'draw-line' : ''}/>
            <g stroke="var(--muted-foreground)" strokeWidth=".4"><path d="M17 174H183 M17 171V177 M183 171V177"/><path d="M194 17V163 M191 17H197 M191 163H197"/></g>
            <g fontFamily="var(--font-mono)" fill="var(--muted-foreground)" stroke="none">
              <text x="100" y="184" fontSize="5" textAnchor="middle">16 000</text><text x="203" y="90" fontSize="5" textAnchor="middle" transform="rotate(90 203 90)">14 000</text>
              <g fontSize="4" fill="var(--foreground)" letterSpacing=".3"><text x="28" y="34">STUDIO</text><text x="108" y="34">MEETING</text><text x="28" y="104">OFFICE</text><text x="108" y="104">STORE</text><text x="148" y="104">WC</text></g>
              <g fontSize="3.2"><text x="28" y="40">56 m²</text><text x="108" y="40">56 m²</text><text x="28" y="110">56 m²</text></g>
              <g transform="translate(168 30)" fill="var(--foreground)"><path d="M0 -6L2.5 2H-2.5Z" /><text x="-1.4" y="8" fontSize="4">N</text></g>
            </g>
            {active && [[100, 80, 104, 78], [75, 90, 70, 84], [140, 132, 144, 131]].map(([x, y, tx, ty], k) => <g key={k} className="fade-in" style={{ animationDelay: `${k * 200}ms` }}><text x={tx} y={ty} fontFamily="var(--font-mono)" fontSize="4.4" fill={mark} stroke="none">D-0{k + 1}</text>{done && <text x={tx} y={ty! + 5} fontFamily="var(--font-mono)" fontSize="3.4" fill={mark} stroke="none">{isDoor ? '900 → 920' : 'FLAGGED'}</text>}</g>)}
          </g></svg>
      </div>
      <div className="grid border-t border-border sm:grid-cols-[1.2fr_1fr]" aria-live="polite">
        <div className="p-6 md:px-8">{phase === 'ready' ? <><span className="label text-muted-foreground">Proposal</span><p className="mt-3 text-sm text-muted-foreground">A proposed change will appear here.</p></> : phase === 'processing' ? <><span className="label">Checking model… {progress}%</span><div className="mt-4 h-px w-full bg-border"><div className="h-px bg-primary transition-[width] duration-150" style={{ width: `${progress}%` }} /></div><p className="mt-4 text-xs text-muted-foreground">Inspecting elements and preparing a comparison.</p></> : <><span className="label text-primary">{phase === 'approved' ? 'Sample change approved' : 'Proposed changes'}</span><p className="mt-3 text-sm font-medium">{task}</p>{isDoor && <div className="mt-4 flex items-end gap-4 fade-in"><div><span className="label text-muted-foreground">Before</span><p className="display text-3xl text-muted-foreground"><span className="line-through decoration-1">900</span><span className="ml-1 font-mono text-[10px] font-normal">mm</span></p></div><span className="pb-2 font-mono text-primary">→</span><div><span className="label text-primary">Proposed</span><p className="display text-3xl text-primary">920<span className="ml-1 font-mono text-[10px] font-normal">mm</span></p></div></div>}</>}</div>
        <dl className="border-t border-border p-6 text-xs sm:border-l sm:border-t-0 md:px-8"><div className="flex justify-between gap-2 border-b border-border pb-2"><dt className="label text-muted-foreground">Elements</dt><dd>{done ? '3 sample elements' : '—'}</dd></div><div className="flex justify-between gap-2 border-b border-border py-2"><dt className="label text-muted-foreground">Status</dt><dd>{phase === 'approved' ? 'Applied in demo' : done ? 'Not applied' : '—'}</dd></div><p className="pt-2 text-muted-foreground">{phase === 'approved' ? 'Your original model is unchanged.' : 'Review the proposal before approving.'}</p></dl>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-border px-6 py-4 md:px-8"><Button variant="ghost" size="icon" title="Reset demonstration" aria-label="Reset demonstration" onClick={reset}><RotateCcw /></Button>{phase === 'ready' ? <Button onClick={() => { setProgress(0); setPhase('processing'); }} className="label shadow-none transition-transform hover:translate-x-0.5">Run sample task <ArrowRight /></Button> : phase === 'processing' ? <Button disabled className="label shadow-none">Preparing proposal…</Button> : phase === 'review' ? <Button onClick={() => setPhase('approved')} className="label shadow-none">Approve sample changes <Check /></Button> : <Button variant="outline" onClick={reset} className="label shadow-none">Try another task <ArrowRight /></Button>}</div>
    </div>
  </section>;
}