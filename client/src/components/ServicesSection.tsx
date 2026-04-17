/**
 * ServicesSection — High Ridge Web Design
 * Conversion-centered services with optimized responsive media.
 */
import { ArrowRight, Bot, Globe, Search, Zap } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const services = [
  {
    icon: Globe,
    title: "Conversion-Focused Website Design",
    subtitle: "Sales-First UX",
    image: "/services-web-960.webp",
    imageAvif: "/services-web-960.avif",
    description:
      "We design fast websites that guide visitors to one clear action: call, book, or request a quote.",
    features: [
      "Clear offer positioning above the fold",
      "Trust-building design and social proof placement",
      "Mobile-first layouts with fast load performance",
      "Landing page structure built to convert",
    ],
  },
  {
    icon: Search,
    title: "Local SEO and Search Visibility",
    subtitle: "Findability System",
    image: "/seo-search-banner.webp",
    imageAvif: "/seo-search-banner.avif",
    description:
      "We help your business rank where customers search, from Google maps to AI-assisted answer engines.",
    features: [
      "Google Business Profile optimization",
      "Location and service page SEO strategy",
      "Schema markup and crawl-ready structure",
      "Content planning for long-term visibility",
    ],
  },
  {
    icon: Bot,
    title: "AI Lead Capture and Qualification",
    subtitle: "24/7 Response Engine",
    image: "/services-ai-960.webp",
    imageAvif: "/services-ai-960.avif",
    description:
      "Capture leads instantly with AI chat and response flows that qualify prospects while your team is busy.",
    features: [
      "Instant response for high-intent visitors",
      "Lead qualification and handoff workflows",
      "Automated follow-up sequencing",
      "Calendar and CRM-ready integrations",
    ],
  },
  {
    icon: Zap,
    title: "Operations and Follow-Up Automation",
    subtitle: "Efficiency Layer",
    image: "/services-auto-960.webp",
    imageAvif: "/services-auto-960.avif",
    description:
      "We automate repetitive tasks so your team spends less time chasing leads and more time closing jobs.",
    features: [
      "Missed-call text-back automations",
      "Review request and nurture sequences",
      "Pipeline stage and status automation",
      "Owner-friendly dashboards and alerts",
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
          <header className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">Services</p>
            <h2 className="mt-3 text-balance font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Growth Systems Built for Service Businesses
            </h2>
            <p className="mt-4 text-lg text-foreground/70">
              Every service is designed to improve one thing: more qualified leads from your website.
            </p>
          </header>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 120}>
              <article className="group relative h-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 hover:border-brand-orange/40">
                <div className="relative h-48 overflow-hidden">
                  <picture>
                    <source srcSet={service.imageAvif} type="image/avif" />
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-orange/30 bg-brand-orange/20">
                      <service.icon className="h-5 w-5 text-brand-orange" />
                    </span>
                    <span className="text-xs font-medium uppercase tracking-wider text-brand-amber">{service.subtitle}</span>
                  </div>
                </div>

                <div className="p-6 pt-4">
                  <h3 className="mb-3 font-serif text-2xl font-bold text-white">{service.title}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-foreground/70">{service.description}</p>

                  <ul className="mb-6 space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={scrollToContact}
                    className="inline-flex min-h-10 items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-brand-orange transition-all duration-300 hover:bg-brand-orange hover:text-white"
                  >
                    Book a Strategy Call
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand-orange to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
