"use client";

import { useState } from "react";

export function AutomationToggle({
  automationId,
  initialEnabled,
}: {
  automationId: string;
  initialEnabled: boolean;
}) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [message, setMessage] = useState("");

  async function onToggle() {
    const next = !enabled;
    const res = await fetch(`/api/agency-os/automation/${automationId}/toggle`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-agency-role": "ops" },
      body: JSON.stringify({ enabled: next, actor: "Ops User" }),
    });

    if (res.ok) {
      setEnabled(next);
      setMessage(next ? "Enabled" : "Disabled");
    } else {
      setMessage("Failed to update rule state");
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onToggle}
        className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
          enabled ? "bg-emerald-600 text-white" : "bg-slate-700 text-slate-200"
        }`}
      >
        {enabled ? "Enabled" : "Disabled"}
      </button>
      {message ? <span className="text-xs text-slate-400">{message}</span> : null}
    </div>
  );
}
