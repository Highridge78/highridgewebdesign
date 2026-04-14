import { useEffect, useMemo, useState } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, RefreshCw } from "lucide-react";

type LeadStatus = "new" | "contacted" | "qualified" | "closed";

type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  business: string | null;
  message: string;
  status: LeadStatus;
  score: number;
  source: string;
  createdAt: string;
  updatedAt: string;
};

const STATUS_OPTIONS: LeadStatus[] = ["new", "contacted", "qualified", "closed"];
const ADMIN_TOKEN_STORAGE_KEY = "leads_admin_token";

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

function messagePreview(message: string): string {
  const trimmed = message.trim();
  if (trimmed.length <= 120) return trimmed;
  return `${trimmed.slice(0, 120)}...`;
}

function sourceBadgeLabel(source: string): string {
  if (source === "website") return "website";
  return source || "unknown";
}

export default function AdminLeadsPage() {
  usePageMeta({
    title: "Leads Admin | High Ridge Web Design",
    description: "Internal leads dashboard for viewing and updating lead status.",
  });

  const [tokenInput, setTokenInput] = useState("");
  const [adminToken, setAdminToken] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusSavingId, setStatusSavingId] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const savedToken = window.localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY) ?? "";
    if (savedToken) {
      setAdminToken(savedToken);
      setTokenInput(savedToken);
    }
  }, []);

  const authHeaders = useMemo((): Record<string, string> => {
    const headers: Record<string, string> = {};
    if (adminToken) {
      headers.Authorization = `Bearer ${adminToken}`;
    }
    return headers;
  }, [adminToken]);

  async function loadLeads() {
    setLoading(true);
    setErrorMessage("");
    setStatusMessage("");
    try {
      const response = await fetch("/api/leads", {
        headers: authHeaders,
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          typeof payload?.message === "string"
            ? payload.message
            : "Unable to load leads.";
        setErrorMessage(message);
        setLoading(false);
        return;
      }

      setLeads(Array.isArray(payload?.leads) ? payload.leads : []);
    } catch {
      setErrorMessage("Network error while loading leads.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadLeads();
  }, [adminToken]);

  function applyToken() {
    const trimmed = tokenInput.trim();
    setAdminToken(trimmed);
    if (trimmed) {
      window.localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, trimmed);
    } else {
      window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
    }
  }

  async function handleStatusUpdate(leadId: number, status: LeadStatus) {
    setStatusSavingId(leadId);
    setErrorMessage("");
    setStatusMessage("");
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders,
        },
        body: JSON.stringify({ status }),
      });

      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        const message =
          typeof payload?.message === "string"
            ? payload.message
            : "Unable to update lead status.";
        setErrorMessage(message);
        return;
      }

      const updatedLead = payload?.lead as Lead | undefined;
      if (!updatedLead) return;

      setLeads((prev) =>
        prev.map((lead) => (lead.id === leadId ? updatedLead : lead))
      );
      setStatusMessage(`Lead #${leadId} updated to "${status}".`);
    } catch {
      setErrorMessage("Network error while updating lead status.");
    } finally {
      setStatusSavingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-[oklch(0.10_0.02_260)] text-foreground">
      <section className="container py-8 md:py-10">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-white">Leads Admin</h1>
            <p className="text-sm text-foreground/60 mt-1">
              Minimal internal dashboard for reviewing and updating lead status.
            </p>
          </div>
          <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
              Back to site
            </Link>
          </Button>
        </div>

        <div className="rounded-xl border border-border bg-[oklch(0.14_0.02_260)] p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3 items-end">
            <div>
              <label className="text-sm text-foreground/70 block mb-1.5">
                Admin token (optional, required when LEADS_ADMIN_TOKEN is set)
              </label>
              <Input
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="Paste LEADS_ADMIN_TOKEN"
                className="bg-[oklch(0.15_0.02_260)] border-border"
              />
            </div>
            <Button onClick={applyToken} className="bg-brand-orange hover:bg-brand-orange-bright text-white">
              Save token
            </Button>
            <Button
              onClick={() => {
                void loadLeads();
              }}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
          <p className="text-xs text-foreground/50 mt-3">
            Security note: this page has no full auth system. Token gating is a minimal operational safeguard.
          </p>
        </div>

        {errorMessage && (
          <div className="rounded-lg border border-red-400/40 bg-red-500/10 text-red-200 text-sm px-4 py-3 mb-4">
            {errorMessage}
          </div>
        )}
        {statusMessage && (
          <div className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 text-emerald-200 text-sm px-4 py-3 mb-4">
            {statusMessage}
          </div>
        )}

        <div className="rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-sm">
              <thead className="bg-[oklch(0.14_0.02_260)] border-b border-border">
                <tr className="text-left text-foreground/70">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Business</th>
                  <th className="px-4 py-3 font-medium">Message</th>
                  <th className="px-4 py-3 font-medium">Source</th>
                  <th className="px-4 py-3 font-medium">Score</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 && !loading ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-foreground/50">
                      No leads found yet.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-border/80 align-top">
                      <td className="px-4 py-3">
                        <div className="font-medium text-white">{lead.name}</div>
                        <div className="text-xs text-foreground/50">#{lead.id}</div>
                      </td>
                      <td className="px-4 py-3">{lead.email}</td>
                      <td className="px-4 py-3">{lead.phone || "-"}</td>
                      <td className="px-4 py-3">{lead.business || "-"}</td>
                      <td className="px-4 py-3 max-w-[320px] text-foreground/80">
                        {messagePreview(lead.message)}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex rounded-full bg-white/5 border border-white/10 px-2 py-1 text-xs text-foreground/70">
                          {sourceBadgeLabel(lead.source)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex rounded-full bg-brand-orange/15 border border-brand-orange/25 px-2 py-1 text-xs text-brand-amber">
                          {lead.score}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={lead.status}
                          onChange={(e) => {
                            void handleStatusUpdate(lead.id, e.target.value as LeadStatus);
                          }}
                          disabled={statusSavingId === lead.id}
                          className="bg-[oklch(0.15_0.02_260)] border border-border rounded-md px-2 py-1 text-sm text-white"
                        >
                          {STATUS_OPTIONS.map((statusOption) => (
                            <option key={statusOption} value={statusOption}>
                              {statusOption}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-foreground/70">
                        <div>{formatDate(lead.createdAt)}</div>
                        <div className="text-xs text-foreground/50 mt-1">updated {formatDate(lead.updatedAt)}</div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
