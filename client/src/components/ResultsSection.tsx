/**
 * ResultsSection — High Ridge Web Design
 * Social proof, target industries, and process overview.
 */
import {
  Wrench,
  Scale,
  TreePine,
  Building2,
  Stethoscope,
  Home,
  ArrowRight,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const industries = [
  { icon: Wrench, name: "HVAC & Plumbing", pain: "Missing calls on the job" },
  { icon: Scale, name: "Law Firms", pain: "Qualifying leads manually" },
  { icon: TreePine, name: "Landscapers", pain: "No online presence" },
  { icon: Building2, name: "Contractors", pain: "Losing bids to competitors" },
  { icon: Stethoscope, name: "Medical & Dental", pain: "High no-show rates" },
  { icon: Home, name: "Real Estate", pain: "Slow follow-up on inquiries" },
];

const processSteps = [
  {
    step: "01",
    title: "Free Audit",
    description:
      "We analyze your current digital presence, identify gaps, and show you exactly where you're losing leads.",
  },
  {
    step: "02",
    title: "Custom Strategy",
    description:
      "We build a tailored plan combining web design, AI bots, and automations specific to your industry.",
  },
  {
    step: "03",
    title: "Build & Launch",
    description:
      "We design, develop, and deploy your complete system — fast. Most projects go live within 2-3 weeks.",
  },
  {
    step: "04",
    title: "Grow & Optimize",
    description:
      "We monitor performance, optimize conversions, and scale your automations as your business grows.",
  },
];

export default function ResultsSection() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="results" className="relative py-20 md:py-24">
      <div className="absolute inset-0 bg-[oklch(0.10_0.02_260)]" />

      <div className="relative z-10 container">
        <div className="mb-16 md:mb-20">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
                Who We Serve
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
                Built for{" "}
                <span className="text-gradient-orange">Local Businesses</span>
              </h2>
              <p className="mt-4 text-foreground/60 max-w-2xl mx-auto">
                We specialize in industries where speed, trust, and local
                reputation are everything.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((ind, i) => (
              <ScrollReveal key={ind.name} delay={i * 80}>
                <div className="group p-4 rounded-xl bg-[oklch(0.15_0.02_260)] border border-border hover:border-brand-orange/30 transition-all duration-300 text-center h-full">
                  <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center group-hover:bg-brand-orange/20 transition-colors">
                    <ind.icon className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div className="text-sm font-semibold text-white mb-1">
                    {ind.name}
                  </div>
                  <div className="text-xs text-foreground/40">{ind.pain}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="mb-16 md:mb-20">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
                Our Process
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
                From Audit to{" "}
                <span className="text-gradient-orange">Autopilot</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 120}>
                <div className="relative h-full">
                  <div className="p-6 rounded-xl bg-[oklch(0.15_0.02_260)] border border-border h-full hover:border-brand-orange/30 transition-all duration-300">
                    <div className="text-4xl font-bold font-serif text-brand-orange/20 mb-3">
                      {step.step}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {i < processSteps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-brand-orange/30" />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal>
          <div className="rounded-2xl bg-gradient-to-br from-[oklch(0.15_0.03_50)] to-[oklch(0.12_0.02_260)] border border-brand-orange/20 p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
                  Your Website Is Costing You Customers Right Now
                </h3>
                <p className="text-foreground/60 mb-6 leading-relaxed">
                  If your website isn’t generating consistent leads, it’s actively costing you money. Every missed call, slow response, or weak design is sending potential customers straight to your competitors.
                </p>
                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-bright text-white font-semibold px-6 py-3 rounded-lg shadow-[0_0_25px_rgba(255,106,0,0.35)] transition-all duration-300"
                >
                  Get My Free Website Audit
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="mt-4 text-sm text-white/70">
                  Takes less than 60 seconds — no commitment required
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { value: "Fast", label: "Turnaround Times" },
                  { value: "Local", label: "Business Focus" },
                  { value: "Real", label: "Results That Matter" },
                ].map((s) => (
                  <div key={s.label} className="p-4">
                    <div className="text-2xl md:text-3xl font-bold font-serif text-brand-orange">
                      {s.value}
                    </div>
                    <div className="text-xs text-foreground/50 mt-1 uppercase tracking-wider">
                      {s.label}
                    </div>
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
