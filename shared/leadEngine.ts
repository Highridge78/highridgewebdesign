export interface LeadSearchInput {
  city: string;
  state: string;
  radiusMiles: number;
  businessType: string;
  limit?: number;
}

export type LeadSource = "google-places" | "mock";

export interface LeadBusiness {
  id: string;
  name: string;
  businessType: string;
  city: string;
  state: string;
  address?: string;
  phone?: string;
  website?: string;
  email?: string;
  source: LeadSource;
}

export interface LeadSearchResponse {
  provider: string;
  leads: LeadBusiness[];
}

export interface WebsiteAnalysis {
  fetchSucceeded: boolean;
  statusCode?: number;
  finalUrl?: string;
  loadMs?: number;
  hasHttps: boolean;
  hasViewport: boolean;
  viewportResponsive: boolean;
  hasMain: boolean;
  hasH1: boolean;
  hasMetaDescription: boolean;
  detectedEmails: string[];
  notes: string[];
}

export interface LeadOutreach {
  subject: string;
  emailMessage: string;
  smsMessage: string;
  auditSummary: string[];
}

export interface ScoredLead extends LeadBusiness {
  websiteScore: number;
  scoreBand: "poor" | "needs-work" | "strong";
  analysis: WebsiteAnalysis;
}

export interface ScoredLeadWithOutreach extends ScoredLead {
  outreach: LeadOutreach;
}

export interface LeadScoreResponse {
  leads: ScoredLead[];
  summary: {
    total: number;
    poor: number;
    needsWork: number;
    strong: number;
    averageScore: number;
  };
}

export interface LeadSearchRequest {
  city: string;
  state: string;
  radiusMiles: number;
  businessType: string;
  maxResults?: number;
}

export interface LeadScoreRequest {
  lead: LeadBusiness;
}

export type LeadSortKey = "score" | "name" | "city" | "businessType";
export type SortDirection = "asc" | "desc";

export interface LeadScoreBreakdown {
  factor: "website" | "load" | "mobile" | "https" | "structure";
  value: number;
}

export interface LeadEngineSearchResponse {
  usedProvider: LeadSource;
  query: LeadSearchInput;
  leads: ScoredLeadWithOutreach[];
}

const GOOGLE_PLACES_SEARCH_URL =
  "https://maps.googleapis.com/maps/api/place/textsearch/json";
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

export function hasPlacesApiKey() {
  return Boolean(process.env.GOOGLE_PLACES_API_KEY);
}

export function buildSearchInput(payload: Partial<LeadSearchRequest>): LeadSearchInput {
  const city = payload.city?.trim();
  const state = payload.state?.trim();
  const businessType = payload.businessType?.trim();

  if (!city || !state || !businessType) {
    throw new Error("city, state, and businessType are required");
  }

  const radiusMiles = Number.isFinite(payload.radiusMiles)
    ? Number(payload.radiusMiles)
    : 15;
  const limit = Number.isFinite(payload.maxResults)
    ? Number(payload.maxResults)
    : DEFAULT_LIMIT;

  return {
    city,
    state,
    businessType,
    radiusMiles: Math.min(Math.max(radiusMiles, 1), 100),
    limit: Math.min(Math.max(limit, 5), MAX_LIMIT),
  };
}

function sanitizeWebsite(url: string | undefined): string | undefined {
  if (!url) return undefined;
  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    return parsed.toString();
  } catch {
    return undefined;
  }
}

function extractEmails(html: string): string[] {
  const matches = html.match(
    /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi
  );
  if (!matches) return [];
  return Array.from(new Set(matches)).slice(0, 3);
}

function toScoreBand(score: number): ScoredLead["scoreBand"] {
  if (score <= 3) return "poor";
  if (score <= 6) return "needs-work";
  return "strong";
}

function buildBreakdown(lead: LeadBusiness, analysis: WebsiteAnalysis): LeadScoreBreakdown[] {
  if (!lead.website) {
    return [
      { factor: "website", value: 0 },
      { factor: "load", value: 0 },
      { factor: "mobile", value: 0 },
      { factor: "https", value: 0 },
      { factor: "structure", value: 0 },
    ];
  }

  const loadValue =
    analysis.loadMs == null ? 1 : analysis.loadMs <= 1500 ? 2 : analysis.loadMs <= 3500 ? 1 : 0;
  const mobileValue = analysis.viewportResponsive ? 2 : analysis.hasViewport ? 1 : 0;
  const httpsValue = analysis.hasHttps ? 2 : 0;
  const structureSignals =
    Number(analysis.hasMain) + Number(analysis.hasH1) + Number(analysis.hasMetaDescription);
  const structureValue = structureSignals >= 3 ? 2 : structureSignals >= 1 ? 1 : 0;

  return [
    { factor: "website", value: 2 },
    { factor: "load", value: loadValue },
    { factor: "mobile", value: mobileValue },
    { factor: "https", value: httpsValue },
    { factor: "structure", value: structureValue },
  ];
}

async function analyzeWebsite(url: string): Promise<WebsiteAnalysis> {
  const sanitized = sanitizeWebsite(url);
  if (!sanitized) {
    return {
      fetchSucceeded: false,
      hasHttps: false,
      hasViewport: false,
      viewportResponsive: false,
      hasMain: false,
      hasH1: false,
      hasMetaDescription: false,
      detectedEmails: [],
      notes: ["Website URL is invalid"],
    };
  }

  const start = performance.now();
  try {
    const response = await fetch(sanitized, {
      method: "GET",
      redirect: "follow",
      headers: {
        "User-Agent": "HighRidgeLeadEngine/1.0 (+https://highridgewebdesign.com)",
      },
    });
    const html = await response.text();
    const loadMs = Math.round(performance.now() - start);
    const lower = html.toLowerCase();
    const hasViewport = /<meta[^>]+name=["']viewport["']/i.test(html);
    const viewportResponsive = /width\s*=\s*device-width/i.test(html);
    const hasMain = /<main[\s>]/i.test(html);
    const hasH1 = /<h1[\s>]/i.test(html);
    const hasMetaDescription = /<meta[^>]+name=["']description["'][^>]*content=/i.test(html);
    const emails = extractEmails(html);
    const finalUrl = response.url || sanitized;
    const notes: string[] = [];

    if (loadMs > 3500) notes.push("Slow initial response");
    if (!viewportResponsive) notes.push("Weak mobile viewport setup");
    if (!hasMain || !hasH1) notes.push("Missing semantic structure");
    if (!hasMetaDescription) notes.push("Missing meta description");

    return {
      fetchSucceeded: response.ok,
      statusCode: response.status,
      finalUrl,
      loadMs,
      hasHttps: finalUrl.startsWith("https://"),
      hasViewport,
      viewportResponsive,
      hasMain,
      hasH1,
      hasMetaDescription,
      detectedEmails: emails,
      notes,
    };
  } catch {
    return {
      fetchSucceeded: false,
      hasHttps: sanitized.startsWith("https://"),
      hasViewport: false,
      viewportResponsive: false,
      hasMain: false,
      hasH1: false,
      hasMetaDescription: false,
      detectedEmails: [],
      notes: ["Website could not be fetched"],
    };
  }
}

export async function scoreLead(lead: LeadBusiness): Promise<ScoredLead> {
  if (!lead.website) {
    const missingWebsiteScore = lead.phone ? 2 : 1;
    return {
      ...lead,
      websiteScore: missingWebsiteScore,
      scoreBand: toScoreBand(missingWebsiteScore),
      analysis: {
        fetchSucceeded: false,
        hasHttps: false,
        hasViewport: false,
        viewportResponsive: false,
        hasMain: false,
        hasH1: false,
        hasMetaDescription: false,
        detectedEmails: [],
        notes: ["No website found"],
      },
    };
  }

  const analysis = await analyzeWebsite(lead.website);
  const breakdown = buildBreakdown(lead, analysis);
  const rawScore = breakdown.reduce((sum, item) => sum + item.value, 0);
  const websiteScore = Math.min(Math.max(rawScore, 0), 10);
  const normalizedWebsite = sanitizeWebsite(lead.website);
  const finalEmail = lead.email ?? analysis.detectedEmails[0];

  return {
    ...lead,
    website: normalizedWebsite ?? lead.website,
    email: finalEmail,
    websiteScore,
    scoreBand: toScoreBand(websiteScore),
    analysis,
  };
}

export function getMockLeads(input: LeadSearchInput): LeadBusiness[] {
  const templates = [
    {
      name: `${input.city} ${input.businessType} Pros`,
      website: undefined,
      phone: "(828) 555-0101",
      email: undefined,
    },
    {
      name: `Blue Ridge ${input.businessType}`,
      website: "http://example.com",
      phone: "(828) 555-0198",
      email: "info@example.com",
    },
    {
      name: `Summit ${input.businessType} Group`,
      website: "https://www.example.org",
      phone: "(828) 555-0124",
      email: undefined,
    },
    {
      name: `Mountain View ${input.businessType}`,
      website: "https://highridgewebdesign.com",
      phone: "(828) 555-0159",
      email: undefined,
    },
  ];

  const leads = templates.map((template, idx) => ({
    id: `mock-${idx + 1}-${input.city.toLowerCase()}-${input.businessType.toLowerCase().replace(/\s+/g, "-")}`,
    name: template.name,
    businessType: input.businessType,
    city: input.city,
    state: input.state,
    phone: template.phone,
    website: template.website,
    email: template.email,
    source: "mock" as const,
  }));

  return leads.slice(0, input.limit ?? DEFAULT_LIMIT);
}

function mapPlacesResultToLead(
  input: LeadSearchInput,
  item: Record<string, any>,
  idx: number
): LeadBusiness {
  const name = typeof item.name === "string" ? item.name : `Place ${idx + 1}`;
  const website = sanitizeWebsite(item.website as string | undefined);
  return {
    id: `google-${item.place_id ?? idx}`,
    name,
    businessType: input.businessType,
    city: input.city,
    state: input.state,
    address: typeof item.formatted_address === "string" ? item.formatted_address : undefined,
    phone: typeof item.formatted_phone_number === "string" ? item.formatted_phone_number : undefined,
    website,
    source: "google-places",
  };
}

export async function searchLeadsWithPlaces(input: LeadSearchInput): Promise<LeadBusiness[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return getMockLeads(input);
  }

  const query = encodeURIComponent(`${input.businessType} in ${input.city}, ${input.state}`);
  const url = `${GOOGLE_PLACES_SEARCH_URL}?query=${query}&key=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Google Places search failed (${response.status})`);
  }

  const payload = (await response.json()) as {
    results?: Record<string, any>[];
  };
  const results = payload.results ?? [];

  if (results.length === 0) {
    return [];
  }

  return results
    .slice(0, input.limit ?? DEFAULT_LIMIT)
    .map((item, idx) => mapPlacesResultToLead(input, item, idx));
}

export function buildScoreSummary(leads: ScoredLead[]): LeadScoreResponse["summary"] {
  const total = leads.length;
  const poor = leads.filter((lead) => lead.scoreBand === "poor").length;
  const needsWork = leads.filter((lead) => lead.scoreBand === "needs-work").length;
  const strong = leads.filter((lead) => lead.scoreBand === "strong").length;
  const averageScore =
    total === 0
      ? 0
      : Number(
          (
            leads.reduce((sum, lead) => sum + lead.websiteScore, 0) / total
          ).toFixed(1)
        );

  return {
    total,
    poor,
    needsWork,
    strong,
    averageScore,
  };
}

export function buildSearchResponse(
  usedProvider: LeadSource,
  query: LeadSearchInput,
  leads: ScoredLead[]
): LeadEngineSearchResponse {
  return {
    usedProvider,
    query,
    leads: leads.map(addOutreachToScoredLead),
  };
}

function issuePointsFromLead(lead: ScoredLead): string[] {
  if (!lead.website) {
    return [
      "No website detected",
      "Missing a 24/7 online lead capture channel",
      "Losing customers to competitors with better digital presence",
    ];
  }

  const points: string[] = [];
  if (lead.analysis.loadMs != null && lead.analysis.loadMs > 3500) {
    points.push("Page appears to load slowly");
  }
  if (!lead.analysis.viewportResponsive) {
    points.push("Weak mobile experience");
  }
  if (!lead.analysis.hasMetaDescription) {
    points.push("Weak search snippet setup");
  }
  if (!lead.analysis.hasH1 || !lead.analysis.hasMain) {
    points.push("Basic structure and trust signals can be improved");
  }
  if (!lead.analysis.hasHttps) {
    points.push("Site security/HTTPS trust could be stronger");
  }
  if (points.length === 0) {
    points.push("Site can likely convert more visitors into calls");
  }
  return points.slice(0, 4);
}

function summarizeLeadProblem(lead: ScoredLead): string {
  if (!lead.website) {
    return "you currently don't have a strong website presence";
  }
  if (lead.websiteScore <= 3) {
    return "your current site likely has major gaps that are costing calls";
  }
  if (lead.websiteScore <= 6) {
    return "your site has solid basics but still leaves easy wins on the table";
  }
  return "your site is decent, but there are clear opportunities to boost conversion";
}

export function generateOutreach(lead: ScoredLead): LeadOutreach {
  const issuePoints = issuePointsFromLead(lead);
  const primaryIssue = issuePoints[0].toLowerCase();
  const subject = `Quick fix for ${lead.name} website`;
  const summary = summarizeLeadProblem(lead);

  const emailMessage = [
    `Hey ${lead.name} team,`,
    `I took a quick look at your website and noticed ${summary}.`,
    `The biggest issue I spotted was ${primaryIssue}, which can reduce calls and booked jobs from local search traffic.`,
    `We help local businesses improve site speed, trust, and conversion flow so more visitors turn into paying customers.`,
    `Want me to show you what I'd fix?`,
  ].join(" ");

  const smsMessage =
    lead.websiteScore <= 6
      ? `Hey, I took a quick look at ${lead.name}'s website — a few things are likely costing you customers. Want me to show you what I'd fix?`
      : `Hey, quick note on ${lead.name}'s site — it's solid, and I can still show a few easy wins to increase calls. Want me to send them over?`;

  return {
    subject,
    emailMessage,
    smsMessage,
    auditSummary: issuePoints,
  };
}

export function attachOutreachToLead(lead: ScoredLead): ScoredLeadWithOutreach {
  return {
    ...lead,
    outreach: generateOutreach(lead),
  };
}

export function addOutreachToScoredLead(lead: ScoredLead): ScoredLeadWithOutreach {
  return {
    ...lead,
    outreach: generateOutreach(lead),
  };
}
