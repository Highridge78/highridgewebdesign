import { useMemo, useState } from "react";
import { ArrowDownUp, Download, Loader2, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePageMeta } from "@/hooks/usePageMeta";
import type {
  LeadEngineSearchResponse,
  LeadSearchInput,
  LeadSortKey,
  LeadScoreBreakdown,
  ScoredLead,
  SortDirection,
} from "@shared/leadEngine";

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

function sortLeads(leads: ScoredLead[], key: LeadSortKey, direction: SortDirection): ScoredLead[] {
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

  const sortedLeads = useMemo(() => {
    if (!results) return [];
    return sortLeads(results.leads, sortKey, sortDirection);
  }, [results, sortDirection, sortKey]);

  const handleChange =
    (key: keyof LeadSearchInput) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setForm((prev: LeadSearchInput) => ({
        ...prev,
        [key]:
          key === "radiusMiles" || key === "limit"
            ? Number.parseInt(value || "0", 10)
            : value,
      }));
    };

  const runSearch = async (event: React.FormEvent) => {
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
      setStatusText(
        payload.usedProvider === "google-places"
          ? "Search completed using Google Places data."
          : "Search completed using demo data provider."
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
      .map(
        (lead) =>
          `${lead.name} | Score ${lead.websiteScore}/10 | ${lead.phone ?? "No phone"} | ${
            lead.website ?? "No website"
          }`
      )
      .join("\n");
    await navigator.clipboard.writeText(text);
    setStatusText("Lead summary copied to clipboard.");
  };

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
                      {["Business", "Contact", "Website", "Score", "Notes"].map((header) => (
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
                        <td colSpan={5} className="px-4 py-8 text-center text-foreground/60">
                          No leads yet. Run a search to generate scored prospects.
                        </td>
                      </tr>
                    ) : null}
                    {sortedLeads.map((lead) => (
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
