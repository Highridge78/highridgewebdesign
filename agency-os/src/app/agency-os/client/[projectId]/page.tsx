import { notFound } from "next/navigation";
import { ClientShell } from "@/components/agency-os/client-shell";
import { StatusBadge } from "@/components/agency-os/status-badge";
import {
  canClientSeeResource,
  getProjectById,
  getProjectClientUpdates,
  getProjectHealth,
  getProjectMilestones,
} from "@/lib/agency-os/domain/selectors";

export default async function ClientProjectOverviewPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = getProjectById(projectId);
  if (!project) notFound();

  const health = getProjectHealth(projectId);
  const milestones = canClientSeeResource(projectId, "milestones") ? getProjectMilestones(projectId) : [];
  const updates = canClientSeeResource(projectId, "updates") ? getProjectClientUpdates(projectId) : [];

  return (
    <ClientShell
      projectTitle={project.title}
      projectPath={`/agency-os/client/${projectId}`}
      active="overview"
    >
      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Current phase</p>
          <p className="mt-2 text-2xl font-semibold capitalize">{project.currentPhase}</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Overall status</p>
          <p className="mt-2 text-2xl font-semibold capitalize">{project.status}</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Project health</p>
          <div className="mt-3">
            <StatusBadge
              label={health?.health ?? "unknown"}
              tone={health?.health === "red" ? "bad" : health?.health === "yellow" ? "warn" : "good"}
            />
          </div>
        </article>
      </div>

      <article className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold">Milestones</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {milestones.map((milestone) => (
            <li key={milestone.id} className="rounded-lg border border-slate-200 px-3 py-2">
              {milestone.title} · due {milestone.dueDate}
            </li>
          ))}
        </ul>
      </article>

      <article className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold">Progress Updates</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {updates.map((update) => (
            <li key={update.id} className="rounded-lg border border-slate-200 px-3 py-2">
              {update.summary}
            </li>
          ))}
        </ul>
      </article>
    </ClientShell>
  );
}
