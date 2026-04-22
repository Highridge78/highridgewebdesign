"use client";

import { useMemo, useState } from "react";
import { OnboardingCategory } from "@/lib/agency-os/domain/types";

function actionLabel(category: OnboardingCategory): string {
  if (category === "assets" || category === "brand" || category === "technical-access") {
    return "Upload File";
  }
  if (category === "content") {
    return "Complete Questionnaire";
  }
  return "Confirm Submission";
}

export function ClientOnboardingActions({
  itemId,
  category,
}: {
  itemId: string;
  category: OnboardingCategory;
}) {
  const [message, setMessage] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const label = useMemo(() => actionLabel(category), [category]);

  async function onSubmit() {
    setBusy(true);
    setMessage("");

    try {
      const res = await fetch(`/api/agency-os/onboarding-items/${itemId}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          actor: "Client Portal User",
          status: "submitted",
          note: `${label} completed from client portal`,
        }),
      });

      if (!res.ok) {
        setMessage("Submission failed. Please try again.");
      } else {
        setMessage("Submitted successfully.");
      }
    } catch {
      setMessage("Network error while submitting.");
    }

    setBusy(false);
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <button
        type="button"
        disabled={busy}
        onClick={onSubmit}
        className="rounded-md bg-sky-700 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
      >
        {label}
      </button>
      {message ? <p className="text-xs text-slate-500">{message}</p> : null}
    </div>
  );
}
