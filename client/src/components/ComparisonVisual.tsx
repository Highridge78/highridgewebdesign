export default function ComparisonVisual() {
  return (
    <div className="flex flex-col gap-10 w-full max-w-4xl mx-auto py-16">
      {/* Supporting Label Above */}
      <div className="text-center">
        <span className="text-sm font-black uppercase tracking-[0.5em] text-brand-orange/60">Real Website Transformation</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
        {/* BEFORE PANEL — The problem */}
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <span className="text-lg font-black uppercase tracking-[0.3em] text-white/30 italic">Before</span>
          </div>
          <div className="relative flex-1 aspect-[4/3] bg-[#222] rounded-[3rem] overflow-hidden border-2 border-white/5 grayscale group shadow-xl">
            <div className="p-10 h-full flex flex-col justify-center gap-6 opacity-40">
              <div className="w-32 h-10 bg-gray-700 rounded-lg mb-4" />
              <div className="space-y-3">
                <div className="h-4 bg-gray-800 w-full rounded" />
                <div className="h-4 bg-gray-800 w-11/12 rounded" />
                <div className="h-4 bg-gray-800 w-3/4 rounded" />
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="h-16 bg-gray-800 rounded-xl" />
                <div className="h-16 bg-gray-800 rounded-xl" />
                <div className="h-16 bg-gray-800 rounded-xl" />
              </div>
              <div className="mt-8 flex justify-center">
                <div className="h-12 w-48 bg-gray-700 rounded-full" />
              </div>
            </div>
            
            {/* Visual Callouts */}
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
               <div className="px-4 py-2 bg-red-500/20 border border-red-500/40 rounded-full text-red-500 text-xs font-black uppercase tracking-widest backdrop-blur-md">Confusing Hierarchy</div>
               <div className="px-4 py-2 bg-red-500/20 border border-red-500/40 rounded-full text-red-500 text-xs font-black uppercase tracking-widest backdrop-blur-md">Slow Load Speed</div>
            </div>
          </div>
        </div>

        {/* AFTER PANEL — The High Ridge solution */}
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <span className="text-lg font-black uppercase tracking-[0.3em] text-brand-orange animate-pulse">After</span>
          </div>
          <div className="relative flex-1 aspect-[4/3] bg-[oklch(0.12_0.02_260)] rounded-[3rem] overflow-hidden border-4 border-brand-orange/30 shadow-[0_40px_80px_-20px_rgba(255,106,0,0.4)]">
            <div className="p-10 h-full flex flex-col justify-center gap-6 bg-gradient-to-br from-brand-orange/[0.1] to-transparent">
              <div className="w-20 h-2 bg-brand-orange rounded-full mb-4 shadow-[0_0_20px_rgba(255,106,0,0.6)]" />
              <div className="text-3xl font-serif font-bold text-white leading-tight">Engineered to Convert</div>
              <p className="text-lg text-gray-300 leading-relaxed font-medium">Fast, focused messaging that turns strangers into leads.</p>
              
              <div className="grid grid-cols-2 gap-6 mt-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-start gap-1 backdrop-blur-md shadow-xl">
                  <span className="text-3xl font-black text-brand-orange">99/100</span>
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Performance</span>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-start gap-1 backdrop-blur-md shadow-xl">
                  <span className="text-3xl font-black text-brand-amber">+312%</span>
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Lead Growth</span>
                </div>
              </div>
              
              <div className="mt-6">
                 <div className="h-12 w-full bg-brand-orange rounded-2xl shadow-xl shadow-brand-orange/30 flex items-center justify-center">
                    <div className="w-1/2 h-1.5 bg-white/30 rounded-full" />
                 </div>
              </div>
            </div>
            {/* Visual Callouts */}
            <div className="absolute top-6 right-6 px-4 py-2 bg-green-500/20 border border-green-500/40 rounded-full text-green-400 text-xs font-black uppercase tracking-widest backdrop-blur-md">High Converting</div>
          </div>
        </div>
      </div>

      {/* Proof Layer Below */}
      <div className="text-center space-y-4 mt-8">
        <div className="text-5xl md:text-7xl font-black text-white tracking-tighter">
           +3x <span className="text-brand-orange drop-shadow-[0_0_20px_rgba(255,106,0,0.3)]">More Leads</span>
        </div>
        <p className="text-lg md:text-xl font-bold text-white/50 uppercase tracking-[0.4em]">
          Clear messaging • Faster load times • Higher conversion
        </p>
      </div>
    </div>
