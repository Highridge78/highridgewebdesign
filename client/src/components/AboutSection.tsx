export default function AboutSection() {
  const FOUNDER_PHOTO = "/images/founder-jeremy-460.webp";
  const FALLBACK_PHOTO = "/images/founder-jeremy-460.avif";

  return (
    <section id="about" className="relative py-48 overflow-hidden bg-[oklch(0.12_0.02_260)]">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-orange/[0.04] to-transparent pointer-events-none" />
      
      <div className="container relative z-10 px-8">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-24 lg:gap-32 items-start">
          
          {/* Founder Image Column — Zero Cropping, Balanced Scale */}
          <div className="lg:col-span-4 relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[170px] sm:max-w-[190px] md:max-w-[220px] group">
              <div className="relative rounded-[2rem] overflow-hidden border-2 border-white/5 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.8)] transition-all duration-700 bg-white/[0.02]">
                <img 
                  src={FOUNDER_PHOTO} 
                  alt="Jeremy Black - Founder of High Ridge Web Design" 
                  className="w-full h-auto object-contain block relative z-10" // h-auto + object-contain = NO CROP
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== FALLBACK_PHOTO) {
                       target.src = FALLBACK_PHOTO;
                    }
                  }}
                />
                {/* Visual depth — strictly at bottom, away from head */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[oklch(0.12_0.02_260)] to-transparent z-20 opacity-80" />
              </div>
              
              {/* Floating Name Badge */}
              <div className="absolute -bottom-6 -right-3 lg:-right-8 p-4 rounded-2xl bg-black/90 backdrop-blur-3xl border border-white/10 shadow-2xl transition-all group-hover:translate-y-[-10px] z-30">
                <div className="text-lg font-serif font-bold text-white mb-1">Jeremy Black</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-brand-orange font-black">Founder & Lead Strategist</div>
              </div>
            </div>
          </div>

          {/* Copy Column */}
          <div className="lg:col-span-6 flex flex-col gap-16 pt-10">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-4 text-sm font-black uppercase tracking-[0.4em] text-brand-orange bg-brand-orange/10 px-8 py-3 rounded-full border border-brand-orange/20 shadow-xl">
                A Partner, Not Just an Agency
              </div>
              <h2 className="text-6xl md:text-8xl font-serif font-bold text-white leading-[1.05] tracking-tight">
                Built for <span className="text-brand-orange">Local Results</span>, Not Generic Templates.
              </h2>
              <div className="relative">
                <div className="absolute -left-10 top-0 bottom-0 w-3 bg-brand-orange rounded-full shadow-[0_0_30px_rgba(255,106,0,0.5)]" />
                <p className="text-3xl font-black text-white/95 italic pl-12 py-8 bg-white/[0.03] rounded-r-[3rem] border border-white/5 shadow-2xl">
                  “I started High Ridge to fix what most agencies ignore—websites that look fine, but don’t actually bring in business.”
                </p>
              </div>
            </div>

            <div className="space-y-10 text-foreground/70 leading-relaxed text-2xl lg:text-3xl">
              <p>
                I founded High Ridge Web Design in Sylva, North Carolina, after watching too many great local businesses lose out to competitors simply because they lacked a professional online presence.
              </p>
              <p>
                We don't just build websites; we build complete digital systems. From HVAC companies to law firms, we level the playing field so your work can speak for itself.
              </p>
            </div>

            <div className="pt-16 flex flex-wrap gap-20 items-center border-t border-white/10">
              {[
                { label: "Client Rating", val: "5.0" },
                { label: "WNC Rooted", val: "Local" },
                { label: "Personal Accountability", val: "100%" }
              ].map(item => (
                <div key={item.label} className="flex flex-col gap-3">
                  <span className="text-6xl font-black text-white">{item.val}</span>
                  <span className="text-xs uppercase font-bold text-gray-500 tracking-[0.4em]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
