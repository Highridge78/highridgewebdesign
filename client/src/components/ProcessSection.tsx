import ScrollReveal from "./ScrollReveal";

const processSteps = [
  {
    step: "01",
    title: "Audit",
    description:
      "We review your current website, traffic flow, and messaging to pinpoint exactly where leads are dropping off.",
  },
  {
    step: "02",
    title: "Strategy",
    description:
      "We map your pages, offers, and conversion path so visitors quickly understand why they should choose you.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "We design and develop a fast, conversion-focused website built to drive calls, form submissions, and qualified inquiries.",
  },
  {
    step: "04",
    title: "Launch & Optimize",
    description:
      "After launch, we monitor behavior and improve key pages so your site keeps converting better over time.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="relative py-20 md:py-24">
      <div className="absolute inset-0 bg-[oklch(0.10_0.02_260)]" />
      <div className="relative z-10 container">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
              Process
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
              A Simple System to <span className="text-gradient-orange">Get Better Leads</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, i) => (
            <ScrollReveal key={step.step} delay={i * 100}>
              <div className="p-6 rounded-xl bg-[oklch(0.15_0.02_260)] border border-border hover:border-brand-orange/30 transition-all duration-300 h-full">
                <div className="text-4xl font-bold font-serif text-brand-orange/25 mb-3">
                  {step.step}
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
