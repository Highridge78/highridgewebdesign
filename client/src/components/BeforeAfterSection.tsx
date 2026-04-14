import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { Button } from "@/components/ui/button";

export default function BeforeAfterSection() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-20 md:py-24">
      <div className="absolute inset-0 bg-[oklch(0.10_0.02_260)]" />

      <div className="relative z-10 container">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
              Transformation
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              From Outdated to High-Performing
            </h2>
            <p className="mt-4 text-foreground/60">
              Most local businesses don&apos;t need a brand-new marketing strategy. They need a better website system.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
          <ScrollReveal>
            <article className="rounded-2xl border border-red-500/25 bg-[oklch(0.15_0.03_20/0.25)] p-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-red-300">
                <XCircle className="w-4 h-4" />
                Before
              </div>
              <h3 className="mt-3 font-serif text-2xl font-bold text-white">
                Outdated brochure site
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-foreground/75">
                {[
                  "Slow load times and poor mobile experience",
                  "Unclear offer with weak calls-to-action",
                  "Few qualified calls or quote requests",
                  "Looks generic and doesn't build trust",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-300 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </ScrollReveal>

          <div className="hidden lg:flex items-center justify-center">
            <ArrowRight className="w-8 h-8 text-brand-orange/70" />
          </div>

          <ScrollReveal delay={120}>
            <article className="rounded-2xl border border-brand-orange/30 bg-[oklch(0.16_0.03_50/0.2)] p-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-brand-amber">
                <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                After
              </div>
              <h3 className="mt-3 font-serif text-2xl font-bold text-white">
                Conversion-focused lead machine
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                {[
                  "Fast, mobile-first pages built for local buyers",
                  "Clear service positioning and trust-focused design",
                  "Stronger conversion flow to increase calls and bookings",
                  "AI-assisted follow-up so leads don't go cold",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-orange shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={160}>
          <div className="mt-8 text-center">
            <Button
              onClick={scrollToContact}
              className="bg-brand-orange hover:bg-brand-orange-bright text-white font-semibold px-7 py-6 rounded-lg"
            >
              Get My Before/After Plan
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
