import { CheckCircle2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const systemPillars = [
  {
    title: "Conversion-Focused Structure",
    description:
      "We map each page around clear offers, trust cues, and calls to action so more visitors become real inquiries.",
  },
  {
    title: "Messaging That Builds Trust Fast",
    description:
      "We clarify what you do, who you help, and why clients should choose you, so prospects know they are in the right place.",
  },
  {
    title: "Performance That Protects Leads",
    description:
      "Fast load times, clean mobile UX, and friction-free forms keep prospects from dropping off before they contact you.",
  },
];

export default function SolutionSection() {
  return (
    <section id="solution" className="relative py-20 md:py-24">
      <div className="absolute inset-0 bg-[oklch(0.11_0.02_260)]" />

      <div className="relative z-10 container">
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-14">
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
              The Solution
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 max-w-4xl mx-auto">
              A Lead-Generation System, Not Just a Website
            </h2>
            <p className="mt-4 text-foreground/65 max-w-3xl mx-auto text-lg">
              We combine conversion strategy, clear messaging, and technical
              performance to build websites that consistently turn traffic into
              booked jobs.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {systemPillars.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 120}>
              <div className="h-full rounded-xl border border-border bg-[oklch(0.15_0.02_260)] p-6 hover:border-brand-orange/35 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-orange/15 border border-brand-orange/30 mb-4">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-foreground/65 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
