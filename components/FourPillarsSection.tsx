import { HardHat, User, MapPin, SearchCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const pillars = [
  {
    icon: HardHat,
    title: "Contractors Only",
    description:
      "No restaurants, no e-commerce, no lifestyle brands. We build for one market — contractors and home service businesses — and every decision reflects that focus.",
  },
  {
    icon: User,
    title: "Founder-Built",
    description:
      "You work directly with Jeremy, the founder. No junior handoffs, no project coordinators. One person owns your project from first call to launch.",
  },
  {
    icon: MapPin,
    title: "Local SEO Baked In",
    description:
      "Service-area pages, schema markup, and Google Business Profile alignment are built into every site — not sold as an add-on after launch.",
  },
  {
    icon: SearchCheck,
    title: "Free Audit First",
    description:
      "Before any sales conversation, we run a Beacon audit on your current site so you can see exactly where leads are leaking. No cost, no commitment.",
  },
];

export default function FourPillarsSection() {
  return (
    <section className="relative py-16 md:py-20 bg-[oklch(0.10_0.02_260)]">
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
              Why High Ridge
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
              Four Things We Do{" "}
              <span className="text-gradient-orange">Differently</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pillars.map((pillar, i) => (
            <ScrollReveal key={pillar.title} delay={i * 100}>
              <div className="group relative h-full rounded-xl border border-white/10 bg-[oklch(0.13_0.02_260)] p-6 sm:p-8 hover:border-brand-orange/30 transition-all duration-300">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange/10 border border-brand-orange/20 group-hover:bg-brand-orange/20 transition-colors">
                  <pillar.icon className="h-6 w-6 text-brand-orange" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
