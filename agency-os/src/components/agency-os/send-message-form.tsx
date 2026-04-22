"use client";

import { useState } from "react";

export function SendMessageForm({
  messageId,
  projectId,
  type,
  defaultSubject,
  defaultBody,
}: {
  messageId: string;
  projectId: string;
  type: "report-delivery" | "approval-request" | "milestone-update" | "onboarding-reminder" | "follow-up";
  defaultSubject: string;
  defaultBody: string;
}) {
  const [subject, setSubject] = useState(defaultSubject);
  const [body, setBody] = useState(defaultBody);
  const [status, setStatus] = useState("");

  async function onSend() {
    setStatus("");
    const res = await fetch("/api/agency-os/communications/send", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-agency-role": "account-manager" },
      body: JSON.stringify({
        messageId,
        projectId,
        type,
        subject,
        body,
        actor: "Account Manager",
      }),
    });

    setStatus(res.ok ? "Sent (demo)" : "Send failed");
  }

  return (
    <div className="space-y-2 rounded-lg border border-slate-700 bg-slate-950/40 p-3 text-sm">
      <input value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1.5" />
      <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1.5" />
      <button type="button" onClick={onSend} className="rounded bg-cyan-400 px-3 py-1.5 text-xs font-semibold text-slate-950">Send message</button>
      {status ? <p className="text-xs text-slate-400">{status}</p> : null}
    </div>
  );
}
