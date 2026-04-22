import { InternalShell } from "@/components/agency-os/internal-shell";
import { runIntegrityChecks } from "@/lib/agency-os/phase4/integrity";
import { getAuditLogs, getOperationalInsights } from "@/lib/agency-os/phase4/selectors";

export default function InsightsPage() {
  const insights = getOperationalInsights();
  const audits = getAuditLogs();
  const integrityIssues = runIntegrityChecks();

  return (
    <InternalShell
      title="Operational Intelligence"
      subtitle="Actionable internal signals for bottlenecks, scope pressure, close performance, and system discipline."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {insights.metrics.map((metric) => (
          <article key={metric.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">{metric.metricLabel}</p>
            <p className="mt-2 text-2xl font-semibold">{metric.value} {metric.unit}</p>
            <p className="mt-2 text-sm text-slate-300">{metric.interpretation}</p>
          </article>
        ))}
      </div>

      <article className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="text-lg font-semibold">Bottleneck Signals</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-300">
          {insights.bottlenecks.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>

      <article className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="text-lg font-semibold">Data Integrity Checks</h2>
        {integrityIssues.length === 0 ? (
          <p className="mt-2 text-sm text-emerald-300">No reference integrity issues detected in demo dataset.</p>
        ) : (
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-rose-300">
            {integrityIssues.map((issue) => (
              <li key={issue}>{issue}</li>
            ))}
          </ul>
        )}
      </article>

      <article className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="text-lg font-semibold">Audit Logs (Hardening)</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {audits.map((log) => (
            <li key={log.id} className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">
              <p>{log.action} · {log.entityType} ({log.entityId})</p>
              <p className="text-slate-400">{log.actor} ({log.role}) · {log.summary}</p>
            </li>
          ))}
        </ul>
      </article>
    </InternalShell>
  );
}
