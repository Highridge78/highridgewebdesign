"use client";

import { useState } from "react";

export function ClientApprovalActions({ approvalId }: { approvalId: string }) {
  const [message, setMessage] = useState<string>("");
  const [busy, setBusy] = useState(false);

  async function submit(action: "approve" | "reject") {
    setBusy(true);
    setMessage("");

    try {
      const res = await fetch(`/api/agency-os/approvals/${approvalId}/decision`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          actor: "Client Portal User",
          revisionReason: action === "reject" ? "Revision requested from client portal" : undefined,
        }),
      });

      if (!res.ok) {
        setMessage("Unable to submit decision. Please try again.");
      } else {
        setMessage(action === "approve" ? "Approval submitted." : "Revision request sent.");
      }
    } catch {
      setMessage("Network error while submitting decision.");
    }

    setBusy(false);
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <button
        type="button"
        disabled={busy}
        onClick={() => submit("approve")}
        className="rounded-md bg-sky-700 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
      >
        Approve
      </button>
      <button
        type="button"
        disabled={busy}
        onClick={() => submit("reject")}
        className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 disabled:opacity-50"
      >
        Request Revision
      </button>
      {message ? <p className="text-xs text-slate-500">{message}</p> : null}
    </div>
  );
}
