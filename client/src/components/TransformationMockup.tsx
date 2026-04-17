import { useState } from "react";

export default function TransformationMockup() {
  const [sliderPos, setSliderPos] = useState(100); // 100% shows AFTER by default

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
        className="relative w-full max-w-2xl mx-auto aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-ew-resize"
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
      >
        {/* After (High Ridge) - High Visibility */}
        <div className="absolute inset-0 bg-[oklch(0.12_0.02_260)]">
          <div className="p-10 h-full flex flex-col justify-center">
            <div className="w-12 h-1 bg-brand-orange mb-6 rounded-full" />
            <h4 className="text-3xl font-serif font-bold text-white mb-3">High Performance Design</h4>
            <p className="text-base text-gray-400 max-w-xs mb-8">Built for speed, conversion, and trust. Every element serves a purpose.</p>
            <div className="grid grid-cols-2 gap-4 max-w-sm">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-brand-orange">98</span>
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-tighter">Speed Score</span>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-brand-amber">3x</span>
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-tighter">More Leads</span>
              </div>
            </div>
          </div>
        </div>

        {/* Before (Cluttered/Slow) - Clipped */}
        <div 
          className="absolute inset-0 bg-gray-200 grayscale contrast-75 brightness-90 pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <div className="p-10 h-full flex flex-col justify-center text-gray-800">
            <div className="w-20 h-5 bg-gray-400 mb-8" />
            <div className="h-5 bg-gray-300 w-full mb-3" />
            <div className="h-5 bg-gray-300 w-3/4 mb-3" />
            <div className="h-5 bg-gray-300 w-1/2 mb-10" />
            <div className="grid grid-cols-3 gap-3">
              <div className="h-12 bg-gray-300" />
              <div className="h-12 bg-gray-300" />
              <div className="h-12 bg-gray-300" />
            </div>
          </div>
        </div>

        {/* Slider Handle (Only visible on hover/touch to keep it clean) */}
        <div 
          className={`absolute top-0 bottom-0 w-1 bg-brand-orange/80 z-20 transition-opacity duration-300 ${sliderPos > 98 ? 'opacity-0' : 'opacity-100'}`}
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center shadow-2xl border-4 border-[oklch(0.12_0.02_260)]">
            <div className="flex gap-1">
              <div className="w-0.5 h-4 bg-white rounded-full" />
              <div className="w-0.5 h-4 bg-white rounded-full" />
            </div>
          </div>
        </div>

        {/* Indicator labels */}
        <div className="absolute bottom-6 left-6 z-10 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded text-[11px] text-white uppercase tracking-[0.2em] font-bold border border-white/10">Before</div>
        <div className="absolute bottom-6 right-6 z-10 px-3 py-1.5 bg-brand-orange/60 backdrop-blur-md rounded text-[11px] text-white uppercase tracking-[0.2em] font-bold border border-white/10">After</div>
      </div>
      
      {/* Credibility anchor */}
      <div className="mt-6 text-center">
        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-gray-500">Real Results. Real Businesses.</span>
      </div>
    </div>
  );
}
