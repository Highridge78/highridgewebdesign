import Link from "next/link";
import { InternalShell } from "@/components/agency-os/internal-shell";
import { StatusBadge } from "@/components/agency-os/status-badge";
import { getClientsHealthView } from "@/lib/agency-os/phase4/selectors";

export default function ClientsPage() {
  const clients = getClientsHealthView();

  return (
    <InternalShell
      title="Client Retention + Expansion"
      subtitle="Derived client health, risk flags, and expansion opportunities tied to real delivery signals."
    >
      <div className="space-y-3">
        {clients.map((row) => (
          <article key={row.health.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">{row.health.clientName}</h2>
                <p className="text-sm text-slate-400">Project: {row.health.projectId}</p>
              </div>
              <StatusBadge
                label={`health ${row.health.score}`}
                tone={row.health.level === "red" ? "bad" : row.health.level === "yellow" ? "warn" : "good"}
              />
            </div>
            <p className="mt-2 text-sm text-slate-300">Risk flags: {row.health.riskFlags.join(" | ") || "none"}</p>
            <p className="mt-1 text-sm text-slate-300">Signals: {row.retentionSignals.map((s) => s.signalType).join(" | ") || "none"}</p>
            <p className="mt-1 text-sm text-cyan-300">Opportunities: {row.expansionOpportunities.map((o) => o.serviceSuggestion).join(" | ") || "none"}</p>
            <Link href={`/agency-os/clients/${row.health.projectId}`} className="mt-3 inline-flex rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800">
              Open client health
            </Link>
          </article>
        ))}
      </div>
    </InternalShell>
  );
}
