"use client";

import { useState } from "react";

export function SeoCreateForm() {
  const [message, setMessage] = useState("");

  async function onSubmit(formData: FormData) {
    setMessage("");
    const payload = {
      projectId: String(formData.get("projectId") || ""),
      title: String(formData.get("title") || ""),
      owner: String(formData.get("owner") || ""),
      serviceFocus: String(formData.get("serviceFocus") || "")
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean),
      targetLocations: String(formData.get("targetLocations") || "")
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean),
      strategyBrief: String(formData.get("strategyBrief") || ""),
    };

    const res = await fetch("/api/agency-os/seo-strategies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setMessage(res.ok ? "SEO strategy draft created (demo)." : "Invalid strategy input.");
  }

  return (
    <form action={onSubmit} className="grid gap-2 rounded-xl border border-slate-700 bg-slate-950/40 p-3 text-sm">
      <p className="font-medium">New SEO Strategy Draft</p>
      <input name="projectId" placeholder="Project ID (e.g. proj-bluepeak)" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5" required />
      <input name="title" placeholder="Strategy title" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5" required />
      <input name="owner" placeholder="Owner" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5" required />
      <input name="serviceFocus" placeholder="Service focus (comma-separated)" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5" required />
      <input name="targetLocations" placeholder="Target locations (comma-separated)" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5" required />
      <textarea name="strategyBrief" placeholder="Strategy brief" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5" rows={3} required />
      <button type="submit" className="rounded bg-cyan-400 px-3 py-1.5 font-semibold text-slate-950">Create draft</button>
      {message ? <p className="text-slate-400">{message}</p> : null}
    </form>
  );
}
