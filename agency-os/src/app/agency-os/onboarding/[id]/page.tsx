import { notFound } from "next/navigation";
import { InternalShell } from "@/components/agency-os/internal-shell";
import { StatusBadge } from "@/components/agency-os/status-badge";
import { getOnboardingItems } from "@/lib/agency-os/domain/selectors";
import { seed } from "@/lib/agency-os/seed/data";

export default async function OnboardingWorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workspace = seed.onboardingWorkspaces.find((entry) => entry.id === id);
  if (!workspace) notFound();

  const items = getOnboardingItems(id);
  const grouped = {
    assets: items.filter((i) => i.category === "assets"),
    credentials: items.filter((i) => i.category === "credentials"),
    brand: items.filter((i) => i.category === "brand"),
    content: items.filter((i) => i.category === "content"),
    approvals: items.filter((i) => i.category === "approvals"),
    "technical-access": items.filter((i) => i.category === "technical-access"),
    "kickoff-prep": items.filter((i) => i.category === "kickoff-prep"),
  };

  return (
    <InternalShell
      title={`Onboarding Workspace · ${workspace.clientName}`}
      subtitle="Internal fulfillment view with category breakdown, reminders, and dependency ownership."
    >
      <div className="space-y-4">
        {Object.entries(grouped).map(([category, categoryItems]) => (
          <article key={category} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="text-lg font-semibold capitalize">{category.replace("-", " ")}</h2>
            <ul className="mt-3 space-y-2">
              {categoryItems.length === 0 ? (
                <li className="text-sm text-slate-500">No items in this category.</li>
              ) : (
                categoryItems.map((item) => (
                  <li key={item.id} className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p>{item.title}</p>
                      <StatusBadge
                        label={item.status}
                        tone={item.status === "approved" ? "good" : item.status === "blocked" ? "bad" : "warn"}
                      />
                    </div>
                    <p className="mt-1 text-slate-400">Waiting on: {item.waitingOn} · due {item.dueDate}</p>
                    {item.internalNotes ? <p className="mt-1 text-amber-300">Internal: {item.internalNotes}</p> : null}
                  </li>
                ))
              )}
            </ul>
          </article>
        ))}
      </div>
    </InternalShell>
  );
}
