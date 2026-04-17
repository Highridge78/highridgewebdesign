import { useState } from "react";

export default function TransformationMockup() {
  const [sliderPos, setSliderPos] = useState(0); // 0% shows the AFTER state (High Ridge) by default

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = "touches" in e 
      ? e.touches[0].clientX - rect.left 
      : (e as React.MouseEvent).clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(position);
  };

  return (
    <div className="relative group">
      <div 
        className="relative w-full max-w-2xl mx-auto aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.7)] cursor-ew-resize"
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
      >
        {/* AFTER STATE (High Ridge) — The Base Layer */}
        <div className="absolute inset-0 bg-[oklch(0.12_0.02_260)]">
          <div className="p-12 h-full flex flex-col justify-center bg-gradient-to-br from-brand-orange/[0.05] to-transparent">
            <div className="w-16 h-1.5 bg-brand-orange mb-8 rounded-full shadow-[0_0_15px_rgba(255,106,0,0.5)]" />
            <h4 className="text-4xl font-serif font-bold text-white mb-4 tracking-tight">Lead-Generation Machine</h4>
            <p className="text-lg text-gray-400 max-w-sm mb-10 leading-relaxed font-medium">Built with speed and trust as the priority. We turn traffic into revenue.</p>
            
            <div className="grid grid-cols-2 gap-6 max-w-md">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-start gap-2 backdrop-blur-sm">
                <span className="text-4xl font-black text-brand-orange">98</span>
                <span className="text-xs uppercase font-bold text-gray-500 tracking-[0.2em]">Core Vitals</span>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-start gap-2 backdrop-blur-sm">
                <span className="text-4xl font-black text-brand-amber">3x</span>
                <span className="text-xs uppercase font-bold text-gray-500 tracking-[0.2em]">Conversions</span>
              </div>
            </div>
          </div>
        </div>

        {/* BEFORE STATE (Generic Template) — The Clipped Overlay */}
        <div 
          className="absolute inset-0 bg-[#f8f9fa] grayscale brightness-90 pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <div className="p-12 h-full flex flex-col justify-center text-gray-600">
            <div className="w-24 h-6 bg-gray-300 mb-10 rounded" />
            <div className="h-6 bg-gray-200 w-full mb-4 rounded" />
            <div className="h-6 bg-gray-200 w-11/12 mb-4 rounded" />
            <div className="h-6 bg-gray-200 w-3/4 mb-4 rounded" />
            <div className="h-6 bg-gray-200 w-1/2 mb-12 rounded" />
            
            <div className="grid grid-cols-3 gap-4">
              <div className="h-14 bg-gray-200 rounded" />
              <div className="h-14 bg-gray-200 rounded" />
              <div className="h-14 bg-gray-200 rounded" />
            </div>
            <p className="mt-12 text-[11px] uppercase font-black tracking-[0.3em] text-gray-400">Slow & Unoptimized</p>
          </div>
        </div>

        {/* DIVIDER HANDLE — Interactive Line */}
        <div 
          className={`absolute top-0 bottom-0 w-1.5 bg-brand-orange z-30 transition-opacity duration-500 ${sliderPos > 99 || sliderPos < 1 ? 'opacity-0' : 'opacity-100'}`}
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-brand-orange rounded-full flex items-center justify-center shadow-2xl border-4 border-[oklch(0.12_0.02_260)] scale-90 group-hover:scale-100 transition-transform">
            <div className="flex gap-1.5">
              <div className="w-1 h-5 bg-white rounded-full opacity-80" />
              <div className="w-1 h-5 bg-white rounded-full opacity-80" />
            </div>
          </div>
        </div>

        {/* LABELS — Fixed Positioning */}
        <div className="absolute top-8 left-8 z-20 px-4 py-2 bg-black/50 backdrop-blur-md rounded-lg text-xs text-white uppercase tracking-[0.2em] font-black border border-white/10">Before</div>
        <div className="absolute top-8 right-8 z-20 px-4 py-2 bg-brand-orange/80 backdrop-blur-md rounded-lg text-xs text-white uppercase tracking-[0.2em] font-black border border-white/10">After</div>
      </div>
      
      {/* Credibility reinforcement */}
      <div className="mt-10 text-center">
        <span className="text-[11px] uppercase font-black tracking-[0.4em] text-gray-500 opacity-60">Real Results. Real High-Performance Code.</span>
      </div>
    </div>
  );
}
