"use client";

import { FormEvent, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Gauge,
  Loader2,
  SearchCheck,
  ShieldCheck,
  Smartphone,
  TrendingUp,
} from "lucide-react";

type AuditFinding = {
  title: string;
  severity: "critical" | "high" | "medium" | "low";
};

type AuditResult = {
  url: string;
  summary: string;
  scores: {
    conversionScore: number;
    localVisibilityScore: number;
    trustScore: number;
    technicalScore: number;
    revenueOpportunity: number;
    confidence: "high" | "low";
  };
  findings: AuditFinding[];
};

type AuditResponse =
  | { ok: true; audit: AuditResult }
  | { ok: false; message: string };

const defaultScores = [
  { label: "Conversion", value: null, icon: TrendingUp },
  { label: "Local Visibility", value: null, icon: SearchCheck },
  { label: "Trust Signals", value: null, icon: ShieldCheck },
  { label: "Technical", value: null, icon: Gauge },
];

function toDisplayUrl(value: string) {
  return value.replace(/^https?:\/\//i, "").replace(/\/$/, "");
}

function scoreColor(value: number | null) {
  if (value === null) return "text-white/35";
  if (value >= 7.5) return "text-emerald-300";
  if (value >= 5) return "text-brand-amber";
  return "text-brand-orange";
}

export default function WebsiteAuditPreview() {
  const [url, setUrl] = useState("");
  const [audit, setAudit] = useState<AuditResult | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scores = audit
    ? [
        { label: "Conversion", value: audit.scores.conversionScore, icon: TrendingUp },
        { label: "Local Visibility", value: audit.scores.localVisibilityScore, icon: SearchCheck },
        { label: "Trust Signals", value: audit.scores.trustScore, icon: ShieldCheck },
        { label: "Technical", value: audit.scores.technicalScore, icon: Gauge },
      ]
    : defaultScores;

  const average = audit
    ? Math.round(
        ((audit.scores.conversionScore +
          audit.scores.localVisibilityScore +
          audit.scores.trustScore +
          audit.scores.technicalScore) /
          4) *
          10,
      ) / 10
    : null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!url.trim()) {
      setAudit(null);
      setError("Enter a website URL to analyze.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = (await response.json()) as AuditResponse;

      if (!response.ok || !data.ok) {
        setAudit(null);
        setError(data.ok ? "The audit could not be completed." : data.message);
        return;
      }

      setAudit(data.audit);
    } catch {
      setAudit(null);
      setError("The audit could not be completed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className="absolute -inset-4 rounded-[2rem] bg-brand-orange/[0.06] blur-3xl" />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.13_0.02_260)] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.85)] sm:rounded-[2rem]">
        <div className="border-b border-white/10 bg-black/20 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-orange/25 bg-brand-orange/15">
                <Smartphone className="h-5 w-5 text-brand-orange" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-brand-orange/75">
                  Live Website Check
                </p>
                <h2 className="font-serif text-2xl font-bold text-white">Lead Leak Audit</h2>
              </div>
            </div>
            <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white/40">
              No pressure
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
            <label className="flex min-h-12 items-center rounded-xl border border-white/10 bg-black/25 px-4">
              <span className="sr-only">Website URL</span>
              <input
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="yourcompany.com"
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-white outline-none placeholder:text-white/25"
              />
            </label>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-orange px-5 text-sm font-black text-white shadow-[0_18px_45px_rgba(255,106,0,0.25)] transition hover:-translate-y-0.5 hover:bg-brand-orange-bright disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              )}
              Analyze
            </button>
          </form>

          {error && (
            <p className="mt-3 flex items-start gap-2 rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-100">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {error}
            </p>
          )}
        </div>

        <div className="grid gap-5 p-4 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-[0.7fr_1fr]">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/35">
                Opportunity Score
              </p>
              <div className="mt-4 flex items-end gap-2">
                <span className={`text-6xl font-black leading-none ${scoreColor(average)}`}>
                  {average ?? "--"}
                </span>
                <span className="pb-2 text-sm font-bold text-white/30">/10</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/60">
                {audit
                  ? toDisplayUrl(audit.url)
                  : "Enter a website to see where leads may be slipping away."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {scores.map((score) => {
                const Icon = score.icon;

                return (
                  <div key={score.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <Icon className="h-4 w-4 text-brand-orange" aria-hidden="true" />
                    <p className="mt-3 text-[10px] font-black uppercase tracking-[0.16em] text-white/35">
                      {score.label}
                    </p>
                    <p className={`mt-1 text-2xl font-black ${scoreColor(score.value)}`}>
                      {score.value ?? "--"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-brand-amber/70">
              What We Check
            </p>
            <div className="mt-4 grid gap-3 text-sm text-foreground/70">
              {(audit?.findings.slice(0, 3).map((finding) => finding.title) ?? [
                "Calls and quote requests are easy to find",
                "Mobile visitors can act without friction",
                "Trust signals show before visitors hesitate",
              ]).map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {audit && (
            <p className="rounded-2xl border border-brand-orange/20 bg-brand-orange/[0.08] p-4 text-sm leading-relaxed text-foreground/75">
              {audit.summary}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.28em] text-white/25 sm:gap-6 sm:tracking-[0.4em]">
        <span>Conversion</span>
        <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
        <span>Trust</span>
        <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
        <span>Local SEO</span>
      </div>
    </div>
  );
}
