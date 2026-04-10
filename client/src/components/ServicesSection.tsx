/**
 * ServicesSection — High Ridge Web Design
 * Four service pillars: Web Design & Remodeling, SEO & AI Search, AI Bots, Business Automation.
 * Dark cards with orange accent borders and generated service images.
 */
import { Globe, Bot, Zap, Search, ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const SERVICES_WEB =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663455642890/NdrKoxrvNzAjAncKbyczK5/services-web-L7PL3M9GEdLC28yTUAy6uP.webp";
const SERVICES_AI =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663455642890/NdrKoxrvNzAjAncKbyczK5/services-ai-Pc2uLtLVbDvCAwwNrvF7Cm.webp";
const SERVICES_AUTO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663455642890/NdrKoxrvNzAjAncKbyczK5/services-auto-RUTvdvHyYcCR6C5FshLFqK.webp";

const services = [
  {
    icon: Globe,
    title: "Custom Web Design & Remodeling",
    subtitle: "The Foundation",
    image: SERVICES_WEB,
    description:
      "Whether you need a brand-new site or your current one is outdated and underperforming, we build and remodel websites that turn visitors into paying customers.",
    features: [
      "Custom-coded, blazing-fast websites",
      "Full redesigns of outdated or underperforming sites",
      "Mobile-first responsive design",
      "High-converting landing pages",
    ],
  },
  {
    icon: Search,
    title: "SEO & AI Search Optimization",
    subtitle: "The Visibility Engine",
    image: null,
    description:
      "Ranking on Google is just the beginning. We optimize your business to appear in AI-powered search results from ChatGPT, Perplexity, Google AI Overviews, and beyond — so customers find you no matter how they search.",
    features: [
      "Local SEO & Google Business optimization",
      "AI search engine visibility (ChatGPT, Perplexity)",
      "Structured data & schema markup",
      "Content strategy for traditional & AI search",
    ],
  },
  {
    icon: Bot,
    title: "AI Chatbots",
    subtitle: "The Growth Engine",
    image: SERVICES_AI,
    description:
      "Intelligent AI assistants that answer questions, qualify leads, and book appointments 24/7 — even while you sleep.",
    features: [
      "24/7 AI receptionist",
      "Instant quote & estimate bots",
      "Lead qualification on autopilot",
      "Seamless CRM integration",
    ],
  },
  {
    icon: Zap,
    title: "Business Automation",
    subtitle: "The Efficiency Suite",
    image: SERVICES_AUTO,
    description:
      "Automated workflows that eliminate busywork — from appointment scheduling to review generation and missed-call text-back.",
    features: [
      "Automated appointment scheduling",
      "Review generation systems",
      "Missed call text-back",
      "CRM & email automation",
    ],
  },
];

export default function ServicesSection() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="relative py-20 md:py-24">
      {/* Section background */}
      <div className="absolute inset-0 bg-[oklch(0.10_0.02_260)]" />

      <div className="relative z-10 container">
        {/* Section header */}
        <ScrollReveal>
          <div className="text-center mb-14 md:mb-16">
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
              What We Do
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
              Four Pillars of{" "}
              <span className="text-gradient-orange">Digital Growth</span>
            </h2>
            <p className="mt-4 text-foreground/60 max-w-2xl mx-auto text-lg">
              We don't just build websites. We build automated systems that
              capture leads, dominate search results, and save you hours every week.
            </p>
          </div>
        </ScrollReveal>

        {/* Service cards — 2x2 grid on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 120}>
              <div className="group relative rounded-xl overflow-hidden border border-border bg-card hover:border-brand-orange/40 transition-all duration-500 h-full">
                {/* Image (if available) */}
                {service.image ? (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                    {/* Icon badge */}
                    <div className="absolute bottom-4 left-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-orange/20 border border-brand-orange/30 flex items-center justify-center">
                        <service.icon className="w-5 h-5 text-brand-orange" />
                      </div>
                      <span className="text-xs font-medium text-brand-amber uppercase tracking-wider">
                        {service.subtitle}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* No image — icon header */
                  <div className="relative h-32 overflow-hidden bg-gradient-to-br from-brand-orange/10 via-brand-orange/5 to-transparent">
                    <div className="absolute inset-0 bg-[oklch(0.12_0.02_260)]" />
                    {/* Decorative search grid pattern */}
                    <div className="absolute inset-0 opacity-[0.04]" style={{
                      backgroundImage: `radial-gradient(circle, oklch(0.75 0.18 55) 1px, transparent 1px)`,
                      backgroundSize: '24px 24px'
                    }} />
                    <div className="absolute bottom-4 left-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-orange/20 border border-brand-orange/30 flex items-center justify-center">
                        <service.icon className="w-5 h-5 text-brand-orange" />
                      </div>
                      <span className="text-xs font-medium text-brand-amber uppercase tracking-wider">
                        {service.subtitle}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6 pt-4">
                  <h3 className="font-serif text-xl font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Feature list */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2 text-sm text-foreground/70"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={scrollToContact}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-orange hover:text-brand-orange-bright transition-colors group/btn"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-orange to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
