import Link from "next/link";
import { InternalShell } from "@/components/agency-os/internal-shell";
import { StatusBadge } from "@/components/agency-os/status-badge";
import { formatDate } from "@/lib/agency-os/domain/format";
import { getProjectHealth, getProjects } from "@/lib/agency-os/domain/selectors";

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <InternalShell
      title="Project Delivery Workspace"
      subtitle="Execution-focused visibility across milestones, dependencies, blockers, approvals, and scope changes."
    >
      <div className="rounded-2xl border border-slate-800 bg-slate-900">
        <div className="grid grid-cols-[1.2fr_0.6fr_0.6fr_0.7fr_0.7fr_0.6fr] gap-3 border-b border-slate-800 px-4 py-3 text-xs uppercase tracking-[0.1em] text-slate-400">
          <span>Project</span>
          <span>Phase</span>
          <span>Status</span>
          <span>Health</span>
          <span>Pending Approvals</span>
          <span>Target Launch</span>
        </div>

        <div className="divide-y divide-slate-800">
          {projects.map((project) => {
            const report = getProjectHealth(project.id);
            const tone = report?.health === "red" ? "bad" : report?.health === "yellow" ? "warn" : "good";

            return (
              <article key={project.id} className="grid grid-cols-[1.2fr_0.6fr_0.6fr_0.7fr_0.7fr_0.6fr] gap-3 px-4 py-4 text-sm">
                <div>
                  <Link href={`/agency-os/projects/${project.id}`} className="font-medium text-cyan-300 hover:text-cyan-200">
                    {project.title}
                  </Link>
                  <p className="text-xs text-slate-400">Owner: {project.owner}</p>
                </div>
                <span className="capitalize">{project.currentPhase}</span>
                <span>{project.status}</span>
                <StatusBadge label={report?.health ?? "unknown"} tone={tone} />
                <span>{report?.approvalsPendingCount ?? 0}</span>
                <span className="text-slate-400">{formatDate(project.targetLaunchDate)}</span>
              </article>
            );
          })}
        </div>
      </div>
    </InternalShell>
  );
}
