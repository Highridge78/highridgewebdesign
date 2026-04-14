import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { z } from "zod";

export const leadPayloadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120, "Name is too long"),
  email: z.string().trim().email("Email must be valid").max(255, "Email is too long"),
  phone: z.string().trim().max(40, "Phone is too long").optional().or(z.literal("")),
  business: z.string().trim().max(120, "Business is too long").optional().or(z.literal("")),
  botcheck: z.string().trim().max(255, "Botcheck value is too long").optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(5000, "Message is too long"),
});

export type LeadPayload = z.infer<typeof leadPayloadSchema>;

export const leadStatusSchema = z.enum(["new", "contacted", "qualified", "closed"]);
export type LeadStatus = z.infer<typeof leadStatusSchema>;

export const updateLeadStatusSchema = z.object({
  status: leadStatusSchema,
});

export type CreatedLead = {
  id: number;
  status: LeadStatus;
  score: number;
  createdAt: string;
  updatedAt: string;
};

export type LeadRow = {
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

const DATA_DIR = path.resolve(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "leads.sqlite");
const LEAD_EVENTS_LOG_PATH = path.join(DATA_DIR, "lead-events.log");

fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new DatabaseSync(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    business TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new',
    score INTEGER NOT NULL DEFAULT 0,
    source TEXT NOT NULL DEFAULT 'website',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )
`);

// Lightweight migration for repos that already created leads table without new fields.
const columns = db.prepare("PRAGMA table_info(leads)").all() as Array<{ name: string }>;
const columnNames = new Set(columns.map((col) => col.name));
if (!columnNames.has("status")) {
  db.exec("ALTER TABLE leads ADD COLUMN status TEXT NOT NULL DEFAULT 'new'");
}
if (!columnNames.has("score")) {
  db.exec("ALTER TABLE leads ADD COLUMN score INTEGER NOT NULL DEFAULT 0");
}
if (!columnNames.has("source")) {
  db.exec("ALTER TABLE leads ADD COLUMN source TEXT NOT NULL DEFAULT 'website'");
}
if (!columnNames.has("updated_at")) {
  db.exec("ALTER TABLE leads ADD COLUMN updated_at TEXT");
  db.exec("UPDATE leads SET updated_at = created_at WHERE updated_at IS NULL OR trim(updated_at) = ''");
}

db.exec("UPDATE leads SET source = 'website' WHERE source IS NULL OR source = '' OR source = 'website-contact-form'");
db.exec("UPDATE leads SET status = 'new' WHERE status IS NULL OR status = ''");
db.exec("UPDATE leads SET updated_at = created_at WHERE updated_at IS NULL OR trim(updated_at) = ''");

const insertLeadStatement = db.prepare(`
  INSERT INTO leads (name, email, phone, business, message, status, score, source, created_at, updated_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const listLeadsStatement = db.prepare(`
  SELECT
    id,
    name,
    email,
    phone,
    business,
    message,
    status,
    score,
    source,
    created_at as createdAt,
    updated_at as updatedAt
  FROM leads
  ORDER BY datetime(created_at) DESC, id DESC
`);

const updateLeadStatusStatement = db.prepare(`
  UPDATE leads
  SET status = ?, updated_at = ?
  WHERE id = ?
`);

const getLeadByIdStatement = db.prepare(`
  SELECT
    id,
    name,
    email,
    phone,
    business,
    message,
    status,
    score,
    source,
    created_at as createdAt,
    updated_at as updatedAt
  FROM leads
  WHERE id = ?
`);

const recalculateScoreStatement = db.prepare(`
  UPDATE leads
  SET score =
    (CASE WHEN business IS NOT NULL AND trim(business) <> '' THEN 2 ELSE 0 END) +
    (CASE WHEN phone IS NOT NULL AND trim(phone) <> '' THEN 1 ELSE 0 END) +
    (CASE WHEN length(trim(message)) > 80 THEN 1 ELSE 0 END) +
    (CASE
      WHEN lower(substr(email, instr(email, '@') + 1)) IN (
        'gmail.com','yahoo.com','hotmail.com','outlook.com','icloud.com','aol.com','proton.me','protonmail.com','live.com'
      ) THEN 0
      ELSE 1
    END)
  WHERE score IS NULL OR score = 0
`);

function normalizeOptionalText(value?: string): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function getLeadScore(payload: LeadPayload): number {
  let score = 0;

  if (normalizeOptionalText(payload.business)) {
    score += 2;
  }
  if (normalizeOptionalText(payload.phone)) {
    score += 1;
  }
  if (payload.message.trim().length > 80) {
    score += 1;
  }

  const genericEmailDomains = new Set([
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "icloud.com",
    "aol.com",
    "proton.me",
    "protonmail.com",
    "live.com",
  ]);

  const domain = payload.email.trim().toLowerCase().split("@")[1] ?? "";
  if (domain && !genericEmailDomains.has(domain)) {
    score += 1;
  }

  return score;
}

async function logLeadEvent(event: {
  type: "lead.created" | "lead.status_updated";
  lead: Record<string, unknown>;
}) {
  const eventLine = JSON.stringify({
    type: event.type,
    occurredAt: new Date().toISOString(),
    lead: event.lead,
  });
  await fs.promises.appendFile(LEAD_EVENTS_LOG_PATH, `${eventLine}\n`, "utf-8");
}

recalculateScoreStatement.run();

export async function createLead(payload: LeadPayload): Promise<CreatedLead> {
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const status: LeadStatus = "new";
  const score = getLeadScore(payload);
  const result = insertLeadStatement.run(
    payload.name.trim(),
    payload.email.trim().toLowerCase(),
    normalizeOptionalText(payload.phone),
    normalizeOptionalText(payload.business),
    payload.message.trim(),
    status,
    score,
    "website",
    createdAt,
    updatedAt
  );

  const createdLead = {
    id: Number(result.lastInsertRowid),
    status,
    score,
    createdAt,
    updatedAt,
  };

  try {
    await logLeadEvent({
      type: "lead.created",
      lead: {
        id: createdLead.id,
        name: payload.name.trim(),
        email: payload.email.trim().toLowerCase(),
        status,
        score,
        createdAt,
        updatedAt,
      },
    });
  } catch (error) {
    console.error("Failed to write lead automation log event", error);
  }

  return createdLead;
}

export function listLeads(): LeadRow[] {
  return listLeadsStatement.all() as LeadRow[];
}

export function updateLeadStatus(id: number, status: LeadStatus): LeadRow | null {
  const updatedAt = new Date().toISOString();
  const result = updateLeadStatusStatement.run(status, updatedAt, id);
  if (result.changes === 0) {
    return null;
  }

  const row = getLeadByIdStatement.get(id) as LeadRow | undefined;
  if (!row) {
    return null;
  }

  void logLeadEvent({
    type: "lead.status_updated",
    lead: {
      id: row.id,
      status: row.status,
      updatedAt: row.updatedAt,
    },
  }).catch((error) => {
    console.error("Failed to write lead status automation log event", error);
  });

  return row;
}
