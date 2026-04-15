import ScrollReveal from "./ScrollReveal";

const proofExamples = [
  {
    title: "Contractor Lead Recovery",
    challenge:
      "A local contractor was getting traffic but very few form submissions or calls.",
    approach:
      "We clarified the offer, rebuilt service pages around buyer intent, and added high-visibility calls to action above the fold.",
    result:
      "Clearer messaging and structure designed to convert visitors into quote requests.",
  },
  {
    title: "Home Service Trust Lift",
    challenge:
      "A growing home service business looked established offline but lacked trust online.",
    approach:
      "We redesigned the homepage around proof, service credibility, and strong location-based messaging.",
    result:
      "A website experience built to increase confidence and drive more qualified inquiries.",
  },
  {
    title: "Local Business Mobile Fix",
    challenge:
      "Most visitors were on mobile, but the existing site was hard to navigate and slow to load.",
    approach:
      "We restructured mobile layouts, simplified page flow, and optimized performance to reduce friction.",
    result:
      "A faster mobile journey that helps capture leads instead of losing them to competitors.",
  },
];

export default function ProofSection() {
  return (
    <section id="proof" className="relative py-20 md:py-24">
      <div className="absolute inset-0 bg-[oklch(0.10_0.02_260)]" />

      <div className="relative z-10 container">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
              Proof & Credibility
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
              Real-World Scenarios.{" "}
              <span className="text-gradient-orange">
                Built for Service Businesses.
              </span>
            </h2>
            <p className="mt-4 text-foreground/60 max-w-3xl mx-auto text-lg">
              Even before formal case studies, our strategy is grounded in what
              service businesses need most: trust, clarity, and consistent lead
              generation.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {proofExamples.map((example, index) => (
            <ScrollReveal key={example.title} delay={index * 100}>
              <article className="rounded-xl border border-border bg-card p-6 h-full hover:border-brand-orange/30 transition-colors duration-300">
                <h3 className="font-serif text-xl font-bold text-white mb-4">
                  {example.title}
                </h3>
                <div className="space-y-3 text-sm">
                  <p className="text-foreground/70">
                    <span className="text-white font-semibold">Challenge: </span>
                    {example.challenge}
                  </p>
                  <p className="text-foreground/70">
                    <span className="text-white font-semibold">Approach: </span>
                    {example.approach}
                  </p>
                  <p className="text-foreground/70">
                    <span className="text-white font-semibold">Built Outcome: </span>
                    {example.result}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
