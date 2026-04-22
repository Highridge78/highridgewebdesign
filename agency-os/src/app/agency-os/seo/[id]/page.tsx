import { notFound } from "next/navigation";
import { InternalShell } from "@/components/agency-os/internal-shell";
import { StatusBadge } from "@/components/agency-os/status-badge";
import { getKeywordClustersByStrategy, getPlannedPagesByStrategy, getSeoStrategyById } from "@/lib/agency-os/phase3/selectors";

export default async function SeoStrategyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const strategy = getSeoStrategyById(id);
  if (!strategy) notFound();

  const clusters = getKeywordClustersByStrategy(id);
  const pages = getPlannedPagesByStrategy(id);

  return (
    <InternalShell
      title={strategy.title}
      subtitle="Service and location planning with intent mapping, risk checks, and output-ready page priorities."
    >
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="text-lg font-semibold">Service x Location Matrix</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {strategy.serviceFocus.map((service) =>
            strategy.targetLocations.map((location) => (
              <div key={`${service}-${location}`} className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-300">
                {service} × {location}
              </div>
            )),
          )}
        </div>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="text-lg font-semibold">Keyword Clusters</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {clusters.map((cluster) => (
              <li key={cluster.id} className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">
                <div className="flex items-center justify-between gap-2">
                  <p>{cluster.clusterName}</p>
                  <StatusBadge label={`priority ${cluster.priorityScore}`} tone={cluster.priorityScore > 85 ? "good" : "warn"} />
                </div>
                <p className="mt-1 text-slate-400">{cluster.primaryKeyword} · {cluster.intent}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="text-lg font-semibold">Planning Outputs</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">SEO strategy brief</li>
            <li className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">Service page plan</li>
            <li className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">Location page plan</li>
            <li className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">Content opportunity list</li>
            <li className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">Page priority list</li>
          </ul>
        </article>
      </section>

      <section className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="text-lg font-semibold">Planned Pages</h2>
        <div className="mt-3 space-y-3">
          {pages.map((page) => (
            <article key={page.id} className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-3 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium">{page.title}</p>
                <StatusBadge label={page.status} tone={page.status === "brief-ready" ? "good" : "neutral"} />
              </div>
              <p className="mt-1 text-slate-400">{page.pageType} · {page.intent} · {page.primaryKeyword}</p>
              <p className="mt-1 text-slate-300">CTA goal: {page.ctaGoal}</p>
              <p className="mt-1 text-slate-300">Trust elements: {page.trustElementsNeeded.join(", ")}</p>
              {page.duplicationRiskWarning ? <p className="mt-1 text-rose-300">Duplication risk: {page.duplicationRiskWarning}</p> : null}
              {page.thinPageRiskWarning ? <p className="mt-1 text-rose-300">Thin-page risk: {page.thinPageRiskWarning}</p> : null}
              {page.internalLinkRecommendation ? (
                <p className="mt-1 text-cyan-300">Internal link recommendation: {page.internalLinkRecommendation}</p>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </InternalShell>
  );
}
