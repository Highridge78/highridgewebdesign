import { notFound } from "next/navigation";
import { InternalShell } from "@/components/agency-os/internal-shell";
import { getClientsHealthView } from "@/lib/agency-os/phase4/selectors";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = getClientsHealthView().find((item) => item.health.projectId === id);
  if (!row) notFound();

  return (
    <InternalShell
      title={`Client Health · ${row.health.clientName}`}
      subtitle="Retention signals and expansion path with actionable next steps."
    >
      <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <p className="text-sm text-slate-300">Health score: {row.health.score}</p>
        <p className="mt-1 text-sm text-slate-300">Engagement signals: {row.health.engagementSignals.join(" | ")}</p>
        <p className="mt-1 text-sm text-rose-300">Risk flags: {row.health.riskFlags.join(" | ") || "none"}</p>
      </article>

      <article className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="text-lg font-semibold">Retention Signals</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {row.retentionSignals.map((signal) => (
            <li key={signal.id} className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">
              <p>{signal.signalType} · severity {signal.severity}</p>
              <p className="text-slate-400">{signal.note}</p>
            </li>
          ))}
        </ul>
      </article>

      <article className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="text-lg font-semibold">Expansion Opportunities</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {row.expansionOpportunities.map((opportunity) => (
            <li key={opportunity.id} className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">
              <p>{opportunity.serviceSuggestion} · confidence {opportunity.confidence}</p>
              <p className="text-slate-400">{opportunity.rationale}</p>
              <p className="text-cyan-300">Next note: {opportunity.nextOpportunityNote}</p>
            </li>
          ))}
        </ul>
      </article>
    </InternalShell>
  );
}
