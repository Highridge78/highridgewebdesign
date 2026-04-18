import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const galleryImages = [
  "/images/gallery-1.webp",
  "/images/gallery-2.webp",
  "/images/gallery-3.webp",
  "/images/gallery-4.webp",
  "/images/gallery-5.webp",
  "/images/gallery-6.webp",
  "/images/gallery-7.webp",
  "/images/gallery-8.webp",
];

const processSteps = [
  {
    step: "01",
    title: "Request Your Free Estimate",
    description:
      "Tell us about your space, timeline, and flooring goals so we can scope the project correctly.",
  },
  {
    step: "02",
    title: "Get a Clear Project Plan",
    description:
      "We provide straightforward recommendations, material options, and scheduling details before work starts.",
  },
  {
    step: "03",
    title: "Professional Installation or Refinish",
    description:
      "Our crew completes the flooring work with careful prep, clean execution, and consistent quality.",
  },
  {
    step: "04",
    title: "Final Walkthrough and Sign-Off",
    description:
      "We inspect the finished work with you and confirm every detail is complete before project close-out.",
  },
];

export default function ResultsSection() {
  return (
    <section id="results" className="relative py-20 md:py-24">
      <div className="absolute inset-0 bg-[oklch(0.15_0.03_250)]" />

      <div className="relative z-10 container">
        <div className="mb-16 md:mb-20">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
                Project Gallery
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
                Proof of Work You Can{" "}
                <span className="text-gradient-orange">See Before You Hire</span>
              </h2>
              <p className="mt-4 text-foreground/70 max-w-2xl mx-auto">
                Recent flooring visuals show installation quality, finish detail,
                and the level of craftsmanship homeowners can expect.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {galleryImages.map((imagePath, i) => (
              <ScrollReveal key={imagePath} delay={i * 60}>
                <img
                  src={imagePath}
                  alt={`Frady's Flooring project gallery image ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full rounded-xl border border-border bg-card object-cover aspect-[4/3] hover:border-brand-orange/40 transition-colors duration-300"
                  width={1000}
                  height={750}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="mb-14 md:mb-16">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
                Our Process
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
                Simple, Professional,{" "}
                <span className="text-gradient-orange">and Built Around Your Home</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 120}>
                <div className="relative h-full">
                  <div className="p-6 rounded-xl bg-[oklch(0.18_0.03_249)] border border-border h-full hover:border-brand-orange/30 transition-all duration-300">
                    <div className="text-4xl font-bold font-serif text-brand-orange/25 mb-3">
                      {step.step}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal>
          <div className="rounded-2xl bg-gradient-to-br from-[oklch(0.62_0.10_72/0.2)] to-[oklch(0.51_0.13_257/0.2)] border border-brand-orange/25 p-8 md:p-10 text-center">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">
              Ready to Upgrade Your Floors?
            </h3>
            <p className="text-foreground/75 mb-6 max-w-2xl mx-auto">
              Get a no-pressure estimate and honest recommendations for the best
              path forward in your home.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-bright text-white font-semibold px-6 py-3 rounded-lg glow-orange transition-all duration-300"
            >
              Request a Free Estimate
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
