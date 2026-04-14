import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import type { LeadSearchRequest, LeadScoreRequest } from "@shared/leadEngine";
import {
  attachOutreachToLead,
  buildSearchInput,
  buildSearchResponse,
  buildScoreSummary,
  getMockLeads,
  hasPlacesApiKey,
  scoreLead,
  searchLeadsWithPlaces,
} from "@shared/leadEngine";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface SendEmailRequest {
  to: string;
  subject: string;
  body: string;
}

interface SendSmsRequest {
  to: string;
  message: string;
}

async function sendEmailViaResend(payload: SendEmailRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY missing");
  }

  const from = process.env.OUTREACH_FROM_EMAIL ?? "High Ridge <outreach@highridgewebdesign.com>";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [payload.to],
      subject: payload.subject,
      text: payload.body,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend send failed (${response.status})`);
  }

  const data = (await response.json()) as { id?: string };
  return { provider: "resend", id: data.id };
}

async function sendEmailViaSendgrid(payload: SendEmailRequest) {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    throw new Error("SENDGRID_API_KEY missing");
  }

  const from = process.env.OUTREACH_FROM_EMAIL ?? "outreach@highridgewebdesign.com";
  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: payload.to }] }],
      from: { email: from },
      subject: payload.subject,
      content: [{ type: "text/plain", value: payload.body }],
    }),
  });

  if (!response.ok) {
    throw new Error(`SendGrid send failed (${response.status})`);
  }

  return { provider: "sendgrid" };
}

async function sendEmail(payload: SendEmailRequest) {
  try {
    if (process.env.RESEND_API_KEY) {
      return await sendEmailViaResend(payload);
    }
    if (process.env.SENDGRID_API_KEY) {
      return await sendEmailViaSendgrid(payload);
    }
  } catch (error) {
    if (process.env.SENDGRID_API_KEY && !process.env.RESEND_API_KEY) {
      throw error;
    }
    if (process.env.SENDGRID_API_KEY) {
      return sendEmailViaSendgrid(payload);
    }
    throw error;
  }

  console.log("[mock send][email]", payload);
  return { provider: "mock" as const };
}

async function sendSms(payload: SendSmsRequest) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    console.log("[mock send][sms]", payload);
    return { provider: "mock" as const };
  }

  const body = new URLSearchParams();
  body.set("To", payload.to);
  body.set("From", fromNumber);
  body.set("Body", payload.message);

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    }
  );

  if (!response.ok) {
    throw new Error(`Twilio send failed (${response.status})`);
  }

  const data = (await response.json()) as { sid?: string };
  return { provider: "twilio" as const, id: data.sid };
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  app.use(express.json({ limit: "1mb" }));

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  app.post("/api/leads/search", async (req, res) => {
    try {
      const payload = req.body as Partial<LeadSearchRequest>;
      const searchInput = buildSearchInput(payload);
      const source = hasPlacesApiKey() ? "google-places" : "mock";

      const businesses =
        source === "google-places"
          ? await searchLeadsWithPlaces(searchInput)
          : getMockLeads(searchInput);
      const scoredLeads = await Promise.all(businesses.map((lead) => scoreLead(lead)));
      const leadsWithOutreach = scoredLeads.map((lead) => attachOutreachToLead(lead));
      res.json(buildSearchResponse(source, searchInput, leadsWithOutreach));
    } catch (error) {
      res.status(500).json({
        error: "Failed to search leads",
        detail: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  app.post("/api/leads/score", async (req, res) => {
    try {
      const payload = req.body as Partial<LeadScoreRequest>;
      if (!payload.lead || typeof payload.lead.name !== "string") {
        return res.status(400).json({ error: "lead payload is required" });
      }

      const scoredLead = await scoreLead(payload.lead);
      const leadWithOutreach = attachOutreachToLead(scoredLead);
      res.json({ lead: leadWithOutreach, summary: buildScoreSummary([leadWithOutreach]) });
    } catch (error) {
      res.status(500).json({
        error: "Failed to score lead",
        detail: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  app.post("/api/outreach/send-email", async (req, res) => {
    try {
      const payload = req.body as Partial<SendEmailRequest>;
      if (!payload.to || !payload.subject || !payload.body) {
        return res
          .status(400)
          .json({ error: "to, subject, and body are required" });
      }

      const result = await sendEmail({
        to: payload.to,
        subject: payload.subject,
        body: payload.body,
      });

      console.log("[outreach email sent]", {
        to: payload.to,
        provider: result.provider,
      });

      res.json({
        success: true,
        provider: result.provider,
        sentAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("[outreach email failed]", error);
      res.status(500).json({
        success: false,
        error: "Failed to send email outreach",
        detail: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  app.post("/api/outreach/send-sms", async (req, res) => {
    try {
      const payload = req.body as Partial<SendSmsRequest>;
      if (!payload.to || !payload.message) {
        return res.status(400).json({ error: "to and message are required" });
      }

      const result = await sendSms({
        to: payload.to,
        message: payload.message,
      });

      console.log("[outreach sms sent]", {
        to: payload.to,
        provider: result.provider,
      });

      res.json({
        success: true,
        provider: result.provider,
        sentAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("[outreach sms failed]", error);
      res.status(500).json({
        success: false,
        error: "Failed to send SMS outreach",
        detail: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
