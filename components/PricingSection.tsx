"use client";

import { CheckCircle2, ArrowRight, Zap } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const packages = [
  {
    name: "Beacon Audit + Roadmap",
    price: "$500",
    period: "one-time",
    description:
      "A human-delivered deep-dive into your site's conversion problems, with a prioritized fix list you can hand to any builder.",
    features: [
      "Full Beacon diagnostic (not just the free score)",
      "Page-by-page conversion teardown",
      "Competitor comparison in your service area",
      "Prioritized roadmap document you own",
      "45-minute walkthrough call with Jeremy",
    ],
    cta: "Book My Audit",
    ctaHref: "#contact",
    highlight: false,
  },
  {
    name: "Contractor Site Build",
    price: "$5,000",
    period: "one-time",
    description:
      "A conversion-focused website built from scratch for your contracting business. Designed, built, and launched by Jeremy.",
    features: [
      "Everything in the Audit + Roadmap",
      "Custom design — no templates",
      "Service-area pages with local SEO structure",
      "Lead capture forms + speed-to-lead setup",
      "Mobile-first build, fast hosting",
      "2 rounds of revisions before launch",
      "Full ownership of code, content, and domain",
    ],
    cta: "Start My Build",
    ctaHref: "#contact",
    highlight: true,
  },
  {
    name: "Contractor Growth Engine",
    price: "$7,500",
    priceNote: "+ $500/mo after launch",
    period: "setup + monthly",
    description:
      "The full site build plus ongoing SEO content, conversion optimization, and monthly performance reporting.",
    features: [
      "Everything in the Site Build",
      "Monthly SEO content (service + city pages)",
      "Conversion rate optimization each month",
      "Google Business Profile management",
      "Monthly Beacon re-score + performance report",
      "Priority support and same-week changes",
    ],
    cta: "Discuss Growth Plan",
    ctaHref: "#contact",
    highlight: false,
  },
];

export default function PricingSection() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const offset = 120;
      const target = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="relative py-20 md:py-24 bg-[oklch(0.10_0.02_260)]">
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-6">
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
              Fixed Pricing
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
              Transparent Packages.{" "}
              <span className="text-gradient-orange">No Surprises.</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Free instant score callout */}
        <ScrollReveal>
          <div className="mx-auto mb-12 max-w-2xl rounded-xl border border-brand-amber/20 bg-brand-amber/[0.06] px-5 py-4 sm:px-6">
            <div className="flex items-start gap-3">
              <Zap className="mt-0.5 h-5 w-5 shrink-0 text-brand-amber" />
              <div>
                <p className="text-sm font-bold text-white">
                  Free Instant Score — no signup required
                </p>
                <p className="mt-1 text-sm text-foreground/55">
                  The Beacon widget on this page gives you an automated score in
                  seconds. The $500 Audit + Roadmap below is different — that is
                  a human-delivered deep-dive with Jeremy, not a bot report.
                </p>
                <button
                  onClick={() => scrollTo("#beacon-audit")}
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-amber hover:text-white transition-colors"
                >
                  Get your free score now
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Pricing cards */}
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-6 md:grid-cols-3">
          {packages.map((pkg, i) => (
            <ScrollReveal key={pkg.name} delay={i * 120}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-6 sm:p-8 transition-all duration-300 ${
                  pkg.highlight
                    ? "border-brand-orange/40 bg-gradient-to-b from-[oklch(0.14_0.03_50)] to-[oklch(0.12_0.02_260)] shadow-[0_20px_60px_-20px_rgba(255,106,0,0.25)]"
                    : "border-white/10 bg-[oklch(0.13_0.02_260)] hover:border-white/20"
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-orange px-4 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-white shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="mb-5">
                  <h3 className="font-serif text-xl font-bold text-white">
                    {pkg.name}
                  </h3>
                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className="text-4xl font-black text-brand-orange">
                      {pkg.price}
                    </span>
                    <span className="text-sm text-foreground/40">
                      {pkg.period}
                    </span>
                  </div>
                  {"priceNote" in pkg && pkg.priceNote && (
                    <p className="mt-1 text-sm font-medium text-foreground/50">
                      {pkg.priceNote}
                    </p>
                  )}
                </div>

                <p className="mb-6 text-sm text-foreground/60 leading-relaxed">
                  {pkg.description}
                </p>

                <ul className="mb-8 flex-1 space-y-3">
                  {pkg.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2.5 text-sm text-foreground/70"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => scrollTo(pkg.ctaHref)}
                  className={`mt-auto flex w-full items-center justify-center gap-2 rounded-xl px-6 min-h-[48px] text-sm font-black uppercase tracking-wider transition-all duration-300 ${
                    pkg.highlight
                      ? "bg-brand-orange text-white hover:bg-brand-orange-bright shadow-[0_10px_30px_rgba(255,106,0,0.3)]"
                      : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  {pkg.cta}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
