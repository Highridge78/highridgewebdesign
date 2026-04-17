/**
 * ResultsSection — High Ridge Web Design
 * Trust, proof, and conversion support blocks.
 */
import { ArrowRight, BadgeCheck, Building2, Home, Scale, Stethoscope, TreePine, Wrench } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const trustIndicators = [
  "Mobile-first builds optimized for speed and clarity",
  "SEO and structured data setup included",
  "24/7 lead capture with automation-ready workflows",
  "Clear reporting focused on calls, leads, and booked jobs",
];

const portfolioPlaceholders = [
  {
    title: "Contractor Lead-Gen Site",
    type: "Portfolio Placeholder",
    summary: "Landing page + quote funnel focused on booked estimate requests.",
  },
  {
    title: "Local Law Firm Redesign",
    type: "Portfolio Placeholder",
    summary: "Trust-focused service pages with stronger call and consultation CTAs.",
  },
  {
    title: "Home Services Automation Stack",
    type: "Portfolio Placeholder",
    summary: "Website + AI chat + follow-up automation for missed-call recovery.",
  },
];

const testimonialPlaceholders = [
  {
    quote:
      "Placeholder testimonial: This section can highlight a specific conversion win and turnaround timeline.",
    byline: "Client Name, Business Type",
  },
  {
    quote:
      "Placeholder testimonial: Use this space for before/after outcomes such as lead volume or response speed.",
    byline: "Client Name, Service Industry",
  },
  {
    quote:
      "Placeholder testimonial: Include a trust-building quote focused on communication and measurable results.",
    byline: "Client Name, Local Market",
  },
];

const industries = [
  { icon: Wrench, name: "HVAC & Plumbing", pain: "Leads drop when calls are missed" },
  { icon: Scale, name: "Law Firms", pain: "Consultation inquiries need quick response" },
  { icon: TreePine, name: "Landscaping", pain: "Seasonal traffic needs better conversion" },
  { icon: Building2, name: "Contractors", pain: "Quote requests need cleaner qualification" },
  { icon: Stethoscope, name: "Medical & Dental", pain: "Trust and clarity impact bookings" },
  { icon: Home, name: "Real Estate", pain: "Speed-to-lead determines closed deals" },
];

const processSteps = [
  {
    step: "01",
    title: "Audit",
    description: "We review conversion leaks, message clarity, and technical performance.",
  },
  {
    step: "02",
    title: "Plan",
    description: "We build a tailored strategy for website, SEO, and lead automation.",
  },
  {
    step: "03",
    title: "Launch",
    description: "We ship a responsive conversion-first site with clean tracking setup.",
  },
  {
    step: "04",
    title: "Optimize",
    description: "We refine based on real user behavior, lead quality, and close rates.",
  },
];

export default function ResultsSection() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="proof" className="relative py-20 md:py-24">
      <div className="absolute inset-0 bg-[oklch(0.10_0.02_260)]" />

      <div className="relative z-10 container space-y-14 md:space-y-18">
        <ScrollReveal>
          <header className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">Proof and Trust</p>
            <h2 className="mt-3 text-balance font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              A Website Growth System Built to Earn Trust and Drive Action
            </h2>
            <p className="mt-4 text-lg text-foreground/70">
              This section combines proof points, industry fit, and process clarity to reduce friction before the CTA.
            </p>
          </header>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {trustIndicators.map((item, i) => (
            <ScrollReveal key={item} delay={i * 80}>
              <div className="flex h-full items-start gap-3 rounded-xl border border-border bg-[oklch(0.15_0.02_260)] p-5">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                <p className="text-sm text-foreground/85">{item}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div id="portfolio">
          <ScrollReveal>
            <h3 className="text-center font-serif text-2xl font-bold text-white md:text-3xl">
              Featured Work (Placeholder Cards)
            </h3>
          </ScrollReveal>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {portfolioPlaceholders.map((project, i) => (
              <ScrollReveal key={project.title} delay={i * 90}>
                <article className="h-full rounded-xl border border-border bg-[oklch(0.15_0.02_260)] p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-amber">{project.type}</p>
                  <h4 className="mt-2 font-serif text-xl font-bold text-white">{project.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/70">{project.summary}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div>
          <ScrollReveal>
            <h3 className="text-center font-serif text-2xl font-bold text-white md:text-3xl">
              Client Feedback (Placeholder Testimonials)
            </h3>
          </ScrollReveal>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {testimonialPlaceholders.map((testimonial, i) => (
              <ScrollReveal key={testimonial.byline} delay={i * 90}>
                <blockquote className="h-full rounded-xl border border-border bg-[oklch(0.15_0.02_260)] p-6">
                  <p className="text-sm leading-relaxed text-foreground/80">"{testimonial.quote}"</p>
                  <footer className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand-amber">
                    {testimonial.byline}
                  </footer>
                </blockquote>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div>
          <ScrollReveal>
            <h3 className="text-center font-serif text-2xl font-bold text-white md:text-3xl">
              Built for High-Urgency Local Industries
            </h3>
          </ScrollReveal>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {industries.map((industry, i) => (
              <ScrollReveal key={industry.name} delay={i * 70}>
                <article className="h-full rounded-xl border border-border bg-[oklch(0.15_0.02_260)] p-4 text-center">
                  <span className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-brand-orange/20 bg-brand-orange/10">
                    <industry.icon className="h-5 w-5 text-brand-orange" />
                  </span>
                  <h4 className="text-sm font-semibold text-white">{industry.name}</h4>
                  <p className="mt-1 text-xs text-foreground/55">{industry.pain}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div>
          <ScrollReveal>
            <h3 className="text-center font-serif text-2xl font-bold text-white md:text-3xl">Simple 4-Step Process</h3>
          </ScrollReveal>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 100}>
                <article className="h-full rounded-xl border border-border bg-[oklch(0.15_0.02_260)] p-6">
                  <p className="text-4xl font-bold font-serif text-brand-orange/25">{step.step}</p>
                  <h4 className="mt-2 font-serif text-xl font-bold text-white">{step.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">{step.description}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal>
          <div className="rounded-2xl border border-brand-orange/20 bg-gradient-to-br from-[oklch(0.15_0.03_50)] to-[oklch(0.12_0.02_260)] p-8 md:p-12">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.25fr_0.75fr]">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white md:text-3xl">
                  Ready to Turn Your Website into a Lead Engine?
                </h3>
                <p className="mt-4 leading-relaxed text-foreground/75">
                  We map your biggest conversion gaps and show exactly what to improve first for faster results.
                </p>
                <button
                  onClick={scrollToContact}
                  className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand-orange px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-brand-orange-bright"
                >
                  Get My Free Website Audit
                  <ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-3 text-sm text-white/70">No obligation. Actionable recommendations in one call.</p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { value: "Fast", label: "Load + UX Focus" },
                  { value: "Clear", label: "Messaging + Offer" },
                  { value: "Proven", label: "Trust-First Flow" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-lg border border-white/10 bg-black/20 p-3">
                    <p className="text-2xl font-bold font-serif text-brand-orange">{stat.value}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-foreground/60">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
