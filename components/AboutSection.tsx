"use client";

import { CheckCircle2 } from "lucide-react";

export default function AboutSection() {
  const FOUNDER_PHOTO = "/images/founder-jeremy-460.webp";
  const FALLBACK_PHOTO = "/images/founder-jeremy-460.avif";

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden bg-[oklch(0.12_0.02_260)]">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-orange/[0.04] to-transparent pointer-events-none" />
      
      <div className="container relative z-10 px-8">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 lg:gap-24 items-start">
          
          {/* Founder Image Column — Zero Cropping, Balanced Scale */}
          <div className="lg:col-span-4 relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[170px] sm:max-w-[190px] md:max-w-[220px] group">
              <div className="relative rounded-[2rem] overflow-hidden border-2 border-white/5 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.8)] transition-all duration-700 bg-white/[0.02]">
                <img 
                  src={FOUNDER_PHOTO} 
                  alt="Jeremy Black - Founder of High Ridge Web Design" 
                  className="w-full h-auto object-contain block relative z-10" // h-auto + object-contain = NO CROP
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== FALLBACK_PHOTO) {
                       target.src = FALLBACK_PHOTO;
                    }
                  }}
                />
                {/* Visual depth — strictly at bottom, away from head */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[oklch(0.12_0.02_260)] to-transparent z-20 opacity-80" />
              </div>
            </div>
          </div>

          {/* Copy Column */}
          <div className="lg:col-span-6 flex flex-col gap-16 pt-10">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-4 text-sm font-black uppercase tracking-[0.4em] text-brand-orange bg-brand-orange/10 px-8 py-3 rounded-full border border-brand-orange/20 shadow-xl">
                A Partner, Not Just an Agency
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-[1.08] tracking-tight">
                Built for <span className="text-brand-orange">Local Results</span>, Not Generic Templates.
              </h2>
              <div className="relative">
                <div className="hidden sm:block absolute -left-6 top-0 bottom-0 w-2 bg-brand-orange rounded-full shadow-[0_0_30px_rgba(255,106,0,0.5)]" />
                <p className="text-xl sm:text-2xl font-black text-white/95 italic sm:pl-8 py-6 px-5 sm:px-0 bg-white/[0.03] rounded-2xl sm:rounded-r-[2rem] border border-white/5 shadow-2xl">
                  High Ridge Web Design builds fast, conversion-focused websites for local businesses that need more calls, stronger trust, and a sharper online presence.
                </p>
              </div>
              <ul className="space-y-3 mt-8">
                {[
                  "Contractor-niche only — no lifestyle brands, no e-commerce, no generalist work",
                  "Direct founder involvement on every build — no junior handoffs",
                  "Revenue-first design — every decision traces back to calls and booked jobs",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-base text-foreground/70">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-1" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 text-foreground/70 leading-relaxed text-lg md:text-xl">
              <p>
                Every section is designed with one job: help a real visitor understand what you do, trust you faster, and take action.
              </p>
            </div>

            <div className="pt-10 flex flex-wrap gap-10 md:gap-16 items-center border-t border-white/10">
              {[
                { label: "Only Market We Serve", val: "Contractors" },
                { label: "Based In", val: "Sylva, NC" },
                { label: "Who You Work With", val: "Jeremy" }
              ].map(item => (
                <div key={item.label} className="flex flex-col gap-3">
                  <span className="text-4xl md:text-5xl font-black text-white">{item.val}</span>
                  <span className="text-xs uppercase font-bold text-gray-500 tracking-[0.4em]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
