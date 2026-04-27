import { NextRequest, NextResponse } from "next/server";
import { contactPayloadSchema, normalizeContactPayload } from "@/shared/contact";

const CONTACT_EMAIL = "jeremy@highridgewebdesign.com";
const CONTACT_PHONE = "828-598-9262";
const DEFAULT_FROM_EMAIL = `High Ridge Web Design <${CONTACT_EMAIL}>`;

function fallbackMessage() {
  return `The form could not send right now. Please call or text ${CONTACT_PHONE}, or email ${CONTACT_EMAIL}.`;
}

type NormalizedContactPayload = ReturnType<typeof normalizeContactPayload>;

function formatLeadEmail(payload: NormalizedContactPayload) {
  return [
    "New High Ridge website audit request",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email || "Not provided"}`,
    `Phone: ${payload.phone || "Not provided"}`,
    `Business: ${payload.business || "Not provided"}`,
    `Website: ${payload.website || "Not provided"}`,
    "",
    "Project details:",
    payload.message,
  ].join("\n");
}

function logLead(payload: NormalizedContactPayload) {
  console.info(
    "High Ridge contact lead captured",
    JSON.stringify({
      capturedAt: new Date().toISOString(),
      name: payload.name,
      email: payload.email || null,
      phone: payload.phone || null,
      business: payload.business || null,
      website: payload.website || null,
      message: payload.message,
    }),
  );
}

function isValidResendSender(value: string) {
  return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value) ||
    /^.+\s<[^@\s<>]+@[^@\s<>]+\.[^@\s<>]+>$/.test(value);
}

function resolveFromEmail() {
  const candidates = [
    process.env.RESEND_FROM_EMAIL,
    process.env.CONTACT_FROM_EMAIL,
    DEFAULT_FROM_EMAIL,
  ].filter(Boolean) as string[];

  const from = candidates.find((value) => isValidResendSender(value.trim()))?.trim();

  if (!from) return "";

  if (from !== process.env.RESEND_FROM_EMAIL?.trim()) {
    console.warn("Using fallback contact form sender because RESEND_FROM_EMAIL is invalid", {
      hasResendFromEmail: Boolean(process.env.RESEND_FROM_EMAIL),
      hasLegacyContactFromEmail: Boolean(process.env.CONTACT_FROM_EMAIL),
    });
  }

  return from;
}

async function sendWithResend(payload: NormalizedContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = resolveFromEmail();
  const to = process.env.CONTACT_TO_EMAIL || CONTACT_EMAIL;

  if (!apiKey || !from) {
    console.error("Contact form delivery is not configured", {
      hasResendApiKey: Boolean(apiKey),
      hasResendFromEmail: Boolean(process.env.RESEND_FROM_EMAIL),
      hasLegacyContactFromEmail: Boolean(process.env.CONTACT_FROM_EMAIL),
      to,
    });

    return {
      ok: false,
      status: 503,
      error: "FORM_DELIVERY_NOT_CONFIGURED",
      message: fallbackMessage(),
    };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: payload.email || undefined,
      subject: `Website audit request from ${payload.name}`,
      text: formatLeadEmail(payload),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    console.error("Resend contact delivery failed", {
      status: response.status,
      statusText: response.statusText,
      response: errorText.slice(0, 500),
      to,
    });

    return {
      ok: false,
      status: 502,
      error: "FORM_DELIVERY_FAILED",
      message: fallbackMessage(),
    };
  }

  return { ok: true, status: 200 };
}

async function enqueueMailerLiteSync(_payload: NormalizedContactPayload) {
  // Future MailerLite integration boundary. Launch remains email-first.
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = contactPayloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "VALIDATION_ERROR",
        message: "Please check the highlighted fields and try again.",
        issues: parsed.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    );
  }

  const payload = normalizeContactPayload(parsed.data);

  if (payload.botcheck) {
    return NextResponse.json({ ok: true, accepted: true }, { status: 202 });
  }

  try {
    logLead(payload);
    await enqueueMailerLiteSync(payload);
    const result = await sendWithResend(payload);

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error, message: result.message },
        { status: result.status },
      );
    }

    return NextResponse.json({ ok: true, message: "Your request was sent." });
  } catch (error) {
    console.error("Contact form failed", error);
    return NextResponse.json(
      { ok: false, error: "INTERNAL_ERROR", message: fallbackMessage() },
      { status: 500 },
    );
  }
}
