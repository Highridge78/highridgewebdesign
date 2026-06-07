"use client";

import ScrollReveal from "./ScrollReveal";

const FOUNDER_PHOTO = "/images/founder-jeremy-profile.webp";
const FALLBACK_PHOTO = "/images/founder-jeremy-460.webp";

export default function FounderBlock() {
  return (
    <section id="about" className="relative py-20 md:py-24 bg-[oklch(0.12_0.02_260)]">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-orange/[0.04] to-transparent pointer-events-none" />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-10">
              <div className="relative w-32 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-2xl sm:w-40">
                <img
                  src={FOUNDER_PHOTO}
                  alt="Jeremy Black — Founder, High Ridge Web Design"
                  className="block h-auto w-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes(FALLBACK_PHOTO)) {
                      target.src = FALLBACK_PHOTO;
                    }
                  }}
                  loading="lazy"
                />
              </div>

              <div className="text-center sm:text-left">
                <span className="text-[10px] font-black uppercase tracking-[0.24em] text-brand-orange">
                  Meet the Founder
                </span>
                <h2 className="mt-3 font-serif text-2xl sm:text-3xl font-bold text-white">
                  Jeremy Black
                </h2>
                <div className="mt-4 space-y-3 text-base text-foreground/70 leading-relaxed">
                  <p>
                    I started High Ridge because contractors in Western NC deserve better than template sites from generalist agencies who disappear after launch.
                  </p>
                  <p>
                    I built Beacon — the diagnostic tool that scores every site we touch for lead-generation performance, not just speed. If I build your site, I stake my name on its ability to produce calls.
                  </p>
                  <p>
                    You work with me directly, start to finish. No handoffs, no middlemen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
