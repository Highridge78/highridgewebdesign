const proofItems = [
  {
    stat: "53%",
    description: "of mobile visitors abandon a site that takes over 3 seconds to load",
    source: "Google / SOASTA",
  },
  {
    stat: "76%",
    description: "of people who search locally visit a business within 24 hours",
    source: "Google Consumer Insights",
  },
  {
    stat: "2-3%",
    description: "average conversion rate for an unoptimized local service website",
    source: "CRO Industry Data",
  },
];

export default function ProofBar() {
  return (
    <section
      aria-label="High Ridge trust pillars"
      className="relative overflow-hidden border-y border-white/5 bg-[oklch(0.095_0.018_260)]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent" />
      <div className="container relative z-10 px-4 py-8 sm:px-6 md:py-10 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-white/10 bg-white/[0.025] md:grid-cols-3">
            {proofItems.map((item, index) => (
              <div
                key={item.stat}
                className="relative flex flex-col gap-3 px-6 py-8 md:px-8"
              >
                {index > 0 && (
                  <div className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent md:left-0 md:right-auto md:top-5 md:h-[calc(100%-2.5rem)] md:w-px md:bg-gradient-to-b" />
                )}
                <span className="text-4xl font-black text-brand-orange leading-none">
                  {item.stat}
                </span>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {item.description}
                </p>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                  {item.source}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-sm font-medium text-foreground/55">
            The math: high local intent bleeds out through slow loads and an
            unoptimized conversion path.
          </p>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
