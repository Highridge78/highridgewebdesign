"use client";

import { useState } from "react";

export function BriefCreateForm() {
  const [message, setMessage] = useState("");

  async function onSubmit(formData: FormData) {
    setMessage("");
    const payload = {
      projectId: String(formData.get("projectId") || ""),
      briefType: String(formData.get("briefType") || "service-page"),
      title: String(formData.get("title") || ""),
      pageObjective: String(formData.get("pageObjective") || ""),
      audience: String(formData.get("audience") || ""),
      searchIntent: String(formData.get("searchIntent") || "commercial"),
      primaryKeyword: String(formData.get("primaryKeyword") || ""),
      secondaryKeywords: String(formData.get("secondaryKeywords") || "")
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean),
      conversionGoal: String(formData.get("conversionGoal") || ""),
      cta: String(formData.get("cta") || ""),
    };

    const res = await fetch("/api/agency-os/briefs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setMessage(res.ok ? "Brief draft created (demo)." : "Invalid brief input.");
  }

  return (
    <form action={onSubmit} className="grid gap-2 rounded-xl border border-slate-700 bg-slate-950/40 p-3 text-sm">
      <p className="font-medium">Generate Brief Draft Record</p>
      <input name="projectId" placeholder="Project ID" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5" required />
      <select name="briefType" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5">
        <option value="service-page">Service page</option>
        <option value="location-page">Location page</option>
        <option value="landing-page">Landing page</option>
        <option value="home-page">Home page</option>
        <option value="blog-article">Blog/article</option>
      </select>
      <input name="title" placeholder="Brief title" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5" required />
      <textarea name="pageObjective" placeholder="Page objective" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5" rows={2} required />
      <input name="audience" placeholder="Audience" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5" required />
      <select name="searchIntent" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5">
        <option value="transactional">Transactional</option>
        <option value="commercial">Commercial</option>
        <option value="informational">Informational</option>
        <option value="navigational">Navigational</option>
      </select>
      <input name="primaryKeyword" placeholder="Primary keyword" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5" required />
      <input name="secondaryKeywords" placeholder="Secondary keywords (comma-separated)" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5" required />
      <input name="conversionGoal" placeholder="Conversion goal" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5" required />
      <input name="cta" placeholder="CTA" className="rounded border border-slate-700 bg-slate-900 px-2 py-1.5" required />
      <button type="submit" className="rounded bg-cyan-400 px-3 py-1.5 font-semibold text-slate-950">Create brief draft</button>
      {message ? <p className="text-slate-400">{message}</p> : null}
    </form>
  );
}
