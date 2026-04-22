import { z } from "zod";

export const seoStrategyCreateSchema = z.object({
  projectId: z.string().min(1),
  title: z.string().min(4).max(160),
  owner: z.string().min(2).max(120),
  serviceFocus: z.array(z.string().min(2)).min(1),
  targetLocations: z.array(z.string().min(2)).min(1),
  strategyBrief: z.string().min(20).max(3000),
});

export const pageBriefCreateSchema = z.object({
  projectId: z.string().min(1),
  briefType: z.enum(["service-page", "location-page", "landing-page", "home-page", "blog-article"]),
  title: z.string().min(4).max(180),
  pageObjective: z.string().min(10).max(800),
  audience: z.string().min(2).max(200),
  searchIntent: z.enum(["transactional", "commercial", "informational", "navigational"]),
  primaryKeyword: z.string().min(2).max(160),
  secondaryKeywords: z.array(z.string().min(2)).min(1),
  conversionGoal: z.string().min(4).max(250),
  cta: z.string().min(2).max(250),
});

export const reportCreateSchema = z.object({
  projectId: z.string().min(1),
  periodStart: z.string().min(10),
  periodEnd: z.string().min(10),
  kpiSummary: z.string().min(10).max(1000),
  wins: z.array(z.string().min(4)).min(1),
  concerns: z.array(z.string().min(4)).min(1),
  recommendations: z.array(z.string().min(4)).min(1),
  nextMonthPriorities: z.array(z.string().min(4)).min(1),
});

export const sopCreateSchema = z.object({
  title: z.string().min(4).max(180),
  category: z.enum([
    "proposal-process",
    "onboarding",
    "content-collection",
    "design-qa",
    "development-qa",
    "launch",
    "reporting",
    "local-seo-page-planning",
  ]),
  purpose: z.string().min(10).max(1200),
  owner: z.string().min(2).max(120),
  notes: z.string().max(1000).optional(),
});

export const aiGenerateSchema = z.object({
  action: z.enum([
    "extract-seo-opportunities",
    "generate-brief-draft",
    "summarize-report-notes",
    "find-missing-info",
    "draft-report-commentary",
    "draft-sop-outline",
    "detect-local-seo-risks",
    "summarize-change-risk-notes",
  ]),
  inputContext: z.string().min(10).max(5000),
  projectId: z.string().optional(),
});
