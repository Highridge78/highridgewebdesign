"use client";

import { useState } from "react";

export function IntegrationToggle({
  provider,
  initialEnabled,
}: {
  provider: "resend" | "google-search-console" | "google-analytics";
  initialEnabled: boolean;
}) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [message, setMessage] = useState("");

  async function onToggle() {
    const next = !enabled;
    const res = await fetch("/api/agency-os/integrations/config", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-agency-role": "admin" },
      body: JSON.stringify({ provider, enabled: next, actor: "Admin User" }),
    });

    if (res.ok) {
      setEnabled(next);
      setMessage("Updated");
    } else {
      setMessage("Failed");
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onToggle}
        className={`rounded-md px-2.5 py-1 text-xs font-semibold ${enabled ? "bg-emerald-600 text-white" : "bg-slate-700 text-slate-200"}`}
      >
        {enabled ? "Enabled" : "Disabled"}
      </button>
      {message ? <span className="text-xs text-slate-400">{message}</span> : null}
    </div>
  );
}
