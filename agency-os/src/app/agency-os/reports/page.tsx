import Link from "next/link";
import { InternalShell } from "@/components/agency-os/internal-shell";
import { ReportCreateForm } from "@/components/agency-os/report-create-form";
import { StatusBadge } from "@/components/agency-os/status-badge";
import { getReports } from "@/lib/agency-os/phase3/selectors";

export default function ReportsPage() {
  const reports = getReports();

  return (
    <InternalShell
      title="Reporting Framework"
      subtitle="Monthly reporting records with internal drafting and client-safe final commentary."
    >
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-3">
          {reports.map((report) => (
            <article key={report.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold">{report.clientName}</h2>
                  <p className="text-sm text-slate-400">{report.periodStart} to {report.periodEnd}</p>
                </div>
                <StatusBadge label={report.status} tone={report.status === "final" ? "good" : "warn"} />
              </div>
              <p className="mt-2 text-sm text-slate-300">{report.kpiSummary}</p>
              <Link href={`/agency-os/reports/${report.id}`} className="mt-3 inline-flex rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800">
                Open report
              </Link>
            </article>
          ))}
        </div>

        <ReportCreateForm />
      </div>
    </InternalShell>
  );
}
