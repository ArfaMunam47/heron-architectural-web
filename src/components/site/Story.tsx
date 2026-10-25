import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import tower from '@/assets/tower.jpg';
import workflow from '@/assets/art-workflow.jpg';
import { articles } from '@/lib/articles';
import { TaskDemo } from './TaskDemo';

export function Workflow() {
  const stages = [ ['01', 'Describe the task', 'Flag narrow doors on level 02.', 'REQUEST / LEVEL 02'], ['02', 'Let the agent work', '3 elements found. Preparing proposed changes.', 'INSPECT / COMPARE'], ['03', 'Review the result', '900 mm → 920 mm · Awaiting your approval.', 'REVIEW / APPROVE'] ];
  return <section className="border-t border-border"><div className="flex flex-wrap items-end justify-between gap-4 p-6 md:p-8"><h2 className="display text-3xl md:text-5xl">From intent<br />to a reviewed edit.</h2><p className="label text-muted-foreground">Workflow study / Illustrative previews</p></div><div className="grid md:grid-cols-3">{stages.map(([n,t,d,l]) => <div key={n} className="border-t border-border p-6 md:border-r last:border-r-0"><div className="flex items-start justify-between"><span className="display text-7xl text-primary">{n}</span><span className="label pt-2 text-muted-foreground">{l}</span></div><h3 className="display mb-6 mt-5 text-2xl">{t}</h3><div className="flex min-h-24 flex-col justify-center border-l-2 border-primary bg-muted/40 px-4"><span className="label text-muted-foreground">Heron / Sample model</span><p className="mt-3 text-sm">{d}</p></div></div>)}</div></section>;
}

export function ClosingCTA() {
  return <section className="grid border-t border-border md:grid-cols-[2fr_1fr]"><div className="p-6 md:p-8"><p className="label mb-4 text-primary">Less busywork. More design.</p><h2 className="display text-4xl md:text-6xl">Keep your focus<br />on the architecture.</h2></div><div className="flex flex-col justify-between gap-8 border-t border-border p-6 md:border-l md:border-t-0"><p className="max-w-sm text-sm">A clear request. A visible proposal. A decision that stays with you.</p><Button asChild className="label justify-between shadow-none"><Link to="/" hash="demo">Try the sample workflow <ArrowUpRight /></Link></Button></div></section>;
}

export function HomeStory() {
  return <>
    <section className="grid border-t border-border md:grid-cols-2"><div className="flex flex-col justify-between gap-8 p-6 md:p-8"><div><p className="label mb-4 text-muted-foreground">Your AI design agent, right in the tool</p><h2 className="display text-4xl md:text-6xl">Ask, and Heron<br />does it for you.</h2></div><div className="max-w-md"><p className="text-sm leading-relaxed">Keep the request close to the model. See what needs attention, compare a proposed edit, and review the result before it becomes part of the project.</p><Link to="/heron-chat-widget" className="label mt-6 inline-flex text-primary">Explore Chat Widget ↗</Link></div></div><img src={tower} width={1200} height={1008} alt="Architectural tower drawing with vermilion geometry" loading="lazy" className="aspect-[6/5] w-full border-t border-border object-cover mix-blend-multiply md:border-l md:border-t-0"/></section>
    <Workflow />
    <section className="grid border-t border-border md:grid-cols-[1.15fr_1fr]"><img src={workflow} width={1200} height={912} alt="Exploded architectural model with separated floor plates" loading="lazy" className="aspect-[4/3] w-full object-cover mix-blend-multiply"/><div className="flex flex-col justify-between gap-8 border-t border-border p-6 md:border-l md:border-t-0 md:p-8"><div><p className="label mb-4 text-primary">One project. A clear view.</p><h2 className="display text-3xl md:text-5xl">See every change,<br />flag, and approval<br />in one place.</h2></div><div><p className="max-w-sm text-sm">From a model issue to a proposed edit, keep the review trail connected to the work.</p><Link to="/heron-dashboard" className="label mt-6 inline-flex text-primary">Explore Dashboard ↗</Link></div></div></section>
    <TaskDemo />
    <section className="border-t border-border"><div className="flex items-end justify-between gap-6 p-6 md:p-8"><h2 className="display text-3xl md:text-5xl">Notes from<br />the design desk.</h2><Link to="/resources" className="label text-primary">All resources ↗</Link></div><div className="grid sm:grid-cols-3">{[articles[0],articles[4],articles[5]].map(a => <Link key={a.slug} to="/resources/$slug" params={{slug:a.slug}} className="group border-t border-border p-4 sm:border-r last:border-r-0"><img src={a.image} width={1200} height={912} loading="lazy" alt="Architectural editorial composition" className="aspect-[4/3] w-full object-cover mix-blend-multiply transition-opacity group-hover:opacity-80"/><p className="label mt-4 text-muted-foreground">Sample editorial / {a.category.replaceAll('-',' ')}</p><h3 className="display mt-2 text-xl">{a.title} ↗</h3></Link>)}</div></section>
    <ClosingCTA />
  </>;
}