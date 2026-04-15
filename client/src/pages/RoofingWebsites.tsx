import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import RoofingBrandLogo from "@/components/RoofingBrandLogo";
import {
  ArrowRight,
  CheckCircle2,
  CircleOff,
  MapPinned,
  PhoneOff,
  Smartphone,
  Star,
  ShieldCheck,
  Hammer,
  Clock3,
  MapPinHouse,
  Wrench,
} from "lucide-react";
import { useLocation } from "wouter";

const heroImage =
  "https://images.unsplash.com/photo-1632759145351-1d5922f9d895?auto=format&fit=crop&w=1800&q=80";
const crewImage =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80";
const truckImage =
  "https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=1600&q=80";
const roofImage =
  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1600&q=80";

const problemPoints = [
  {
    icon: MapPinned,
    title: "Competitors outrank you locally",
    description:
      "When homeowners search for roofing help, competing companies with stronger location pages and better structure win the click.",
  },
  {
    icon: PhoneOff,
    title: "Leads bounce before they call",
    description:
      "Unclear messaging and weak estimate CTAs make visitors leave your site and request quotes from someone else.",
  },
  {
    icon: Smartphone,
    title: "Mobile experience kills conversions",
    description:
      "Most roofing traffic comes from phones. Slow load times and hard-to-tap layouts lose urgent jobs fast.",
  },
  {
    icon: CircleOff,
    title: "Low trust costs real revenue",
    description:
      "Without proof, credentials, and clear process, homeowners hesitate and choose a company that feels safer.",
  },
];

const solutionPillars = [
  {
    title: "Roofing Service Page System",
    detail:
      "Dedicated pages for repair, replacement, storm damage, and emergency work so buyers find exactly what they need.",
  },
  {
    title: "Location Targeting Framework",
    detail:
      "City and service-area pages built for local intent to capture nearby homeowners searching right now.",
  },
  {
    title: "Trust + Conversion Flow",
    detail:
      "Reviews, project photos, warranty messaging, and estimate CTAs arranged to turn traffic into quote requests.",
  },
];

const results = [
  {
    title: "More calls from high-intent traffic",
    body: "Homeowners see the right service fast and can call in one tap from any page.",
  },
  {
    title: "More quote requests every week",
    body: "A clearer path from landing to estimate form removes hesitation and boosts submission rates.",
  },
  {
    title: "Better lead quality and close rates",
    body: "Specific service and location targeting attracts people who are ready to hire, not just browse.",
  },
];

const whatYouGet = [
  "Roofing-specific service pages designed for repairs, replacements, inspections, and storm damage jobs.",
  "Location pages that target your key service areas so local searches turn into inbound calls.",
  "Prominent estimate CTAs that make it easy for homeowners to request quotes without friction.",
  "Mobile-first layout so urgent leads can call you instantly from any device.",
  "Before/after project sections that build trust and prove the quality of your work.",
  "Review and credibility blocks that reduce hesitation and increase conversion confidence.",
];

const processSteps = [
  {
    step: "01",
    title: "Audit",
    text: "We review your current roofing site, competitors, and lead flow to identify where jobs are being lost.",
  },
  {
    step: "02",
    title: "Strategy",
    text: "We map your service pages, location pages, and CTA journey around the jobs you want more of.",
  },
  {
    step: "03",
    title: "Build",
    text: "We design and launch a vibrant, high-converting roofing website tailored for local lead capture.",
  },
  {
    step: "04",
    title: "Optimize",
    text: "We refine key pages and conversion points so call volume and quote requests keep improving.",
  },
];

const exampleStories = [
  {
    company: "MetroPeak Roofing (example scenario)",
    challenge:
      "Strong reputation offline, but their old website looked dated and generated inconsistent quote requests.",
    approach:
      "Rebuilt around storm repair and replacement pages, added service-area targeting, and tightened estimate CTA placement.",
    outcome:
      "A clearer buyer journey designed to increase calls, reduce drop-off, and improve lead quality.",
  },
  {
    company: "Northline Roof Works (example scenario)",
    challenge:
      "Heavy ad spend drove traffic, but most visitors bounced on mobile before requesting an estimate.",
    approach:
      "Improved speed, simplified mobile navigation, and made one-tap call and estimate actions visible above the fold.",
    outcome:
      "A mobile-first experience built to convert cold traffic into high-intent roofing inquiries.",
  },
];

export default function RoofingWebsites() {
  const [, setLocation] = useLocation();

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[oklch(0.08_0.03_250)] text-white">
      <header className="sticky top-0 z-50 border-b border-cyan-300/15 bg-[oklch(0.09_0.03_250/0.92)] backdrop-blur-md">
        <div className="container h-20 flex items-center justify-between">
          <button
            onClick={() => scrollTo("#roofing-hero")}
            className="text-left"
            aria-label="Go to page top"
          >
            <RoofingBrandLogo />
          </button>
          <div className="hidden md:flex items-center gap-7">
            <button
              onClick={() => scrollTo("#roofing-problem")}
              className="text-sm uppercase tracking-wider text-cyan-100/75 hover:text-cyan-200 transition-colors"
            >
              Problem
            </button>
            <button
              onClick={() => scrollTo("#roofing-solution")}
              className="text-sm uppercase tracking-wider text-cyan-100/75 hover:text-cyan-200 transition-colors"
            >
              Solution
            </button>
            <button
              onClick={() => scrollTo("#roofing-proof")}
              className="text-sm uppercase tracking-wider text-cyan-100/75 hover:text-cyan-200 transition-colors"
            >
              Proof
            </button>
            <Button
              onClick={() => scrollTo("#roofing-final-cta")}
              className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold px-6 shadow-[0_0_24px_rgba(34,211,238,0.35)]"
            >
              Get a Free Roofing Website Audit
            </Button>
          </div>
        </div>
      </header>

      <section id="roofing-hero" className="relative overflow-hidden">
        <img
          src={heroImage}
          alt="Roofing crew on residential job site"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/88 via-blue-950/76 to-cyan-900/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.2),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(56,189,248,0.18),transparent_45%)]" />

        <div className="relative z-10 container py-20 md:py-28 lg:py-32">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/35 bg-cyan-300/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
                <Hammer className="w-3.5 h-3.5" />
                Roofing Lead Generation Pages
              </span>
              <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight text-white">
                Websites for Roofers That Turn Visitors Into Calls and Quote Requests
              </h1>
              <p className="mt-6 text-lg md:text-xl text-cyan-50/85 max-w-2xl">
                If your website isn&apos;t bringing in consistent jobs, you&apos;re
                leaving revenue on the table. We build sites designed to generate
                real leads.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => scrollTo("#roofing-final-cta")}
                  size="lg"
                  className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold px-8 py-6 text-base shadow-[0_0_28px_rgba(34,211,238,0.35)]"
                >
                  Get a Free Roofing Website Audit
                </Button>
                <Button
                  onClick={() => scrollTo("#roofing-problem")}
                  size="lg"
                  variant="outline"
                  className="border-cyan-200/40 bg-white/5 text-cyan-100 hover:bg-cyan-200/10 px-8 py-6 text-base"
                >
                  See How Many Leads You&apos;re Missing
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="roofing-problem" className="relative py-20 md:py-24">
        <div className="absolute inset-0 bg-[oklch(0.10_0.03_252)]" />
        <div className="relative z-10 container">
          <ScrollReveal>
            <div className="text-center max-w-4xl mx-auto mb-12">
              <span className="text-cyan-300 font-semibold uppercase tracking-widest text-sm">
                The Roofing Problem
              </span>
              <h2 className="mt-3 text-3xl md:text-5xl font-bold">
                Good Roofing Companies Lose Jobs Online Every Day
              </h2>
              <p className="mt-4 text-cyan-100/75 text-lg">
                Most roofing sites don&apos;t guide action, build trust fast, or
                make calling easy. That gap costs real estimates.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {problemPoints.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 90}>
                <article className="h-full rounded-xl border border-cyan-200/15 bg-[oklch(0.14_0.03_252)] p-6 hover:border-cyan-300/45 transition-colors">
                  <div className="w-11 h-11 rounded-lg bg-red-500/12 border border-red-500/25 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-red-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-cyan-100/70 leading-relaxed">{item.description}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="roofing-solution" className="relative py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[oklch(0.11_0.03_252)]" />
        <div className="relative z-10 container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <ScrollReveal direction="left">
              <div>
                <span className="text-cyan-300 font-semibold uppercase tracking-widest text-sm">
                  The Solution
                </span>
                <h2 className="mt-3 text-3xl md:text-5xl font-bold text-white">
                  A Roofing Website System Built to Convert Local Traffic
                </h2>
                <p className="mt-5 text-cyan-100/75 leading-relaxed">
                  This isn&apos;t a generic template. We build around roofing buyer
                  behavior so homeowners quickly find the right service, trust your
                  team, and request an estimate.
                </p>
                <div className="mt-7 space-y-4">
                  {solutionPillars.map((pillar) => (
                    <div
                      key={pillar.title}
                      className="rounded-lg border border-cyan-200/20 bg-[oklch(0.15_0.03_252)] p-4"
                    >
                      <h3 className="font-semibold text-white">{pillar.title}</h3>
                      <p className="text-sm text-cyan-100/70 mt-1.5">{pillar.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={120}>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src={crewImage}
                  alt="Roofing team installing shingles"
                  className="w-full h-48 md:h-56 object-cover rounded-xl border border-cyan-200/20"
                  loading="lazy"
                  decoding="async"
                />
                <img
                  src={truckImage}
                  alt="Roofing truck at residential work site"
                  className="w-full h-48 md:h-56 object-cover rounded-xl border border-cyan-200/20"
                  loading="lazy"
                  decoding="async"
                />
                <img
                  src={roofImage}
                  alt="Completed roof replacement result"
                  className="col-span-2 w-full h-56 md:h-64 object-cover rounded-xl border border-cyan-200/20"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="roofing-results" className="relative py-20 md:py-24">
        <div className="absolute inset-0 bg-[oklch(0.10_0.03_252)]" />
        <div className="relative z-10 container">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-cyan-300 font-semibold uppercase tracking-widest text-sm">
                Results / Transformation
              </span>
              <h2 className="mt-3 text-3xl md:text-5xl font-bold text-white">
                Turn Cold Traffic Into Predictable Roofing Leads
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {results.map((item, idx) => (
              <ScrollReveal key={item.title} delay={idx * 100}>
                <div className="h-full rounded-xl border border-cyan-200/20 bg-[oklch(0.15_0.03_252)] p-6">
                  <div className="w-10 h-10 rounded-lg bg-cyan-300/15 border border-cyan-300/35 flex items-center justify-center mb-4">
                    <ArrowRight className="w-5 h-5 text-cyan-200" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-cyan-100/70 leading-relaxed">{item.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="roofing-what-you-get" className="relative py-20 md:py-24">
        <div className="absolute inset-0 bg-[oklch(0.11_0.03_252)]" />
        <div className="relative z-10 container">
          <ScrollReveal>
            <div className="text-center max-w-4xl mx-auto mb-12">
              <span className="text-cyan-300 font-semibold uppercase tracking-widest text-sm">
                What You Get
              </span>
              <h2 className="mt-3 text-3xl md:text-5xl font-bold text-white">
                Everything You Need to Win More Roofing Jobs Online
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whatYouGet.map((item, idx) => (
              <ScrollReveal key={item} delay={idx * 70}>
                <div className="rounded-xl border border-cyan-200/20 bg-[oklch(0.15_0.03_252)] p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-200 shrink-0 mt-0.5" />
                    <p className="text-sm text-cyan-100/80">{item}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="roofing-process" className="relative py-20 md:py-24">
        <div className="absolute inset-0 bg-[oklch(0.10_0.03_252)]" />
        <div className="relative z-10 container">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-cyan-300 font-semibold uppercase tracking-widest text-sm">
                Process
              </span>
              <h2 className="mt-3 text-3xl md:text-5xl font-bold text-white">
                Built Fast. Focused on Conversion.
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <ScrollReveal key={step.step} delay={idx * 90}>
                <div className="h-full rounded-xl border border-cyan-200/20 bg-[oklch(0.15_0.03_252)] p-6">
                  <div className="text-4xl font-bold text-cyan-300/35 mb-3">{step.step}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-cyan-100/70 leading-relaxed">{step.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="roofing-proof" className="relative py-20 md:py-24">
        <div className="absolute inset-0 bg-[oklch(0.11_0.03_252)]" />
        <div className="relative z-10 container">
          <ScrollReveal>
            <div className="text-center max-w-4xl mx-auto mb-12">
              <span className="text-cyan-300 font-semibold uppercase tracking-widest text-sm">
                Trust / Credibility
              </span>
              <h2 className="mt-3 text-3xl md:text-5xl font-bold text-white">
                Roofing-Specific Thinking Backed by Realistic Outcomes
              </h2>
              <p className="mt-4 text-cyan-100/75">
                Even before formal case studies, these examples show how the
                strategy is built around roofing sales cycles and local intent.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {exampleStories.map((story, idx) => (
              <ScrollReveal key={story.company} delay={idx * 120}>
                <article className="h-full rounded-xl border border-cyan-200/20 bg-[oklch(0.15_0.03_252)] p-6">
                  <h3 className="text-2xl font-bold text-white">{story.company}</h3>
                  <div className="space-y-3 mt-5 text-sm">
                    <p className="text-cyan-100/75">
                      <span className="text-cyan-200 font-semibold">Challenge: </span>
                      {story.challenge}
                    </p>
                    <p className="text-cyan-100/75">
                      <span className="text-cyan-200 font-semibold">Approach: </span>
                      {story.approach}
                    </p>
                    <p className="text-cyan-100/75">
                      <span className="text-cyan-200 font-semibold">Built Outcome: </span>
                      {story.outcome}
                    </p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={220}>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Clock3, label: "Fast response-focused UX" },
                { icon: MapPinHouse, label: "Local search intent structure" },
                { icon: Wrench, label: "Roofing service-specific pages" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="rounded-xl border border-cyan-200/20 bg-[oklch(0.15_0.03_252)] p-4 flex items-center gap-3"
                >
                  <badge.icon className="w-5 h-5 text-cyan-200" />
                  <span className="text-sm text-cyan-100/80">{badge.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="roofing-final-cta" className="relative py-20 md:py-24">
        <div className="absolute inset-0 bg-[oklch(0.09_0.03_252)]" />
        <div className="relative z-10 container">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto rounded-2xl border border-cyan-300/35 bg-gradient-to-br from-cyan-300/20 to-blue-900/35 p-8 md:p-12 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-200/40 bg-cyan-200/10 text-xs uppercase tracking-[0.17em] text-cyan-100 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Free Roofing Funnel Review
              </div>
              <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white">
                See How Many Leads Your Roofing Website Is Missing
              </h2>
              <p className="mt-4 text-cyan-50/85 max-w-2xl mx-auto">
                We&apos;ll break down what&apos;s hurting conversions, where calls are
                being lost, and what to fix first to generate more quote requests.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  onClick={() => setLocation("/#contact")}
                  size="lg"
                  className="bg-cyan-300 hover:bg-cyan-200 text-slate-950 font-semibold px-8 py-6 text-base shadow-[0_0_28px_rgba(34,211,238,0.35)]"
                >
                  Get a Free Roofing Website Audit
                </Button>
                <Button
                  onClick={() => scrollTo("#roofing-problem")}
                  size="lg"
                  variant="outline"
                  className="border-cyan-200/40 bg-white/5 text-cyan-100 hover:bg-cyan-200/10 px-8 py-6 text-base"
                >
                  See How Many Leads You&apos;re Missing
                </Button>
              </div>
              <p className="mt-5 text-sm text-cyan-100/75">
                No pressure. Just a clear strategy you can use immediately.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <footer className="border-t border-cyan-200/15 bg-[oklch(0.08_0.03_250)]">
        <div className="container py-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-cyan-100/70">
            © {new Date().getFullYear()} Summit Peak Roofing Growth.
          </p>
          <div className="flex items-center gap-4 text-xs text-cyan-100/65 uppercase tracking-widest">
            <span className="inline-flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-cyan-200" />
              Roofing Niche
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-200" />
              Conversion Focused
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
