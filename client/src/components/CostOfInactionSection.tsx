import { Gauge, PhoneMissed, CircleDollarSign, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

const costs = [
  {
    icon: PhoneMissed,
    text: "Missed calls from ready-to-buy customers",
  },
  {
    icon: TrendingDown,
    text: "Lost jobs to competitors with better websites",
  },
  {
    icon: CircleDollarSign,
    text: "Wasted ad spend sent into a weak funnel",
  },
  {
    icon: Gauge,
    text: "Slower growth than your market potential",
  },
];

export default function CostOfInactionSection() {
  const scrollToAudit = () => {
    document.querySelector("#audit-offer")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="cost-of-inaction" className="relative py-20 md:py-24">
      <div className="absolute inset-0 bg-[oklch(0.11_0.02_260)]" />

      <div className="relative z-10 container">
        <ScrollReveal>
          <div className="text-center max-w-4xl mx-auto">
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
              What It&apos;s Costing You
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
              What This Is Actually Costing You
            </h2>
            <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
              A weak website does more than look outdated. It quietly slows growth,
              wastes traffic, and sends potential customers to better-positioned
              competitors.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {costs.map((cost, index) => (
            <ScrollReveal key={cost.text} delay={index * 90}>
              <div className="h-full rounded-xl border border-border bg-[oklch(0.15_0.02_260)] p-5 hover:border-brand-orange/35 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center shrink-0">
                    <cost.icon className="w-4 h-4 text-brand-orange" />
                  </div>
                  <p className="text-foreground/75 leading-relaxed">{cost.text}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={220}>
          <div className="mt-10 text-center max-w-3xl mx-auto">
            <p className="text-lg text-foreground/70 leading-relaxed">
              Most businesses underestimate how many opportunities their website is
              losing every month.
            </p>
            <Button
              onClick={scrollToAudit}
              size="lg"
              className="mt-7 bg-brand-orange hover:bg-brand-orange-bright text-white font-semibold text-base px-8 py-6 glow-orange transition-all duration-300 rounded-lg"
            >
              See Where Your Website Is Losing Leads
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
