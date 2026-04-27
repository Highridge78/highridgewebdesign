"use client";

import { ArrowRight, Gauge, SearchCheck, Smartphone, TrendingUp } from "lucide-react";

const typicalScores = [
  { label: "Speed", value: 42, icon: Gauge },
  { label: "SEO", value: 31, icon: SearchCheck },
  { label: "Conversion", value: 28, icon: TrendingUp },
  { label: "Mobile Experience", value: 46, icon: Smartphone },
];

const rebuildScores = [
  { label: "Speed", value: 95, icon: Gauge },
  { label: "SEO", value: 89, icon: SearchCheck },
  { label: "Conversion", value: 91, icon: TrendingUp },
  { label: "Mobile Experience", value: 96, icon: Smartphone },
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

type ScoreCardProps = {
  title: string;
  scores: typeof typicalScores;
  variant: "typical" | "rebuild";
};

function ScoreCard({ title, scores, variant }: ScoreCardProps) {
  const isRebuild = variant === "rebuild";

  return (
    <article
      className={`relative overflow-hidden rounded-2xl border p-6 sm:p-7 ${
        isRebuild
          ? "border-brand-orange/25 bg-gradient-to-br from-brand-orange/[0.12] via-white/[0.035] to-transparent shadow-[0_30px_80px_-48px_rgba(255,106,0,0.9)]"
          : "border-white/10 bg-black/20"
      }`}
    >
      {isRebuild && (
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-orange/60 to-transparent" />
      )}

      <div className="relative z-10">
        <div className="mb-7 flex items-start justify-between gap-5">
          <div>
            <p
              className={`text-xs font-black uppercase tracking-[0.24em] ${
                isRebuild ? "text-brand-amber/75" : "text-white/35"
              }`}
            >
              {isRebuild ? "Optimized Build" : "Baseline"}
            </p>
            <h3 className="mt-2 font-serif text-2xl font-bold leading-tight text-white">
              {title}
            </h3>
          </div>
          <div
            className={`rounded-xl border px-3 py-2 text-right ${
              isRebuild
                ? "border-brand-orange/25 bg-brand-orange/10"
                : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <div className={`text-3xl font-black ${isRebuild ? "text-brand-orange" : "text-white/55"}`}>
              {Math.round(scores.reduce((sum, score) => sum + score.value, 0) / scores.length)}
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/35">
              Avg
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {scores.map((score) => {
            const Icon = score.icon;

            return (
              <div key={score.label} className="space-y-2.5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <Icon
                      className={`h-4 w-4 shrink-0 ${
                        isRebuild ? "text-brand-orange" : "text-white/35"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="text-sm font-semibold text-foreground/75">
                      {score.label}
                    </span>
                  </div>
                  <span className={`text-sm font-black ${isRebuild ? "text-brand-orange" : "text-white/45"}`}>
                    {score.value}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
                  <div
                    className={`h-full rounded-full ${
                      isRebuild
                        ? "bg-gradient-to-r from-brand-orange to-brand-amber shadow-[0_0_18px_rgba(255,106,0,0.32)]"
                        : "bg-white/20"
                    }`}
                    style={{ width: `${score.value}%` }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}

export default function OpportunityScorecard() {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.095_0.018_260)] py-20 md:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-brand-orange/[0.045] blur-3xl" />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.28em] text-brand-orange/70">
            Measurable Opportunity
          </span>
          <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-white md:text-5xl">
            Website Opportunity Scorecard
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-foreground/65 md:text-lg">
            A better website should not just look nicer. It should load faster,
            guide visitors clearly, strengthen local search signals, and make
            contacting you effortless.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <ScoreCard
            title="Typical Local Business Site"
            scores={typicalScores}
            variant="typical"
          />
          <ScoreCard
            title="High Ridge Rebuild"
            scores={rebuildScores}
            variant="rebuild"
          />
        </div>

        <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-2xl border border-brand-orange/20 bg-gradient-to-r from-brand-orange/[0.11] via-white/[0.035] to-transparent p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-7">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-amber/75">
              Opportunity Gap
            </p>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-foreground/72">
              The money is usually not lost because people never visit. It is
              lost because visitors leave before they trust you enough to call.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToContact}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-4 text-sm font-black text-white shadow-[0_18px_45px_rgba(255,106,0,0.25)] transition-all hover:-translate-y-0.5 hover:bg-brand-orange-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-background md:mt-0 md:w-auto md:shrink-0"
          >
            Get My Free Website Audit
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
