import { ArrowRight, BadgeCheck, BriefcaseBusiness, Sparkles } from "lucide-react";
import { Link } from "wouter";
import ScrollReveal from "./ScrollReveal";
import { Button } from "@/components/ui/button";

const demos = [
  {
    industry: "HVAC & Plumbing",
    headline: "A trust-first local lead machine",
    positioning:
      "Built for service calls: fast load, clear offers, and conversion-focused mobile layout.",
    trustAngle:
      "Designed to increase calls from homeowners who compare multiple contractors in minutes.",
  },
  {
    industry: "Law Firms",
    headline: "High-authority legal presence",
    positioning:
      "Premium layout with clear practice-area pathways and stronger inquiry intent signals.",
    trustAngle:
      "Positioned to convert hesitant legal prospects with clarity, authority, and proof.",
  },
  {
    industry: "Landscaping & Outdoor",
    headline: "Visual-first booking experience",
    positioning:
      "Clean before/after storytelling with clear service packages and frictionless quote flow.",
    trustAngle:
      "Crafted to turn browsing homeowners into high-ticket project consultations.",
  },
  {
    industry: "Medical & Dental",
    headline: "Patient-friendly growth website",
    positioning:
      "Service pages, insurance clarity, and conversion pathways tailored for local patient demand.",
    trustAngle:
      "Built to earn confidence quickly and increase appointment requests from mobile visitors.",
  },
];

export default function DemoShowcaseSection() {
  return (
    <section id="demos" className="relative py-20 md:py-24">
      <div className="absolute inset-0 bg-[oklch(0.12_0.02_260)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-brand-orange/[0.05] rounded-full blur-3xl" />

      <div className="relative z-10 container">
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-14">
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
              Demo Sites
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
              See What Your Business Could{" "}
              <span className="text-gradient-orange">Look Like</span>
            </h2>
            <p className="mt-4 text-foreground/60 max-w-3xl mx-auto text-lg">
              These are strategic, conversion-focused demo websites built to show local
              business owners what a modern, high-performing web presence can do.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          {demos.map((demo, i) => (
            <ScrollReveal key={demo.industry} delay={i * 90}>
              <div className="group h-full rounded-xl border border-border bg-[oklch(0.15_0.02_260)] p-6 md:p-7 hover:border-brand-orange/40 transition-all duration-300">
                <div className="inline-flex items-center gap-2 text-brand-amber text-xs font-semibold uppercase tracking-wider mb-4">
                  <BriefcaseBusiness className="w-4 h-4" />
                  {demo.industry}
                </div>

                <h3 className="font-serif text-2xl text-white font-bold mb-3">
                  {demo.headline}
                </h3>

                <p className="text-foreground/65 leading-relaxed mb-4">
                  {demo.positioning}
                </p>

                <div className="rounded-lg border border-brand-orange/20 bg-brand-orange/[0.08] p-4 mb-6">
                  <div className="inline-flex items-center gap-2 text-brand-orange text-xs font-semibold uppercase tracking-wider mb-2">
                    <BadgeCheck className="w-4 h-4" />
                    Trust & Conversion Angle
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed">{demo.trustAngle}</p>
                </div>

                <button className="inline-flex items-center gap-2 text-sm font-semibold text-brand-orange group-hover:text-white transition-colors">
                  <Sparkles className="w-4 h-4" />
                  Want this style for your business?
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={120}>
          <div className="mt-10 md:mt-12 rounded-2xl border border-brand-orange/25 bg-gradient-to-br from-[oklch(0.15_0.03_50)] to-[oklch(0.12_0.02_260)] p-7 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center">
              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">
                  Your Current Website Might Be Costing You Deals
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  If your site feels outdated, slow, or unclear, prospects assume your service
                  is too. Let us build a custom version of one of these styles for your
                  business and market.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="bg-brand-orange hover:bg-brand-orange-bright text-white font-semibold glow-orange">
                  <Link href="/portfolio">
                    Explore All Demo Sites
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-white/25 text-white hover:bg-white/10">
                  <a href="#contact">Request My Version</a>
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
