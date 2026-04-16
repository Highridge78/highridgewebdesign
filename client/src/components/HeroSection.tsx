/**
 * HeroSection — High Ridge Web Design
 * Clear conversion-first hero for service businesses.
 */
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useIsMobile } from "@/hooks/useMobile";
import { Link } from "wouter";

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
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-brand-orange/30 bg-brand-orange/10 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-brand-orange md:animate-pulse" />
          <span className="text-sm font-medium text-brand-amber tracking-widest uppercase">
            Built for Service Businesses
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-5xl mx-auto">
          We build high-converting websites for service businesses that turn
          visitors into booked jobs.
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          If your website isn&apos;t generating consistent leads, it&apos;s costing
          you business. We design and optimize websites that help you capture
          more calls, more inquiries, and more revenue.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => scrollTo("#contact")}
            size="lg"
            className="bg-brand-orange hover:bg-brand-orange-bright text-white font-semibold text-base px-8 py-6 glow-orange transition-all duration-300 rounded-lg"
          >
            Get a Free Website &amp; Lead Audit
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 font-medium text-base px-8 py-6 rounded-lg backdrop-blur-sm"
            asChild
          >
            <Link href="/demos">View Example Projects</Link>
          </Button>
        </div>

        <p className="mt-6 text-sm text-gray-300">
          Trusted by local service businesses that need qualified leads, not
          just website traffic.
        </p>

        <button
          onClick={() => scrollTo("#problem")}
          className="mt-14 inline-flex flex-col items-center gap-2 text-white/50 hover:text-brand-orange transition-colors duration-300 md:animate-bounce"
          aria-label="Scroll down"
        >
          <span className="text-xs uppercase tracking-widest">See Why Sites Fail</span>
          <ArrowDown size={20} />
        </button>
      </div>
    </section>
  );
}
