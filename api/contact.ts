import { contactPayloadSchema, normalizeContactPayload } from "../shared/contact";

const CONTACT_EMAIL = "jeremy@highridgewebdesign.com";

type ApiRequest = {
  method?: string;
  body: unknown;
};

type ApiResponse = {
  setHeader: (name: string, value: string) => void;
  status: (statusCode: number) => {
    json: (body: unknown) => void;
  };
};

function sendJson(res: ApiResponse, status: number, body: unknown) {
  res.status(status).json(body);
}

function formatLeadEmail(payload: ReturnType<typeof normalizeContactPayload>) {
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

async function sendWithResend(payload: ReturnType<typeof normalizeContactPayload>) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || CONTACT_EMAIL;

  if (!apiKey || !from) {
    return {
      ok: false,
      status: 503,
      error: "FORM_DELIVERY_NOT_CONFIGURED",
      message:
        "Direct form delivery is not configured yet. Please email or call High Ridge directly.",
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
    return {
      ok: false,
      status: 502,
      error: "FORM_DELIVERY_FAILED",
      message:
        "The form could not send right now. Please email or call High Ridge directly.",
    };
  }

  return { ok: true, status: 200 };
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, {
      ok: false,
      error: "METHOD_NOT_ALLOWED",
      message: "Only POST requests are supported.",
    });
  }

  const parsed = contactPayloadSchema.safeParse(req.body);

  if (!parsed.success) {
    return sendJson(res, 400, {
      ok: false,
      error: "VALIDATION_ERROR",
      message: "Please check the highlighted fields and try again.",
      issues: parsed.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  const payload = normalizeContactPayload(parsed.data);

  if (payload.botcheck) {
    return sendJson(res, 202, { ok: true, accepted: true });
  }

  try {
    const result = await sendWithResend(payload);

    if (!result.ok) {
      return sendJson(res, result.status, {
        ok: false,
        error: result.error,
        message: result.message,
      });
    }

    return sendJson(res, 200, {
      ok: true,
      message: "Your request was sent.",
    });
  } catch (error) {
    console.error("Contact form failed", error);
    return sendJson(res, 500, {
      ok: false,
      error: "INTERNAL_ERROR",
      message:
        "The form could not send right now. Please email or call High Ridge directly.",
    });
  }
}
