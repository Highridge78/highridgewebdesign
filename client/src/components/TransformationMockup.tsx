import { useState } from "react";

export default function TransformationMockup() {
  // sliderPos: 0 means only AFTER, 100 means only BEFORE
  const [sliderPos, setSliderPos] = useState(50);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x =
      "touches" in e
        ? e.touches[0].clientX - rect.left
        : (e as React.MouseEvent).clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(position);
  };

  return (
    <div className="relative group">
      <div
        className="relative w-full max-w-2xl mx-auto aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] cursor-ew-resize"
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
      >
        {/* AFTER STATE (High Ridge) — The base layer (Bottom) */}
        <div className="absolute inset-0 bg-[oklch(0.12_0.02_260)]">
          <div className="p-12 h-full flex flex-col justify-center bg-gradient-to-br from-brand-orange/[0.08] to-transparent">
            <div className="w-20 h-2 bg-brand-orange mb-8 rounded-full shadow-[0_0_20px_rgba(255,106,0,0.6)]" />
            <h4 className="text-4xl font-serif font-bold text-white mb-4 tracking-tight">
              The High Ridge Result
            </h4>
            <p className="text-xl text-gray-300 max-w-sm mb-10 leading-relaxed font-medium">
              Clear messaging, fast performance, and trust-centered design.
            </p>

            <div className="grid grid-cols-2 gap-6 max-w-md">
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex flex-col items-start gap-2 backdrop-blur-md">
                <span className="text-5xl font-black text-brand-orange">
                  98
                </span>
                <span className="text-xs uppercase font-bold text-gray-500 tracking-[0.2em]">
                  Optimization
                </span>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex flex-col items-start gap-2 backdrop-blur-md">
                <span className="text-5xl font-black text-brand-amber">3x</span>
                <span className="text-xs uppercase font-bold text-gray-500 tracking-[0.2em]">
                  Growth
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BEFORE STATE (Generic/Broken) — The overlay layer (Top) */}
        {/* We use inset to clip from the right. If pos=50, we show 0 to 50 (left half). */}
        <div
          className="absolute inset-0 bg-[#e9ecef] grayscale brightness-75 contrast-125 pointer-events-none z-10"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <div className="p-12 h-full flex flex-col justify-center text-gray-700 bg-white/40 backdrop-blur-sm">
            <div className="w-32 h-8 bg-gray-400/50 mb-10 rounded-lg animate-pulse" />
            <div className="h-4 bg-gray-400/30 w-full mb-4 rounded" />
            <div className="h-4 bg-gray-400/30 w-11/12 mb-4 rounded" />
            <div className="h-4 bg-gray-400/30 w-3/4 mb-4 rounded" />
            <div className="h-4 bg-gray-400/30 w-1/2 mb-12 rounded" />

            <div className="grid grid-cols-3 gap-4">
              <div className="h-16 bg-gray-400/20 rounded-xl border-2 border-dashed border-gray-400/30" />
              <div className="h-16 bg-gray-400/20 rounded-xl border-2 border-dashed border-gray-400/30" />
              <div className="h-16 bg-gray-400/20 rounded-xl border-2 border-dashed border-gray-400/30" />
            </div>
            <p className="mt-12 text-sm uppercase font-black tracking-[0.4em] text-gray-400/60">
              Broken & Low Conversion
            </p>
          </div>
        </div>

        {/* SLIDER LINE & HANDLE */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-brand-orange z-20 shadow-[0_0_20px_rgba(255,106,0,0.8)]"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,106,0,0.5)] border-4 border-[oklch(0.12_0.02_260)] scale-90 group-hover:scale-105 transition-transform">
            <div className="flex gap-2">
              <div className="w-1.5 h-6 bg-white rounded-full opacity-90" />
              <div className="w-1.5 h-6 bg-white rounded-full opacity-90" />
            </div>
          </div>
        </div>

        {/* FIXED LABELS */}
        <div className="absolute bottom-10 left-10 z-30 px-5 py-2.5 bg-black/60 backdrop-blur-xl rounded-xl text-sm text-white uppercase tracking-[0.3em] font-black border border-white/10 shadow-xl">
          Before
        </div>
        <div className="absolute bottom-10 right-10 z-30 px-5 py-2.5 bg-brand-orange/80 backdrop-blur-xl rounded-xl text-sm text-white uppercase tracking-[0.3em] font-black border border-white/10 shadow-xl">
          After
        </div>
      </div>

      {/* Footer Text */}
      <div className="mt-10 text-center">
        <span className="text-xs uppercase font-black tracking-[0.5em] text-white/20">
          The Transformation System
        </span>
      </div>
    </div>
  );
}
