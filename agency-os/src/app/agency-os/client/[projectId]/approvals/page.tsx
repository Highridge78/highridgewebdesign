import { notFound } from "next/navigation";
import { ClientApprovalActions } from "@/components/agency-os/client-approval-actions";
import { ClientShell } from "@/components/agency-os/client-shell";
import { StatusBadge } from "@/components/agency-os/status-badge";
import { canClientSeeResource, getProjectApprovals, getProjectById } from "@/lib/agency-os/domain/selectors";

export default async function ClientApprovalsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = getProjectById(projectId);
  if (!project) notFound();

  const approvals = canClientSeeResource(projectId, "approvals") ? getProjectApprovals(projectId) : [];

  return (
    <ClientShell
      projectTitle={project.title}
      projectPath={`/agency-os/client/${projectId}`}
      active="approvals"
    >
      <article className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold">Pending and Completed Approvals</h2>
        <p className="mt-1 text-sm text-slate-600">Review each item and approve or request revisions.</p>
        <ul className="mt-4 space-y-3 text-sm text-slate-700">
          {approvals.map((approval) => (
            <li key={approval.id} className="rounded-lg border border-slate-200 px-3 py-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium">{approval.title}</p>
                <StatusBadge
                  label={approval.status}
                  tone={approval.status === "approved" ? "good" : approval.status === "rejected" ? "bad" : "warn"}
                />
              </div>
              <p className="mt-2 text-slate-600">{approval.clientMessage}</p>
              <p className="mt-1 text-slate-500">Due date: {approval.dueDate}</p>
              {approval.status === "requested" ? <ClientApprovalActions approvalId={approval.id} /> : null}
            </li>
          ))}
        </ul>
      </article>
    </ClientShell>
  );
}
