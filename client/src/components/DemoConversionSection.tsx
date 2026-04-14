import { ArrowRight, Building2, Home, ScissorsLineDashed, UtensilsCrossed } from "lucide-react";
import { Link } from "wouter";
import ScrollReveal from "./ScrollReveal";
import { Button } from "@/components/ui/button";

const demoCards = [
  {
    businessType: "Roofing Company",
    benefit: "Built to increase calls and estimate requests from local homeowners.",
    icon: Home,
    path: "/demos/demo-1",
  },
  {
    businessType: "Restaurant",
    benefit: "Built to increase bookings, phone orders, and repeat local traffic.",
    icon: UtensilsCrossed,
    path: "/demos/demo-2",
  },
  {
    businessType: "Landscaping Business",
    benefit: "Built to increase quote requests and keep your calendar full.",
    icon: ScissorsLineDashed,
    path: "/demos/demo-3",
  },
];

export default function DemoConversionSection() {
  return (
    <section id="demo-examples" className="relative py-20 md:py-24">
      <div className="absolute inset-0 bg-[oklch(0.11_0.02_260)]" />
      <div className="relative z-10 container">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-brand-orange text-sm font-semibold uppercase tracking-widest">
              Visual Proof
            </span>
            <h2 className="mt-3 font-serif text-3xl md:text-5xl font-bold text-white">
              Examples of What Your Business Could Look Like
            </h2>
            <p className="mt-4 text-foreground/70">
              Explore conversion-focused concepts tailored for local business growth.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {demoCards.map((card, idx) => (
            <ScrollReveal key={card.businessType} delay={idx * 100}>
              <article className="group h-full rounded-2xl border border-border bg-[oklch(0.15_0.02_260)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/45 hover:shadow-[0_10px_30px_rgba(255,106,0,0.14)]">
                <div className="inline-flex rounded-lg border border-brand-orange/25 bg-brand-orange/10 p-2.5">
                  <card.icon className="h-5 w-5 text-brand-orange" />
                </div>
                <p className="mt-4 text-xs uppercase tracking-wider text-brand-amber">Demo Industry</p>
                <h3 className="mt-1 font-serif text-2xl font-semibold text-white">
                  {card.businessType}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">{card.benefit}</p>
                <Button asChild className="mt-6 w-full bg-brand-orange text-white hover:bg-brand-orange-bright">
                  <Link href={card.path}>
                    View Demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={240}>
          <div className="mt-10 text-center">
            <Link
              href="/demos"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-orange hover:text-brand-orange-bright transition-colors"
            >
              <Building2 className="h-4 w-4" />
              See all demo concepts
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
