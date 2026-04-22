import Link from "next/link";
import { InternalShell } from "@/components/agency-os/internal-shell";
import { StatusBadge } from "@/components/agency-os/status-badge";
import { seed } from "@/lib/agency-os/seed/data";

export default function OnboardingIndexPage() {
  const workspaces = seed.onboardingWorkspaces;

  return (
    <InternalShell
      title="Onboarding Portal (Internal)"
      subtitle="Operational handoff visibility with waiting-on-client vs waiting-on-us ownership clarity."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {workspaces.map((workspace) => {
          const items = seed.onboardingItems.filter((item) => item.workspaceId === workspace.id);
          const waitingOnClient = items.filter((item) => item.waitingOn === "client" && item.status !== "approved").length;
          const waitingOnUs = items.filter((item) => item.waitingOn === "internal" && item.status !== "approved").length;

          return (
            <article key={workspace.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="text-lg font-semibold">{workspace.clientName}</h2>
              <p className="mt-1 text-sm text-slate-400">Kickoff {workspace.kickoffDate}</p>
              <div className="mt-3 flex items-center gap-2">
                <StatusBadge
                  label={`readiness: ${workspace.kickoffReadiness}`}
                  tone={workspace.kickoffReadiness === "ready" ? "good" : workspace.kickoffReadiness === "blocked" ? "bad" : "warn"}
                />
              </div>
              <p className="mt-3 text-sm text-slate-300">Waiting on client: {waitingOnClient}</p>
              <p className="text-sm text-slate-300">Waiting on us: {waitingOnUs}</p>
              <p className="mt-3 text-sm text-amber-300">Internal notes: {workspace.internalNotes}</p>
              <Link href={`/agency-os/onboarding/${workspace.id}`} className="mt-4 inline-flex rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800">
                Open Workspace
              </Link>
            </article>
          );
        })}
      </div>
    </InternalShell>
  );
}
