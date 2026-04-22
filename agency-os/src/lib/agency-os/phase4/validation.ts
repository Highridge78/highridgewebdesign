import { z } from "zod";

export const automationToggleSchema = z.object({
  enabled: z.boolean(),
  actor: z.string().min(2),
});

export const communicationSendSchema = z.object({
  messageId: z.string().min(1),
  projectId: z.string().min(1),
  type: z.enum([
    "report-delivery",
    "approval-request",
    "milestone-update",
    "onboarding-reminder",
    "follow-up",
  ]),
  subject: z.string().min(4).max(160),
  body: z.string().min(10).max(5000),
  actor: z.string().min(2),
});

export const integrationConfigSchema = z.object({
  provider: z.enum(["resend", "google-search-console", "google-analytics"]),
  enabled: z.boolean(),
  actor: z.string().min(2),
});
