import { HardHat, Bolt } from "lucide-react";

export default function RoofingBrandLogo() {
  return (
    <div className="inline-flex items-center gap-3">
      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 shadow-[0_0_24px_rgba(251,146,60,0.55)]">
        <HardHat className="h-5 w-5" />
        <Bolt className="absolute -right-1 -top-1 h-3 w-3 text-cyan-300" />
      </div>
      <div className="leading-tight">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
          Roofer Growth
        </p>
        <p className="text-lg font-black text-white">LeadSite Studio</p>
      </div>
    </div>
  );
}
