import { ArrowRight, CheckCircle2, Sparkles, Store } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/usePageMeta";

type DemoSite = {
  industry: string;
  headline: string;
  positioning: string;
  trustAngle: string;
  cta: string;
};

const demoSites: DemoSite[] = [
  {
    industry: "HVAC & Plumbing",
    headline: "Book More Emergency Calls From Mobile Visitors",
    positioning:
      "A high-trust local service layout designed for fast quote requests and clear service areas.",
    trustAngle:
      "Prominent reviews, licensing badges, and click-to-call CTAs reduce hesitation and improve call volume.",
    cta: "Want this style for your business?",
  },
  {
    industry: "Law Firms",
    headline: "Turn Website Visits Into Qualified Consultations",
    positioning:
      "A premium legal design focused on practice-area clarity, attorney authority, and fast lead capture.",
    trustAngle:
      "Trust signals and guided inquiry flows help serious clients take the next step with confidence.",
    cta: "Want this style for your firm?",
  },
  {
    industry: "Landscaping & Outdoor Services",
    headline: "Showcase Your Work and Win Higher-Value Jobs",
    positioning:
      "A visual-first layout that highlights transformations while pushing visitors toward estimate requests.",
    trustAngle:
      "Before/after proof and process transparency build confidence for larger-ticket projects.",
    cta: "Want this style for your company?",
  },
  {
    industry: "Contractors & Remodeling",
    headline: "Build Instant Credibility for Big-Ticket Projects",
    positioning:
      "A contractor-focused structure with service breakdowns, financing prompts, and project proof.",
    trustAngle:
      "Clear expectations and social proof reduce uncertainty and improve close rates.",
    cta: "Want this style for your business?",
  },
  {
    industry: "Medical & Dental",
    headline: "Increase Appointment Requests Without Extra Ad Spend",
    positioning:
      "A patient-friendly experience focused on services, provider trust, and frictionless scheduling.",
    trustAngle:
      "Compliance-forward messaging and patient testimonials increase confidence before booking.",
    cta: "Want this style for your practice?",
  },
  {
    industry: "Real Estate Teams",
    headline: "Capture and Nurture More Buyer and Seller Leads",
    positioning:
      "A lead-generation layout built for listings, local authority, and fast follow-up opportunities.",
    trustAngle:
      "Neighborhood expertise and social proof help prospects choose your team faster.",
    cta: "Want this style for your team?",
  },
];

export default function PortfolioPage() {
  usePageMeta({
    title: "Portfolio & Demo Sites | High Ridge Web Design",
    description:
      "Explore conversion-focused demo websites by industry and request a custom version built for your local business.",
  });

  const scrollToContact = () => {
    window.location.href = "/#contact";
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-32 md:pt-44">
        <section className="relative py-12 md:py-16">
          <div className="absolute inset-0 bg-[oklch(0.10_0.02_260)]" />
          <div className="relative z-10 container">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center">
                <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
                  Portfolio / Demo Sites
                </span>
                <h1 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                  See What Your Business Could Look Like
                </h1>
                <p className="mt-5 text-foreground/70 text-lg">
                  These demo website concepts are built to show what a premium,
                  conversion-focused digital presence can look like for your
                  industry. If your current site feels outdated, slow, or generic,
                  this is what better can look like.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                  <Button
                    onClick={scrollToContact}
                    className="bg-brand-orange hover:bg-brand-orange-bright text-white font-semibold px-7 py-6 glow-orange"
                  >
                    Request My Custom Version
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => (window.location.href = "/#demos")}
                    variant="outline"
                    className="border-white/25 text-white hover:bg-white/10 px-7 py-6"
                  >
                    Jump to Demo Highlights
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="relative py-8 md:py-12">
          <div className="absolute inset-0 bg-[oklch(0.12_0.02_260)]" />
          <div className="relative z-10 container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {demoSites.map((demo, i) => (
                <ScrollReveal key={demo.industry} delay={i * 80}>
                  <article className="h-full rounded-2xl border border-border bg-[oklch(0.15_0.02_260)] p-6 md:p-7 hover:border-brand-orange/35 transition-all duration-300">
                    <div className="inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-3 py-1 text-xs uppercase tracking-wider text-brand-amber">
                      <Store className="w-3.5 h-3.5 text-brand-orange" />
                      {demo.industry}
                    </div>

                    <h2 className="mt-4 font-serif text-2xl font-bold text-white leading-snug">
                      {demo.headline}
                    </h2>

                    <p className="mt-3 text-foreground/70 text-sm leading-relaxed">
                      {demo.positioning}
                    </p>

                    <div className="mt-5 rounded-xl border border-brand-orange/20 bg-brand-orange/8 p-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-orange mt-0.5 shrink-0" />
                        <p className="text-sm text-foreground/75 leading-relaxed">
                          {demo.trustAngle}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={scrollToContact}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-orange hover:text-white hover:bg-brand-orange px-4 py-2 rounded-md transition-all duration-300"
                    >
                      {demo.cta}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-12 md:py-16">
          <div className="absolute inset-0 bg-[oklch(0.10_0.02_260)]" />
          <div className="relative z-10 container">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center rounded-2xl border border-brand-orange/20 bg-gradient-to-br from-[oklch(0.15_0.03_50)] to-[oklch(0.12_0.02_260)] p-8 md:p-10">
                <div className="inline-flex items-center gap-2 text-brand-orange text-sm uppercase tracking-widest font-semibold">
                  <Sparkles className="w-4 h-4" />
                  Built For Your Market
                </div>
                <h3 className="mt-3 font-serif text-2xl md:text-3xl font-bold text-white">
                  Your Competitors Shouldn’t Have a Better Website Than You
                </h3>
                <p className="mt-4 text-foreground/70 leading-relaxed">
                  If your current site is old, hard to use on mobile, or not
                  bringing in leads, we can build a premium version tailored to
                  your exact business and goals.
                </p>
                <Button
                  onClick={scrollToContact}
                  className="mt-7 bg-brand-orange hover:bg-brand-orange-bright text-white font-semibold px-8 py-6 glow-orange"
                >
                  Get My Custom Demo Plan
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
