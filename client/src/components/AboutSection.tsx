export default function AboutSection() {
  const FOUNDER_PHOTO = "/founder-jeremy.jpg";
  const FALLBACK_PHOTO = "https://customer-assets.emergentagent.com/wingman/3d41f473-25d4-41a9-809e-7c50a1461173/attachments/1fd1651efcf44fbdb0968424f9be9b0c_founder-jeremy.jpg";

  return (
    <section id="about" className="relative py-48 overflow-hidden bg-[oklch(0.12_0.02_260)]">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-orange/[0.03] to-transparent pointer-events-none" />
      
      <div className="container relative z-10 px-8">
        {/* Adjusted grid to 30/70 split for a more balanced professional look */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 lg:gap-24 items-start">
          
          {/* Founder Image Column — Fixed to prevent cropping and show full subject */}
          <div className="lg:col-span-4 relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-sm group">
              <div className="relative rounded-[3rem] overflow-hidden border-2 border-white/10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] transition-all duration-700 bg-black/20">
                <img 
                  src={FOUNDER_PHOTO} 
                  alt="Jeremy Black - Founder of High Ridge Web Design" 
                  className="w-full h-auto object-contain block" // Changed to h-auto and object-contain to ensure no cropping
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = FALLBACK_PHOTO;
                  }}
                />
                {/* Subtle bottom vignette that doesn't reach the head */}
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0.02_260/0.8)] via-transparent to-transparent opacity-60" />
              </div>
              
              {/* Floating Name Badge — Positioned slightly off-center for a custom feel */}
              <div className="absolute -bottom-6 -right-6 lg:-right-12 p-8 rounded-3xl bg-black/80 backdrop-blur-2xl border border-white/10 shadow-2xl transition-all group-hover:translate-y-[-5px]">
                <div className="text-3xl font-serif font-bold text-white mb-1">Jeremy Black</div>
                <div className="text-xs uppercase tracking-[0.4em] text-brand-orange font-black">Founder & Lead Strategist</div>
              </div>
            </div>
          </div>

          {/* Copy Column — Taking the remaining 60% of the grid */}
          <div className="lg:col-span-6 flex flex-col gap-12">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-brand-orange bg-brand-orange/10 px-6 py-2.5 rounded-full border border-brand-orange/20 shadow-lg">
                A Partner, Not Just an Agency
              </div>
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-white leading-[1.1] tracking-tight">
                Built for <span className="text-brand-orange">Local Results</span>, Not Generic Templates.
              </h2>
              <div className="relative">
                <div className="absolute -left-6 top-0 bottom-0 w-2 bg-brand-orange rounded-full shadow-[0_0_15px_rgba(255,106,0,0.4)]" />
                <p className="text-2xl font-black text-white/90 italic pl-8 py-4 bg-white/5 rounded-r-2xl border border-white/5 shadow-xl">
                  “I started High Ridge to fix what most agencies ignore—websites that look fine, but don’t actually bring in business.”
                </p>
              </div>
            </div>

            <div className="space-y-8 text-foreground/70 leading-relaxed text-xl lg:text-2xl">
              <p>
                I founded High Ridge Web Design in Sylva, North Carolina, after watching too many great local businesses lose out to competitors simply because they lacked a professional online presence.
              </p>
              <p>
                We don't just build websites; we build complete digital systems. From HVAC companies to law firms, we level the playing field so your work can speak for itself.
              </p>
            </div>

            <div className="pt-12 flex flex-wrap gap-16 items-center border-t border-white/10">
              {[
                { label: "Client Rating", val: "5.0" },
                { label: "WNC Rooted", val: "Local" },
                { label: "Personal Accountability", val: "100%" }
              ].map(item => (
                <div key={item.label} className="flex flex-col gap-2">
                  <span className="text-4xl font-black text-white">{item.val}</span>
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-[0.3em]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
