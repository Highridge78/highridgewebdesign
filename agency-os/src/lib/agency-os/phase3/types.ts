export type PageIntent = "transactional" | "commercial" | "informational" | "navigational";
export type PlannedPageType = "service" | "location" | "landing" | "home" | "blog";
export type PlannedPageStatus = "planned" | "brief-ready" | "in-progress" | "published";
export type BriefType = "service-page" | "location-page" | "landing-page" | "home-page" | "blog-article";
export type ReportStatus = "draft" | "final";
export type ReportCategory =
  | "seo-performance"
  | "website-performance"
  | "lead-conversion-observations"
  | "content-progress"
  | "local-visibility-observations";
export type SopStatus = "draft" | "active" | "deprecated";
export type SopCategory =
  | "proposal-process"
  | "onboarding"
  | "content-collection"
  | "design-qa"
  | "development-qa"
  | "launch"
  | "reporting"
  | "local-seo-page-planning";

export type AiAction =
  | "extract-seo-opportunities"
  | "generate-brief-draft"
  | "summarize-report-notes"
  | "find-missing-info"
  | "draft-report-commentary"
  | "draft-sop-outline"
  | "detect-local-seo-risks"
  | "summarize-change-risk-notes";

export interface Base {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface SeoStrategy extends Base {
  projectId: string;
  clientName: string;
  owner: string;
  title: string;
  serviceFocus: string[];
  targetLocations: string[];
  schemaOpportunities: string[];
  internalLinkOpportunities: string[];
  faqTargets: string[];
  strategyBrief: string;
  status: "draft" | "active" | "complete";
}

export interface KeywordCluster extends Base {
  strategyId: string;
  clusterName: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  intent: PageIntent;
  priorityScore: number;
}

export interface PlannedPage extends Base {
  strategyId: string;
  projectId: string;
  pageType: PlannedPageType;
  title: string;
  targetAudience: string;
  intent: PageIntent;
  primaryKeyword: string;
  secondaryKeywords: string[];
  targetLocation?: string;
  ctaGoal: string;
  trustElementsNeeded: string[];
  notes: string;
  status: PlannedPageStatus;
  locationPriorityScore?: number;
  duplicationRiskWarning?: string;
  thinPageRiskWarning?: string;
  internalLinkRecommendation?: string;
}

export interface PageBrief extends Base {
  projectId: string;
  strategyId?: string;
  plannedPageId?: string;
  briefType: BriefType;
  title: string;
  pageObjective: string;
  audience: string;
  searchIntent: PageIntent;
  primaryKeyword: string;
  secondaryKeywords: string[];
  conversionGoal: string;
  cta: string;
  trustProofElements: string[];
  objectionsToAddress: string[];
  messagingAngle: string;
  sectionOutline: string[];
  faqTargets: string[];
  internalNotes: string;
  requiredAssets: string[];
  status: "draft" | "ready" | "approved";
}

export interface ContentBrief extends Base {
  pageBriefId: string;
  title: string;
  writerOwner: string;
  dueDate: string;
  status: "draft" | "in-review" | "final";
}

export interface Report extends Base {
  projectId: string;
  clientName: string;
  periodStart: string;
  periodEnd: string;
  kpiSummary: string;
  wins: string[];
  concerns: string[];
  recommendations: string[];
  nextMonthPriorities: string[];
  internalNotes: string;
  clientSafeSummary: string;
  status: ReportStatus;
}

export interface ReportSection extends Base {
  reportId: string;
  category: ReportCategory;
  summary: string;
  observations: string[];
}

export interface Sop extends Base {
  title: string;
  category: SopCategory;
  purpose: string;
  owner: string;
  status: SopStatus;
  linkedServiceType?: string;
  linkedPhase?: string;
  notes: string;
}

export interface SopStep extends Base {
  sopId: string;
  stepOrder: number;
  stepTitle: string;
  checklist: string[];
}

export interface AiGeneration extends Base {
  projectId?: string;
  action: AiAction;
  inputContext: string;
  outputDraft: string;
  outputStructured: Record<string, string | string[] | number>;
  humanReviewed: boolean;
  reviewer?: string;
}
