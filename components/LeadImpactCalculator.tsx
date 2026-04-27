"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { Slider } from "@/components/ui/slider";

const TYPICAL_CVR = 0.023;
const OPTIMIZED_CVR = 0.08;

function scrollToContact() {
  const el = document.querySelector("#contact");
  if (!el) {
    window.location.href = "/#contact";
    return;
  }
  const offset = 120;
  const target = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: target, behavior: "smooth" });
}

function fmt(n: number): string {
  if (n >= 10000) return `$${Math.round(n / 1000)}k`;
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`;
  return `$${n.toLocaleString("en-US")}`;
}

export default function LeadImpactCalculator() {
  const [visitors, setVisitors] = useState(300);
  const [jobValue, setJobValue] = useState(2500);

  const currentLeads = Math.round(visitors * TYPICAL_CVR);
  const optimizedLeads = Math.round(visitors * OPTIMIZED_CVR);
  const currentRevenue = currentLeads * jobValue;
  const optimizedRevenue = optimizedLeads * jobValue;
  const revenueGap = optimizedRevenue - currentRevenue;
  const leadGap = optimizedLeads - currentLeads;

  return (
    <section
      id="lead-calculator"
      className="relative py-20 md:py-24 overflow-hidden bg-[oklch(0.095_0.018_260)]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute left-1/3 top-1/4 h-72 w-96 -translate-x-1/2 rounded-full bg-brand-orange/[0.04] blur-3xl" />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-[0.28em] text-brand-orange/70">
              Revenue Reality Check
            </span>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-white md:text-5xl">
              How Much Are You Leaving on the Table?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/65 md:text-lg">
              Use your own numbers. See the gap between a typical local site and a
              conversion-optimized build.
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <ScrollReveal delay={120}>
            <div className="rounded-2xl border border-white/10 bg-[oklch(0.14_0.02_260)] p-7 space-y-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                  Your Inputs
                </p>
                <p className="text-sm text-foreground/60 mt-1">Adjust to match your business</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-baseline gap-4">
                  <label className="text-sm font-semibold text-white">
                    Monthly Website Visitors
                  </label>
                  <span className="text-lg font-black text-brand-orange">
                    {visitors.toLocaleString()}
                  </span>
                </div>
                <Slider
                  min={50}
                  max={2000}
                  step={50}
                  value={[visitors]}
                  onValueChange={([val]) => setVisitors(val)}
                  className="[&_[data-slot=slider-track]]:h-2 [&_[data-slot=slider-track]]:bg-white/10 [&_[data-slot=slider-range]]:bg-brand-orange [&_[data-slot=slider-thumb]]:size-5 [&_[data-slot=slider-thumb]]:bg-brand-orange [&_[data-slot=slider-thumb]]:border-0 [&_[data-slot=slider-thumb]]:shadow-[0_0_10px_rgba(232,93,4,0.6)]"
                />
                <div className="flex justify-between text-xs text-white/25">
                  <span>50</span>
                  <span>2,000</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-baseline gap-4">
                  <label className="text-sm font-semibold text-white">Average Job Value</label>
                  <span className="text-lg font-black text-brand-orange">{fmt(jobValue)}</span>
                </div>
                <Slider
                  min={500}
                  max={10000}
                  step={250}
                  value={[jobValue]}
                  onValueChange={([val]) => setJobValue(val)}
                  className="[&_[data-slot=slider-track]]:h-2 [&_[data-slot=slider-track]]:bg-white/10 [&_[data-slot=slider-range]]:bg-brand-orange [&_[data-slot=slider-thumb]]:size-5 [&_[data-slot=slider-thumb]]:bg-brand-orange [&_[data-slot=slider-thumb]]:border-0 [&_[data-slot=slider-thumb]]:shadow-[0_0_10px_rgba(232,93,4,0.6)]"
                />
                <div className="flex justify-between text-xs text-white/25">
                  <span>$500</span>
                  <span>$10,000</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="flex justify-between text-sm gap-4">
                  <span className="text-foreground/50">Typical local service site</span>
                  <span className="font-black text-white/50">2.3%</span>
                </div>
                <div className="flex justify-between text-sm gap-4">
                  <span className="text-foreground/50">Conversion-optimized build</span>
                  <span className="font-black text-brand-orange">8%+</span>
                </div>
                <p className="text-[11px] text-white/25 pt-1">
                  Industry averages. Results vary by market, traffic quality, and service type.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl border border-brand-orange/25 bg-gradient-to-br from-brand-orange/[0.12] to-transparent p-7 text-center shadow-[0_30px_80px_-48px_rgba(255,106,0,0.9)]">
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-orange/60 to-transparent" />
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-brand-amber/70 mb-3">
                  Monthly Revenue Gap
                </p>
                <div className="text-5xl md:text-6xl font-black text-brand-orange leading-none">
                  {fmt(revenueGap)}
                </div>
                <p className="mt-3 text-sm text-foreground/55">
                  estimated monthly revenue left on the table
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/10 bg-[oklch(0.14_0.02_260)] p-5 space-y-1">
                  <p className="text-[10px] uppercase tracking-wider text-white/35 font-bold">
                    Typical Site
                  </p>
                  <p className="text-2xl font-black text-white/50">
                    {currentLeads}
                    <span className="text-sm font-semibold text-white/25"> leads/mo</span>
                  </p>
                  <p className="text-xs text-white/30">at 2.3% conversion</p>
                  <p className="text-sm text-white/35">{fmt(currentRevenue)}/mo</p>
                </div>
                <div className="rounded-xl border border-brand-orange/20 bg-brand-orange/[0.07] p-5 space-y-1">
                  <p className="text-[10px] uppercase tracking-wider text-brand-amber/60 font-bold">
                    Optimized Build
                  </p>
                  <p className="text-2xl font-black text-brand-orange">
                    {optimizedLeads}
                    <span className="text-sm font-semibold text-brand-orange/50">
                      {" "}leads/mo
                    </span>
                  </p>
                  <p className="text-xs text-foreground/40">at 8% conversion</p>
                  <p className="text-sm text-brand-orange/70">{fmt(optimizedRevenue)}/mo</p>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[oklch(0.14_0.02_260)] p-4 flex items-center gap-3">
                <ArrowRight className="w-5 h-5 text-brand-orange shrink-0" />
                <p className="text-sm text-white">
                  <span className="font-black text-brand-orange">{leadGap} more leads</span>{" "}
                  per month at your job value
                </p>
              </div>

              <button
                type="button"
                onClick={scrollToContact}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-4 text-sm font-black text-white shadow-[0_18px_45px_rgba(255,106,0,0.25)] transition-all hover:-translate-y-0.5 hover:bg-brand-orange-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Close This Gap - Book a Free Audit
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
