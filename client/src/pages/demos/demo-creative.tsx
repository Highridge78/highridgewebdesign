import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  ArrowRight,
  ChevronRight,
  Gauge,
  MessageCircleMore,
  Sparkles,
  Workflow,
} from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";
import {
  demoTestimonials,
  localBusinessAudience,
  objectionFaq,
  trustBarItems,
} from "./data";

const systemBlocks = [
  {
    title: "Website",
    icon: Gauge,
    description:
      "A fast, conversion-focused site engineered to capture intent from local traffic.",
  },
  {
    title: "AI Chatbot",
    icon: MessageCircleMore,
    description:
      "Instant qualification and response flow for prospects when your team is unavailable.",
  },
  {
    title: "Automation",
    icon: Workflow,
    description:
      "Lead routing, follow-up, reminders, and status updates that keep deals moving automatically.",
  },
];

const aiServices = [
  {
    title: "AI Lead Capture Layer",
    body: "Turn anonymous traffic into qualified opportunities with intelligent, context-aware intake.",
  },
  {
    title: "Automated Follow-Up Pipelines",
    body: "Send fast, personalized replies and reminders so prospects never go cold.",
  },
  {
    title: "Smart Booking & Routing",
    body: "Route leads to the right team member, service area, or schedule slot automatically.",
  },
];

const caseExamples = [
  {
    industry: "HVAC Company",
    result:
      "After-hours chatbot + web forms increased booked service requests by 39%.",
  },
  {
    industry: "Family Law Firm",
    result:
      "AI intake assistant reduced admin call burden while raising consultation quality.",
  },
  {
    industry: "Landscape Contractor",
    result:
      "Automated follow-up sequences shortened average lead response time to under 2 minutes.",
  },
];

const outcomeMetrics = [
  { label: "Faster Lead Response", value: "< 2 mins" },
  { label: "Potential Lost Leads Recovered", value: "30-45%" },
  { label: "Admin Time Saved", value: "8-15 hrs/week" },
];

export default function DemoCreativePage() {
  usePageMeta({
    title: "Demo: AI-Powered Future Agency | Highridge Web Design",
    description:
      "See an AI-first agency homepage concept that combines website strategy, chatbots, and automation into a 24/7 sales system.",
    canonicalPath: "/demos/demo-creative",
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-[oklch(0.10_0.02_260/0.92)] backdrop-blur">
        <div className="container flex items-center justify-between py-4">
          <Link
            href="/demos"
            className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-amber hover:text-brand-orange transition-colors"
          >
            Website Demo Concepts
          </Link>
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-white/20 bg-transparent text-white hover:bg-white/10"
            >
              <Link href="/">Main Site</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-brand-orange text-white hover:bg-brand-orange-bright"
            >
              <Link href="/demos">All Demos</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.16_0.05_255)] via-[oklch(0.12_0.03_260)] to-[oklch(0.10_0.02_260)]" />
        <div className="absolute top-[-180px] right-[-120px] h-[420px] w-[420px] rounded-full bg-brand-orange/15 blur-3xl" />
        <div className="absolute bottom-[-120px] left-[-80px] h-[320px] w-[320px] rounded-full bg-[oklch(0.62_0.18_280/0.25)] blur-3xl" />
        <div className="relative z-10 container">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-brand-amber">
              <Sparkles className="h-4 w-4 text-brand-orange" />
              Demo Concept 3 — AI Differentiation Play
            </div>
            <h1 className="mt-5 font-serif text-4xl font-bold leading-tight text-white md:text-6xl">
              AI-Powered Websites That Work For You 24/7
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-foreground/75">
              We combine web design, AI chatbots, and automation to turn your
              website into a revenue engine.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                asChild
                className="bg-brand-orange px-8 py-6 text-base font-semibold text-white hover:bg-brand-orange-bright"
              >
                <Link href="/#contact">
                  Get My AI-Powered Site Plan
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/25 bg-white/5 px-8 py-6 text-base text-white hover:bg-white/10"
              >
                <a href="#system-flow">See The System</a>
              </Button>
            </div>
            <p className="mt-6 text-sm text-foreground/60">
              {localBusinessAudience}
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-[oklch(0.11_0.02_260)] py-8">
        <div className="container grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustBarItems.map(item => (
            <div
              key={item}
              className="rounded-xl border border-border/70 bg-card/55 px-4 py-3 text-sm text-foreground/75"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border/70 bg-[oklch(0.11_0.02_260)] py-12">
        <div className="container grid gap-6 md:grid-cols-3">
          {[
            "Most websites only look good. They don't run follow-up.",
            "Slow response times kill local deals before your team replies.",
            "Manual admin work drains time that should go into growth.",
          ].map(item => (
            <article
              key={item}
              className="rounded-xl border border-border/70 bg-card/55 p-5"
            >
              <h2 className="font-serif text-xl font-semibold text-white">
                Why Most Websites Fail
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                {item}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
              The High Ridge System
            </h2>
            <p className="mt-3 text-foreground/70">
              Three synchronized layers transform your site into a
              lead-converting, self-operating digital sales system.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {systemBlocks.map(item => (
              <article
                key={item.title}
                className="relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6"
              >
                <div className="inline-flex rounded-lg border border-brand-orange/30 bg-brand-orange/15 p-3">
                  <item.icon className="h-5 w-5 text-brand-orange" />
                </div>
                <h3 className="mt-4 font-serif text-2xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="system-flow"
        className="bg-[oklch(0.11_0.02_260)] py-16 md:py-20"
      >
        <div className="container">
          <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
            System Flow: Lead → Chatbot → Conversion
          </h2>
          <div className="mt-8 rounded-2xl border border-brand-orange/25 bg-gradient-to-r from-card/70 to-[oklch(0.14_0.03_260)] p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Visitor Arrives",
                  text: "Your website communicates value and intent-based offers in seconds.",
                },
                {
                  step: "02",
                  title: "AI Qualifies Lead",
                  text: "Chatbot handles common questions and captures key job details instantly.",
                },
                {
                  step: "03",
                  title: "Automation Converts",
                  text: "Workflow sends follow-up, books appointments, and alerts your team.",
                },
              ].map((flow, idx) => (
                <div
                  key={flow.step}
                  className="relative rounded-xl border border-border/70 bg-card/60 p-5"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-brand-amber">
                    Step {flow.step}
                  </span>
                  <h3 className="mt-2 font-serif text-xl font-semibold text-white">
                    {flow.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                    {flow.text}
                  </p>
                  {idx < 2 && (
                    <ChevronRight className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-brand-orange/60 md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container grid gap-6 md:grid-cols-3">
          {aiServices.map(item => (
            <article
              key={item.title}
              className="rounded-xl border border-border bg-card/55 p-6"
            >
              <h2 className="font-serif text-2xl font-semibold text-white">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[oklch(0.11_0.02_260)] py-16 md:py-20">
        <div className="container">
          <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
            Case-Style Outcomes
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {caseExamples.map(item => (
              <article
                key={item.industry}
                className="rounded-xl border border-border/70 bg-card/60 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-amber">
                  {item.industry}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  {item.result}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container grid gap-5 md:grid-cols-3">
          {outcomeMetrics.map(metric => (
            <article
              key={metric.label}
              className="rounded-xl border border-brand-orange/25 bg-brand-orange/8 p-6 text-center"
            >
              <p className="text-3xl font-bold text-white">{metric.value}</p>
              <p className="mt-2 text-sm uppercase tracking-wider text-foreground/70">
                {metric.label}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[oklch(0.11_0.02_260)] py-16 md:py-20">
        <div className="container grid gap-5 md:grid-cols-3">
          {demoTestimonials.map(item => (
            <blockquote
              key={item.name}
              className="rounded-xl border border-border/70 bg-card/60 p-6"
            >
              <p className="text-sm leading-relaxed text-foreground/75">
                "{item.quote}"
              </p>
              <footer className="mt-4">
                <p className="text-sm font-semibold text-white">{item.name}</p>
                <p className="text-xs uppercase tracking-wider text-brand-amber">
                  {item.business}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container max-w-3xl">
          <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
            FAQ
          </h2>
          <div className="mt-6 space-y-4">
            {objectionFaq.map(item => (
              <article
                key={item.question}
                className="rounded-xl border border-border bg-card/60 p-5"
              >
                <h3 className="font-semibold text-white">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/70 bg-[oklch(0.12_0.02_260)] py-16">
        <div className="container">
          <div className="rounded-2xl border border-brand-orange/25 bg-gradient-to-r from-brand-orange/15 to-card/70 p-8 md:p-10">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
                  Ready for a Website That Sells and Automates?
                </h2>
                <p className="mt-3 text-foreground/75">
                  Let&apos;s map your business workflow and build an AI-powered
                  lead engine tailored to your local market.
                </p>
              </div>
              <Button className="bg-brand-orange px-8 py-6 text-base font-semibold text-white hover:bg-brand-orange-bright">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2"
                >
                  Book a Strategy Call
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/demos"
              className="text-sm font-semibold text-brand-orange hover:text-brand-orange-bright"
            >
              Back to all demo concepts
            </Link>
            <span aria-hidden className="text-foreground/30">
              •
            </span>
            <Link
              href="/"
              className="text-sm font-semibold text-foreground/70 hover:text-white"
            >
              Return to main site
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
