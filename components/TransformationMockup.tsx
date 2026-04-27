"use client";

import { useState } from "react";

export default function TransformationMockup() {
  const [sliderPos, setSliderPos] = useState(50);

  const updateSlider = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(position);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.buttons !== 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    updateSlider(e.clientX, rect);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = e.currentTarget.getBoundingClientRect();
    updateSlider(e.clientX, rect);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    updateSlider(e.clientX, rect);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    updateSlider(e.clientX, rect);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    updateSlider(touch.clientX, rect);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    updateSlider(touch.clientX, rect);
  };

  return (
    <div className="relative group">
      <div
        className="relative mx-auto aspect-[4/3] w-full max-w-2xl touch-none select-none overflow-hidden rounded-2xl border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] cursor-ew-resize sm:aspect-video sm:rounded-[2rem]"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        role="slider"
        aria-label="Compare the before and after website transformation"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPos)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setSliderPos((pos) => Math.max(0, pos - 5));
          if (e.key === "ArrowRight") setSliderPos((pos) => Math.min(100, pos + 5));
        }}
      >
        <div className="absolute inset-0 bg-[oklch(0.12_0.02_260)]">
          <div className="flex h-full flex-col justify-center bg-gradient-to-br from-brand-orange/[0.08] to-transparent p-5 sm:p-8 lg:p-12">
            <div className="mb-4 h-1.5 w-14 rounded-full bg-brand-orange shadow-[0_0_20px_rgba(255,106,0,0.6)] sm:mb-8 sm:h-2 sm:w-20" />
            <h4 className="mb-3 font-serif text-2xl font-bold tracking-tight text-white sm:mb-4 sm:text-4xl">
              The High Ridge Result
            </h4>
            <p className="mb-5 max-w-sm text-sm font-medium leading-relaxed text-gray-300 sm:mb-10 sm:text-xl">
              Clear messaging, fast performance, and trust-centered design.
            </p>
            
            <div className="grid max-w-md grid-cols-2 gap-3 sm:gap-6">
              <div className="flex flex-col items-start gap-1 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:gap-2 sm:rounded-3xl sm:p-6">
                <span className="text-3xl font-black text-brand-orange sm:text-5xl">98</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-500 sm:text-xs sm:tracking-[0.2em]">
                  Optimization
                </span>
              </div>
              <div className="flex flex-col items-start gap-1 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:gap-2 sm:rounded-3xl sm:p-6">
                <span className="text-3xl font-black text-brand-amber sm:text-5xl">3x</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-500 sm:text-xs sm:tracking-[0.2em]">
                  Growth
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 bg-[#e9ecef] grayscale brightness-75 contrast-125 pointer-events-none z-10"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <div className="flex h-full flex-col justify-center bg-white/40 p-5 text-gray-700 backdrop-blur-sm sm:p-8 lg:p-12">
            <div className="mb-6 h-7 w-24 animate-pulse rounded-lg bg-gray-400/50 sm:mb-10 sm:h-8 sm:w-32" />
            <div className="mb-3 h-3 w-full rounded bg-gray-400/30 sm:mb-4 sm:h-4" />
            <div className="mb-3 h-3 w-11/12 rounded bg-gray-400/30 sm:mb-4 sm:h-4" />
            <div className="mb-3 h-3 w-3/4 rounded bg-gray-400/30 sm:mb-4 sm:h-4" />
            <div className="mb-7 h-3 w-1/2 rounded bg-gray-400/30 sm:mb-12 sm:h-4" />
            
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="h-12 rounded-xl border-2 border-dashed border-gray-400/30 bg-gray-400/20 sm:h-16" />
              <div className="h-12 rounded-xl border-2 border-dashed border-gray-400/30 bg-gray-400/20 sm:h-16" />
              <div className="h-12 rounded-xl border-2 border-dashed border-gray-400/30 bg-gray-400/20 sm:h-16" />
            </div>
            <p className="mt-7 text-[10px] font-black uppercase tracking-[0.26em] text-gray-400/60 sm:mt-12 sm:text-sm sm:tracking-[0.4em]">
              Broken & Low Conversion
            </p>
          </div>
        </div>

        <div
          className="absolute top-0 bottom-0 w-1 bg-brand-orange z-20 shadow-[0_0_20px_rgba(255,106,0,0.8)]"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 scale-90 items-center justify-center rounded-full border-4 border-[oklch(0.12_0.02_260)] bg-brand-orange shadow-[0_0_40px_rgba(255,106,0,0.5)] transition-transform group-hover:scale-105 sm:h-16 sm:w-16">
            <div className="flex gap-2">
              <div className="h-5 w-1.5 rounded-full bg-white opacity-90 sm:h-6" />
              <div className="h-5 w-1.5 rounded-full bg-white opacity-90 sm:h-6" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 z-30 rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-xl backdrop-blur-xl sm:bottom-10 sm:left-10 sm:rounded-xl sm:px-5 sm:py-2.5 sm:text-sm sm:tracking-[0.3em]">
          Before
        </div>
        <div className="absolute bottom-4 right-4 z-30 rounded-lg border border-white/10 bg-brand-orange/80 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-xl backdrop-blur-xl sm:bottom-10 sm:right-10 sm:rounded-xl sm:px-5 sm:py-2.5 sm:text-sm sm:tracking-[0.3em]">
          After
        </div>
      </div>
      
      <div className="mt-10 text-center">
        <span className="text-xs uppercase font-black tracking-[0.5em] text-white/20">
          The Transformation System
        </span>
      </div>
    </div>
  );
}
