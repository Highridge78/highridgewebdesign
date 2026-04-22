import { AiAssistForm } from "@/components/agency-os/ai-assist-form";
import { InternalShell } from "@/components/agency-os/internal-shell";
import { getAiGenerations } from "@/lib/agency-os/phase3/selectors";

export default function AiAssistPage() {
  const history = getAiGenerations();

  return (
    <InternalShell
      title="AI Assist Layer"
      subtitle="Workflow-specific AI drafts for SEO, briefs, reports, SOPs, and risk summaries."
    >
      <AiAssistForm />

      <article className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="text-lg font-semibold">Recent AI Drafts</h2>
        <p className="mt-1 text-sm text-slate-400">All outputs are assistive drafts and require human review before use.</p>
        <ul className="mt-3 space-y-3 text-sm">
          {history.map((item) => (
            <li key={item.id} className="rounded-lg border border-slate-700 bg-slate-950/40 p-3">
              <p className="font-medium">{item.action}</p>
              <p className="mt-1 text-slate-300">{item.outputDraft}</p>
              <p className="mt-1 text-slate-400">Reviewed: {item.humanReviewed ? `yes by ${item.reviewer}` : "no"}</p>
            </li>
          ))}
        </ul>
      </article>
    </InternalShell>
  );
}
