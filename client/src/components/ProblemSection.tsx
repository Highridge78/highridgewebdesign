import { MessageSquareX, UserX, ShieldX, AlertTriangle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const problemPoints = [
  {
    icon: MessageSquareX,
    title: "Unclear Messaging",
    description:
      "Visitors land on your site and still don’t understand what you do or why they should call you.",
  },
  {
    icon: UserX,
    title: "Lost Leads",
    description:
      "People click around, get confused, and leave without taking action.",
  },
  {
    icon: ShieldX,
    title: "Weak Trust Signals",
    description:
      "Outdated design, generic copy, and lack of proof make your business feel risky.",
  },
  {
    icon: AlertTriangle,
    title: "Low Conversion Rates",
    description:
      "Traffic alone doesn’t grow your business. If your site can’t convert, your marketing is wasted.",
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
              Why Most Websites Fail
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 max-w-4xl mx-auto">
              Most Websites Look Fine — But Quietly{" "}
              <span className="text-gradient-orange">Lose Leads Every Day</span>
            </h2>
            <p className="mt-4 text-foreground/60 max-w-3xl mx-auto text-lg">
              If your website isn’t built to guide action, build trust fast, and
              make contacting you effortless, potential customers leave and hire
              someone else.
            </p>
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
            If your website isn’t actively generating leads, it’s not doing its
            job.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
