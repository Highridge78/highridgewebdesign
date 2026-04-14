import { AlertCircle, ArrowRight, Smartphone, Timer, TrendingDown, SearchX } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { Button } from "@/components/ui/button";

const painPoints = [
  {
    icon: Timer,
    title: "Loads slow",
    detail: "Visitors leave before they even see your offer.",
  },
  {
    icon: AlertCircle,
    title: "Looks outdated",
    detail: "An old design can make good businesses look untrustworthy.",
  },
  {
    icon: Smartphone,
    title: "Hard to use on mobile",
    detail: "Most local buyers are searching from their phones.",
  },
  {
    icon: SearchX,
    title: "Doesn't show up well online",
    detail: "Weak visibility means your competitors get the calls.",
  },
  {
    icon: TrendingDown,
    title: "Doesn't bring in calls",
    detail: "No clear conversion path means missed revenue every week.",
  },
];

export default function PainPointSection() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-20 md:py-24">
      <div className="absolute inset-0 bg-[oklch(0.10_0.02_260)]" />
      <div className="relative z-10 container">
        <ScrollReveal>
          <div className="max-w-3xl">
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
              Growth Bottlenecks
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Is Your Website Costing You Customers?
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {painPoints.map((point, i) => (
            <ScrollReveal key={point.title} delay={i * 70}>
              <article className="rounded-xl border border-border bg-card p-6 h-full">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <point.icon className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{point.title}</h3>
                <p className="mt-2 text-sm text-foreground/65">{point.detail}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={220}>
          <div className="mt-10">
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-brand-orange hover:bg-brand-orange-bright text-white font-semibold px-8"
            >
              Let's Fix That
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
