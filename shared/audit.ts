import { z } from "zod";

export const auditRequestSchema = z.object({
  url: z.string().trim().min(1, "URL is required").max(2048, "URL is too long"),
});

export type AuditRequest = z.infer<typeof auditRequestSchema>;

export type FindingCategory = "conversion" | "seo" | "trust" | "technical";
export type FindingSeverity = "critical" | "high" | "medium" | "low";

export interface AuditFinding {
  category: FindingCategory;
  severity: FindingSeverity;
  title: string;
  evidence: string;
  whyItMatters: string;
  recommendedFix: string;
}

export interface SeoSignals {
  title: string | null;
  titleLength: number;
  metaDescription: string | null;
  metaDescriptionLength: number;
  h1: string | null;
  h2Count: number;
  hasCanonical: boolean;
  canonicalUrl: string;
  hasOgTitle: boolean;
  hasOgDescription: boolean;
  hasOgImage: boolean;
  hasSchema: boolean;
  schemaTypes: string[];
  imagesTotal: number;
  imagesMissingAlt: number;
  hasRobotsNoindex: boolean;
}

export interface ConversionSignals {
  hasPhoneNumber: boolean;
  phoneNumbers: string[];
  hasClickToCall: boolean;
  hasCta: boolean;
  ctaKeywords: string[];
  hasContactForm: boolean;
  formCount: number;
  hasEmailLink: boolean;
  chatWidgetDetected: boolean;
}

export interface TrustSignals {
  hasTestimonials: boolean;
  hasReviews: boolean;
  reviewPlatforms: string[];
  hasBbbBadge: boolean;
  hasLicensed: boolean;
  hasInsured: boolean;
  hasWarranty: boolean;
  hasPrivacyPolicy: boolean;
  hasAboutSection: boolean;
  hasYearsInBusiness: boolean;
  yearsInBusiness: number | null;
}

export interface LocalSignals {
  hasLocalSchema: boolean;
  localSchemaTypes: string[];
  cityInTitle: boolean;
  cityInMeta: boolean;
  cityStateMentions: string[];
  hasAddress: boolean;
  addressText: string;
  hasMapEmbed: boolean;
  hasServiceArea: boolean;
  serviceKeywords: string[];
}

export interface TechnicalSignals {
  hasViewport: boolean;
  htmlSizeKb: number;
  scriptCount: number;
  imageCount: number;
  isHttps: boolean;
  responseTimeMs: number;
}

export interface AuditSignals {
  url: string;
  fetchedAt: string;
  isLikelyJsRendered: boolean;
  seo: SeoSignals;
  conversion: ConversionSignals;
  trust: TrustSignals;
  local: LocalSignals;
  technical: TechnicalSignals;
}

export interface AuditScores {
  conversionScore: number;
  localVisibilityScore: number;
  trustScore: number;
  technicalScore: number;
  revenueOpportunity: number;
  confidence: "high" | "low";
}

export interface AuditResult {
  url: string;
  signals: AuditSignals;
  scores: AuditScores;
  findings: AuditFinding[];
  summary: string;
}
