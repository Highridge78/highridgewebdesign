import { notFound } from "next/navigation";
import { InternalShell } from "@/components/agency-os/internal-shell";
import { getSopById, getSopSteps } from "@/lib/agency-os/phase3/selectors";

export default async function SopDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sop = getSopById(id);
  if (!sop) notFound();

  const steps = getSopSteps(id);

  return (
    <InternalShell title={sop.title} subtitle="Operational SOP with practical checklist execution.">
      <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <p className="text-sm text-slate-400">Category: {sop.category} · owner {sop.owner}</p>
        <p className="mt-2 text-sm text-slate-300">Purpose: {sop.purpose}</p>
        <p className="mt-2 text-sm text-amber-300">Notes: {sop.notes}</p>

        <ol className="mt-4 space-y-3">
          {steps.map((step) => (
            <li key={step.id} className="rounded-lg border border-slate-700 bg-slate-950/40 p-3">
              <p className="font-medium">Step {step.stepOrder}: {step.stepTitle}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
                {step.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </article>
    </InternalShell>
  );
}
