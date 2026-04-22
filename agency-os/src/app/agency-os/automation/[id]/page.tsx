import { notFound } from "next/navigation";
import { InternalShell } from "@/components/agency-os/internal-shell";
import { StatusBadge } from "@/components/agency-os/status-badge";
import { getAutomationLogs, getAutomationRuleById } from "@/lib/agency-os/phase4/selectors";

export default async function AutomationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rule = getAutomationRuleById(id);
  if (!rule) notFound();

  const logs = getAutomationLogs(id);

  return (
    <InternalShell
      title={`Automation · ${rule.name}`}
      subtitle="Rule-level audit trail for debugging and operational confidence."
    >
      <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <p className="text-sm text-slate-300">Trigger: {rule.trigger}</p>
        <p className="mt-1 text-sm text-slate-300">Condition: {rule.conditionSummary}</p>
        <p className="mt-1 text-sm text-slate-300">Actions: {rule.actions.join(", ")}</p>
      </article>

      <article className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="text-lg font-semibold">Audit Log</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {logs.map((log) => (
            <li key={log.id} className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge label={log.result} tone={log.result === "matched" ? "good" : log.result === "error" ? "bad" : "warn"} />
                <span className="text-slate-400">{log.createdAt}</span>
              </div>
              <p className="mt-1 text-slate-300">{log.details}</p>
              <p className="mt-1 text-slate-400">Executed: {log.executedActions.join(", ")}</p>
            </li>
          ))}
        </ul>
      </article>
    </InternalShell>
  );
}
