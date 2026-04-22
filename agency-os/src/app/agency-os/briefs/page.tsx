import Link from "next/link";
import { BriefCreateForm } from "@/components/agency-os/brief-create-form";
import { InternalShell } from "@/components/agency-os/internal-shell";
import { StatusBadge } from "@/components/agency-os/status-badge";
import { getPageBriefs } from "@/lib/agency-os/phase3/selectors";

export default function BriefsPage() {
  const briefs = getPageBriefs();

  return (
    <InternalShell
      title="Content / Page Briefs"
      subtitle="Execution-ready internal briefs tied to strategy and conversion outcomes."
    >
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-3">
          {briefs.map((brief) => (
            <article key={brief.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold">{brief.title}</h2>
                  <p className="text-sm text-slate-400">{brief.briefType} · {brief.primaryKeyword}</p>
                </div>
                <StatusBadge label={brief.status} tone={brief.status === "ready" ? "good" : "warn"} />
              </div>
              <p className="mt-2 text-sm text-slate-300">Objective: {brief.pageObjective}</p>
              <p className="mt-1 text-sm text-slate-400">CTA: {brief.cta}</p>
              <Link href={`/agency-os/briefs/${brief.id}`} className="mt-3 inline-flex rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800">
                Open brief
              </Link>
            </article>
          ))}
        </div>

        <BriefCreateForm />
      </div>
    </InternalShell>
  );
}
