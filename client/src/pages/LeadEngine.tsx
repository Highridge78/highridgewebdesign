import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import {
  ArrowDownUp,
  Download,
  Loader2,
  Search,
  Copy,
  MessageSquareText,
  Mail,
  Workflow,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePageMeta } from "@/hooks/usePageMeta";
import {
  addOutreachHistory,
  getLeadMapById,
  loadLeads,
  markLeadAsContacted,
  upsertLeadsFromSearch,
  saveLeads,
  updateLeadStatus,
} from "@/lib/leadPipelineStorage";
import type {
  LeadPipelineStatus,
  LeadEngineSearchResponse,
  LeadOutreach,
  LeadSearchInput,
  LeadSortKey,
  LeadScoreBreakdown,
  PersistedLead,
  SendOutreachResponse,
  ScoredLeadWithOutreach,
  SortDirection,
} from "@shared/leadEngine";
import {
  LEAD_PIPELINE_STATUS_LABELS,
  LEAD_PIPELINE_STATUSES,
  generateFollowUpMessage,
} from "@shared/leadEngine";
import { useLocation } from "wouter";

const INITIAL_CONTACT_STATUS: LeadPipelineStatus = "contacted";

const DEFAULT_FORM: LeadSearchInput = {
  city: "",
  state: "",
  radiusMiles: 15,
  businessType: "",
  limit: 20,
};

const SORT_OPTIONS: Array<{ value: LeadSortKey; label: string }> = [
  { value: "score", label: "Website Score" },
  { value: "name", label: "Business Name" },
  { value: "city", label: "City" },
  { value: "businessType", label: "Business Type" },
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

function formatScoreReasoning(reasoning: LeadScoreBreakdown[]) {
  return reasoning.map((item) => `${item.factor}: ${item.value}/2`).join(" • ");
}

function sortLeads(
  leads: ScoredLeadWithOutreach[],
  key: LeadSortKey,
  direction: SortDirection
): ScoredLeadWithOutreach[] {
  const sorted = [...leads].sort((a, b) => {
    if (key === "score") {
      return a.websiteScore - b.websiteScore;
    }
    if (key === "city") {
      return (a.city ?? "").localeCompare(b.city ?? "");
    }
    if (key === "businessType") {
      return a.businessType.localeCompare(b.businessType);
    }
    return a.name.localeCompare(b.name);
  });
  return direction === "asc" ? sorted : sorted.reverse();
}

export default function LeadEnginePage() {
  usePageMeta({
    title: "Lead Engine | High Ridge Web Design",
    description:
      "Find local businesses, score their website quality, and export lead-ready data for outreach campaigns.",
  });

  const [form, setForm] = useState<LeadSearchInput>(DEFAULT_FORM);
  const [results, setResults] = useState<LeadEngineSearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState("Ready to search local businesses.");
  const [sortKey, setSortKey] = useState<LeadSortKey>("score");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [selectedOutreachLeadId, setSelectedOutreachLeadId] = useState<string | null>(null);
  const [persistedLeads, setPersistedLeads] = useState<PersistedLead[]>(() => loadLeads());
  const [sendingState, setSendingState] = useState<Record<string, { email: boolean; sms: boolean }>>({});
  const [, setLocation] = useLocation();

  const updatePersistedLeads = (updater: (current: PersistedLead[]) => PersistedLead[]) => {
    setPersistedLeads((current) => {
      const next = updater(current);
      saveLeads(next);
      return next;
    });
  };

  const persistedLeadMap = useMemo(() => getLeadMapById(persistedLeads), [persistedLeads]);

  const sortedLeads = useMemo(() => {
    if (!results) return [];
    return sortLeads(results.leads, sortKey, sortDirection);
  }, [results, sortDirection, sortKey]);

  const selectedOutreachLead = useMemo(
    () => sortedLeads.find((lead) => lead.id === selectedOutreachLeadId) ?? null,
    [selectedOutreachLeadId, sortedLeads]
  );

  const selectedPersistedLead = useMemo(
    () => (selectedOutreachLead ? persistedLeadMap.get(selectedOutreachLead.id) ?? null : null),
    [persistedLeadMap, selectedOutreachLead]
  );

  const setSending = (leadId: string, channel: "email" | "sms", isSending: boolean) => {
    setSendingState((prev) => ({
      ...prev,
      [leadId]: {
        email: channel === "email" ? isSending : prev[leadId]?.email ?? false,
        sms: channel === "sms" ? isSending : prev[leadId]?.sms ?? false,
      },
    }));
  };

  const sendOutreach = async (
    lead: ScoredLeadWithOutreach,
    channel: "email" | "sms"
  ) => {
    if (channel === "email" && !lead.email) {
      setStatusText(`No email found for ${lead.name}.`);
      return;
    }
    if (channel === "sms" && !lead.phone) {
      setStatusText(`No phone number found for ${lead.name}.`);
      return;
    }

    setSending(lead.id, channel, true);
    setStatusText(
      channel === "email"
        ? `Sending email to ${lead.name}...`
        : `Sending SMS to ${lead.name}...`
    );

    try {
      const response = await fetch(
        channel === "email" ? "/api/outreach/send-email" : "/api/outreach/send-sms",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body:
            channel === "email"
              ? JSON.stringify({
                  leadId: lead.id,
                  to: lead.email,
                  subject: lead.outreach.subject,
                  body: lead.outreach.emailMessage,
                })
              : JSON.stringify({
                  leadId: lead.id,
                  to: lead.phone,
                  message: lead.outreach.smsMessage,
                }),
        }
      );

      const payload = (await response.json().catch(() => null)) as
        | SendOutreachResponse
        | { error?: string; detail?: string }
        | null;

      if (!response.ok || !payload || !("success" in payload) || !payload.success) {
        throw new Error(
          (payload && "detail" in payload && payload.detail) ||
            (payload && "error" in payload && payload.error) ||
            "Send failed"
        );
      }

      const sentAt = payload.sentAt ?? new Date().toISOString();
      updatePersistedLeads((current) => {
        const ensured = upsertLeadsFromSearch(current, [lead]);
        const withHistory = addOutreachHistory(ensured, lead.id, {
          type: channel,
          subject: channel === "email" ? lead.outreach.subject : undefined,
          body: channel === "email" ? lead.outreach.emailMessage : lead.outreach.smsMessage,
        });
        return markLeadAsContacted(withHistory, lead.id, sentAt, INITIAL_CONTACT_STATUS);
      });
      setStatusText(
        channel === "email"
          ? `Email sent to ${lead.name}${payload.mode === "mock" ? " (mock mode)" : ""}. Status updated to contacted.`
          : `SMS sent to ${lead.name}${payload.mode === "mock" ? " (mock mode)" : ""}. Status updated to contacted.`
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : "Send failed";
      setStatusText(
        channel === "email"
          ? `Failed to send email to ${lead.name}: ${message}`
          : `Failed to send SMS to ${lead.name}: ${message}`
      );
    } finally {
      setSending(lead.id, channel, false);
    }
  };

  const copyText = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setStatusText(`${label} copied to clipboard.`);
  };

  const handleChange =
    (key: keyof LeadSearchInput) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setForm((prev: LeadSearchInput) => ({
        ...prev,
        [key]:
          key === "radiusMiles" || key === "limit"
            ? Number.parseInt(value || "0", 10)
            : value,
      }));
    };

  const runSearch = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setStatusText("Finding businesses...");
    setResults(null);

    try {
      const response = await fetch("/api/leads/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error ?? "Lead search failed");
      }

      const payload = (await response.json()) as LeadEngineSearchResponse;
      setResults(payload);
      updatePersistedLeads((current) => upsertLeadsFromSearch(current, payload.leads));
      setStatusText(
        payload.usedProvider === "google-places"
          ? `Search completed using Google Places data. ${payload.leads.length} leads are now tracked in your pipeline.`
          : `Search completed using demo data provider. ${payload.leads.length} leads are now tracked in your pipeline.`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error during search.");
      setStatusText("Search failed. Check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  const exportCsv = () => {
    if (sortedLeads.length === 0) return;

    const rows = [
      ["Name", "Phone", "Website", "Email", "Score", "Business Type", "City", "State", "Notes"],
      ...sortedLeads.map((lead) => [
        lead.name,
        lead.phone ?? "",
        lead.website ?? "",
        lead.email ?? "",
        String(lead.websiteScore),
        lead.businessType,
        lead.city ?? "",
        lead.state ?? "",
        lead.analysis.notes.join("; "),
      ]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((value) => `"${String(value).replaceAll("\"", "\"\"")}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `highridge-leads-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copySummary = async () => {
    if (sortedLeads.length === 0) return;
    const text = sortedLeads
      .map((lead) => {
        const tracked = persistedLeadMap.get(lead.id);
        return `${lead.name} | Score ${lead.websiteScore}/10 | Status ${
          tracked?.status ?? "new"
        } | ${lead.phone ?? "No phone"} | ${lead.website ?? "No website"}`;
      })
      .join("\n");
    await copyText(text, "Lead summary");
  };

  const handleStatusChange = (leadId: string, status: LeadPipelineStatus) => {
    updatePersistedLeads((current) => updateLeadStatus(current, leadId, status));
    setStatusText(`Lead moved to ${LEAD_PIPELINE_STATUS_LABELS[status]}.`);
  };

  const generateFollowUp = async (lead: ScoredLeadWithOutreach) => {
    const trackedLead = persistedLeadMap.get(lead.id);
    const previousMessage =
      trackedLead?.outreachMessages.history.at(-1)?.body ?? lead.outreach.emailMessage;
    const followUpMessage = generateFollowUpMessage({
      businessName: lead.name,
      score: lead.websiteScore,
      previousMessage,
    });

    updatePersistedLeads((current) => {
      const ensured = upsertLeadsFromSearch(current, [lead]);
      return addOutreachHistory(ensured, lead.id, {
        type: "follow-up",
        subject: `Follow-up for ${lead.name}`,
        body: followUpMessage,
      });
    });

    setSelectedOutreachLeadId(lead.id);
    await copyText(followUpMessage, "Follow-up message");
    setStatusText(`Follow-up generated for ${lead.name}. Added to outreach history.`);
  };

  const formatAuditSummary = (outreach: LeadOutreach): string =>
    outreach.auditSummary.map((line) => `• ${line}`).join("\n");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main id="main-content" className="pt-28 md:pt-32 pb-16">
        <section className="container">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              Internal Growth Tool
            </p>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl font-bold text-white">
              Local Lead Engine
            </h1>
            <p className="mt-4 text-foreground/70 text-lg">
              Search local business categories by geography, score website quality,
              and export outreach-ready lead lists in minutes.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-foreground/65">
              <Workflow className="h-4 w-4 text-brand-orange" />
              <span>{persistedLeads.length} leads currently tracked in your pipeline.</span>
              <button
                type="button"
                onClick={() => setLocation("/pipeline")}
                className="text-brand-amber hover:text-brand-orange transition-colors underline underline-offset-2"
              >
                Open pipeline board
              </button>
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
            <section className="rounded-2xl border border-border bg-card/70 p-6">
              <h2 className="font-serif text-2xl font-bold text-white">Search Inputs</h2>
              <p className="mt-2 text-sm text-foreground/65">
                Enter your target market and business category. The engine scores
                each result from 0–10 using website quality heuristics.
              </p>

              <form className="mt-6 space-y-4" onSubmit={runSearch}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-1.5">
                    <span className="text-sm text-foreground/75">City</span>
                    <Input
                      value={form.city}
                      onChange={handleChange("city")}
                      placeholder="Asheville"
                      required
                    />
                  </label>
                  <label className="space-y-1.5">
                    <span className="text-sm text-foreground/75">State</span>
                    <Input
                      value={form.state}
                      onChange={handleChange("state")}
                      placeholder="NC"
                      required
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-1.5">
                    <span className="text-sm text-foreground/75">Radius (miles)</span>
                    <Input
                      type="number"
                      min={1}
                      max={100}
                      value={form.radiusMiles}
                      onChange={handleChange("radiusMiles")}
                      required
                    />
                  </label>
                  <label className="space-y-1.5">
                    <span className="text-sm text-foreground/75">Max Results</span>
                    <Input
                      type="number"
                      min={5}
                      max={50}
                      value={form.limit ?? 20}
                      onChange={handleChange("limit")}
                    />
                  </label>
                </div>

                <label className="space-y-1.5 block">
                  <span className="text-sm text-foreground/75">Business Type</span>
                  <Input
                    value={form.businessType}
                    onChange={handleChange("businessType")}
                    placeholder="roofing company"
                    required
                  />
                </label>

                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full bg-brand-orange hover:bg-brand-orange-bright text-white font-semibold"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Finding businesses...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      Run Lead Search
                    </>
                  )}
                </Button>
              </form>
            </section>

            <section className="rounded-2xl border border-border bg-card/70 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-white">Lead Results</h2>
                  <p className="mt-1 text-sm text-foreground/65">{statusText}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={copySummary}
                    disabled={sortedLeads.length === 0}
                  >
                    Copy
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={exportCsv}
                    disabled={sortedLeads.length === 0}
                  >
                    <Download className="h-4 w-4" />
                    Export CSV
                  </Button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <label className="text-xs uppercase tracking-wider text-foreground/60">
                  Sort by
                </label>
                <select
                  className="rounded-md border border-border bg-background px-2.5 py-1.5 text-sm text-foreground"
                  value={sortKey}
                  onChange={(event) => setSortKey(event.target.value as LeadSortKey)}
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setSortDirection((prev: SortDirection) => (prev === "asc" ? "desc" : "asc"))
                  }
                >
                  <ArrowDownUp className="h-4 w-4" />
                  {sortDirection === "asc" ? "Ascending" : "Descending"}
                </Button>
              </div>

              {error ? (
                <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              ) : null}

              <div className="mt-4 overflow-x-auto rounded-xl border border-border">
                <table className="min-w-full divide-y divide-border text-sm">
                  <thead className="bg-background/75">
                    <tr>
                      {[
                        "Business",
                        "Contact",
                        "Website",
                        "Score",
                        "Notes",
                        "Status",
                        "Actions",
                      ].map((header) => (
                        <th
                          key={header}
                          className="px-4 py-3 text-left text-xs uppercase tracking-wider text-foreground/60"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/70">
                    {sortedLeads.length === 0 && !loading ? (
                      <tr>
                        <td colSpan={8} className="px-4 py-8 text-center text-foreground/60">
                          No leads yet. Run a search to generate scored prospects.
                        </td>
                      </tr>
                    ) : null}
                    {sortedLeads.map((lead) => {
                      const trackedLead = persistedLeadMap.get(lead.id);
                      return (
                        <tr key={lead.id} className="align-top">
                          <td className="px-4 py-3">
                            <p className="font-semibold text-white">{lead.name}</p>
                            <p className="text-xs text-foreground/60">
                              {lead.businessType} • {lead.city}, {lead.state}
                            </p>
                          </td>
                          <td className="px-4 py-3 text-foreground/75">
                            <p>{lead.phone ?? "No phone found"}</p>
                            <p className="text-xs mt-1">{lead.email ?? "No email detected"}</p>
                          </td>
                          <td className="px-4 py-3">
                            {lead.website ? (
                              <a
                                href={lead.website}
                                target="_blank"
                                rel="noreferrer"
                                className="text-brand-amber hover:text-brand-orange transition-colors break-all"
                              >
                                {lead.website}
                              </a>
                            ) : (
                              <span className="text-foreground/55">No website found</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${scoreBadgeClass(
                                lead.websiteScore
                              )}`}
                            >
                              {lead.websiteScore}/10
                            </span>
                            <p className="mt-2 text-xs text-foreground/55 max-w-[180px]">
                              {formatScoreReasoning([
                                { factor: "website", value: lead.website ? 2 : 0 },
                                {
                                  factor: "load",
                                  value:
                                    lead.analysis.loadMs == null
                                      ? 1
                                      : lead.analysis.loadMs <= 1500
                                        ? 2
                                        : lead.analysis.loadMs <= 3500
                                          ? 1
                                          : 0,
                                },
                                {
                                  factor: "mobile",
                                  value: lead.analysis.viewportResponsive ? 2 : lead.analysis.hasViewport ? 1 : 0,
                                },
                                { factor: "https", value: lead.analysis.hasHttps ? 2 : 0 },
                                {
                                  factor: "structure",
                                  value:
                                    Number(lead.analysis.hasMain) +
                                      Number(lead.analysis.hasH1) +
                                      Number(lead.analysis.hasMetaDescription) >=
                                    3
                                      ? 2
                                      : Number(lead.analysis.hasMain) +
                                          Number(lead.analysis.hasH1) +
                                          Number(lead.analysis.hasMetaDescription) >=
                                        1
                                        ? 1
                                        : 0,
                                },
                              ])}
                            </p>
                          </td>
                          <td className="px-4 py-3 text-foreground/70">
                            {lead.analysis.notes.length > 0
                              ? lead.analysis.notes.join("; ")
                              : "No major issues detected"}
                          </td>
                          <td className="px-4 py-3 min-w-[180px]">
                            <label className="sr-only" htmlFor={`status-${lead.id}`}>
                              Update status for {lead.name}
                            </label>
                            <select
                              id={`status-${lead.id}`}
                              value={trackedLead?.status ?? "new"}
                              onChange={(event) =>
                                handleStatusChange(lead.id, event.target.value as LeadPipelineStatus)
                              }
                              className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-foreground"
                            >
                              {LEAD_PIPELINE_STATUSES.map((statusOption) => (
                                <option key={statusOption} value={statusOption}>
                                  {LEAD_PIPELINE_STATUS_LABELS[statusOption]}
                                </option>
                              ))}
                            </select>
                            <p className="mt-2 text-xs text-foreground/55">
                              Follow-ups: {trackedLead?.followUpCount ?? 0}
                            </p>
                            {trackedLead?.lastContactedAt ? (
                              <p className="mt-1 text-xs text-foreground/55">
                                Last contact:{" "}
                                {new Date(trackedLead.lastContactedAt).toLocaleString()}
                              </p>
                            ) : null}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-col gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                disabled={
                                  !lead.email || sendingState[lead.id]?.email || sendingState[lead.id]?.sms
                                }
                                onClick={() => sendOutreach(lead, "email")}
                              >
                                {sendingState[lead.id]?.email ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Mail className="h-4 w-4" />
                                )}
                                Send Email
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                disabled={
                                  !lead.phone || sendingState[lead.id]?.sms || sendingState[lead.id]?.email
                                }
                                onClick={() => sendOutreach(lead, "sms")}
                              >
                                {sendingState[lead.id]?.sms ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <MessageSquareText className="h-4 w-4" />
                                )}
                                Send SMS
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                disabled={sendingState[lead.id]?.sms || sendingState[lead.id]?.email}
                                onClick={() => {
                                  void generateFollowUp(lead);
                                }}
                              >
                                <MessageSquareText className="h-4 w-4" />
                                Follow-Up
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedOutreachLeadId(lead.id)}
                              >
                                <MessageSquareText className="h-4 w-4" />
                                View Outreach
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </section>

        {selectedOutreachLead ? (
          <section className="container mt-8">
            <div className="rounded-2xl border border-border bg-card/75 p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wider text-brand-orange font-semibold">
                    Outreach Generator
                  </p>
                  <h2 className="mt-1 font-serif text-2xl text-white">
                    {selectedOutreachLead.name}
                  </h2>
                  <p className="mt-1 text-sm text-foreground/65">
                    Personalized outreach based on website score {selectedOutreachLead.websiteScore}/10
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedOutreachLeadId(null)}
                >
                  Close
                </Button>
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                <article className="rounded-xl border border-border bg-background/40 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <Mail className="h-4 w-4 text-brand-orange" />
                      Cold Email
                    </h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => copyText(selectedOutreachLead.outreach.emailMessage, "Email")}
                    >
                      <Copy className="h-4 w-4" />
                      Copy Email
                    </Button>
                  </div>
                  <pre className="mt-3 whitespace-pre-wrap text-sm text-foreground/80 font-sans">
                    {selectedOutreachLead.outreach.emailMessage}
                  </pre>
                </article>

                <article className="rounded-xl border border-border bg-background/40 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <MessageSquareText className="h-4 w-4 text-brand-orange" />
                      SMS Message
                    </h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => copyText(selectedOutreachLead.outreach.smsMessage, "SMS")}
                    >
                      <Copy className="h-4 w-4" />
                      Copy SMS
                    </Button>
                  </div>
                  <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
                    {selectedOutreachLead.outreach.smsMessage}
                  </p>
                </article>

                <article className="rounded-xl border border-border bg-background/40 p-4 lg:col-span-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-white">Quick Audit Summary</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        copyText(formatAuditSummary(selectedOutreachLead.outreach), "Audit summary")
                      }
                    >
                      <Copy className="h-4 w-4" />
                      Copy Audit
                    </Button>
                  </div>
                  <ul className="mt-3 grid gap-2 text-sm text-foreground/80">
                    {selectedOutreachLead.outreach.auditSummary.map((item: string) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-orange shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="rounded-xl border border-border bg-background/40 p-4 lg:col-span-2">
                  <h3 className="font-semibold text-white">Message History</h3>
                  <ul className="mt-3 grid gap-3">
                    {(selectedPersistedLead?.outreachMessages.history ?? []).length === 0 ? (
                      <li className="text-sm text-foreground/60">
                        No outreach history yet. Send a message or generate a follow-up.
                      </li>
                    ) : (
                      selectedPersistedLead?.outreachMessages.history
                        .slice()
                        .reverse()
                        .map((entry) => (
                          <li key={entry.id} className="rounded-lg border border-border/70 p-3">
                            <p className="text-xs uppercase tracking-wider text-foreground/60">
                              {entry.type} • {new Date(entry.createdAt).toLocaleString()}
                            </p>
                            {entry.subject ? (
                              <p className="mt-1 text-sm font-medium text-white">{entry.subject}</p>
                            ) : null}
                            <p className="mt-1 text-sm text-foreground/80">{entry.body}</p>
                          </li>
                        ))
                    )}
                  </ul>
                </article>
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
