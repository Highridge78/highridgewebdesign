import { Gauge, LayoutGrid, ShieldCheck, Sparkles } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const points = [
  {
    icon: Gauge,
    title: "Fast Load Speeds",
    copy: "Performance-optimized pages that reduce drop-off and keep leads engaged.",
  },
  {
    icon: LayoutGrid,
    title: "Mobile-First Layouts",
    copy: "Built for real local customers who browse and call from their phones.",
  },
  {
    icon: ShieldCheck,
    title: "Conversion-Focused UX",
    copy: "Clear offers, trust cues, and CTAs designed to drive more calls and forms.",
  },
  {
    icon: Sparkles,
    title: "AI + Automation Edge",
    copy: "Automated follow-up and AI chat workflows help you capture more opportunities.",
  },
];

export default function TrustStripSection() {
  return (
    <section className="relative py-14 md:py-16">
      <div className="absolute inset-0 bg-[oklch(0.11_0.02_260)]" />
      <div className="relative z-10 container">
        <ScrollReveal>
          <div className="text-center mb-8 md:mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
              Why Businesses Choose High Ridge
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {points.map((point, i) => (
            <ScrollReveal key={point.title} delay={i * 70}>
              <article className="rounded-xl border border-border bg-[oklch(0.15_0.02_260)] p-5 h-full">
                <div className="inline-flex w-10 h-10 rounded-lg bg-brand-orange/15 border border-brand-orange/30 items-center justify-center">
                  <point.icon className="w-5 h-5 text-brand-orange" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{point.title}</h3>
                <p className="mt-2 text-sm text-foreground/65 leading-relaxed">{point.copy}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
