import { z } from "zod";

export const approvalDecisionSchema = z.object({
  action: z.enum(["approve", "reject"]),
  actor: z.string().min(2),
  revisionReason: z.string().max(500).optional(),
});

export const changeRequestCreateSchema = z.object({
  projectId: z.string().min(1),
  requestTitle: z.string().min(4).max(160),
  requestDescription: z.string().min(10).max(2000),
  requestedBy: z.string().min(2).max(120),
  impactSummary: z.string().min(4).max(400),
  timelineImpactDays: z.number().int().min(0).max(90),
  costImpact: z.string().min(2).max(120),
  clientSummary: z.string().min(4).max(600),
});

export const onboardingCompleteSchema = z.object({
  actor: z.string().min(2),
  status: z.enum(["submitted", "approved"]),
  note: z.string().max(400).optional(),
});
