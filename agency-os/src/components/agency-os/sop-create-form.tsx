"use client";

import { useState } from "react";

export function SopCreateForm() {
  const [message, setMessage] = useState("");

  async function onSubmit(formData: FormData) {
    const payload = {
      title: String(formData.get("title") || ""),
      category: String(formData.get("category") || "onboarding"),
      purpose: String(formData.get("purpose") || ""),
      owner: String(formData.get("owner") || ""),
      notes: String(formData.get("notes") || ""),
    };

    const res = await fetch("/api/agency-os/sops", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setMessage(res.ok ? "SOP draft created (demo)." : "Invalid SOP payload.");
  }

  return (
    <form action={onSubmit} className="grid gap-2 rounded-xl border border-slate-700 bg-slate-950/40 p-3 text-sm">
      <p className="font-medium">Create SOP Draft</p>
      <input name="title" placeholder="SOP title" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5" required />
      <select name="category" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5">
        <option value="proposal-process">Proposal process</option>
        <option value="onboarding">Onboarding</option>
        <option value="content-collection">Content collection</option>
        <option value="design-qa">Design QA</option>
        <option value="development-qa">Development QA</option>
        <option value="launch">Launch</option>
        <option value="reporting">Reporting</option>
        <option value="local-seo-page-planning">Local SEO page planning</option>
      </select>
      <input name="owner" placeholder="Owner" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5" required />
      <textarea name="purpose" placeholder="Purpose" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5" rows={2} required />
      <textarea name="notes" placeholder="Notes" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5" rows={2} />
      <button type="submit" className="rounded bg-cyan-400 px-3 py-1.5 font-semibold text-slate-950">Create SOP draft</button>
      {message ? <p className="text-slate-400">{message}</p> : null}
    </form>
  );
}
