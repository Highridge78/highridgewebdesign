import express from "express";
import type { Request } from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import {
  createLead,
  leadPayloadSchema,
  listLeads,
  leadStatusSchema,
  updateLeadStatus,
  updateLeadStatusSchema,
} from "./leads";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);
  const isProduction = process.env.NODE_ENV === "production";
  const adminToken = process.env.LEADS_ADMIN_TOKEN;

  app.use(express.json({ limit: "1mb" }));

  function isAdminAuthorized(req: express.Request): boolean {
    if (!adminToken) return true;
    const authHeader = req.header("authorization");
    if (!authHeader) return false;

    const expected = `Bearer ${adminToken}`;
    return authHeader.trim() === expected;
  }

  function unauthorizedResponse(res: express.Response) {
    return res.status(401).json({
      ok: false,
      error: "UNAUTHORIZED",
      message: "Admin token missing or invalid.",
    });
  }

  app.post("/api/leads", async (req, res) => {
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

  app.get("/api/leads", (req, res) => {
    if (!isAdminAuthorized(req)) {
      return unauthorizedResponse(res);
    }

    try {
      const leads = listLeads();
      return res.status(200).json({
        ok: true,
        leads,
      });
    } catch (error) {
      console.error("Failed to list leads", error);
      return res.status(500).json({
        ok: false,
        error: "INTERNAL_ERROR",
        message: "Unable to load leads.",
      });
    }
  });

  app.patch("/api/leads/:id", (req, res) => {
    if (!isAdminAuthorized(req)) {
      return unauthorizedResponse(res);
    }

    const id = Number.parseInt(req.params.id, 10);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        ok: false,
        error: "VALIDATION_ERROR",
        message: "Lead id must be a positive integer.",
      });
    }

    const parsed = updateLeadStatusSchema.safeParse(req.body);
    if (!parsed.success) {
      const issues = parsed.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return res.status(400).json({
        ok: false,
        error: "VALIDATION_ERROR",
        message: "Submitted status is invalid.",
        allowedStatusValues: leadStatusSchema.options,
        issues,
      });
    }

    try {
      const lead = updateLeadStatus(id, parsed.data.status);
      if (!lead) {
        return res.status(404).json({
          ok: false,
          error: "NOT_FOUND",
          message: "Lead not found.",
        });
      }

      return res.status(200).json({
        ok: true,
        lead,
      });
    } catch (error) {
      console.error("Failed to update lead status", error);
      return res.status(500).json({
        ok: false,
        error: "INTERNAL_ERROR",
        message: "Unable to update lead status.",
      });
    }
  });

  if (isProduction) {
    const staticPath = path.resolve(__dirname, "public");
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
