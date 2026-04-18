export default function ComparisonVisual() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto py-12">
      {/* Supporting Label Above */}
      <div className="text-center">
        <span className="text-xs font-black uppercase tracking-[0.4em] text-brand-orange/60">
          Real Website Transformation
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BEFORE PANEL */}
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <span className="text-sm font-black uppercase tracking-widest text-white/30">
              Before
            </span>
          </div>
          <div className="relative aspect-[4/3] bg-gray-200 rounded-3xl overflow-hidden border border-white/5 grayscale opacity-60">
            <div className="p-8 h-full flex flex-col justify-center gap-4">
              <div className="w-24 h-6 bg-gray-300 rounded mb-4" />
              <div className="h-3 bg-gray-300 w-full rounded" />
              <div className="h-3 bg-gray-300 w-11/12 rounded" />
              <div className="h-3 bg-gray-300 w-3/4 rounded" />
              <div className="h-3 bg-gray-300 w-1/2 rounded mb-6" />
              <div className="grid grid-cols-3 gap-2">
                <div className="h-10 bg-gray-300 rounded-lg" />
                <div className="h-10 bg-gray-300 rounded-lg" />
                <div className="h-10 bg-gray-300 rounded-lg" />
              </div>
              <div className="mt-4 flex flex-col items-center gap-2">
                <div className="h-8 w-32 bg-gray-400 rounded-full" />
              </div>
            </div>
            {/* Clutter overlay */}
            <div className="absolute top-4 right-4 rotate-12 bg-red-500/20 border border-red-500/40 text-[8px] text-red-500 font-bold px-2 py-1 rounded">
              Confusing Layout
            </div>
            <div className="absolute bottom-10 left-4 -rotate-6 bg-red-500/20 border border-red-500/40 text-[8px] text-red-500 font-bold px-2 py-1 rounded">
              Slow Loading
            </div>
          </div>
        </div>

        {/* AFTER PANEL */}
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <span className="text-sm font-black uppercase tracking-widest text-brand-orange">
              After
            </span>
          </div>
          <div className="relative aspect-[4/3] bg-[oklch(0.12_0.02_260)] rounded-3xl overflow-hidden border border-brand-orange/30 shadow-[0_30px_60px_-15px_rgba(255,106,0,0.3)]">
            <div className="p-8 h-full flex flex-col justify-center gap-4 bg-gradient-to-br from-brand-orange/[0.08] to-transparent">
              <div className="w-16 h-1 bg-brand-orange rounded-full mb-4 shadow-[0_0_15px_rgba(255,106,0,0.5)]" />
              <div className="text-2xl font-serif font-bold text-white leading-tight">
                Structured For Results
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-medium">
                Engineered to capture leads and build immediate brand authority.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center">
                  <span className="text-xl font-black text-brand-orange">
                    99
                  </span>
                  <span className="text-[8px] uppercase font-bold text-gray-500">
                    Speed
                  </span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center">
                  <span className="text-xl font-black text-brand-amber">
                    312%
                  </span>
                  <span className="text-[8px] uppercase font-bold text-gray-500">
                    Growth
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-col items-center">
                <div className="h-10 w-full bg-brand-orange rounded-xl shadow-lg shadow-brand-orange/20" />
              </div>
            </div>
            {/* Quality flags */}
            <div className="absolute top-4 right-4 -rotate-6 bg-green-500/20 border border-green-500/40 text-[8px] text-green-400 font-bold px-2 py-1 rounded-full backdrop-blur-md">
              Mobile Optimized
            </div>
          </div>
        </div>
      </div>

      {/* Proof Layer Below */}
      <div className="text-center space-y-2 mt-4">
        <div className="text-4xl font-black text-white tracking-tighter">
          +3x <span className="text-brand-orange">More Leads</span>
        </div>
        <p className="text-sm font-bold text-white/40 uppercase tracking-[0.2em]">
          Clear messaging • Faster load times • Higher conversion
        </p>
      </div>
    </div>
  );
}
