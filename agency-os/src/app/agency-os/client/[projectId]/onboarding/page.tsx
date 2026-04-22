import { notFound } from "next/navigation";
import { ClientOnboardingActions } from "@/components/agency-os/client-onboarding-actions";
import { ClientShell } from "@/components/agency-os/client-shell";
import { StatusBadge } from "@/components/agency-os/status-badge";
import {
  canClientSeeResource,
  getOnboardingItems,
  getProjectById,
  getProjectOnboardingWorkspace,
} from "@/lib/agency-os/domain/selectors";

export default async function ClientOnboardingPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = getProjectById(projectId);
  if (!project) notFound();

  const workspace = getProjectOnboardingWorkspace(projectId);
  if (!workspace) notFound();

  const items = canClientSeeResource(projectId, "onboarding")
    ? getOnboardingItems(workspace.id).filter((item) => item.clientVisible)
    : [];

  return (
    <ClientShell
      projectTitle={project.title}
      projectPath={`/agency-os/client/${projectId}`}
      active="onboarding"
    >
      <article className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold">Onboarding Progress</h2>
        <p className="mt-1 text-sm text-slate-600">Outstanding requests and kickoff readiness details.</p>

        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
          Kickoff readiness: <span className="font-medium">{workspace.kickoffReadiness}</span>
          <p className="mt-1 text-slate-600">Next steps: {workspace.nextStepsClient}</p>
        </div>

        <ul className="mt-4 space-y-3 text-sm text-slate-700">
          {items.map((item) => (
            <li key={item.id} className="rounded-lg border border-slate-200 px-3 py-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium">{item.title}</p>
                <StatusBadge
                  label={item.status}
                  tone={item.status === "approved" ? "good" : item.status === "blocked" ? "bad" : "warn"}
                />
              </div>
              <p className="mt-2 text-slate-600">{item.description}</p>
              <p className="mt-1 text-slate-500">Due date: {item.dueDate}</p>
              <ClientOnboardingActions itemId={item.id} category={item.category} />
            </li>
          ))}
        </ul>
      </article>
    </ClientShell>
  );
}
