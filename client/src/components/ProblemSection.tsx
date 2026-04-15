import { MessageSquareX, CircleOff, MousePointerClick, Smartphone } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const problemPoints = [
  {
    icon: MessageSquareX,
    title: "Unclear Messaging",
    description:
      "Visitors don't understand what you do within seconds, so they leave before they ever contact you.",
  },
  {
    icon: CircleOff,
    title: "No Clear Advantage",
    description:
      "Your site gives no compelling reason to choose you over nearby competitors who look more trustworthy.",
  },
  {
    icon: MousePointerClick,
    title: "Weak Calls to Action",
    description:
      "If people can't quickly see what to do next, they won't call, request a quote, or book an appointment.",
  },
  {
    icon: Smartphone,
    title: "Poor Mobile Experience",
    description:
      "Most traffic is mobile. Slow pages and clunky layouts kill conversions before visitors take action.",
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="relative py-20 md:py-24">
      <div className="absolute inset-0 bg-[oklch(0.10_0.02_260)]" />

      <div className="relative z-10 container">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
              The Problem
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 max-w-4xl mx-auto">
              Most Websites Quietly{" "}
              <span className="text-gradient-orange">Lose Leads Every Day</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problemPoints.map((point, index) => (
            <ScrollReveal key={point.title} delay={index * 90}>
              <article className="h-full rounded-xl border border-border bg-[oklch(0.15_0.02_260)] p-6 hover:border-brand-orange/35 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/25 flex items-center justify-center mb-4">
                  <point.icon className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-3">
                  {point.title}
                </h3>
                <p className="text-sm text-foreground/65 leading-relaxed">
                  {point.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={220}>
          <p className="mt-10 text-center text-lg text-foreground/70 max-w-3xl mx-auto">
            If your site isn&apos;t actively generating leads, it&apos;s not doing its
            job.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
