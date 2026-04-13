/**
 * ServicesSection — High Ridge Web Design
 * Service cards focused on outcomes, conversions, visibility, and automation.
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
    title: "Websites That Turn Visitors Into Customers",
    subtitle: "Conversion First",
    image: SERVICES_WEB,
    description:
      "Your website should be your #1 sales tool. We build high-performance sites designed to turn traffic into real calls, leads, and paying customers.",
    features: [
      "Conversion-focused layouts",
      "Mobile-first, high-trust design",
      "Fast load speeds that keep visitors engaged",
      "Landing pages built to generate leads",
    ],
  },
  {
    icon: Search,
    title: "Get Found Where Customers Are Searching",
    subtitle: "Visibility Engine",
    image: "/seo-search-banner.webp",
    imageAvif: "/seo-search-banner.avif",
    description:
      "If customers can’t find you, they can’t hire you. We position your business to show up on Google and AI-powered search platforms.",
    features: [
      "Local SEO & Google Business optimization",
      "Visibility in AI search (ChatGPT, Perplexity)",
      "Structured data for better rankings",
      "Content strategy that drives traffic",
    ],
  },
  {
    icon: Bot,
    title: "AI That Captures Leads 24/7",
    subtitle: "Always Working",
    image: SERVICES_AI,
    description:
      "Never miss another lead. Our AI systems respond instantly, qualify prospects, and help convert visitors into booked customers — even while you sleep.",
    features: [
      "24/7 AI receptionist",
      "Instant response to inquiries",
      "Lead qualification automation",
      "Appointment booking systems",
    ],
  },
  {
    icon: Zap,
    title: "Automation That Saves You Time",
    subtitle: "Efficiency System",
    image: SERVICES_AUTO,
    description:
      "Stop wasting time on repetitive tasks. We build systems that streamline your business so you can focus on growth.",
    features: [
      "Automated scheduling systems",
      "Review generation automation",
      "Missed-call text-back",
      "CRM & follow-up automation",
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
              What We Do
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
              Websites & Systems Built to{" "}
              <span className="text-gradient-orange">Grow Your Business</span>
            </h2>
            <p className="mt-4 text-foreground/60 max-w-2xl mx-auto text-lg">
              We don’t just build websites — we build systems that bring in leads,
              increase visibility, and help your business grow consistently.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 120}>
              <div className="group relative rounded-xl overflow-hidden border border-border bg-card hover:border-brand-orange/40 transition-all duration-500 h-full">
                {service.image ? (
                  <div className="relative h-48 overflow-hidden">
                    <picture>
                      {"imageAvif" in service && service.imageAvif ? (
                        <source srcSet={service.imageAvif} type="image/avif" />
                      ) : null}
                      <img
                        src={service.image}
                        alt={service.title}
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
                        <service.icon className="w-5 h-5 text-brand-orange" />
                      </div>
                      <span className="text-xs font-medium text-brand-amber uppercase tracking-wider">
                        {service.subtitle}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-32 overflow-hidden bg-gradient-to-br from-brand-orange/10 via-brand-orange/5 to-transparent">
                    <div className="absolute inset-0 bg-[oklch(0.12_0.02_260)]" />
                    <div
                      className="absolute inset-0 opacity-[0.04]"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, oklch(0.75 0.18 55) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                      }}
                    />
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

                <div className="p-6 pt-4">
                  <h3 className="font-serif text-xl font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

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

                  <button
                    onClick={scrollToContact}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-orange hover:text-white hover:bg-brand-orange px-4 py-2 rounded-md transition-all duration-300"
                  >
                    Get Started
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
