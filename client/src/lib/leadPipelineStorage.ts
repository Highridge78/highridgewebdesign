import {
  LEAD_PIPELINE_STATUSES,
  createPersistedLeadFromScoredLead,
  type LeadOutreach,
  type LeadOutreachMessageEntry,
  type LeadPipelineStatus,
  type PersistedLead,
  type ScoredLeadWithOutreach,
} from "@shared/leadEngine";

const LEAD_PIPELINE_STORAGE_KEY = "lead.pipeline.v1";

function isPipelineStatus(value: unknown): value is LeadPipelineStatus {
  return (
    typeof value === "string" &&
    LEAD_PIPELINE_STATUSES.includes(value as LeadPipelineStatus)
  );
}

function fallbackOutreach(name: string): LeadOutreach {
  return {
    subject: `Quick website note for ${name}`,
    emailMessage: `Hey ${name} team, I noticed a few website improvements that could help you generate more calls. Want me to send them over?`,
    smsMessage: `Hey, I noticed a few quick wins on ${name}'s website that could help increase calls. Want me to send them over?`,
    auditSummary: ["Basic website opportunities identified."],
  };
}

function normalizeHistory(value: unknown): LeadOutreachMessageEntry[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((entry, idx): LeadOutreachMessageEntry | null => {
      if (!entry || typeof entry !== "object") return null;
      const candidate = entry as Partial<LeadOutreachMessageEntry>;
      if (typeof candidate.body !== "string" || candidate.body.trim().length === 0) {
        return null;
      }

      const createdAt =
        typeof candidate.createdAt === "string"
          ? candidate.createdAt
          : new Date().toISOString();

      return {
        id: typeof candidate.id === "string" ? candidate.id : `history-${idx}-${createdAt}`,
        type:
          candidate.type === "email" || candidate.type === "sms" || candidate.type === "follow-up"
            ? candidate.type
            : "follow-up",
        ...(typeof candidate.subject === "string" ? { subject: candidate.subject } : {}),
        body: candidate.body,
        createdAt,
      };
    })
    .filter((entry): entry is LeadOutreachMessageEntry => entry !== null);
}

function deriveScoreBand(score: number): PersistedLead["scoreBand"] {
  if (score <= 3) return "poor";
  if (score <= 6) return "needs-work";
  return "strong";
}

function normalizePersistedLead(value: unknown): PersistedLead | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Record<string, unknown>;

  const id = typeof candidate.id === "string" ? candidate.id : undefined;
  const businessName =
    typeof candidate.businessName === "string"
      ? candidate.businessName
      : typeof candidate.name === "string"
        ? candidate.name
        : undefined;

  if (!id || !businessName) {
    return null;
  }

  const now = new Date().toISOString();
  const scoreValue =
    typeof candidate.score === "number"
      ? candidate.score
      : typeof candidate.websiteScore === "number"
        ? candidate.websiteScore
        : 0;
  const normalizedScore = Math.min(Math.max(Math.round(scoreValue), 0), 10);
  const scoreBand =
    candidate.scoreBand === "poor" ||
    candidate.scoreBand === "needs-work" ||
    candidate.scoreBand === "strong"
      ? candidate.scoreBand
      : deriveScoreBand(normalizedScore);

  const rawTimestamps =
    candidate.timestamps && typeof candidate.timestamps === "object"
      ? (candidate.timestamps as Record<string, unknown>)
      : {};
  const contactInfo =
    candidate.contactInfo && typeof candidate.contactInfo === "object"
      ? (candidate.contactInfo as Record<string, unknown>)
      : {};
  const outreachMessages =
    candidate.outreachMessages && typeof candidate.outreachMessages === "object"
      ? (candidate.outreachMessages as Record<string, unknown>)
      : {};
  const initialOutreach =
    outreachMessages.initial && typeof outreachMessages.initial === "object"
      ? (outreachMessages.initial as LeadOutreach)
      : candidate.outreach && typeof candidate.outreach === "object"
        ? (candidate.outreach as LeadOutreach)
        : fallbackOutreach(businessName);

  const lastContactedAt =
    typeof rawTimestamps.lastContactedAt === "string"
      ? rawTimestamps.lastContactedAt
      : typeof candidate.lastContactedAt === "string"
        ? candidate.lastContactedAt
        : undefined;

  const normalizedHistory = normalizeHistory(outreachMessages.history);

  return {
    id,
    businessName,
    businessType:
      typeof candidate.businessType === "string" ? candidate.businessType : "local business",
    source: candidate.source === "google-places" ? "google-places" : "mock",
    contactInfo: {
      phone:
        typeof contactInfo.phone === "string"
          ? contactInfo.phone
          : typeof candidate.phone === "string"
            ? candidate.phone
            : undefined,
      email:
        typeof contactInfo.email === "string"
          ? contactInfo.email
          : typeof candidate.email === "string"
            ? candidate.email
            : undefined,
      website:
        typeof contactInfo.website === "string"
          ? contactInfo.website
          : typeof candidate.website === "string"
            ? candidate.website
            : undefined,
      address:
        typeof contactInfo.address === "string"
          ? contactInfo.address
          : typeof candidate.address === "string"
            ? candidate.address
            : undefined,
      city:
        typeof contactInfo.city === "string"
          ? contactInfo.city
          : typeof candidate.city === "string"
            ? candidate.city
            : undefined,
      state:
        typeof contactInfo.state === "string"
          ? contactInfo.state
          : typeof candidate.state === "string"
            ? candidate.state
            : undefined,
    },
    score: normalizedScore,
    scoreBand,
    outreachMessages: {
      initial: initialOutreach,
      history: normalizedHistory,
    },
    status: isPipelineStatus(candidate.status) ? candidate.status : "new",
    createdAt:
      typeof rawTimestamps.createdAt === "string"
        ? rawTimestamps.createdAt
        : typeof candidate.createdAt === "string"
          ? candidate.createdAt
          : now,
    updatedAt:
      typeof rawTimestamps.updatedAt === "string"
        ? rawTimestamps.updatedAt
        : typeof candidate.updatedAt === "string"
          ? candidate.updatedAt
          : now,
    lastContactedAt,
    followUpCount:
      typeof candidate.followUpCount === "number"
        ? candidate.followUpCount
        : normalizedHistory.filter((item) => item.type === "follow-up").length,
  };
}

export function loadLeads(): PersistedLead[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(LEAD_PIPELINE_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => normalizePersistedLead(item))
      .filter((item): item is PersistedLead => item !== null);
  } catch {
    return [];
  }
}

export function persistLeads(leads: PersistedLead[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(LEAD_PIPELINE_STORAGE_KEY, JSON.stringify(leads));
}

export const saveLeads = persistLeads;

function withUpdatedAt(lead: PersistedLead, updatedAt: string): PersistedLead {
  return {
    ...lead,
    updatedAt,
  };
}

export function mergeScoredLeadsIntoPersisted(
  current: PersistedLead[],
  scoredLeads: ScoredLeadWithOutreach[]
): PersistedLead[] {
  const existingById = new Map(current.map((lead) => [lead.id, lead]));
  const merged = [...current];

  for (const scoredLead of scoredLeads) {
    const existing = existingById.get(scoredLead.id);
    const nextLead = createPersistedLeadFromScoredLead(scoredLead, existing);
    if (existing) {
      const index = merged.findIndex((lead) => lead.id === scoredLead.id);
      if (index >= 0) {
        merged[index] = nextLead;
      }
    } else {
      merged.push(nextLead);
    }
  }

  return merged;
}

export const upsertLeadsFromSearch = mergeScoredLeadsIntoPersisted;

export function updateLeadStatus(
  leads: PersistedLead[],
  leadId: string,
  status: LeadPipelineStatus
): PersistedLead[] {
  const now = new Date().toISOString();
  return leads.map((lead) =>
    lead.id === leadId
      ? withUpdatedAt(
          {
            ...lead,
            status,
          },
          now
        )
      : lead
  );
}

export function updateLeadStatusById(
  leads: PersistedLead[],
  leadId: string,
  status: LeadPipelineStatus
) {
  return updateLeadStatus(leads, leadId, status);
}

export function addLeadOutreachHistoryEntry(
  leads: PersistedLead[],
  leadId: string,
  entry: Omit<LeadOutreachMessageEntry, "id" | "createdAt">
): PersistedLead[] {
  const now = new Date().toISOString();
  return leads.map((lead) =>
    lead.id === leadId
      ? withUpdatedAt(
          {
            ...lead,
            outreachMessages: {
              ...lead.outreachMessages,
              history: [
                ...lead.outreachMessages.history,
                {
                  id: `${leadId}-${entry.type}-${Date.now()}`,
                  createdAt: now,
                  ...entry,
                },
              ],
            },
            followUpCount:
              entry.type === "follow-up" ? lead.followUpCount + 1 : lead.followUpCount,
          },
          now
        )
      : lead
  );
}

export function addOutreachHistory(
  leads: PersistedLead[],
  leadId: string,
  entry: Omit<LeadOutreachMessageEntry, "id" | "createdAt">
) {
  return addLeadOutreachHistoryEntry(leads, leadId, entry);
}

export function markLeadAsContacted(
  leads: PersistedLead[],
  leadId: string,
  contactedAt = new Date().toISOString(),
  nextStatus: LeadPipelineStatus = "contacted"
): PersistedLead[] {
  return leads.map((lead) =>
    lead.id === leadId
      ? withUpdatedAt(
          {
            ...lead,
            status: nextStatus,
            lastContactedAt: contactedAt,
          },
          contactedAt
        )
      : lead
  );
}

export function markContacted(
  leads: PersistedLead[],
  leadId: string,
  contactedAt = new Date().toISOString(),
  nextStatus: LeadPipelineStatus = "contacted"
) {
  return markLeadAsContacted(leads, leadId, contactedAt, nextStatus);
}

export function getLeadMapById(leads: PersistedLead[]) {
  return new Map(leads.map((lead) => [lead.id, lead]));
}

export const loadPersistedLeads = loadLeads;
