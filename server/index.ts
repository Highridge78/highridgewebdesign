import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { contactPayloadSchema, normalizeContactPayload } from "../shared/contact";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);
  const isProduction = process.env.NODE_ENV === "production";

  app.disable("x-powered-by");
  app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Resource-Policy", "same-site");
    if (isProduction) {
      res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
      res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests"
      );
    }
    next();
  });

  app.use(express.json({ limit: "1mb" }));

  app.post("/api/contact", async (req, res) => {
    const parsed = contactPayloadSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
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
      return res.status(202).json({
        ok: true,
        accepted: true,
      });
    }

    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL) {
      return res.status(503).json({
        ok: false,
        error: "FORM_DELIVERY_NOT_CONFIGURED",
        message:
          "Direct form delivery is not configured yet. Please email or call High Ridge directly.",
      });
    }

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL,
          to: process.env.CONTACT_TO_EMAIL || "jeremy@highridgewebdesign.com",
          reply_to: payload.email || undefined,
          subject: `Website audit request from ${payload.name}`,
          text: [
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
          ].join("\n"),
        }),
      });

      if (!response.ok) {
        return res.status(502).json({
          ok: false,
          error: "FORM_DELIVERY_FAILED",
          message:
            "The form could not send right now. Please email or call High Ridge directly.",
        });
      }

      return res.status(200).json({
        ok: true,
        message: "Your request was sent.",
      });
    } catch (error) {
      console.error("Contact form failed", error);
      return res.status(500).json({
        ok: false,
        error: "INTERNAL_ERROR",
        message:
          "The form could not send right now. Please email or call High Ridge directly.",
      });
    }
  });

  app.post("/api/leads", async (req, res) => {
    const { createLead, leadPayloadSchema } = await import("./leads");
    const parsed = leadPayloadSchema.safeParse(req.body);

    if (!parsed.success) {
      const issues = parsed.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return res.status(400).json({
        ok: false,
        error: "VALIDATION_ERROR",
        message: "Submitted lead data is invalid.",
        issues,
      });
    }

    if (parsed.data.botcheck && parsed.data.botcheck.trim().length > 0) {
      return res.status(202).json({
        ok: true,
        accepted: true,
      });
    }

    try {
      const lead = await createLead(parsed.data);
      return res.status(201).json({
        ok: true,
        lead,
      });
    } catch (error) {
      console.error("Failed to create lead", error);
      return res.status(500).json({
        ok: false,
        error: "INTERNAL_ERROR",
        message: "Unable to process lead submission.",
      });
    }
  });

  if (isProduction) {
    const staticPath = path.resolve(__dirname, "public");
    app.get("/robots.txt", (_req, res) => {
      res.type("text/plain");
      res.sendFile(path.join(staticPath, "robots.txt"));
    });
    app.get("/sitemap.xml", (_req, res) => {
      res.type("application/xml");
      res.sendFile(path.join(staticPath, "sitemap.xml"));
    });
    app.use(express.static(staticPath));

    app.get("*", (_req, res) => {
      res.sendFile(path.join(staticPath, "index.html"));
    });
  } else {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      configFile: path.resolve(__dirname, "..", "vite.config.ts"),
      server: { middlewareMode: true },
      appType: "spa",
    });

    app.use(vite.middlewares);
  }

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
