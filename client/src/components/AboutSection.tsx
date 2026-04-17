/**
 * AboutSection — High Ridge Web Design
 * Positioning section clarifying fit, differentiation, and standards.
 */
import { BadgeCheck, Handshake, LineChart, ShieldCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const differentiators = [
  {
    icon: LineChart,
    title: "Built around conversion metrics",
    detail:
      "Every page has a specific job: generate calls, quote requests, and booked appointments.",
  },
  {
    icon: ShieldCheck,
    title: "Trust-first execution",
    detail:
      "We design for credibility with clear service proof, location relevance, and friction-free user paths.",
  },
  {
    icon: Handshake,
    title: "Partnership mindset",
    detail:
      "We align website strategy to your sales process, not just visual style preferences.",
  },
  {
    icon: BadgeCheck,
    title: "Serious growth standards",
    detail:
      "We are a fit for service businesses that care about lead quality, close rates, and ROI.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[oklch(0.12_0.02_260)]" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-orange/[0.03] to-transparent" />

      <div className="relative z-10 container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-14 md:mb-16">
          <ScrollReveal direction="left">
            <div>
              <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
                Why Highridge
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-3 mb-6">
                A Growth Partner for{" "}
                <span className="text-gradient-orange">Service Businesses</span>
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  Highridge Web Design helps contractors and local service
                  companies turn their website into a working sales asset. The goal
                  is simple: more qualified opportunities and more booked work.
                </p>
                <p>
                  We do not build brochure sites that look good but fail to
                  produce. We build structured, conversion-focused websites backed
                  by local search strategy and lead handling systems.
                </p>
                <p>
                  If you need stronger lead flow and a site that supports real
                  business goals, we are likely a fit. If you are shopping for the
                  cheapest build possible, we are not.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={150}>
            <div className="rounded-2xl border border-border bg-[oklch(0.15_0.02_260)] p-7">
              <picture className="mb-5 block overflow-hidden rounded-xl border border-border/70 bg-black/20">
                <source
                  srcSet="/images/founder-jeremy-460.avif 1x"
                  type="image/avif"
                />
                <source
                  srcSet="/images/founder-jeremy-460.webp 1x"
                  type="image/webp"
                />
                <img
                  src="/images/founder-jeremy-460.webp"
                  alt="Jeremy Black, Founder of Highridge Web Design"
                  loading="lazy"
                  decoding="async"
                  width={460}
                  height={235}
                  className="h-auto w-full object-cover"
                />
              </picture>
              <h3 className="font-serif text-xl font-bold text-white mb-5">
                Best-Fit Clients
              </h3>
              <ul className="space-y-3 text-sm text-foreground/75">
                {[
                  "Contractors and home service companies with active sales teams",
                  "Businesses doing solid work but underperforming online",
                  "Owners who want better-qualified leads, not just more traffic",
                  "Teams ready to invest in long-term conversion performance",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {differentiators.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 100}>
              <div className="h-full rounded-xl border border-border bg-[oklch(0.15_0.02_260)] p-6 hover:border-brand-orange/30 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-brand-orange" />
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
