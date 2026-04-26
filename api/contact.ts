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

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  business: string;
  website: string;
  message: string;
  botcheck: string;
};

type ValidationIssue = {
  field: keyof ContactPayload;
  message: string;
};

function sendJson(res: ApiResponse, status: number, body: unknown) {
  res.status(status).json(body);
}

function readStringField(body: Record<string, unknown>, field: keyof ContactPayload) {
  const value = body[field];
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function parseContactPayload(body: unknown):
  | { success: true; payload: ContactPayload }
  | { success: false; issues: ValidationIssue[] } {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return {
      success: false,
      issues: [{ field: "message", message: "Please check the highlighted fields and try again." }],
    };
  }

  const source = body as Record<string, unknown>;
  const payload: ContactPayload = {
    name: readStringField(source, "name"),
    email: readStringField(source, "email"),
    phone: readStringField(source, "phone"),
    business: readStringField(source, "business"),
    website: readStringField(source, "website"),
    message: readStringField(source, "message"),
    botcheck: readStringField(source, "botcheck"),
  };
  const issues: ValidationIssue[] = [];

  if (payload.name.length < 2) {
    issues.push({ field: "name", message: "Name is required" });
  }
  if (payload.name.length > 120) {
    issues.push({ field: "name", message: "Name is too long" });
  }
  if (payload.email.length > 255) {
    issues.push({ field: "email", message: "Email is too long" });
  }
  if (payload.email && !isValidEmail(payload.email)) {
    issues.push({ field: "email", message: "Email must be valid" });
  }
  if (payload.phone.length > 40) {
    issues.push({ field: "phone", message: "Phone is too long" });
  }
  if (!payload.email && !payload.phone) {
    issues.push(
      { field: "email", message: "Email or phone is required" },
      { field: "phone", message: "Email or phone is required" },
    );
  }
  if (payload.business.length > 120) {
    issues.push({ field: "business", message: "Business is too long" });
  }
  if (payload.website.length > 255) {
    issues.push({ field: "website", message: "Website is too long" });
  }
  if (payload.message.length < 10) {
    issues.push({ field: "message", message: "Project details must be at least 10 characters" });
  }
  if (payload.message.length > 5000) {
    issues.push({ field: "message", message: "Project details are too long" });
  }
  if (payload.botcheck.length > 255) {
    issues.push({ field: "botcheck", message: "Botcheck value is too long" });
  }

  if (issues.length > 0) {
    return { success: false, issues };
  }

  return { success: true, payload };
}

function formatLeadEmail(payload: ContactPayload) {
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

async function sendWithResend(payload: ContactPayload) {
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

  const parsed = parseContactPayload(req.body);

  if (!parsed.success) {
    return sendJson(res, 400, {
      ok: false,
      error: "VALIDATION_ERROR",
      message: "Please check the highlighted fields and try again.",
      issues: parsed.issues,
    });
  }

  const { payload } = parsed;

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
