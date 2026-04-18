import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { z } from "zod";

export const leadPayloadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is required")
    .max(120, "Name is too long"),
  email: z
    .string()
    .trim()
    .email("Email must be valid")
    .max(255, "Email is too long"),
  phone: z
    .string()
    .trim()
    .max(40, "Phone is too long")
    .optional()
    .or(z.literal("")),
  business: z
    .string()
    .trim()
    .max(120, "Business is too long")
    .optional()
    .or(z.literal("")),
  botcheck: z
    .string()
    .trim()
    .max(255, "Botcheck value is too long")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long"),
});

export type LeadPayload = z.infer<typeof leadPayloadSchema>;

export type CreatedLead = {
  id: number;
  createdAt: string;
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
    source TEXT NOT NULL DEFAULT 'website-contact-form',
    created_at TEXT NOT NULL
  )
`);

const insertLeadStatement = db.prepare(`
  INSERT INTO leads (name, email, phone, business, message, source, created_at)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

function normalizeOptionalText(value?: string): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

async function logLeadCreatedEvent(lead: {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}) {
  const eventLine = JSON.stringify({
    type: "lead.created",
    occurredAt: new Date().toISOString(),
    lead,
  });
  await fs.promises.appendFile(LEAD_EVENTS_LOG_PATH, `${eventLine}\n`, "utf-8");
}

export async function createLead(payload: LeadPayload): Promise<CreatedLead> {
  const createdAt = new Date().toISOString();
  const result = insertLeadStatement.run(
    payload.name.trim(),
    payload.email.trim().toLowerCase(),
    normalizeOptionalText(payload.phone),
    normalizeOptionalText(payload.business),
    payload.message.trim(),
    "website-contact-form",
    createdAt
  );

  const createdLead = {
    id: Number(result.lastInsertRowid),
    createdAt,
  };

  try {
    await logLeadCreatedEvent({
      id: createdLead.id,
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      createdAt,
    });
  } catch (error) {
    console.error("Failed to write lead automation log event", error);
  }

  return createdLead;
}
