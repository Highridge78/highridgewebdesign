import { notFound } from "next/navigation";
import { InternalShell } from "@/components/agency-os/internal-shell";
import { getContentBriefByPageBrief, getPageBriefById } from "@/lib/agency-os/phase3/selectors";

export default async function BriefDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const brief = getPageBriefById(id);
  if (!brief) notFound();

  const contentBrief = getContentBriefByPageBrief(id);

  return (
    <InternalShell
      title={brief.title}
      subtitle="Editable internal brief linked to strategy intent and production requirements."
    >
      <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="grid gap-4 lg:grid-cols-2 text-sm">
          <div className="space-y-2">
            <p><span className="text-slate-400">Objective:</span> {brief.pageObjective}</p>
            <p><span className="text-slate-400">Audience:</span> {brief.audience}</p>
            <p><span className="text-slate-400">Intent:</span> {brief.searchIntent}</p>
            <p><span className="text-slate-400">Primary keyword:</span> {brief.primaryKeyword}</p>
            <p><span className="text-slate-400">Secondary keywords:</span> {brief.secondaryKeywords.join(", ")}</p>
            <p><span className="text-slate-400">Conversion goal:</span> {brief.conversionGoal}</p>
            <p><span className="text-slate-400">CTA:</span> {brief.cta}</p>
            <p><span className="text-slate-400">Messaging angle:</span> {brief.messagingAngle}</p>
          </div>
          <div className="space-y-2">
            <p><span className="text-slate-400">Trust/proof:</span> {brief.trustProofElements.join(", ")}</p>
            <p><span className="text-slate-400">Objections:</span> {brief.objectionsToAddress.join(", ")}</p>
            <p><span className="text-slate-400">FAQ targets:</span> {brief.faqTargets.join(", ")}</p>
            <p><span className="text-slate-400">Required assets:</span> {brief.requiredAssets.join(", ")}</p>
            <p><span className="text-amber-300">Internal notes:</span> {brief.internalNotes}</p>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-base font-semibold">Section Outline</h3>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-300">
            {brief.sectionOutline.map((section) => (
              <li key={section}>{section}</li>
            ))}
          </ol>
        </div>

        {contentBrief ? (
          <div className="mt-4 rounded-lg border border-slate-700 bg-slate-950/40 p-3 text-sm">
            <p className="font-medium">Linked content brief</p>
            <p className="text-slate-400">{contentBrief.title} · owner {contentBrief.writerOwner} · due {contentBrief.dueDate}</p>
          </div>
        ) : null}
      </article>
    </InternalShell>
  );
}
