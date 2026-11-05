import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Minus, Plus } from 'lucide-react';
import house from '@/assets/faq-house.jpg';

export const faqs: { q: string; a: string }[] = [
  { q: 'What is HERON AI?', a: 'HERON AI is a concept for an AI design agent that works inside architectural design tools. It reviews a model, flags issues, and prepares proposed edits that you review before anything is applied.' },
  { q: 'How does HERON AI work?', a: 'You describe a task in plain language, Heron inspects the relevant elements and prepares a proposed change, and you review the result. The sample workflow on this page is a simulation that shows that sequence.' },
  { q: 'Can I use HERON AI with my existing design tools?', a: 'The product focus is BIM / Revit integration. A live design-tool connection is not part of this website: the demonstration here is simulated. [To confirm: supported tools and release timing.]' },
  { q: 'Is my design data secure?', a: 'The sample workflow on this site never uploads or sends model data. Security practices for a live product have not been published yet. [To confirm: data handling and security details.]' },
  { q: 'What kind of files are supported?', a: 'Supported file formats have not been confirmed yet. [To confirm: file formats.] The sample workflow uses a built-in illustrative floor plan, not your files.' },
  { q: 'Do I need technical expertise to use it?', a: 'No coding is required. Tasks are written as plain instructions, such as "Resize flagged doors to 920 mm", and the result is presented as a reviewable proposal.' },
  { q: 'Can I review proposed changes before applying them?', a: 'Yes. Review is central to Heron: every proposal waits for your approval, showing what changes, for example a door width from 900 mm to 920 mm.' },
  { q: 'Does HERON AI modify my original design automatically?', a: 'No. Changes are proposed first and applied only on approval. In this simulated demonstration, approving changes nothing outside the page — your original model stays unchanged.' },
];

export function FaqSection({ asPage = false }: { asPage?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  const H = asPage ? 'h1' : 'h2';
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-14 border-t border-border">
      <div className="grid lg:grid-cols-[1fr_1.1fr]">
        <div className="relative flex flex-col overflow-hidden">
          <div className="p-6 md:p-8 lg:p-10">
            <p className="label mb-5 flex items-center gap-2 text-primary"><span className="size-1.5 bg-primary" />FAQ / 01</p>
            <H id="faq-title" className="display text-[clamp(2.4rem,5vw,4.6rem)]">Frequently<br />asked questions</H>
            <p className="mt-6 max-w-sm font-mono text-[12px] leading-relaxed text-muted-foreground">Find answers to common questions about HERON AI, its capabilities, and how it works.</p>
            <span aria-hidden className="mt-6 block h-px w-16 bg-primary grow-x" />
          </div>
          <div className="relative mt-auto border-t border-border" aria-hidden>
            <div className="pointer-events-none absolute inset-0">
              <span className="absolute left-1/3 top-0 h-full w-px bg-line" /><span className="absolute left-0 top-1/2 h-px w-full bg-line" />
              <span className="absolute right-6 top-6 font-mono text-[9px] leading-tight text-muted-foreground"><span className="mr-1 inline-block size-1 bg-primary" />N 39.7392°<br />W 104.9903°</span>
              <span className="absolute left-[42%] top-[18%] size-1.5 bg-primary" />
            </div>
            <img src={house} width={1408} height={1008} loading="lazy" alt="" className="relative w-full mix-blend-multiply opacity-90" />
            <div className="flex items-center gap-3 px-6 pb-4 md:px-8"><span className="font-mono text-primary">///</span><span className="h-px flex-1 bg-foreground/40 grow-x" /></div>
          </div>
        </div>
        <div className="border-t border-border p-4 md:p-8 lg:border-l lg:border-t-0 lg:p-10">
          <ul className="border-t border-border">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              const id = `faq-a-${i}`;
              return (
                <li key={f.q} className="relative border-b border-border">
                  <span aria-hidden className={`absolute left-0 top-0 h-full w-0.5 bg-primary transition-transform duration-300 origin-top ${isOpen ? 'scale-y-100' : 'scale-y-0'}`} />
                  <h3>
                    <button type="button" aria-expanded={isOpen} aria-controls={id} onClick={() => setOpen(isOpen ? null : i)} className="group grid w-full grid-cols-[48px_1fr_24px] items-center gap-3 py-5 pl-4 pr-2 text-left transition-colors hover:bg-muted/50 focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-2 focus-visible:outline-primary md:grid-cols-[64px_1fr_24px]">
                      <span className={`font-mono text-sm ${isOpen ? 'text-primary' : 'text-muted-foreground'}`}>{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-[15px] font-medium leading-snug md:text-lg">{f.q}</span>
                      {isOpen ? <Minus className="size-4 text-primary" /> : <Plus className="size-4 text-primary transition-transform group-hover:rotate-90" />}
                    </button>
                  </h3>
                  <div id={id} role="region" className={`grid transition-[grid-template-rows] duration-300 ease-[var(--ease-arch)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden"><p className="pb-6 pl-[76px] pr-8 text-sm leading-relaxed md:pl-[92px]">{f.a}</p></div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 flex justify-between font-mono text-[10px] uppercase text-muted-foreground"><span>{String((open ?? 0) + 1).padStart(2, '0')} — {String(faqs.length).padStart(2, '0')}</span><span>Placeholders marked [To confirm]</span></div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-5 md:px-8">
        <p className="label flex items-center gap-2"><span className="size-1.5 bg-primary" />HERON AI <span className="text-muted-foreground">— Build / Review / Improve</span></p>
        <p className="flex flex-wrap items-center gap-4 text-sm">Still have questions? Let's talk about your workflow. <Link to="/contact-us" className="label text-primary hover:underline">Contact us →</Link></p>
      </div>
    </section>
  );
}
