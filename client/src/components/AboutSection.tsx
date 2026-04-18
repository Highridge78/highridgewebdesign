import { BadgeCheck, Clock3, MapPin, ShieldCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const trustPoints = [
  {
    icon: Clock3,
    title: "Years of hands-on flooring experience",
    detail:
      "Our team has spent years installing and refinishing floors in real Western NC homes.",
  },
  {
    icon: MapPin,
    title: "Proudly local service area",
    detail:
      "Based in Sylva and serving Waynesville, Franklin, Asheville, and surrounding communities.",
  },
  {
    icon: ShieldCheck,
    title: "Craftsmanship that lasts",
    detail:
      "From prep to final coat, we focus on the details that keep floors beautiful over time.",
  },
  {
    icon: BadgeCheck,
    title: "Reliable communication",
    detail:
      "You get clear timelines, honest updates, and a crew that shows up when scheduled.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[oklch(0.13_0.03_250)]" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-orange/[0.05] to-transparent" />

      <div className="relative z-10 container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-14 md:mb-16">
          <ScrollReveal direction="left">
            <div>
              <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
                Why Homeowners Choose Frady&apos;s
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-3 mb-6">
                Trusted Local Flooring Work{" "}
                <span className="text-gradient-orange">With Real Pride in the Finish</span>
              </h2>
              <div className="space-y-4 text-foreground/75 leading-relaxed">
                <p>
                  Frady&apos;s Flooring is a father-son focused team delivering hardwood
                  work that looks clean, feels solid, and adds long-term value to your home.
                </p>
                <p>
                  We are not a rushed volume crew. We plan your project, protect
                  your home, and finish every room with craftsmanship that you can
                  see in the final result.
                </p>
                <p>
                  If you want flooring done carefully and professionally, you are in
                  the right place.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={150}>
            <div className="rounded-2xl border border-border bg-[oklch(0.18_0.03_249)] p-7">
              <img
                src="/images/trust-placeholder.webp"
                alt="Frady's Flooring crew at work on a hardwood flooring project"
                loading="lazy"
                decoding="async"
                width={1000}
                height={750}
                className="mb-5 block h-auto w-full rounded-xl border border-border/70 bg-black/20 object-cover aspect-[4/3]"
              />
              <h3 className="font-serif text-xl font-bold text-white mb-5">
                What You Can Expect
              </h3>
              <ul className="space-y-3 text-sm text-foreground/80">
                {[
                  "Detailed estimate before work begins",
                  "Respectful in-home jobsite practices",
                  "Consistent quality from room to room",
                  "A final walkthrough before close-out",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {trustPoints.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 100}>
              <div className="h-full rounded-xl border border-border bg-[oklch(0.18_0.03_249)] p-6 hover:border-brand-orange/30 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/10 border border-brand-orange/25 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-brand-orange" />
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-foreground/65 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-bright text-white font-semibold px-6 py-3 rounded-lg glow-orange transition-all duration-300"
          >
            Request a Free Estimate
          </a>
        </div>
      </div>
    </section>
  );
}
