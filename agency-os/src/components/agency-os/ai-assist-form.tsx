"use client";

import { useState } from "react";

export function AiAssistForm() {
  const [draft, setDraft] = useState("");
  const [structured, setStructured] = useState("");

  async function onSubmit(formData: FormData) {
    setDraft("");
    setStructured("");

    const payload = {
      action: String(formData.get("action") || "find-missing-info"),
      inputContext: String(formData.get("inputContext") || ""),
      projectId: String(formData.get("projectId") || "") || undefined,
    };

    const res = await fetch("/api/agency-os/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const body = await res.json().catch(() => null);
    if (!res.ok || !body) {
      setDraft("Invalid AI assist input.");
      return;
    }

    setDraft(body.outputDraft);
    setStructured(JSON.stringify(body.outputStructured, null, 2));
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <form action={onSubmit} className="grid gap-2 text-sm">
        <p className="font-medium">Run AI Assist Action</p>
        <input name="projectId" placeholder="Project ID (optional)" className="rounded border border-slate-700 bg-slate-950 px-2 py-1.5" />
        <select name="action" className="rounded border border-slate-700 bg-slate-950 px-2 py-1.5">
          <option value="generate-brief-draft">Generate brief draft</option>
          <option value="find-missing-info">Find missing info</option>
          <option value="extract-seo-opportunities">Extract SEO opportunities</option>
          <option value="detect-local-seo-risks">Detect local SEO risks</option>
          <option value="summarize-report-notes">Summarize report notes</option>
          <option value="draft-report-commentary">Draft report commentary</option>
          <option value="draft-sop-outline">Draft SOP outline</option>
          <option value="summarize-change-risk-notes">Summarize change/risk notes</option>
        </select>
        <textarea name="inputContext" placeholder="Paste strategy/report/notes context" className="rounded border border-slate-700 bg-slate-950 px-2 py-1.5" rows={5} required />
        <button type="submit" className="rounded bg-cyan-400 px-3 py-1.5 font-semibold text-slate-950">Generate AI draft</button>
      </form>

      {draft ? (
        <div className="mt-4 rounded-xl border border-cyan-800 bg-slate-950/60 p-3">
          <p className="text-xs uppercase tracking-[0.12em] text-cyan-300">AI Draft (Editable, Not Final)</p>
          <p className="mt-2 whitespace-pre-wrap text-sm text-slate-200">{draft}</p>
          <pre className="mt-3 overflow-x-auto rounded border border-slate-800 bg-slate-950 p-2 text-xs text-slate-400">{structured}</pre>
        </div>
      ) : null}
    </div>
  );
}
