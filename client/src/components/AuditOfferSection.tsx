import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

const auditPoints = [
  "Where visitors are dropping off",
  "What’s unclear or hurting trust",
  "Missed opportunities for calls and inquiries",
  "Quick wins to improve conversion",
];

export default function AuditOfferSection() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="audit-offer" className="relative py-20 md:py-24">
      <div className="absolute inset-0 bg-[oklch(0.10_0.02_260)]" />

      <div className="relative z-10 container">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto rounded-2xl border border-brand-orange/25 bg-gradient-to-br from-[oklch(0.15_0.03_50)] to-[oklch(0.12_0.02_260)] p-8 md:p-12">
            <div className="text-center">
              <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
                Free Audit Offer
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
                Find Out Exactly Where Your Website Is Losing Leads
              </h2>
              <p className="mt-4 text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                We&apos;ll review your current site and show you what&apos;s
                working, what&apos;s not, and where you&apos;re losing potential
                customers.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {auditPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-xl border border-border bg-[oklch(0.15_0.02_260)] p-4"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange mt-0.5 shrink-0" />
                    <p className="text-sm text-foreground/75">{point}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button
                onClick={scrollToContact}
                size="lg"
                className="bg-brand-orange hover:bg-brand-orange-bright text-white font-semibold text-base px-8 py-6 glow-orange transition-all duration-300 rounded-lg"
              >
                Get Your Free Website &amp; Lead Audit
              </Button>
              <p className="mt-4 text-sm text-foreground/60">
                No pressure. Just a clear breakdown of what to fix and why it
                matters.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
