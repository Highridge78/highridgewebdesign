/**
 * HeroSection — High Ridge Web Design
 * Above-the-fold offer clarity + primary conversion CTA.
 */
import { Button } from "@/components/ui/button";
import { ArrowDown, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663455642890/NdrKoxrvNzAjAncKbyczK5/hero-bg-6AP37PrEwkYVivEqXtb2BS.webp";

const trustHighlights = [
  "Built for contractors, law firms, and home service businesses",
  "Fast mobile-first build focused on calls, forms, and bookings",
  "SEO + automation stack that keeps leads moving 24/7",
];

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-[calc(100svh-5rem)] items-center justify-center overflow-hidden py-20 md:py-24">
      {/* Hero background */}
      <img
        src={HERO_BG}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1200}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />

      {/* Seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[oklch(0.10_0.02_260)] to-transparent" />

      <div className="relative z-10 container px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-brand-orange/30 bg-brand-orange/10 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-brand-orange md:animate-pulse" />
          <span className="text-sm font-medium text-brand-amber tracking-widest uppercase">
            Web Design &bull; SEO &bull; AI Bots &bull; Automation
          </span>
        </div>

        <h1 className="mx-auto max-w-5xl text-balance text-4xl font-bold leading-tight text-white md:text-6xl">
          Websites for Local Service Businesses That Generate More Calls, Leads, and Booked Jobs
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-200 md:text-xl">
          High Ridge Web Design combines conversion-first design, local SEO, and smart automation so your site works
          as a sales system instead of a digital brochure.
        </p>

        <p className="mx-auto mt-4 max-w-3xl text-sm text-white/80 md:text-base">
          Best for busy owners who want measurable growth without adding more manual follow-up.
        </p>

        <div className="mx-auto mt-8 grid max-w-3xl gap-2 text-left sm:grid-cols-3">
          {trustHighlights.map((item) => (
            <p key={item} className="flex items-start gap-2 rounded-lg border border-white/15 bg-black/35 p-3 text-sm text-white/90">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
              <span>{item}</span>
            </p>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            onClick={() => scrollTo("#contact")}
            size="lg"
            className="min-h-12 bg-brand-orange px-8 py-6 text-base font-semibold text-white glow-orange transition-all duration-300 hover:bg-brand-orange-bright"
          >
            Get a Free Website Audit
          </Button>
          <Button
            onClick={() => scrollTo("#services")}
            variant="outline"
            size="lg"
            className="min-h-12 border-white/35 bg-black/20 px-8 py-6 text-base font-medium text-white backdrop-blur-sm hover:bg-white/10"
          >
            See Services
          </Button>
        </div>

        <div className="mt-4">
          <Link
            href="/demos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-amber transition-colors hover:text-brand-orange-bright"
          >
            Preview Demo Sites
          </Link>
        </div>

        <p className="mt-5 text-sm text-gray-300">
          Most local business websites lose qualified visitors in the first few seconds. We fix that.
        </p>

        <button
          onClick={() => scrollTo("#services")}
          className="mt-12 inline-flex flex-col items-center gap-2 text-white/55 transition-colors duration-300 hover:text-brand-orange md:animate-bounce"
          aria-label="Scroll down"
        >
          <span className="text-xs uppercase tracking-widest">Explore</span>
          <ArrowDown size={20} />
        </button>
      </div>
    </section>
  );
}
