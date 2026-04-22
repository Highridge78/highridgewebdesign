export function StatusBadge({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: "neutral" | "good" | "warn" | "bad";
}) {
  const toneClass = {
    neutral: "border-slate-600 bg-slate-800 text-slate-200",
    good: "border-emerald-700 bg-emerald-900/40 text-emerald-300",
    warn: "border-amber-700 bg-amber-900/40 text-amber-300",
    bad: "border-rose-700 bg-rose-900/40 text-rose-300",
  }[tone];

  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs ${toneClass}`}>{label}</span>;
}
