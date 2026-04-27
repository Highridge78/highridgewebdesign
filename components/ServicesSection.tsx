"use client";

/**
 * ServicesSection — High Ridge Web Design
 * Reframes services as one integrated lead generation system.
 */
import { Globe, Bot, Zap, Search, ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const systemSteps = [
  {
    icon: Globe,
    title: "Conversion-First Website Build",
    subtitle: "Your digital sales rep",
    image: "/services-web-960.webp",
    imageAvif: "/services-web-960.avif",
    description:
      "We build every page to move visitors toward action: call, form, quote request, or booked appointment.",
    features: [
      "Clear service pages with strong call intent",
      "Trust-focused layout and mobile UX",
      "Fast load speed and technical quality",
      "Quote, call, and form paths above the fold",
    ],
  },
  {
    icon: Search,
    title: "Local Search Visibility Layer",
    subtitle: "Get found by ready buyers",
    image: "/seo-search-banner.webp",
    imageAvif: "/seo-search-banner.avif",
    description:
      "A high-converting site only matters if the right people can find it. We build SEO structure around your real services and service area.",
    features: [
      "Service + city page framework",
      "Google Business Profile alignment",
      "On-page SEO structure and schema",
      "Content plan tied to lead intent",
    ],
  },
  {
    icon: Bot,
    title: "Lead Capture and Speed-to-Lead",
    subtitle: "Never miss a high-intent lead",
    image: "/services-ai-960.webp",
    imageAvif: "/services-ai-960.avif",
    description:
      "When prospects are ready, response speed wins. We set up instant capture and follow-up so good leads are not lost to faster competitors.",
    features: [
      "Smart intake flows for qualified inquiries",
      "Instant lead acknowledgment",
      "Qualification prompts for fit and urgency",
      "Calendar and handoff routing options",
    ],
  },
  {
    icon: Zap,
    title: "Follow-Up and Revenue Workflows",
    subtitle: "Pipeline, not just pages",
    image: "/services-auto-960.webp",
    imageAvif: "/services-auto-960.avif",
    description:
      "We connect your website to the follow-up layer so prospects are nurtured, opportunities are tracked, and booked work increases over time.",
    features: [
      "Missed-call and form follow-up sequences",
      "Estimate request routing and reminders",
      "Review generation workflows",
      "Simple CRM and dashboard handoff",
    ],
  },
];

export default function ServicesSection() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="relative py-20 md:py-24">
      <div className="absolute inset-0 bg-[oklch(0.10_0.02_260)]" />

      <div className="relative z-10 container">
        <ScrollReveal>
          <div className="text-center mb-14 md:mb-16">
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
              How We Build Growth
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
              One System. Four Layers.{" "}
              <span className="text-gradient-orange">Built to Generate Revenue.</span>
            </h2>
            <p className="mt-4 text-foreground/60 max-w-3xl mx-auto text-lg">
              This is not "just a website package." We build the full front-end lead
              engine: conversion design, local visibility, lead capture, and follow-up.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {systemSteps.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 120}>
              <div className="group relative rounded-xl overflow-hidden border border-border bg-card hover:border-brand-orange/40 transition-all duration-500 h-full">
                <div className="relative h-48 overflow-hidden">
                  <picture>
                    <source srcSet={step.imageAvif} type="image/avif" />
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      width={960}
                      height={640}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  <div className="absolute bottom-4 left-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-orange/20 border border-brand-orange/30 flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-brand-orange" />
                    </div>
                    <span className="text-xs font-medium text-brand-amber uppercase tracking-wider">
                      {step.subtitle}
                    </span>
                  </div>
                </div>

                <div className="p-6 pt-4">
                  <h3 className="font-serif text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed mb-5">
                    {step.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {step.features.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-foreground/70"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={scrollToContact}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-orange hover:text-white hover:bg-brand-orange px-4 py-2 rounded-md transition-all duration-300"
                  >
                    Discuss Your Growth Plan
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-orange to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
