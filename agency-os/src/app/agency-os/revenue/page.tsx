import { InternalShell } from "@/components/agency-os/internal-shell";
import { formatMoney } from "@/lib/agency-os/domain/format";
import { getDealValues, getRevenueSnapshot } from "@/lib/agency-os/phase4/selectors";

export default function RevenuePage() {
  const snapshot = getRevenueSnapshot();
  const deals = getDealValues();

  return (
    <InternalShell
      title="Revenue + Pipeline Intelligence"
      subtitle="Clear pipeline value, weighted projections, and near-term revenue visibility without fake precision."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><p className="text-sm text-slate-400">Pipeline total</p><p className="mt-2 text-2xl font-semibold">{formatMoney(snapshot.total)}</p></article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><p className="text-sm text-slate-400">Weighted pipeline</p><p className="mt-2 text-2xl font-semibold">{formatMoney(snapshot.weighted)}</p></article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><p className="text-sm text-slate-400">Projected 30 days</p><p className="mt-2 text-2xl font-semibold">{formatMoney(snapshot.upcoming30Days)}</p></article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><p className="text-sm text-slate-400">MRR</p><p className="mt-2 text-2xl font-semibold">{formatMoney(snapshot.mrr)}</p></article>
      </div>

      <article className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="text-lg font-semibold">Deal Value by Stage</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-300">
          {Object.entries(snapshot.byStage).map(([stage, value]) => (
            <li key={stage} className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">
              {stage}: {formatMoney(value)}
            </li>
          ))}
        </ul>
      </article>

      <article className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="text-lg font-semibold">Deal Table</h2>
        <div className="mt-3 space-y-2 text-sm">
          {deals.map((deal) => (
            <div key={deal.id} className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">
              <p className="font-medium">{deal.clientName} · {deal.serviceType}</p>
              <p className="text-slate-400">Stage: {deal.stage} · Value: {formatMoney(deal.dealValue)} · Expected: {formatMoney(deal.expectedRevenue)}</p>
            </div>
          ))}
        </div>
      </article>
    </InternalShell>
  );
}
