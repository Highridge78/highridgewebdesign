import Link from "next/link";
import { notFound } from "next/navigation";
import { InternalShell } from "@/components/agency-os/internal-shell";
import { StatusBadge } from "@/components/agency-os/status-badge";
import { formatDate } from "@/lib/agency-os/domain/format";
import {
  getProjectApprovals,
  getProjectBlockers,
  getProjectById,
  getProjectChangeRequests,
  getProjectDeliveryItems,
  getProjectHealth,
  getProjectInternalUpdates,
  getProjectMilestones,
} from "@/lib/agency-os/domain/selectors";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  const milestones = getProjectMilestones(id);
  const blockers = getProjectBlockers(id);
  const deliveryItems = getProjectDeliveryItems(id);
  const approvals = getProjectApprovals(id);
  const changeRequests = getProjectChangeRequests(id);
  const decisionLog = getProjectInternalUpdates(id);
  const health = getProjectHealth(id);

  return (
    <InternalShell title={project.title} subtitle={project.clientSummary}>
      <div className="grid gap-4 lg:grid-cols-4">
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs text-slate-400">Phase</p>
          <p className="mt-1 text-lg font-semibold capitalize">{project.currentPhase}</p>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs text-slate-400">Health</p>
          <div className="mt-2">
            <StatusBadge
              label={health?.health ?? "unknown"}
              tone={health?.health === "red" ? "bad" : health?.health === "yellow" ? "warn" : "good"}
            />
          </div>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs text-slate-400">Blockers</p>
          <p className="mt-1 text-lg font-semibold">{health?.blockersCount ?? 0}</p>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs text-slate-400">Pending approvals</p>
          <p className="mt-1 text-lg font-semibold">{health?.approvalsPendingCount ?? 0}</p>
        </article>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="text-lg font-semibold">Milestones</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {milestones.map((mile) => (
              <li key={mile.id} className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">
                <p>{mile.title}</p>
                <p className="text-slate-400">Due {formatDate(mile.dueDate)}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="text-lg font-semibold">Delivery Items</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {deliveryItems.map((item) => (
              <li key={item.id} className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">
                <p>{item.title}</p>
                <p className="text-slate-400">
                  {item.taskGroup} · {item.status}
                  {item.dependencyOwner ? ` · waiting on ${item.dependencyOwner}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="text-lg font-semibold">Open Blockers</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {blockers.map((blocker) => (
              <li key={blocker.id} className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">
                <p>{blocker.title}</p>
                <p className="text-slate-400">Owner: {blocker.owner}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="text-lg font-semibold">Approvals</h2>
          <p className="mt-1 text-sm text-slate-400">Requested approvals and due dates.</p>
          <ul className="mt-3 space-y-2 text-sm">
            {approvals.map((approval) => (
              <li key={approval.id} className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">
                <p>{approval.title}</p>
                <p className="text-slate-400">Due {formatDate(approval.dueDate)} · {approval.status}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="text-lg font-semibold">Change Requests</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {changeRequests.map((request) => (
              <li key={request.id} className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">
                <p>{request.requestTitle}</p>
                <p className="text-slate-400">{request.status} · +{request.timelineImpactDays} days</p>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <article className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="text-lg font-semibold">Decision Log (Internal)</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {decisionLog.length === 0 ? <li className="text-slate-400">No internal decisions logged yet.</li> : null}
          {decisionLog.map((entry) => (
            <li key={entry.id} className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">
              <p>{entry.summary}</p>
              <p className="text-slate-400">Logged by {entry.createdBy} on {formatDate(entry.createdAt)}</p>
            </li>
          ))}
        </ul>
      </article>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={`/agency-os/projects/${id}/approvals`} className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800">
          Manage Approvals
        </Link>
        <Link href={`/agency-os/projects/${id}/change-requests`} className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800">
          Manage Change Requests
        </Link>
      </div>
    </InternalShell>
  );
}
