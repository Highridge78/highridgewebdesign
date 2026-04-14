import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import type { LeadSearchRequest, LeadScoreRequest } from "@shared/leadEngine";
import {
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
      res.json(buildSearchResponse(source, searchInput, scoredLeads));
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
      res.json({ lead: scoredLead, summary: buildScoreSummary([scoredLead]) });
    } catch (error) {
      res.status(500).json({
        error: "Failed to score lead",
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
