/**
 * AboutSection — High Ridge Web Design
 * Problem-Solution narrative: why local businesses need automation.
 * Jeremy Black, Founder — Sylva, NC | Western NC | Globally Available
 * Includes website remodeling/redesign messaging.
 */
import { Clock, PhoneOff, TrendingDown, Flame } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const problems = [
  {
    icon: PhoneOff,
    stat: "62%",
    label: "of calls go unanswered",
    detail: "When you're on a job, leads call your competitor instead.",
  },
  {
    icon: Clock,
    stat: "5 min",
    label: "is the response window",
    detail: "After 5 minutes, your odds of converting a lead drop by 80%.",
  },
  {
    icon: TrendingDown,
    stat: "78%",
    label: "of leads choose the first responder",
    detail: "Speed wins. The business that responds first gets the job.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 md:py-24 overflow-hidden">
      {/* Subtle diagonal background */}
      <div className="absolute inset-0 bg-[oklch(0.12_0.02_260)]" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-orange/[0.03] to-transparent" />

      <div className="relative z-10 container">
        {/* Problem section */}
        <div className="mb-16 md:mb-20">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
                The Problem
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 max-w-3xl mx-auto">
                Your Business Is Losing Leads{" "}
                <span className="text-gradient-orange">Right Now</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problems.map((p, i) => (
              <ScrollReveal key={p.stat} delay={i * 120}>
                <div className="relative p-6 rounded-xl bg-[oklch(0.15_0.02_260)] border border-border group hover:border-brand-orange/30 transition-all duration-300 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <p.icon className="w-5 h-5 text-red-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white font-serif mb-1">
                    {p.stat}
                  </div>
                  <div className="text-sm font-semibold text-foreground/80 mb-2">
                    {p.label}
                  </div>
                  <p className="text-sm text-foreground/50 leading-relaxed">
                    {p.detail}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Solution / About section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: text */}
          <ScrollReveal direction="left">
            <div>
              <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
                The Solution
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-3 mb-6">
                We Build Systems That{" "}
                <span className="text-gradient-orange">Never Sleep</span>
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  High Ridge Web Design isn't just another web agency. We
                  specialize in building complete digital systems for local
                  businesses — HVAC companies, law firms, landscapers, contractors
                  — the businesses that are too busy doing great work to worry
                  about their online presence.
                </p>
                <p>
                  Whether you need a brand-new website built from the ground up or
                  your existing site is outdated, slow, and failing to convert,
                  we transform underperforming web presences into client-producing
                  machines. We pair high-performance design with AI-powered
                  chatbots and automated workflows so your business captures every
                  lead, responds instantly, and books more appointments — all
                  without you lifting a finger.
                </p>
                <p>
                  Founded by Jeremy Black in Sylva, North Carolina, High Ridge
                  was born from watching too many great local businesses lose out
                  to competitors with a better digital presence. We proudly serve
                  all of Western North Carolina and are available globally for
                  remote projects. Our mission is simple: level the playing field
                  so your work speaks for itself.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-orange/20 border border-brand-orange/30 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-brand-orange" />
                </div>
                <div>
                  <div className="font-semibold text-white">
                    Design. Automate. Grow.
                  </div>
                  <div className="text-sm text-foreground/50">
                    That's not just a tagline — it's our process.
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: visual stats */}
          <ScrollReveal direction="right" delay={200}>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-[oklch(0.15_0.02_260)] border border-border text-center hover:border-brand-orange/30 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold font-serif text-brand-orange mb-2">
                  24/7
                </div>
                <div className="text-xs text-foreground/50 uppercase tracking-wider leading-tight">
                  AI-Powered Lead Capture
                </div>
              </div>
              <div className="p-6 rounded-xl bg-[oklch(0.15_0.02_260)] border border-border text-center hover:border-brand-orange/30 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold font-serif text-brand-amber mb-2">
                  &lt;5s
                </div>
                <div className="text-xs text-foreground/50 uppercase tracking-wider leading-tight">
                  Average Response Time
                </div>
              </div>
              <div className="p-6 rounded-xl bg-[oklch(0.15_0.02_260)] border border-border text-center hover:border-brand-orange/30 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold font-serif text-brand-gold mb-2">
                  3x
                </div>
                <div className="text-xs text-foreground/50 uppercase tracking-wider leading-tight">
                  More Leads Captured
                </div>
              </div>
              <div className="p-6 rounded-xl bg-[oklch(0.15_0.02_260)] border border-border text-center hover:border-brand-orange/30 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold font-serif text-brand-orange-bright mb-2">
                  100%
                </div>
                <div className="text-xs text-foreground/50 uppercase tracking-wider leading-tight">
                  Custom-Built Solutions
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
