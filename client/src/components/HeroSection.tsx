import { Button } from "@/components/ui/button";
import { ArrowDown, CheckCircle2 } from "lucide-react";
import { useIsMobile } from "@/hooks/useMobile";

export default function HeroSection() {
  const isMobile = useIsMobile();

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen pt-24 md:pt-0 flex items-center justify-center overflow-hidden">
      <img
        src="/images/hero-placeholder.webp"
        alt="Frady's Flooring hero placeholder showing premium hardwood installation work"
        fetchPriority="high"
        loading="eager"
        decoding="async"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.13_0.03_250/0.84)] via-[oklch(0.13_0.03_250/0.62)] to-[oklch(0.13_0.03_250/0.9)]" />

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[oklch(0.13_0.03_250)] to-transparent" />

      <div className="relative z-10 container text-center px-4 py-16 md:py-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-brand-orange/40 bg-brand-orange/15 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-brand-orange motion-safe:md:animate-pulse" />
          <span className="text-sm font-semibold text-brand-amber tracking-widest uppercase">
            Family-Owned | Western North Carolina
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white max-w-4xl mx-auto">
          Beautiful Hardwood Floors Installed Right the First Time
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-100 max-w-3xl mx-auto">
          Frady&apos;s Flooring helps homeowners in Sylva, Waynesville, Franklin,
          and Asheville upgrade worn floors with clean installs, careful
          refinishing, and dependable project timelines.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-brand-orange hover:bg-brand-orange-bright text-white font-semibold text-base px-8 py-6 glow-orange transition-all duration-300 rounded-lg w-full sm:w-auto"
          >
            <a href="#contact">Request a Free Estimate</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-brand-amber/50 text-brand-amber hover:bg-brand-amber/10 font-medium text-base px-8 py-6 rounded-lg backdrop-blur-sm w-full sm:w-auto"
          >
            <a href="#results">See Recent Work</a>
          </Button>
        </div>

        {!isMobile && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto text-left">
            {[
              "Precision install and trim finish",
              "Dust-controlled sanding process",
              "Locally trusted and fully reliable",
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

        <p className="mt-6 text-sm text-gray-200">
          Owned by the Frady family. Built on craftsmanship and word-of-mouth trust.
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
