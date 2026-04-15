import { CheckCircle2, XCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const bestFit = [
  "Service businesses that need consistent leads, not random traffic",
  "Contractors and local companies competing in high-trust markets",
  "Owners who want a strategic partner, not just a website vendor",
];

const notFit = [
  "DIY-only projects with no implementation support",
  "Ultra low-budget shopping with no growth commitment",
  "Businesses looking for a generic template and quick handoff",
];

export default function WhoThisIsForSection() {
  return (
    <section id="fit" className="relative py-20 md:py-24">
      <div className="absolute inset-0 bg-[oklch(0.12_0.02_260)]" />

      <div className="relative z-10 container">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
              Who This Is For
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
              Built for Businesses That Want{" "}
              <span className="text-gradient-orange">More Qualified Leads</span>
            </h2>
            <p className="mt-4 text-foreground/60 text-lg">
              We work best with service businesses that treat their website like
              a real growth channel and want a system that produces booked jobs.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <ScrollReveal direction="left">
            <div className="rounded-xl border border-brand-orange/30 bg-[oklch(0.15_0.02_260)] p-6 h-full">
              <h3 className="font-serif text-xl font-bold text-white mb-5">
                Great Fit
              </h3>
              <ul className="space-y-3">
                {bestFit.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-foreground/75">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={120}>
            <div className="rounded-xl border border-border bg-[oklch(0.15_0.02_260)] p-6 h-full">
              <h3 className="font-serif text-xl font-bold text-white mb-5">
                Not the Right Fit
              </h3>
              <ul className="space-y-3">
                {notFit.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-foreground/65">
                    <XCircle className="w-5 h-5 text-foreground/40 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
