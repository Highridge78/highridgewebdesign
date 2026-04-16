/**
 * HeroSection — High Ridge Web Design
 * Full-viewport conversion-first hero.
 */
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/useMobile";

const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663455642890/NdrKoxrvNzAjAncKbyczK5/hero-bg-6AP37PrEwkYVivEqXtb2BS.webp";

export default function HeroSection() {
  const heroRef = useRef<HTMLImageElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      if (!heroRef.current) return;
      const y = window.scrollY;
      heroRef.current.style.transform = `translateY(${y * 0.3}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen pt-32 md:pt-0 flex items-center justify-center overflow-hidden">
      <img
        ref={heroRef}
        src={HERO_BG}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -top-20 -bottom-20 h-[calc(100%+10rem)] w-full object-cover will-change-transform"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/80" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[oklch(0.10_0.02_260)] to-transparent" />

      <div className="relative z-10 container text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-5xl mx-auto">
          If your website isn't generating leads, it's costing you business.
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          We build high-converting websites for service businesses that turn
          traffic into calls, quote requests, and real revenue.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => scrollTo("#cost-of-inaction")}
            size="lg"
            className="bg-brand-orange hover:bg-brand-orange-bright text-white font-semibold text-base px-8 py-6 glow-orange transition-all duration-300 rounded-lg"
          >
            See Where Your Website Is Losing Leads
          </Button>
          <Button
            onClick={() => scrollTo("#audit-offer")}
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 font-medium text-base px-8 py-6 rounded-lg backdrop-blur-sm"
          >
            Get a Free Website &amp; Lead Audit
          </Button>
        </div>

        <p className="mt-6 text-sm text-gray-300">
          Built for service businesses that need consistent inbound leads - not
          just traffic.
        </p>
      </div>
    </section>
  );
}
