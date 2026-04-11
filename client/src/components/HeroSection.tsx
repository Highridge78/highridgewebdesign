/**
 * HeroSection — High Ridge Web Design
 * Full-viewport hero with user-provided mountain ridge sunset background.
 * Light text on dark image. Tagline: "Design. Automate. Grow."
 */
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663455642890/NdrKoxrvNzAjAncKbyczK5/hero-bg-user_e8b373ac.png";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const y = window.scrollY;
      heroRef.current.style.transform = `translateY(${y * 0.3}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax */}
      <div
        ref={heroRef}
        className="absolute inset-0 -top-20 -bottom-20 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />

      {/* Dark overlay gradient — heavier at top for nav readability, lighter at center */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

      {/* Seamless transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[oklch(0.10_0.02_260)] to-transparent" />

      {/* Content */}
      <div className="relative z-10 container text-center px-4">
        {/* Tagline badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-brand-orange/30 bg-brand-orange/10 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
          <span className="text-sm font-medium text-brand-amber tracking-widest uppercase">
            Web Design &bull; SEO &bull; AI Bots &bull; Automation
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
  Your Website Should Be Bringing You Customers — Not Sitting There Doing Nothing
</h1>

        {/* Subheading */}
        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl">
  We build high-performance websites for service businesses that want more calls, more leads, and real growth — not just a pretty design.
</p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => scrollTo("#contact")}
            size="lg"
            className="bg-brand-orange hover:bg-brand-orange-bright text-white font-semibold text-base px-8 py-6 glow-orange transition-all duration-300 rounded-lg"
          >
            Get My Free Website Audit
          </Button>
          <Button
            onClick={() => scrollTo("#services")}
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 font-medium text-base px-8 py-6 rounded-lg backdrop-blur-sm"
                  >
          See What We Can Do
        </Button>
      </div>

      <p className="mt-6 text-sm text-gray-400">
        Most business websites lose potential customers within seconds. Let’s fix that.
      </p>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo("#services")}
          className="mt-14 inline-flex flex-col items-center gap-2 text-white/50 hover:text-brand-orange transition-colors duration-300 animate-bounce"
          aria-label="Scroll down"
        >
          <span className="text-xs uppercase tracking-widest">Explore</span>
          <ArrowDown size={20} />
        </button>
      </div>
    </section>
  );
}
