import { notFound } from "next/navigation";
import { InternalShell } from "@/components/agency-os/internal-shell";
import { StatusBadge } from "@/components/agency-os/status-badge";
import { getReportById, getReportSections } from "@/lib/agency-os/phase3/selectors";

export default async function ReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const report = getReportById(id);
  if (!report) notFound();

  const sections = getReportSections(id);

  return (
    <InternalShell
      title={`Report · ${report.clientName}`}
      subtitle="Structured commentary for retention with clear internal vs client-safe boundaries."
    >
      <div className="flex items-center gap-2">
        <StatusBadge label={report.status} tone={report.status === "final" ? "good" : "warn"} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="text-lg font-semibold">Internal Drafting View</h2>
          <p className="mt-3 text-sm text-slate-300"><span className="text-slate-400">KPI summary:</span> {report.kpiSummary}</p>
          <p className="mt-2 text-sm text-slate-300"><span className="text-slate-400">Wins:</span> {report.wins.join(" | ")}</p>
          <p className="mt-2 text-sm text-slate-300"><span className="text-slate-400">Concerns:</span> {report.concerns.join(" | ")}</p>
          <p className="mt-2 text-sm text-slate-300"><span className="text-slate-400">Recommendations:</span> {report.recommendations.join(" | ")}</p>
          <p className="mt-2 text-sm text-slate-300"><span className="text-slate-400">Next month:</span> {report.nextMonthPriorities.join(" | ")}</p>
          <p className="mt-2 text-sm text-amber-300">Internal notes: {report.internalNotes}</p>
        </article>

        <article className="rounded-2xl border border-sky-700 bg-sky-950/40 p-5">
          <h2 className="text-lg font-semibold text-sky-200">Client-Safe Final View</h2>
          <p className="mt-3 text-sm text-slate-100">{report.clientSafeSummary}</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-200">
            {sections.map((section) => (
              <li key={section.id} className="rounded border border-sky-800 bg-slate-950/40 px-3 py-2">
                <p className="font-medium capitalize">{section.category.replaceAll("-", " ")}</p>
                <p className="text-slate-300">{section.summary}</p>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </InternalShell>
  );
}
