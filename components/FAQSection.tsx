"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScrollReveal from "./ScrollReveal";

const faqs = [
  {
    q: "What can you show me before I commit?",
    a: "More than most agencies will. Three things: First, our demo sites built for the contractor verticals we serve — see /demos for working examples. Second, we run a free Beacon audit on your current site before any sales conversation, so you see exactly how we evaluate websites for lead generation. Third, our own website is the live case study — built using the same methodology we'd use for yours. First named client case studies publish Q1 2026.",
  },
  {
    q: "How do I know this will work for my business?",
    a: "We start with your market, services, and current lead flow before recommending anything. The goal is a practical system built around the jobs you actually want: fast pages, clear service positioning, local SEO structure, and direct calls to action.",
  },
  {
    q: "How long does a website build take?",
    a: "Typically 3-5 weeks from signed agreement to launch. That covers discovery, design, build, revision rounds, and deployment. We do not stretch projects across months.",
  },
  {
    q: "Do you work with businesses outside Western NC?",
    a: "No. We focus exclusively on contractors and home service businesses in Western North Carolina. The narrow focus is intentional — it means sharper local SEO knowledge, faster results, and a system built for this specific market.",
  },
  {
    q: "What happens after the site launches?",
    a: "We hand off a working lead system, not a static page. You get training on the site, review request workflows, and a clear path to ongoing SEO content if you want it.",
  },
  {
    q: "What if I already have a website?",
    a: "Most of our work is rebuilds, not blank-slate builds. We audit what you have, keep what works, and replace what is costing you leads. The free audit call is designed to answer this for your specific situation.",
  },
  {
    q: "What's included that other web designers don't deliver?",
    a: "Conversion-first design built around how contractor buyers actually decide. Local SEO structure wired for service-area visibility. A Beacon audit that scores your site before and after on the signals that drive calls. Lead capture setup with form and speed-to-lead flow included. And founder-led delivery — you work directly with Jeremy, not a project coordinator.",
  },
];

export default function FAQSection() {
  return (
    <section
      id="faq"
      className="relative py-20 md:py-24 bg-[oklch(0.12_0.02_260)]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-[0.28em] text-brand-orange/70">
              Common Questions
            </span>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-white md:text-5xl">
              Everything You Want to Know Before Reaching Out
            </h2>
          </div>
        </ScrollReveal>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={faq.q} delay={i * 60}>
                <AccordionItem
                  value={`item-${i}`}
                  className="rounded-2xl border border-white/10 bg-[oklch(0.14_0.02_260)] px-6 overflow-hidden"
                >
                  <AccordionTrigger className="text-white font-semibold text-base py-5 hover:no-underline hover:text-brand-orange transition-colors text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/65 leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </ScrollReveal>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
