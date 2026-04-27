import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { localBusinessAudience, objectionFaq, trustBarItems } from "../data";

const featuredWork = [
  {
    title: "Regional HVAC Group",
    summary: "Modernized brand presentation and lead capture flow for premium residential installs.",
  },
  {
    title: "Boutique Family Law Firm",
    summary: "Refined digital positioning to attract higher-intent consultation requests.",
  },
  {
    title: "Luxury Outdoor Builder",
    summary: "Elevated trust and project value perception with visual-first storytelling.",
  },
];

const services = [
  {
    name: "Strategic Website Design",
    detail:
      "Conversion architecture, copy strategy, and premium visual design tailored to your ideal clients.",
  },
  {
    name: "AI Assistant Integration",
    detail:
      "A custom chatbot trained on your offers to capture and qualify leads around the clock.",
  },
  {
    name: "Automation Systems",
    detail:
      "Follow-up workflows, appointment nurturing, and lead routing so no opportunity is lost.",
  },
];

const testimonials = [
  {
    quote:
      "Their team repositioned our entire online presence. We started attracting better-fit clients almost immediately.",
    name: "L. Mitchell",
    role: "Managing Partner, Mitchell Legal Group",
  },
  {
    quote:
      "The website feels premium and intentional. It now reflects the caliber of our actual service.",
    name: "D. Carter",
    role: "Owner, Carter Elite Contracting",
  },
];

const process = [
  {
    title: "Discovery & Positioning",
    body: "We define your differentiators, market position, and ideal conversion journey.",
  },
  {
    title: "Design & Systems Architecture",
    body: "We craft your website and AI-enhanced flow to support trust, speed, and lead quality.",
  },
  {
    title: "Launch & Performance Iteration",
    body: "After launch, we refine conversion points based on behavior and inquiry patterns.",
  },
];

export const metadata: Metadata = {
  title: "Demo: Premium Agency Website Concept",
  description:
    "A high-ticket premium agency concept for local brands that need stronger positioning, trust, and conversion quality.",
  alternates: {
    canonical: "https://highridgewebdesign.com/demos/demo-premium",
  },
};

export default function DemoPremium() {
  return (
    <div className="min-h-screen bg-[oklch(0.09_0.02_260)] text-foreground">
      <main>
        <section className="border-b border-white/10 bg-[oklch(0.08_0.02_260)] py-3">
          <div className="container max-w-5xl flex flex-wrap items-center gap-3 text-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-foreground/80 hover:bg-white/8 hover:text-white transition-colors"
            >
              Back to main site
            </Link>
            <Link
              href="/demos"
              className="inline-flex items-center gap-2 rounded-full border border-brand-orange/30 px-4 py-2 text-brand-orange hover:bg-brand-orange/10 transition-colors"
            >
              Back to demo index
            </Link>
          </div>
        </section>

        <section className="relative py-24 md:py-36">
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.08_0.02_260)] to-[oklch(0.12_0.02_260)]" />
          <div className="relative z-10 container max-w-5xl">
            <p className="text-xs tracking-[0.24em] uppercase text-brand-amber/80">
              High Ridge Concept II
            </p>
            <h1 className="mt-6 font-serif text-4xl md:text-6xl leading-tight font-semibold text-white max-w-4xl">
              We Design High-Performance Digital Experiences for Growing Brands
            </h1>
            <p className="mt-8 max-w-3xl text-lg md:text-xl text-foreground/70 leading-relaxed">
              For local businesses ready to be perceived as market leaders, we combine elegant
              design with AI-enabled systems that improve lead quality and client experience.
            </p>
            <p className="mt-3 text-sm text-foreground/60">{localBusinessAudience}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                asChild
                className="rounded-full bg-brand-orange px-7 py-3.5 text-sm font-semibold text-white hover:bg-brand-orange-bright"
              >
                <Link href="/#contact">
                  Start a Project
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Link
                href="/demos"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Back to Demo Index
              </Link>
            </div>
          </div>
        </section>

        <section className="py-8 border-y border-white/10">
          <div className="container max-w-5xl grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {trustBarItems.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/10 bg-[oklch(0.13_0.02_260)] px-4 py-3 text-sm text-foreground/75"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="container max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 md:gap-14 items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-brand-orange/80">
                  Brand Positioning
                </p>
                <h2 className="mt-3 font-serif text-3xl md:text-4xl text-white leading-tight">
                  Premium design backed by strategic growth systems
                </h2>
              </div>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  Most agency websites either look beautiful or convert well. Our philosophy is to
                  deliver both. Every page, headline, and interaction is aligned to your business
                  goals, not template trends.
                </p>
                <p>
                  We build websites that communicate expertise in seconds, then guide visitors into
                  high-intent actions with AI support and automation behind the scenes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 border-y border-white/10">
          <div className="container max-w-5xl">
            <div className="space-y-10">
              {services.map((service, idx) => (
                <article
                  key={service.name}
                  className={cn(
                    "grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-6 md:gap-10 pb-10",
                    idx < services.length - 1 ? "border-b border-white/10" : ""
                  )}
                >
                  <h3 className="font-serif text-2xl text-white">{service.name}</h3>
                  <p className="text-foreground/70 leading-relaxed">{service.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="container max-w-5xl">
            <p className="text-xs uppercase tracking-[0.2em] text-brand-orange/80 mb-4">
              Featured Work Direction
            </p>
            <div className="space-y-5">
              {featuredWork.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-[oklch(0.13_0.02_260)] p-7 md:p-8"
                >
                  <h3 className="font-serif text-2xl text-white">{item.title}</h3>
                  <p className="mt-2 text-foreground/70">{item.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 border-y border-white/10">
          <div className="container max-w-5xl">
            <p className="text-xs uppercase tracking-[0.2em] text-brand-orange/80 mb-4">Process</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {process.map((step) => (
                <article
                  key={step.title}
                  className="rounded-xl border border-white/10 bg-[oklch(0.13_0.02_260)] p-6"
                >
                  <h3 className="font-serif text-xl text-white">{step.title}</h3>
                  <p className="mt-2 text-foreground/70 text-sm leading-relaxed">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="container max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial) => (
                <blockquote
                  key={testimonial.name}
                  className="rounded-2xl border border-white/10 bg-[oklch(0.13_0.02_260)] p-7 md:p-8"
                >
                  <p className="text-foreground/80 leading-relaxed">“{testimonial.quote}”</p>
                  <footer className="mt-5 border-t border-white/10 pt-4">
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-xs uppercase tracking-wider text-foreground/50">
                      {testimonial.role}
                    </p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 border-y border-white/10">
          <div className="container max-w-5xl">
            <h2 className="font-serif text-3xl font-bold text-white">Strategic outcomes for premium brands</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {[
                "Sharper positioning that filters out low-fit inquiries.",
                "Higher perceived value through intentional brand storytelling.",
                "AI-supported response systems that protect lead quality.",
              ].map((point) => (
                <article key={point} className="rounded-xl border border-white/10 bg-[oklch(0.13_0.02_260)] p-5">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-brand-orange shrink-0" />
                    <p className="text-sm leading-relaxed text-foreground/75">{point}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container max-w-4xl">
            <h2 className="font-serif text-3xl md:text-4xl text-white">Frequently asked questions</h2>
            <div className="mt-6 space-y-4">
              {objectionFaq.map((faq) => (
                <article key={faq.question} className="rounded-xl border border-white/10 bg-[oklch(0.13_0.02_260)] p-5">
                  <h3 className="text-base font-semibold text-white">{faq.question}</h3>
                  <p className="mt-2 text-sm text-foreground/70">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container max-w-4xl">
            <div className="rounded-2xl border border-brand-orange/25 bg-gradient-to-br from-[oklch(0.15_0.03_50)] to-[oklch(0.12_0.02_260)] p-8 md:p-10 text-center">
              <div className="inline-flex items-center gap-2 text-brand-orange text-xs uppercase tracking-[0.2em] font-semibold mb-4">
                <CheckCircle2 className="w-4 h-4" />
                Premium Growth Partner
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-white">
                Ready for a website that reflects the quality of your business?
              </h2>
              <p className="mt-4 text-foreground/70 leading-relaxed">
                We’ll design a premium digital experience that increases trust, captures better
                leads, and scales with your growth goals.
              </p>
              <Button
                asChild
                className="mt-8 rounded-full bg-brand-orange px-8 py-3.5 text-sm font-semibold text-white hover:bg-brand-orange-bright"
              >
                <Link href="/#contact">
                  Start a Project
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <div className="mt-4">
                <Link
                  href="/demos"
                  className="text-sm font-semibold text-white/75 hover:text-white transition-colors"
                >
                  Or compare all demo concepts
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
