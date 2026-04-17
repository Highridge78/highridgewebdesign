export default function AboutSection() {
  const FOUNDER_PHOTO = "/founder-jeremy.jpg";
  const FALLBACK_PHOTO = "https://customer-assets.emergentagent.com/wingman/3d41f473-25d4-41a9-809e-7c50a1461173/attachments/1fd1651efcf44fbdb0968424f9be9b0c_founder-jeremy.jpg";

  return (
    <section id="about" className="relative py-48 overflow-hidden bg-[oklch(0.12_0.02_260)]">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-orange/[0.03] to-transparent pointer-events-none" />
      
      <div className="container relative z-10 px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-40 items-center">
          
          <div className="relative order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-lg group">
              <div className="aspect-[4/5] relative rounded-[4rem] overflow-hidden border-4 border-white/5 shadow-2xl transition-all duration-700 group-hover:scale-[1.02] group-hover:border-brand-orange/20">
                <img 
                  src={FOUNDER_PHOTO} 
                  alt="Jeremy Black - Founder of High Ridge Web Design" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = FALLBACK_PHOTO;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0.02_260)] via-transparent to-transparent opacity-90" />
              </div>
              
              <div className="absolute bottom-12 left-10 right-10 p-10 rounded-[2.5rem] bg-black/60 backdrop-blur-3xl border border-white/10 shadow-2xl transition-all group-hover:translate-y-[-15px]">
                <div className="text-4xl font-serif font-bold text-white mb-1">Jeremy Black</div>
                <div className="text-sm uppercase tracking-[0.5em] text-brand-orange font-black">Founder & Lead Strategist</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-14 order-1 lg:order-2">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-4 text-sm font-black uppercase tracking-[0.4em] text-brand-orange bg-brand-orange/10 px-8 py-3 rounded-full border border-brand-orange/20 shadow-xl">
                The Founder's Mission
              </div>
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[1.02] tracking-tighter">
                Built for <span className="text-brand-orange">Local Results</span>, Not Generic Templates.
              </h2>
              <p className="text-3xl font-black text-white/90 italic border-l-[12px] border-brand-orange pl-10 py-6 bg-white/5 rounded-r-3xl shadow-2xl">
                “I started High Ridge to fix what most agencies ignore—websites that look fine, but don’t actually bring in business.”
              </p>
            </div>

            <div className="space-y-10 text-foreground/70 leading-relaxed text-2xl">
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
                  <span className="text-5xl font-black text-white">{item.val}</span>
                  <span className="text-xs uppercase font-bold text-gray-500 tracking-[0.3em]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
