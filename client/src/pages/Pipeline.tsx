import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/usePageMeta";
import {
  loadLeads,
  saveLeads,
  updateLeadStatus,
} from "@/lib/leadPipelineStorage";
import { useLocation } from "wouter";
import {
  LEAD_PIPELINE_STATUSES,
  LEAD_PIPELINE_STATUS_LABELS,
  type LeadPipelineStatus,
  type PersistedLead,
} from "@shared/leadEngine";

const STATUS_COLUMNS: LeadPipelineStatus[] = [
  "new",
  "contacted",
  "replied",
  "closed",
  "lost",
];

function scoreBadgeClass(score: number) {
  if (score <= 3) {
    return "bg-red-500/15 text-red-300 border-red-500/30";
  }
  if (score <= 6) {
    return "bg-amber-500/15 text-amber-200 border-amber-500/30";
  }
  return "bg-emerald-500/15 text-emerald-200 border-emerald-500/30";
}

export default function PipelinePage() {
  usePageMeta({
    title: "Lead Pipeline | High Ridge Web Design",
    description:
      "Track lead lifecycle from new to closed with a local-first, persistent outreach pipeline board.",
  });

  const [leads, setLeads] = useState<PersistedLead[]>(() => loadLeads());
  const [statusText, setStatusText] = useState("Manage your lead lifecycle in one place.");
  const [, setLocation] = useLocation();

  const grouped = useMemo(() => {
    const groups = Object.fromEntries(
      LEAD_PIPELINE_STATUSES.map((status) => [status, [] as PersistedLead[]])
    ) as Record<LeadPipelineStatus, PersistedLead[]>;

    for (const lead of leads) {
      groups[lead.status].push(lead);
    }

    for (const status of LEAD_PIPELINE_STATUSES) {
      groups[status].sort((a, b) =>
        b.updatedAt.localeCompare(a.updatedAt)
      );
    }

    return groups;
  }, [leads]);

  const updateLeads = (updater: (current: PersistedLead[]) => PersistedLead[]) => {
    setLeads((current) => {
      const next = updater(current);
      saveLeads(next);
      return next;
    });
  };

  const moveLead = (leadId: string, status: LeadPipelineStatus) => {
    updateLeads((current) => updateLeadStatus(current, leadId, status));
    setStatusText(`Lead moved to ${LEAD_PIPELINE_STATUS_LABELS[status]}.`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main id="main-content" className="pt-28 md:pt-32 pb-16">
        <section className="container">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              Pipeline Management
            </p>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl font-bold text-white">
              Lead Pipeline
            </h1>
            <p className="mt-4 text-foreground/70 text-lg">
              Move leads from new to closed with instant status updates and local persistence.
            </p>
            <p className="mt-3 text-sm text-foreground/60">{statusText}</p>
            <div className="mt-4 flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setLocation("/lead-engine")}
              >
                Back to Lead Engine
              </Button>
              <span className="text-xs text-foreground/60">
                {leads.length} total tracked leads
              </span>
            </div>
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-5 md:grid-cols-2">
            {STATUS_COLUMNS.map((status) => (
              <section
                key={status}
                className="rounded-2xl border border-border bg-card/70 p-4 min-h-[380px]"
              >
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-semibold text-white">
                    {LEAD_PIPELINE_STATUS_LABELS[status]}
                  </h2>
                  <span className="rounded-full border border-border px-2 py-0.5 text-xs text-foreground/70">
                    {grouped[status].length}
                  </span>
                </div>

                <div className="mt-4 grid gap-3">
                  {grouped[status].length === 0 ? (
                    <p className="text-sm text-foreground/55">No leads in this stage.</p>
                  ) : (
                    grouped[status].map((lead) => (
                      <article
                        key={lead.id}
                        className="rounded-lg border border-border/70 bg-background/40 p-3"
                      >
                        <p className="font-medium text-white">{lead.businessName}</p>
                        <p className="mt-1 text-xs text-foreground/60">
                          {lead.businessType} • {lead.contactInfo.city ?? "Unknown"},{" "}
                          {lead.contactInfo.state ?? ""}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span
                            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${scoreBadgeClass(
                              lead.score
                            )}`}
                          >
                            {lead.score}/10
                          </span>
                          <span className="text-xs text-foreground/55">
                            Follow-ups: {lead.followUpCount}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-foreground/65 break-all">
                          {lead.contactInfo.email ?? lead.contactInfo.phone ?? "No contact info"}
                        </p>
                        {lead.lastContactedAt ? (
                          <p className="mt-1 text-xs text-foreground/50">
                            Last contact:{" "}
                            {new Date(lead.lastContactedAt).toLocaleString()}
                          </p>
                        ) : null}
                        <label className="mt-3 block">
                          <span className="sr-only">
                            Move {lead.businessName} to another stage
                          </span>
                          <select
                            value={lead.status}
                            onChange={(event) =>
                              moveLead(lead.id, event.target.value as LeadPipelineStatus)
                            }
                            className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-foreground"
                          >
                            {LEAD_PIPELINE_STATUSES.map((option) => (
                              <option key={option} value={option}>
                                {LEAD_PIPELINE_STATUS_LABELS[option]}
                              </option>
                            ))}
                          </select>
                        </label>
                      </article>
                    ))
                  )}
                </div>
              </section>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
