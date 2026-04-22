import Link from "next/link";
import { InternalShell } from "@/components/agency-os/internal-shell";
import { StatusBadge } from "@/components/agency-os/status-badge";
import { formatDate } from "@/lib/agency-os/domain/format";
import { getDashboardOperationalFeed, getProjectById } from "@/lib/agency-os/domain/selectors";

export default function DashboardPage() {
  const feed = getDashboardOperationalFeed();

  return (
    <InternalShell
      title="Delivery Operations Dashboard"
      subtitle="Operational visibility for risk, approvals, dependencies, scope changes, and launch readiness."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Projects at Risk</p>
          <p className="mt-2 text-3xl font-semibold">{feed.projectsAtRisk.length}</p>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Overdue Approvals</p>
          <p className="mt-2 text-3xl font-semibold">{feed.overdueApprovals.length}</p>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Overdue Milestones</p>
          <p className="mt-2 text-3xl font-semibold">{feed.overdueMilestones.length}</p>
        </article>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="text-lg font-semibold">Projects Missing Client Dependencies</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {feed.waitingOnClient.map((row) => {
              const project = getProjectById(row.projectId);
              if (!project) return null;

              return (
                <li key={row.projectId} className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">
                  <span>{project.title}</span>
                  <StatusBadge label={`${row.waitingOnClientCount} waiting on client`} tone="warn" />
                </li>
              );
            })}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="text-lg font-semibold">Recent Change Requests</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {feed.recentChangeRequests.map((request) => {
              const project = getProjectById(request.projectId);
              return (
                <li key={request.id} className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">
                  <p className="font-medium">{request.requestTitle}</p>
                  <p className="text-slate-400">{project?.title} · submitted {formatDate(request.dateSubmitted)}</p>
                </li>
              );
            })}
          </ul>
        </article>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="text-lg font-semibold">Launches Approaching</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {feed.launchesApproaching.map((project) => (
            <li key={project.id} className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">
              <span>{project.title}</span>
              <span className="text-slate-400">target {formatDate(project.targetLaunchDate)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <Link href="/agency-os/projects" className="inline-flex rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300">
          Open Delivery Workspace
        </Link>
      </div>
    </InternalShell>
  );
}
