import { BarChart3, MapPinned, SearchCheck } from "lucide-react";

const proofItems = [
  {
    title: "Conversion Focused",
    icon: BarChart3,
  },
  {
    title: "SEO Driven",
    icon: SearchCheck,
  },
  {
    title: "Built For Local Business",
    icon: MapPinned,
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
            {proofItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="relative flex items-center gap-4 px-6 py-6 md:justify-center md:px-5"
                >
                  {index > 0 && (
                    <div className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent md:left-0 md:right-auto md:top-5 md:h-[calc(100%-2.5rem)] md:w-px md:bg-gradient-to-b" />
                  )}
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand-orange/20 bg-brand-orange/10 text-brand-orange">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-black uppercase tracking-[0.18em] text-white">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-5 text-center text-sm font-medium text-foreground/55">
            Websites engineered to generate calls, leads, and growth.
          </p>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
