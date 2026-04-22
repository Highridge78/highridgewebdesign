"use client";

import { useState } from "react";

export function ReportCreateForm() {
  const [message, setMessage] = useState("");

  async function onSubmit(formData: FormData) {
    const payload = {
      projectId: String(formData.get("projectId") || ""),
      periodStart: String(formData.get("periodStart") || ""),
      periodEnd: String(formData.get("periodEnd") || ""),
      kpiSummary: String(formData.get("kpiSummary") || ""),
      wins: String(formData.get("wins") || "").split("|").map((v) => v.trim()).filter(Boolean),
      concerns: String(formData.get("concerns") || "").split("|").map((v) => v.trim()).filter(Boolean),
      recommendations: String(formData.get("recommendations") || "").split("|").map((v) => v.trim()).filter(Boolean),
      nextMonthPriorities: String(formData.get("nextMonthPriorities") || "").split("|").map((v) => v.trim()).filter(Boolean),
    };

    const res = await fetch("/api/agency-os/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setMessage(res.ok ? "Report draft created (demo)." : "Invalid report payload.");
  }

  return (
    <form action={onSubmit} className="grid gap-2 rounded-xl border border-slate-700 bg-slate-950/40 p-3 text-sm">
      <p className="font-medium">Create Monthly Report Draft</p>
      <input name="projectId" placeholder="Project ID" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5" required />
      <div className="grid grid-cols-2 gap-2">
        <input name="periodStart" type="date" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5" required />
        <input name="periodEnd" type="date" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5" required />
      </div>
      <textarea name="kpiSummary" placeholder="KPI summary" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5" rows={2} required />
      <input name="wins" placeholder="Wins separated by |" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5" required />
      <input name="concerns" placeholder="Concerns separated by |" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5" required />
      <input name="recommendations" placeholder="Recommendations separated by |" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5" required />
      <input name="nextMonthPriorities" placeholder="Next month priorities separated by |" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5" required />
      <button type="submit" className="rounded bg-cyan-400 px-3 py-1.5 font-semibold text-slate-950">Create report draft</button>
      {message ? <p className="text-slate-400">{message}</p> : null}
    </form>
  );
}
