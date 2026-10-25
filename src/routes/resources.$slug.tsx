import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { articles } from '@/lib/articles';
import { Header } from '@/components/site/Header';

export const Route = createFileRoute('/resources/$slug')({
  loader: ({params}) => { const article = articles.find(a => a.slug === params.slug); if (!article) throw notFound(); return article; },
  head: ({loaderData}) => ({meta: [
    {title: `${loaderData?.title ?? 'Article'} — Heron AI`},
    {name:'description',content:loaderData?.summary ?? 'Architecture and AI-assisted design notes.'},
    {property:'og:title',content:`${loaderData?.title ?? 'Article'} — Heron AI`},
    {property:'og:description',content:loaderData?.summary ?? 'Architecture and design notes.'},
    {property:'og:type',content:'article'}, {name:'twitter:card',content:'summary_large_image'},
  ]}),
  component: Article,
});
function Article() {
  const a = Route.useLoaderData();
  return <><Header compact/><main><div className="flex justify-between border-b border-border p-4 label"><Link to="/resources" className="text-primary">← Resources</Link><span className="text-muted-foreground">Sample editorial</span></div><section className="grid md:grid-cols-2"><div className="flex flex-col justify-between gap-8 p-6 md:p-8"><p className="label text-primary">{a.category.replaceAll('-',' ')}</p><h1 className="display text-4xl md:text-5xl">{a.title}</h1><p className="max-w-md text-lg leading-snug">{a.summary}</p></div><img src={a.image} width={1200} height={912} alt="Architectural illustration accompanying the article" className="aspect-[4/3] w-full border-t border-border object-cover mix-blend-multiply md:border-l md:border-t-0"/></section><div className="grid border-t border-border md:grid-cols-[1fr_2fr_1fr]"><aside className="p-6 label text-muted-foreground">Heron / Design notes<br/><br/>Concept article</aside><div className="space-y-6 border-x border-border p-6 text-base leading-relaxed md:p-10">{a.body.map(p => <p key={p}>{p}</p>)}</div></div><div className="flex justify-between border-t border-border p-6 label"><Link to="/resources" className="text-primary">← Back to all notes</Link><Link to="/" hash="demo" className="text-primary">Try the workflow ↗</Link></div></main></>;
}