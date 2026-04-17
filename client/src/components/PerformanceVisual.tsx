export default function PerformanceVisual() {
  return (
    <div className="relative w-full max-w-2xl mx-auto py-12">
      {/* The "Result" Browser Window */}
      <div className="relative aspect-video bg-[oklch(0.12_0.02_260)] rounded-[2.5rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden group">
        <div className="p-10 h-full flex flex-col justify-center bg-gradient-to-br from-brand-orange/[0.1] to-transparent">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-amber-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
            <div className="ml-4 h-6 w-48 bg-white/5 rounded-full border border-white/5" />
          </div>
          
          <div className="w-16 h-1.5 bg-brand-orange mb-6 rounded-full shadow-[0_0_15px_rgba(255,106,0,0.5)]" />
          <h4 className="text-4xl font-serif font-bold text-white mb-4 leading-tight tracking-tight">The High Ridge Framework</h4>
          <p className="text-xl text-gray-400 max-w-sm mb-10 leading-relaxed font-medium">We replace generic templates with custom high-performance sales systems.</p>
          
          <div className="flex gap-4">
             <div className="h-1 bg-white/20 flex-1 rounded-full overflow-hidden">
                <div className="h-full bg-brand-orange w-full" />
             </div>
             <div className="h-1 bg-white/20 flex-1 rounded-full overflow-hidden">
                <div className="h-full bg-brand-orange w-full" />
             </div>
             <div className="h-1 bg-white/20 flex-1 rounded-full overflow-hidden">
                <div className="h-full bg-white/10 w-1/2" />
             </div>
          </div>
        </div>
        
        {/* Floating Success Stats */}
        <div className="absolute top-10 right-10 flex flex-col gap-4">
           <div className="p-6 bg-black/60 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl transform hover:-translate-y-2 transition-transform duration-500">
              <div className="text-sm font-bold text-brand-orange uppercase tracking-widest mb-1">Page Speed</div>
              <div className="text-4xl font-black text-white">99/100</div>
           </div>
        </div>

        <div className="absolute bottom-10 right-10">
           <div className="p-6 bg-brand-orange/90 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <div className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-1">Lead Growth</div>
              <div className="text-4xl font-black text-white">312%</div>
           </div>
        </div>

        {/* Audit Overlay Card */}
        <div className="absolute -left-4 bottom-12 p-8 bg-[oklch(0.15_0.02_260)] border border-brand-orange/30 rounded-[2rem] shadow-2xl max-w-[240px] transform -rotate-2 hover:rotate-0 transition-all duration-700">
           <div className="w-10 h-10 bg-brand-orange/20 rounded-xl flex items-center justify-center mb-4 border border-brand-orange/20">
              <svg className="w-6 h-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
           </div>
           <p className="text-base font-bold text-white leading-tight">Verified Conversion Optimized Result</p>
        </div>
      </div>
      
      {/* Trust Anchor */}
      <div className="mt-12 flex items-center justify-center gap-6 opacity-30 grayscale contrast-150">
         <div className="text-xs font-black uppercase tracking-[0.4em] text-white">Guaranteed</div>
         <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
         <div className="text-xs font-black uppercase tracking-[0.4em] text-white">Measured</div>
         <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
         <div className="text-xs font-black uppercase tracking-[0.4em] text-white">Proven</div>
      </div>
    </div>
  );
}
