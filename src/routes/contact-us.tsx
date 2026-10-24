import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Reveal } from "@/components/site/Bits";
import building from "@/assets/contact-building.jpg";

export const Route = createFileRoute("/contact-us")({
  head: () => ({
    meta: [
      { title: "Contact — Get in touch with Heron AI" },
      { name: "description", content: "Reach the Heron AI team for new business or general inquiries." },
      { property: "og:title", content: "Get in touch — Heron AI" },
      { property: "og:description", content: "Talk to the Heron AI team." },
    ],
  }),
  component: Contact,
});

function Field({ name, label, type = "text", area = false }: { name: string; label: string; type?: string; area?: boolean }) {
  const cls = "peer w-full bg-transparent px-4 pb-3 pt-6 text-[15px] outline-none placeholder-transparent";
  return (
    <label className="group relative block border-b border-border transition-colors focus-within:bg-muted/50">
      {area ? <textarea name={name} rows={4} placeholder={label} className={`${cls} resize-y`} required /> : <input name={name} type={type} placeholder={label} className={cls} required />}
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl font-semibold uppercase tracking-tight text-muted-foreground/70 transition-all duration-300 peer-focus:top-3 peer-focus:text-[10px] peer-focus:text-foreground peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-[10px] [textarea~&]:top-6">
        {label}
      </span>
      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-500 group-focus-within:scale-x-100" />
    </label>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <Header />
      <main className="grid md:grid-cols-2">
        <div>
          <div className="border-b border-border p-4">
            <h1 className="display text-[clamp(2rem,3.4vw,3.2rem)]"><Reveal>Get in touch</Reveal></h1>
            <p className="mt-3 text-[11px] leading-snug">None of this site is real. You wanted it anyway.<br />Imagine what happens when the product is actually yours. Let's build it.</p>
          </div>
          <h2 className="display border-b border-border p-4 text-[clamp(1.4rem,2.2vw,2.2rem)]">Please fill out this form</h2>
          {sent ? (
            <div className="p-4 fade-in">
              <p className="label text-primary">Message received —</p>
              <p className="mt-2 text-[15px]">Thanks. We'll be in touch within two working days.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div className="grid grid-cols-2">
                <Field name="first" label="First name" />
                <div className="border-l border-border"><Field name="last" label="Last name" /></div>
              </div>
              <Field name="email" label="Email" type="email" />
              <Field name="phone" label="Phone number" type="tel" />
              <Field name="message" label="Message" area />
              <button type="submit" className="group flex w-full items-center justify-between px-4 py-4 text-left text-xl font-semibold uppercase tracking-tight text-muted-foreground/70 transition-colors hover:bg-primary hover:text-primary-foreground">
                Submit <span className="text-base transition-transform group-hover:translate-x-1">→</span>
              </button>
            </form>
          )}
        </div>
        <div className="flex flex-col border-l border-border">
          <div className="grid grid-cols-3 border-b border-border">
            {([["New business", "business@bear.plus"], ["General inquiries", "hello@bear.plus"], ["Address", "60 Martin Pl, Sydney, NSW 2000, Australia"]] as const).map(([k, v], i) => (
              <div key={k} className={`flex min-h-24 flex-col justify-between p-4 ${i ? "border-l border-border" : ""}`}>
                <span className="font-mono text-[8px] uppercase text-muted-foreground">{k}</span>
                {v.includes("@") ? <a href={`mailto:${v}`} className="text-[11px] transition-colors hover:text-primary">{v}</a> : <span className="text-[11px]">{v}</span>}
              </div>
            ))}
          </div>
          <img src={building} width={1104} height={1200} alt="Pencil drawing of a concrete villa with tower and stairs" className="flex-1 object-cover mix-blend-multiply fade-in [animation-duration:1.4s]" />
        </div>
      </main>
    </>
  );
}
