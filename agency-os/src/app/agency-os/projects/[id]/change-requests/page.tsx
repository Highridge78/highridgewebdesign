import { notFound } from "next/navigation";
import { InternalShell } from "@/components/agency-os/internal-shell";
import { StatusBadge } from "@/components/agency-os/status-badge";
import { getProjectById, getProjectChangeRequests } from "@/lib/agency-os/domain/selectors";

export default async function ProjectChangeRequestsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  const requests = getProjectChangeRequests(id);

  return (
    <InternalShell
      title={`Change Requests · ${project.title}`}
      subtitle="Track scope-impacting requests with internal assessment and client-safe communication."
    >
      <div className="space-y-4">
        {requests.map((request) => (
          <article key={request.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h2 className="text-lg font-semibold">{request.requestTitle}</h2>
              <StatusBadge
                label={request.status}
                tone={
                  request.status === "approved" || request.status === "merged-into-scope"
                    ? "good"
                    : request.status === "declined"
                      ? "bad"
                      : "warn"
                }
              />
            </div>
            <p className="mt-2 text-sm text-slate-300">{request.requestDescription}</p>
            <div className="mt-3 grid gap-2 text-sm text-slate-400 sm:grid-cols-3">
              <p>Timeline impact: +{request.timelineImpactDays} day(s)</p>
              <p>Cost impact: {request.costImpact}</p>
              <p>Requested by: {request.requestedBy}</p>
            </div>
            <p className="mt-3 text-sm text-amber-300">Internal assessment: {request.internalAssessment}</p>
            <p className="mt-2 text-sm text-slate-300">Client-facing summary: {request.clientSummary}</p>
          </article>
        ))}
      </div>
    </InternalShell>
  );
}
