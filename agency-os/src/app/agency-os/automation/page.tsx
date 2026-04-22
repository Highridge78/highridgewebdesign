import Link from "next/link";
import { AutomationToggle } from "@/components/agency-os/automation-toggle";
import { InternalShell } from "@/components/agency-os/internal-shell";
import { StatusBadge } from "@/components/agency-os/status-badge";
import { evaluateAutomations, getAutomationRules } from "@/lib/agency-os/phase4/selectors";

export default function AutomationPage() {
  const rules = getAutomationRules();
  const evaluations = evaluateAutomations();

  return (
    <InternalShell
      title="Workflow Automation"
      subtitle="Controlled trigger-based automation rules with explicit logic, visible outcomes, and auditability."
    >
      <div className="space-y-4">
        {rules.map((rule) => {
          const evalResult = evaluations.find((e) => e.rule.id === rule.id);
          return (
            <article key={rule.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">{rule.name}</h2>
                  <p className="text-sm text-slate-400">Trigger: {rule.trigger}</p>
                  <p className="mt-1 text-sm text-slate-300">Condition: {rule.conditionSummary}</p>
                </div>
                <AutomationToggle automationId={rule.id} initialEnabled={rule.status === "enabled"} />
              </div>
              <p className="mt-3 text-sm text-slate-300">Actions: {rule.actions.join(", ")}</p>
              {evalResult ? (
                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                  <StatusBadge label={evalResult.wouldRun ? "would run" : "would skip"} tone={evalResult.wouldRun ? "good" : "warn"} />
                  <span className="text-slate-400">{evalResult.reason}</span>
                </div>
              ) : null}
              <Link href={`/agency-os/automation/${rule.id}`} className="mt-3 inline-flex rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800">
                View audit log
              </Link>
            </article>
          );
        })}
      </div>
    </InternalShell>
  );
}
