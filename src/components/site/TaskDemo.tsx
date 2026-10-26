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
  return <section id="demo" className="scroll-mt-14 grid border-t border-border lg:grid-cols-[1fr_1.4fr]">
    <div className="flex flex-col justify-between gap-8 p-6 md:p-8"><div><p className="label mb-4 text-primary">Interactive study / 01</p><h2 className="display text-3xl md:text-5xl">A small task.<br />A visible result.</h2></div><p className="max-w-sm text-sm text-muted-foreground">Simulated model workflow. No live AI or design-tool connection; changes stay within this demonstration.</p></div>
    <div className="border-t border-border p-4 md:p-8 lg:border-l lg:border-t-0"><div className="border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-4 py-3"><span className="label">Heron / Sample model</span><span className="label text-primary">{phase === 'ready' ? 'Ready' : phase === 'processing' ? 'Working' : phase === 'review' ? 'Approval required' : 'Approved'}</span></div>
      <div className="p-4"><label className="label text-muted-foreground" htmlFor="demo-task">Design task</label><select id="demo-task" value={task} disabled={phase !== 'ready'} onChange={e => setTask(e.target.value)} className="mt-2 w-full border border-border bg-background p-3 text-sm outline-none focus:border-primary">{sampleTasks.map(t => <option key={t}>{t}</option>)}</select></div>
      <div className="grid min-h-56 border-y border-border sm:grid-cols-[1fr_1.1fr]">
        <div className="relative flex min-h-52 items-center justify-center overflow-hidden p-4"><svg viewBox="0 0 200 180" className="w-full max-w-48" fill="none" stroke="var(--foreground)" strokeWidth="1.5" role="img" aria-label="Sample floor plan"><title>Sample floor plan</title><path d="M20 20H180V160H20Z M100 20V65 M100 95V160 M20 90H65 M85 90H180 M140 90V160"/><path d="M100 65V95 M65 90H85 M140 120V145" stroke="var(--primary)" strokeWidth={phase === 'approved' ? '4' : '2'} strokeDasharray={phase === 'approved' ? undefined : '3 2'}/><path d="M100 65A30 30 0 0 1 130 95 M65 90A20 20 0 0 1 85 110" stroke="var(--border)"/></svg><span className="absolute bottom-3 left-3 font-mono text-[9px] text-muted-foreground">MODEL STUDY / NOT TO SCALE</span></div>
        <div className="flex flex-col justify-center border-l border-border p-4" aria-live="polite">{phase === 'ready' ? <><span className="label text-muted-foreground">Scope</span><p className="mt-3 text-sm">Level 02 · Sample model</p><p className="mt-2 text-xs text-muted-foreground">A proposed change will appear here.</p></> : phase === 'processing' ? <><span className="label">Checking model… {progress}%</span><progress value={progress} max="100" className="mt-4 h-1 w-full accent-primary"/><p className="mt-4 text-xs text-muted-foreground">Inspecting elements and preparing a comparison.</p></> : <><span className="label text-primary">{phase === 'approved' ? 'Sample change approved' : 'Proposed changes'}</span><p className="mt-3 text-sm">{task}</p><dl className="mt-3 space-y-2 text-xs"><div className="flex justify-between gap-2"><dt>Elements</dt><dd>3 sample elements</dd></div><div className="flex justify-between gap-2"><dt>Status</dt><dd>{phase === 'approved' ? 'Applied in demo' : 'Not applied'}</dd></div></dl><p className="mt-3 text-xs text-muted-foreground">{phase === 'approved' ? 'Your original model is unchanged.' : 'Review the proposal before approving.'}</p></>}</div>
      </div><div className="flex items-center justify-between gap-3 p-4"><Button variant="ghost" size="icon" title="Reset demonstration" aria-label="Reset demonstration" onClick={reset}><RotateCcw /></Button>{phase === 'ready' ? <Button onClick={() => { setProgress(0); setPhase('processing'); }} className="label shadow-none">Run sample task <ArrowRight /></Button> : phase === 'processing' ? <Button disabled className="label shadow-none">Preparing proposal…</Button> : phase === 'review' ? <Button onClick={() => setPhase('approved')} className="label shadow-none">Approve sample changes <Check /></Button> : <Button variant="outline" onClick={reset} className="label shadow-none">Try another task <ArrowRight /></Button>}</div>
    </div></div>
  </section>;
}