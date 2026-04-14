import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  CheckCircle2,
  Gauge,
  Rocket,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { Link } from "wouter";
import {
  demoTestimonials,
  localBusinessAudience,
  objectionFaq,
  trustBarItems,
} from "./data";

const serviceCards = [
  {
    icon: Gauge,
    title: "Conversion-First Website Design",
    outcome: "Turn more clicks into calls and quote requests from local buyers.",
  },
  {
    icon: Bot,
    title: "24/7 AI Lead Chatbot",
    outcome: "Capture and qualify leads instantly, even after business hours.",
  },
  {
    icon: Workflow,
    title: "Business Automation Workflows",
    outcome: "Automate follow-up, reminders, and lead routing to close faster.",
  },
];

const resultPoints = [
  "Mobile pages tuned for speed to reduce drop-off and boost trust.",
  "AI lead capture that replies instantly and books qualified calls.",
  "Automated follow-up so warm leads don't go cold.",
];

export default function DemoConversionPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/demos" className="text-sm font-semibold tracking-wide text-brand-amber">
            Highridge Redesign Concepts
          </Link>
          <Button asChild size="sm" className="bg-brand-orange hover:bg-brand-orange-bright text-white">
            <a href="#cta">Get a Free Demo Site</a>
          </Button>
        </div>
      </header>

      <main>
        <section className="border-b border-white/10 py-16 sm:py-20">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-3 py-1 text-xs uppercase tracking-widest text-brand-amber">
                <Rocket className="h-3.5 w-3.5" />
                Demo 1 • High-Conversion Local Business Machine
              </p>
              <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
                Websites That Turn Visitors Into Paying Customers
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-slate-300">
                We build high-converting websites, AI chatbots, and automations for local businesses.
                Turn your website into a 24/7 sales system that captures, qualifies, and follows up with
                leads while you sleep.
              </p>
              <p className="mt-3 text-sm text-slate-400">{localBusinessAudience}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-brand-orange hover:bg-brand-orange-bright text-white">
                  <a href="#cta">
                    Get a Free Demo Site
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/25 text-white hover:bg-white/10">
                  <a href="#how-it-works">See How It Works</a>
                </Button>
              </div>
            </div>
            <aside className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-amber">Built for local owners</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-200">
                <li className="flex items-start gap-2">
                  <BadgeCheck className="mt-0.5 h-4 w-4 text-brand-orange" />
                  Business owners with outdated websites losing calls and leads.
                </li>
                <li className="flex items-start gap-2">
                  <BadgeCheck className="mt-0.5 h-4 w-4 text-brand-orange" />
                  Teams that need clearer offers and stronger conversion flow.
                </li>
                <li className="flex items-start gap-2">
                  <BadgeCheck className="mt-0.5 h-4 w-4 text-brand-orange" />
                  Companies ready to automate lead response and follow-up.
                </li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="border-b border-white/10 py-8">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 sm:px-6 lg:px-8">
            {trustBarItems.map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-white/10 py-14">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-white">Why local websites fail — and how we fix it</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <article className="rounded-2xl border border-red-400/25 bg-red-500/10 p-6">
                <h3 className="text-lg font-semibold text-white">The problem</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-200">
                  Most local business websites look decent but fail at conversion. Slow load times, weak calls-to-action,
                  and delayed follow-up send ready-to-buy leads to faster competitors.
                </p>
              </article>
              <article className="rounded-2xl border border-brand-orange/30 bg-brand-orange/10 p-6">
                <h3 className="text-lg font-semibold text-white">The Highridge solution</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-100">
                  We combine conversion-centered design, AI chatbots, and automation workflows so every visitor gets a
                  clear next step, instant response, and consistent follow-up.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 py-14">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-white">Core services that drive measurable outcomes</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {serviceCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <card.icon className="h-5 w-5 text-brand-orange" />
                  <h3 className="mt-4 text-lg font-semibold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{card.outcome}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="border-b border-white/10 py-14">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-white">How it works</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[
                { step: "01", title: "Build", copy: "We design your site around your offer, local audience, and conversion goals." },
                { step: "02", title: "Launch", copy: "We deploy a high-speed, mobile-first site with trust signals and clear CTAs." },
                { step: "03", title: "Automate", copy: "AI chat and workflows capture, route, and follow up with leads automatically." },
              ].map((item) => (
                <article key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <p className="text-3xl font-bold text-brand-orange/80">{item.step}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 py-14">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-white">What this does for your business</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {resultPoints.map((point) => (
                <div key={point} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-brand-orange" />
                    <span>{point}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 py-14">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-white">What clients say</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {demoTestimonials.map((testimonial) => (
                <blockquote key={testimonial.name} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <p className="text-sm leading-relaxed text-slate-200">“{testimonial.quote}”</p>
                  <footer className="mt-4 text-xs uppercase tracking-wider text-brand-amber">
                    {testimonial.name} • {testimonial.business}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 py-14">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-white">Frequently asked questions</h2>
            <div className="mt-8 space-y-4">
              {objectionFaq.map((faq) => (
                <article key={faq.question} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-base font-semibold text-white">{faq.question}</h3>
                  <p className="mt-2 text-sm text-slate-300">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="cta" className="py-16">
          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-brand-orange/25 bg-gradient-to-br from-brand-orange/20 to-slate-900 p-8 text-center">
              <h2 className="font-serif text-3xl font-bold text-white">Ready for a website that sells for you 24/7?</h2>
              <p className="mt-3 text-slate-200">
                Get a free demo concept tailored to your business type and local market.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-brand-orange hover:bg-brand-orange-bright text-white">
                  <Link href="/#contact">
                    Get a Free Demo Site
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Link href="/demos">Compare Demo Concepts</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-14">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-3 px-4 sm:flex-row sm:px-6 lg:px-8">
            <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Link href="/demos">Back to demo index</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Link href="/">Back to main site</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
