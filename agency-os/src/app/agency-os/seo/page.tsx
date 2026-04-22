import Link from "next/link";
import { InternalShell } from "@/components/agency-os/internal-shell";
import { SeoCreateForm } from "@/components/agency-os/seo-create-form";
import { StatusBadge } from "@/components/agency-os/status-badge";
import { getKeywordClustersByStrategy, getPlannedPagesByStrategy, getSeoStrategies } from "@/lib/agency-os/phase3/selectors";

export default function SeoPlannerPage() {
  const strategies = getSeoStrategies();

  return (
    <InternalShell
      title="SEO / Local SEO Planner"
      subtitle="Structured strategy planning for service + location execution, prioritization, and risk detection."
    >
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-4">
          {strategies.map((strategy) => {
            const clusters = getKeywordClustersByStrategy(strategy.id);
            const pages = getPlannedPagesByStrategy(strategy.id);
            const riskCount = pages.filter((p) => p.duplicationRiskWarning || p.thinPageRiskWarning).length;

            return (
              <article key={strategy.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold">{strategy.title}</h2>
                    <p className="text-sm text-slate-400">{strategy.clientName} · owner {strategy.owner}</p>
                  </div>
                  <StatusBadge label={strategy.status} tone={strategy.status === "active" ? "good" : "warn"} />
                </div>

                <p className="mt-3 text-sm text-slate-300">{strategy.strategyBrief}</p>
                <div className="mt-4 grid gap-2 text-sm text-slate-300 sm:grid-cols-3">
                  <p>Clusters: {clusters.length}</p>
                  <p>Planned pages: {pages.length}</p>
                  <p>Risk warnings: {riskCount}</p>
                </div>

                <Link href={`/agency-os/seo/${strategy.id}`} className="mt-4 inline-flex rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800">
                  Open strategy
                </Link>
              </article>
            );
          })}
        </div>

        <SeoCreateForm />
      </div>
    </InternalShell>
  );
}
