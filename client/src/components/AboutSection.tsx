export default function AboutSection() {
  return (
    <section id="about" className="relative py-36 overflow-hidden bg-[oklch(0.12_0.02_260)]">
      {/* Deep gradient background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-orange/[0.03] to-transparent pointer-events-none" />
      
      <div className="container relative z-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          
          {/* Founder Image Column — Fixed rendering and high quality display */}
          <div className="relative order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-lg group">
              <div className="aspect-[4/5] relative rounded-[3rem] overflow-hidden border-2 border-white/10 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.8)] transition-all duration-700 group-hover:scale-[1.02] group-hover:border-brand-orange/20">
                <img 
                  src="/founder-jeremy.png" 
                  alt="Jeremy Black - Founder of High Ridge Web Design" 
                  className="w-full h-full object-cover"
                />
                {/* Visual vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0.02_260)] via-transparent to-transparent opacity-90" />
              </div>
              
              {/* Founder Overlay Info */}
              <div className="absolute bottom-10 left-10 right-10 p-8 rounded-3xl bg-black/60 backdrop-blur-2xl border border-white/10 shadow-2xl transition-all group-hover:translate-y-[-10px]">
                <div className="text-3xl font-serif font-bold text-white mb-1">Jeremy Black</div>
                <div className="text-sm uppercase tracking-[0.4em] text-brand-orange font-black">Founder & Lead Strategist</div>
              </div>
            </div>
          </div>

          {/* Copy Column */}
          <div className="flex flex-col gap-12 order-1 lg:order-2">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-brand-orange bg-brand-orange/10 px-6 py-2.5 rounded-full border border-brand-orange/20 shadow-lg">
                A Partner, Not Just an Agency
              </div>
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-white leading-[1.05] tracking-tight">
                Built for <span className="text-brand-orange">Local Results</span>, Not Generic Templates.
              </h2>
              <p className="text-2xl font-bold text-white/90 italic border-l-8 border-brand-orange pl-8 py-4 bg-white/5 rounded-r-2xl">
                “I started High Ridge to fix what most agencies ignore—websites that look fine, but don’t actually bring in business.”
              </p>
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
              <div className="flex flex-col gap-2">
                <span className="text-4xl font-black text-white">5.0</span>
                <span className="text-xs uppercase font-bold text-gray-500 tracking-[0.3em]">Average Rating</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-4xl font-black text-white">WNC</span>
                <span className="text-xs uppercase font-bold text-gray-500 tracking-[0.3em]">Local Rooted</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-4xl font-black text-white">100%</span>
                <span className="text-xs uppercase font-bold text-gray-500 tracking-[0.3em]">Accountability</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
