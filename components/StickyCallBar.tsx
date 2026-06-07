"use client";

import { Phone } from "lucide-react";

/**
 * Sticky tap-to-call bar — fixed to the bottom of the viewport on mobile only.
 * Uses a real tel: link so it works on every page without JS routing.
 */
export default function StickyCallBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <a
        href="tel:+18285989262"
        className="flex items-center justify-center gap-3 bg-brand-orange px-4 py-4 text-white shadow-[0_-4px_20px_rgba(0,0,0,0.4)] active:bg-brand-orange-bright transition-colors"
        aria-label="Call High Ridge Web Design at (828) 598-9262"
      >
        <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
        <span className="text-base font-black uppercase tracking-[0.12em]">
          Call (828) 598-9262
        </span>
      </a>
    </div>
  );
}
