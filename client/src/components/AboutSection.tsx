export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 overflow-hidden bg-[oklch(0.12_0.02_260)]">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-orange/[0.02] to-transparent pointer-events-none" />
      
      <div className="container relative z-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Founder Image Column */}
          <div className="relative order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md group">
              <div className="aspect-[4/5] relative rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
                <img 
                  src="/founder-jeremy.png" 
                  alt="Jeremy Black - Founder of High Ridge Web Design" 
                  className="w-full h-full object-cover"
                />
                {/* Clean vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0.02_260)] via-transparent to-transparent opacity-80" />
              </div>
              
              {/* Info Overlay */}
              <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
                <div className="text-2xl font-serif font-bold text-white">Jeremy Black</div>
                <div className="text-xs uppercase tracking-[0.3em] text-brand-orange font-black mt-1">Founder & Lead Strategist</div>
              </div>
            </div>
          </div>

          {/* Copy Column */}
          <div className="flex flex-col gap-10 order-1 lg:order-2">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-orange bg-brand-orange/10 px-4 py-2 rounded-full border border-brand-orange/20">
                A Partner, Not Just an Agency
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-[1.1]">
                Built for <span className="text-brand-orange">Local Results</span>, Not Generic Templates.
              </h2>
              <p className="text-xl font-bold text-white/90 italic border-l-4 border-brand-orange pl-6 py-2">
                “I started High Ridge to fix what most agencies ignore—websites that look fine, but don’t actually bring in business.”
              </p>
            </div>

            <div className="space-y-6 text-foreground/70 leading-relaxed text-lg lg:text-xl">
              <p>
                I founded High Ridge Web Design in Sylva, North Carolina, after watching too many great local businesses lose out to competitors simply because they lacked a professional online presence.
              </p>
              <p>
                We don't just build websites; we build complete digital systems. From HVAC companies to law firms, we level the playing field so your work can speak for itself.
              </p>
            </div>

            <div className="pt-10 flex flex-wrap gap-12 items-center border-t border-white/10">
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-black text-white">5.0</span>
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-[0.2em]">Rating</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-black text-white">WNC</span>
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-[0.2em]">Local Rooted</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-black text-white">100%</span>
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-[0.2em]">Personal Accountability</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
