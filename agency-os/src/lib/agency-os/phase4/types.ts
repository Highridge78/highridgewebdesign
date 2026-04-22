export type AutomationTrigger =
  | "lead-created"
  | "proposal-sent"
  | "proposal-no-response"
  | "onboarding-incomplete"
  | "approval-overdue"
  | "project-blocked"
  | "report-published"
  | "project-nearing-deadline";

export type AutomationActionType =
  | "send-email"
  | "create-task"
  | "flag-project"
  | "update-status"
  | "create-notification"
  | "generate-follow-up-draft"
  | "assign-owner";

export type AutomationStatus = "enabled" | "disabled";
export type AutomationRunStatus = "matched" | "skipped" | "error";

export type PipelineStage = "draft" | "sent" | "negotiating" | "won" | "lost";

export type ClientHealthLevel = "green" | "yellow" | "red";
export type RetentionSignalType =
  | "delayed-approvals"
  | "stalled-onboarding"
  | "slow-responsiveness"
  | "repeated-change-requests"
  | "missed-milestones"
  | "limited-measurable-progress";

export type MessageType =
  | "report-delivery"
  | "approval-request"
  | "milestone-update"
  | "onboarding-reminder"
  | "follow-up";

export type MessageStatus = "draft" | "sent" | "failed";

export type IntegrationProvider = "resend" | "google-search-console" | "google-analytics";

export type UserRole = "admin" | "ops" | "account-manager" | "client";

export interface Base {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface AutomationRule extends Base {
  name: string;
  trigger: AutomationTrigger;
  conditionSummary: string;
  actions: AutomationActionType[];
  owner: string;
  status: AutomationStatus;
}

export interface AutomationLog extends Base {
  automationId: string;
  trigger: AutomationTrigger;
  projectId?: string;
  matched: boolean;
  result: AutomationRunStatus;
  details: string;
  executedActions: AutomationActionType[];
}

export interface DealValue extends Base {
  projectId: string;
  clientName: string;
  serviceType: string;
  stage: PipelineStage;
  dealValue: number;
  probabilityPct: number;
  expectedRevenue: number;
  isRetainer: boolean;
  monthlyRecurringValue?: number;
}

export interface PipelineSnapshot extends Base {
  totalPipelineValue: number;
  weightedPipelineValue: number;
  wonValue: number;
  lostValue: number;
  projectedNext30Days: number;
}

export interface RetentionSignal extends Base {
  projectId: string;
  signalType: RetentionSignalType;
  severity: 1 | 2 | 3;
  note: string;
}

export interface ClientHealth extends Base {
  projectId: string;
  clientName: string;
  score: number;
  level: ClientHealthLevel;
  riskFlags: string[];
  engagementSignals: string[];
}

export interface ExpansionOpportunity extends Base {
  projectId: string;
  clientName: string;
  serviceSuggestion: string;
  rationale: string;
  confidence: "low" | "medium" | "high";
  nextOpportunityNote: string;
}

export interface CommunicationMessage extends Base {
  type: MessageType;
  projectId: string;
  clientName: string;
  subject: string;
  bodyDraft: string;
  editableBody: string;
  status: MessageStatus;
  sentAt?: string;
  generatedByAi: boolean;
}

export interface IntegrationConfig extends Base {
  provider: IntegrationProvider;
  enabled: boolean;
  status: "connected" | "not-configured" | "error";
  notes: string;
}

export interface DerivedMetric extends Base {
  metricKey: string;
  metricLabel: string;
  value: number;
  unit: "count" | "usd" | "days" | "percent";
  interpretation: string;
}

export interface AuditLog extends Base {
  actor: string;
  role: UserRole;
  action: string;
  entityType: string;
  entityId: string;
  summary: string;
}
