"use client";

import { ArrowRight, CheckCircle2, PhoneCall, Search, ShieldCheck, Timer, XCircle } from "lucide-react";

const leakagePoints = [
  "Slow mobile load",
  "Weak first impression",
  "Buried phone number",
  "No clear call to action",
  "Poor local SEO signals",
];

const revenuePoints = [
  "Fast mobile experience",
  "Clear trust signals",
  "Click-to-call CTAs",
  "Search-focused structure",
  "More qualified inquiries",
];

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

export default function ComparisonVisual() {
  return (
    <div className="relative min-w-0 max-w-full overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.105_0.02_260/0.92)] p-5 shadow-[0_40px_90px_-45px_rgba(255,106,0,0.55)] backdrop-blur-xl sm:p-6 lg:p-7">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.72_0.19_50/0.13),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-orange/50 to-transparent" />

      <div className="relative z-10 space-y-7">
        <div className="space-y-4 text-center">
          <span className="text-[11px] font-black uppercase tracking-[0.28em] text-brand-orange/70 sm:text-xs">
            Lead Leakage to Revenue Flow
          </span>
          <h2 className="mx-auto max-w-[18rem] font-serif text-2xl font-bold leading-tight text-white sm:max-w-md sm:text-4xl lg:text-5xl">
            Stop Letting Your Website Leak Leads
          </h2>
          <p className="mx-auto max-w-[18.5rem] text-sm leading-relaxed text-foreground/65 sm:max-w-2xl sm:text-base">
            Most local business websites do not fail because they look ugly. They
            fail because they load slowly, confuse visitors, hide the phone
            number, and give people no clear reason to take action.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_auto_1fr] xl:items-stretch">
          <div className="min-w-0 rounded-xl border border-red-400/10 bg-black/20 p-5">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-red-400/20 bg-red-500/10 text-red-300">
                <XCircle className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-red-200/60">
                  Problem
                </p>
                <h3 className="font-serif text-2xl font-bold text-white">Lead Leakage</h3>
              </div>
            </div>

            <ul className="space-y-3">
              {leakagePoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-foreground/68">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-300/70" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex min-h-28 items-center justify-center overflow-hidden rounded-xl border border-brand-orange/15 bg-brand-orange/[0.035] px-5 py-8 xl:min-h-full xl:w-28 xl:px-3">
            <div className="absolute inset-y-6 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-brand-orange/35 to-transparent xl:block" />
            <div className="absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-brand-orange/35 to-transparent xl:hidden" />
            <svg
              viewBox="0 0 180 56"
              className="relative h-14 w-full max-w-48 text-brand-orange drop-shadow-[0_0_18px_rgba(255,106,0,0.35)] xl:hidden"
              aria-hidden="true"
            >
              <path
                d="M8 34 C34 10 52 10 78 34 S124 58 172 22"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            <div className="relative hidden flex-col items-center gap-5 xl:flex">
              <Timer className="h-5 w-5 text-brand-orange/80" aria-hidden="true" />
              <ArrowRight className="h-8 w-8 rotate-90 text-brand-orange" aria-hidden="true" />
              <PhoneCall className="h-5 w-5 text-brand-amber/80" aria-hidden="true" />
            </div>
          </div>

          <div className="min-w-0 rounded-xl border border-brand-orange/20 bg-gradient-to-br from-brand-orange/[0.11] to-white/[0.025] p-5 shadow-[0_30px_70px_-45px_rgba(255,106,0,0.75)]">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-orange/25 bg-brand-orange/12 text-brand-orange">
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-amber/70">
                  High Ridge Rebuild
                </p>
                <h3 className="font-serif text-2xl font-bold text-white">Revenue Flow</h3>
              </div>
            </div>

            <ul className="space-y-3">
              {revenuePoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-foreground/78">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-orange/12 text-brand-orange">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-5 text-center">
          {[
            { label: "Trust", icon: ShieldCheck },
            { label: "Calls", icon: PhoneCall },
            { label: "Search", icon: Search },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <Icon className="h-4 w-4 text-brand-orange" aria-hidden="true" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/45">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={scrollToContact}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-4 text-sm font-black text-white shadow-[0_18px_45px_rgba(255,106,0,0.25)] transition-all hover:-translate-y-0.5 hover:bg-brand-orange-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Get My Free Website Audit
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
