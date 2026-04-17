import { Button } from "@/components/ui/button";
import { ArrowRight, Star, ShieldCheck } from "lucide-react";
import ComparisonVisual from "./ComparisonVisual";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const offset = 120;
      const target = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-48 pb-32 md:pt-64 md:pb-48 overflow-hidden bg-[oklch(0.10_0.02_260)]">
      {/* Background depth */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-orange/[0.04] to-transparent pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-[40rem] h-[40rem] bg-brand-orange/[0.05] rounded-full blur-[150px] pointer-events-none" />

      <div className="container relative z-10 px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          
          {/* LEFT: Headline & CTA */}
          <div className="flex flex-col gap-12 max-w-4xl">
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 bg-brand-orange/10 px-5 py-2.5 rounded-full border border-brand-orange/20">
                  <Star size={16} className="fill-brand-amber text-brand-amber" />
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-white/90">High-Trust Agency</span>
                </div>
                <div className="h-px w-12 bg-white/10" />
                <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-white/40">Established in Sylva, NC</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-8xl font-serif font-bold text-white leading-[1.02] tracking-tighter">
                Stop Losing Customers to a Website That <span className="text-brand-orange">Doesn't Convert.</span>
              </h1>

              <div className="space-y-6">
                <p className="text-2xl md:text-3xl text-foreground/80 leading-relaxed font-semibold max-w-2xl">
                  We help local service businesses turn underperforming websites into consistent, high-quality leads—without rebuilding everything from scratch.
                </p>
                <div className="flex items-center gap-3 text-brand-amber bg-white/5 w-fit px-6 py-3 rounded-2xl border border-white/5">
                  <ShieldCheck size={20} />
                  <span className="text-sm font-black uppercase tracking-[0.2em]">Built for Contractors & Home Services</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <Button
                  onClick={() => scrollTo("#contact")}
                  className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange-bright text-white font-black text-2xl px-16 py-10 rounded-2xl shadow-[0_20px_50px_rgba(255,106,0,0.3)] transition-all hover:-translate-y-1 active:scale-95 glow-orange"
                >
                  Get My Free Website Audit
                </Button>
                
                <a 
                  href="/demos"
                  className="group flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors"
                >
                  See Demo Sites 
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform text-brand-orange" />
                </a>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
                {["Free audit", "No pressure", "Clear next steps"].map(text => (
                  <div key={text} className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-white/30">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 max-w-xl backdrop-blur-xl">
               <p className="text-lg text-foreground/70 leading-relaxed font-medium italic">
                 "We review your site and show you exactly what’s costing you leads. No fluff, just a clear plan to win back your customers."
               </p>
            </div>
          </div>

          {/* RIGHT: Static Comparison Visual */}
          <ComparisonVisual />

        </div>
      </div>
    </section>
  );
}
