"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import WebsiteAuditPreview from "./WebsiteAuditPreview";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const offset = 120;
      const target = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 lg:pt-48 lg:pb-40 overflow-hidden bg-[oklch(0.10_0.02_260)]">
      {/* Background depth */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-orange/[0.04] to-transparent pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-[40rem] h-[40rem] bg-brand-orange/[0.05] rounded-full blur-[150px] pointer-events-none" />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid min-w-0 grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24 items-center">
          
          {/* LEFT: Headline & CTA */}
          <div className="flex min-w-0 max-w-4xl flex-col gap-10">
            <div className="flex flex-col gap-7">
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.22em] text-brand-amber/80">
                Contractor Websites · Western NC
              </span>

              <h1 className="max-w-[22rem] sm:max-w-2xl text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.08] tracking-tight">
                Your Website Should Book Jobs, Not Just <span className="text-brand-orange">Exist.</span>
              </h1>

              <p className="max-w-[22rem] sm:max-w-2xl text-lg sm:text-xl text-foreground/80 leading-relaxed">
                High Ridge builds conversion-focused websites for contractors in Western North Carolina. Every page is designed to turn visitors into phone calls, form fills, and booked work.
              </p>

              <p className="text-sm text-white/40 font-medium tracking-wide">
                Free Beacon Audit · Fixed pricing · Founder-built
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button
                  onClick={() => scrollTo("#beacon-audit")}
                  className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange-bright text-white font-black text-base sm:text-lg px-7 sm:px-9 min-h-[56px] rounded-xl shadow-[0_20px_50px_rgba(255,106,0,0.3)] transition-all hover:-translate-y-1 active:scale-95 glow-orange"
                >
                  Run My Free Beacon Audit
                </Button>

                <a
                  href="tel:+18285989262"
                  className="group flex items-center justify-center sm:justify-start gap-3 text-sm font-black uppercase tracking-[0.14em] text-white/60 hover:text-white transition-colors min-h-[48px]"
                >
                  <Phone size={18} className="text-brand-orange" />
                  (828) 598-9262
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Website audit preview */}
          <div className="min-w-0">
            <WebsiteAuditPreview />
          </div>

        </div>
      </div>
    </section>
  );
}
