/**
 * HeroSection — High Ridge Web Design
 * Outcome-first hero focused on qualified leads and booked jobs.
 */
import { Button } from "@/components/ui/button";
import { ArrowDown, CheckCircle2 } from "lucide-react";
import { useIsMobile } from "@/hooks/useMobile";
import { Link } from "wouter";

export default function HeroSection() {
  const isMobile = useIsMobile();

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-6rem)] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <picture>
        <source
          type="image/avif"
          srcSet="/hero-bg-640.avif 640w, /hero-bg-960.avif 960w, /hero-bg-1280.avif 1280w, /hero-bg-1600.avif 1600w"
          sizes="100vw"
        />
        <source
          type="image/webp"
          srcSet="/hero-bg-640.webp 640w, /hero-bg-960.webp 960w, /hero-bg-1280.webp 1280w, /hero-bg-1600.webp 1600w"
          sizes="100vw"
        />
        <img
          src="/hero-bg-960.webp"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          width={1600}
          height={894}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>

      {/* Dark overlay gradient — heavier at top for nav readability, lighter at center */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

      {/* Seamless transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[oklch(0.10_0.02_260)] to-transparent" />

      {/* Content */}
      <div className="relative z-10 container text-center px-4 py-16 md:py-20">
        {/* Tagline badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-brand-orange/30 bg-brand-orange/10 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-brand-orange motion-safe:md:animate-pulse" />
          <span className="text-sm font-semibold text-brand-amber tracking-widest uppercase">
            Built for Contractors & Local Service Businesses
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Turn More Website Traffic Into Qualified Leads and Booked Jobs
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl">
          Highridge builds conversion-focused websites and lead systems for home
          service companies that need more calls, stronger opportunities, and
          measurable revenue growth.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-brand-orange hover:bg-brand-orange-bright text-white font-semibold text-base px-8 py-6 glow-orange transition-all duration-300 rounded-lg"
          >
            <a href="#contact">Book a Strategy Call</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 font-medium text-base px-8 py-6 rounded-lg backdrop-blur-sm"
          >
            <a href="#services">See How It Works</a>
          </Button>
        </div>

        {!isMobile && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto text-left">
            {[
              "Conversion-driven page structure",
              "Local SEO foundation built in",
              "Lead capture and follow-up workflows",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-white/20 bg-black/25 px-4 py-3 text-sm text-gray-100 flex items-start gap-2"
              >
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-brand-orange shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}

        <div className={isMobile ? "mt-6" : "mt-5"}>
          <Link
            href="/demos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-amber hover:text-brand-orange-bright transition-colors"
          >
            Preview Demo Sites
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-300">
          No brochure websites. No template churn. Built to drive pipeline.
        </p>

        {!isMobile && (
          <a
            href="#services"
            onClick={(event) => {
              event.preventDefault();
              scrollTo("#services");
            }}
            className="mt-14 inline-flex flex-col items-center gap-2 text-white/70 hover:text-brand-orange transition-colors duration-300 motion-safe:md:animate-bounce"
            aria-label="Scroll down to services section"
          >
            <span className="text-xs uppercase tracking-widest">Explore</span>
            <ArrowDown size={20} />
          </a>
        )}
      </div>
    </section>
  );
}
