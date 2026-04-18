import { ArrowRight, Hammer, Paintbrush, Wrench, Layers3 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const services = [
  {
    icon: Hammer,
    title: "Hardwood Floor Installation",
    subtitle: "New floor installs",
    image: "/images/service-1.webp",
    description:
      "Install-ready hardwood floors with straight lines, clean transitions, and tight finish details.",
    features: [
      "Solid and engineered hardwood options",
      "Subfloor prep and moisture check",
      "Accurate room measurements",
      "Clean final walkthrough",
    ],
  },
  {
    icon: Paintbrush,
    title: "Sanding and Refinishing",
    subtitle: "Bring floors back to life",
    image: "/images/service-2.webp",
    description:
      "Restore older hardwood floors with careful sanding and durable finish coats that hold up to daily life.",
    features: [
      "Low-dust process setup",
      "Custom stain and sheen options",
      "Traffic-ready polyurethane finish",
      "Protection plan guidance",
    ],
  },
  {
    icon: Wrench,
    title: "Hardwood Floor Repair",
    subtitle: "Fix damage the right way",
    image: "/images/service-3.webp",
    description:
      "Repair squeaks, gaps, scratches, and isolated damage so your floor feels solid and looks consistent again.",
    features: [
      "Board replacement and patch work",
      "Squeak and movement correction",
      "Transition and threshold fixes",
      "Color blend to existing floor",
    ],
  },
  {
    icon: Layers3,
    title: "Stair and Custom Trim Work",
    subtitle: "Details that complete the project",
    image: "/images/service-4.webp",
    description:
      "Finish your project with stair treads, trim pieces, and transitions that match your flooring style.",
    features: [
      "Stair tread retrofit and install",
      "Baseboard and shoe molding transitions",
      "Landing and edge finishing",
      "Consistent look across rooms",
    ],
  },
];

export default function ServicesSection() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="relative py-20 md:py-24">
      <div className="absolute inset-0 bg-[oklch(0.15_0.03_250)]" />

      <div className="relative z-10 container">
        <ScrollReveal>
          <div className="text-center mb-14 md:mb-16">
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
              Flooring Services
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
              Clear Services.{" "}
              <span className="text-gradient-orange">No Guesswork.</span>
            </h2>
            <p className="mt-4 text-foreground/60 max-w-3xl mx-auto text-lg">
              Every service is designed to give you durable floors, clean finishes,
              and a straightforward experience from estimate to final walkthrough.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 120}>
              <div className="group relative rounded-xl overflow-hidden border border-border bg-card hover:border-brand-orange/40 transition-all duration-500 h-full">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={step.image}
                    alt={`${step.title} service placeholder image`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    width={1000}
                    height={750}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  <div className="absolute bottom-4 left-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-orange/20 border border-brand-orange/30 flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-brand-orange" />
                    </div>
                    <span className="text-xs font-medium text-brand-amber uppercase tracking-wider">
                      {step.subtitle}
                    </span>
                  </div>
                </div>

                <div className="p-6 pt-4">
                  <h3 className="font-serif text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed mb-5">
                    {step.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {step.features.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-foreground/70"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={scrollToContact}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-orange hover:text-white hover:bg-brand-orange px-4 py-2 rounded-md transition-all duration-300"
                  >
                    Request This Service
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-orange to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-bright text-white font-semibold px-6 py-3 rounded-lg glow-orange transition-all duration-300"
          >
            Get a Quote for Your Flooring Project
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
