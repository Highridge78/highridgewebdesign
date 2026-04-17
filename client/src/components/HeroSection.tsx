import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, ShieldCheck } from "lucide-react";
import TransformationMockup from "./TransformationMockup";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const offset = 80;
      const target = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-36 pb-24 md:pt-56 md:pb-40 overflow-hidden bg-[oklch(0.10_0.02_260)]">
      {/* Subtle background treatments */}
      <div className="absolute top-0 right-0 w-2/5 h-full bg-gradient-to-l from-brand-orange/[0.03] to-transparent pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-[30rem] h-[30rem] bg-brand-orange/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* LEFT SIDE: Sales Copy */}
          <div className="flex flex-col gap-10 max-w-3xl">
            <div className="flex flex-col gap-6">
              {/* Trust Signal */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[oklch(0.10_0.02_260)] bg-gray-800 flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-brand-orange/20 flex items-center justify-center text-[10px] font-bold text-brand-orange">WNC</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} size={10} className="fill-brand-amber text-brand-amber" />)}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/50">Trusted by Local Businesses</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white leading-[1.05] tracking-tight">
                Stop Losing Customers to a Website That <span className="text-brand-orange">Doesn't Convert.</span>
              </h1>

              <div className="space-y-4">
                <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-medium">
                  We help local service businesses turn underperforming websites into consistent, high-quality leads—without rebuilding everything from scratch.
                </p>
                <p className="text-sm font-semibold text-brand-amber uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck size={16} />
                  Built for contractors, home services, and local companies.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Button
                  onClick={() => scrollTo("#contact")}
                  className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange-bright text-white font-bold text-xl px-12 py-9 rounded-xl shadow-2xl shadow-brand-orange/30 transition-all hover:-translate-y-1 active:scale-95 glow-orange"
                >
                  Get My Free Website Audit
                </Button>
                
                <a 
                  href="/demos"
                  className="group flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors"
                >
                  See Demo Sites 
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-brand-orange" />
                </a>
              </div>
              
              {/* Friction Reducers */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-foreground/40">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  Free audit
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-foreground/40">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  No pressure
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-foreground/40">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  Clear next steps
                </div>
              </div>
            </div>
            
            {/* Audit explanation */}
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 max-w-lg">
               <p className="text-sm text-foreground/60 leading-relaxed italic">
                 "We review your site and show you exactly what’s costing you leads. No fluff, just a clear plan to win back your customers."
               </p>
            </div>
          </div>

          {/* RIGHT SIDE: Proof Column */}
          <div className="relative lg:pt-12">
            <TransformationMockup />
            
            {/* Metric badge overlay */}
            <div className="absolute -bottom-8 -right-4 md:right-0 md:translate-x-1/4 p-8 rounded-2xl bg-[oklch(0.15_0.02_260/0.98)] backdrop-blur-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-30 flex flex-col items-center gap-1 group">
              <span className="text-4xl font-black text-brand-orange group-hover:scale-110 transition-transform">3x</span>
              <span className="text-[11px] uppercase font-bold tracking-[0.15em] text-gray-400 text-center leading-tight">
                More Leads <br/>
                <span className="text-white/40 font-medium text-[9px] tracking-normal">(Client Result)</span>
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
