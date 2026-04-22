import { notFound } from "next/navigation";
import { InternalShell } from "@/components/agency-os/internal-shell";
import { StatusBadge } from "@/components/agency-os/status-badge";
import { formatDate } from "@/lib/agency-os/domain/format";
import {
  getApprovalEventsByApprovalId,
  getProjectApprovals,
  getProjectById,
} from "@/lib/agency-os/domain/selectors";

function timelineImpactLabel(dueDate: string): string {
  if (new Date(dueDate).getTime() < Date.now()) {
    return "Timeline impact: launch risk elevated";
  }
  return "Timeline impact: within current schedule window";
}

export default async function ProjectApprovalsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  const approvals = getProjectApprovals(id);

  return (
    <InternalShell
      title={`Approvals · ${project.title}`}
      subtitle="Internal approvals view includes metadata, history, risk context, and timeline impact."
    >
      <div className="space-y-4">
        {approvals.map((approval) => {
          const history = getApprovalEventsByApprovalId(approval.id);

          return (
            <article key={approval.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">{approval.title}</h2>
                  <p className="mt-1 text-sm text-slate-400">{approval.type} · due {formatDate(approval.dueDate)}</p>
                </div>
                <StatusBadge
                  label={approval.status}
                  tone={approval.status === "approved" ? "good" : approval.status === "rejected" ? "bad" : "warn"}
                />
              </div>
              <p className="mt-4 text-sm text-slate-300">Deliverable: {approval.deliverableRef}</p>
              <p className="mt-1 text-sm text-slate-300">Requested from: {approval.requestedFrom}</p>
              <p className="mt-2 text-sm text-slate-300">Client message: {approval.clientMessage}</p>
              <p className="mt-2 text-sm text-amber-300">Internal risk: {approval.internalNotes}</p>
              <p className="mt-2 text-sm text-cyan-300">{timelineImpactLabel(approval.dueDate)}</p>
              {approval.revisionReason ? (
                <p className="mt-2 text-sm text-rose-300">Revision requested: {approval.revisionReason}</p>
              ) : null}
              <div className="mt-3 rounded-lg border border-slate-700 bg-slate-950/40 p-3 text-sm">
                <p className="font-medium text-slate-200">History</p>
                <ul className="mt-2 space-y-1 text-slate-400">
                  {history.map((event) => (
                    <li key={event.id}>
                      {formatDate(event.createdAt)} · {event.actor} · {event.message}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </InternalShell>
  );
}
