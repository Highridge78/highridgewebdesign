import { CheckCircle2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const deliverables = [
  "A website that works on every device so you don't lose mobile leads.",
  "Clear messaging that tells visitors exactly what you do and why they should choose you.",
  "Conversion-focused page structure that guides people to call, message, or request a quote.",
  "Faster page speed that keeps visitors engaged instead of bouncing.",
  "Local SEO foundations that help your business show up where buyers are searching.",
  "Lead capture touchpoints built around your services so inquiries become booked jobs.",
];

export default function WhatYouGetSection() {
  return (
    <section id="outcomes" className="relative py-20 md:py-24">
      <div className="absolute inset-0 bg-[oklch(0.10_0.02_260)]" />

      <div className="relative z-10 container">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-12">
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
              What You Get
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
              Deliverables Framed Around{" "}
              <span className="text-gradient-orange">Business Outcomes</span>
            </h2>
            <p className="mt-4 text-foreground/60 max-w-3xl mx-auto">
              Every decision is built around one goal: generating more qualified
              leads from the traffic you already have.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-5xl mx-auto">
          {deliverables.map((item, index) => (
            <ScrollReveal key={item} delay={index * 80}>
              <div className="h-full p-5 rounded-xl border border-border bg-[oklch(0.15_0.02_260)] hover:border-brand-orange/30 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <p className="text-foreground/75 text-sm leading-relaxed">{item}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
