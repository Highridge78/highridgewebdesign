export type ProjectPhaseName =
  | "strategy"
  | "content"
  | "design"
  | "development"
  | "qa"
  | "launch"
  | "post-launch";

export type ProjectStatus = "active" | "paused" | "at-risk" | "completed";
export type ProjectHealth = "green" | "yellow" | "red";

export type ApprovalType =
  | "sitemap-approval"
  | "wireframe-approval"
  | "design-approval"
  | "content-approval"
  | "pre-launch-approval"
  | "launch-approval";

export type ApprovalStatus = "draft" | "requested" | "approved" | "rejected" | "expired";

export type ChangeRequestStatus =
  | "submitted"
  | "reviewing"
  | "approved"
  | "declined"
  | "merged-into-scope"
  | "deferred";

export type BlockerStatus = "open" | "resolved";
export type DependencyOwner = "client" | "internal";

export interface BaseRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project extends BaseRecord {
  title: string;
  clientName: string;
  contactName: string;
  linkedProposalId: string;
  linkedOnboardingWorkspaceId: string;
  currentPhase: ProjectPhaseName;
  status: ProjectStatus;
  owner: string;
  startDate: string;
  targetLaunchDate: string;
  targetPostLaunchDate?: string;
  internalNotes: string;
  clientSummary: string;
}

export interface ProjectPhase extends BaseRecord {
  projectId: string;
  phase: ProjectPhaseName;
  startedAt?: string;
  completedAt?: string;
}

export interface ProjectMilestone extends BaseRecord {
  projectId: string;
  title: string;
  dueDate: string;
  completedAt?: string;
  owner: string;
  clientVisible: boolean;
}

export interface DeliveryItem extends BaseRecord {
  projectId: string;
  phase: ProjectPhaseName;
  taskGroup: string;
  title: string;
  owner: string;
  status: "todo" | "in-progress" | "blocked" | "done";
  dependencyIds: string[];
  dependencyOwner?: DependencyOwner;
  clientVisible: boolean;
  internalNotes?: string;
}

export interface Blocker extends BaseRecord {
  projectId: string;
  title: string;
  description: string;
  status: BlockerStatus;
  owner: string;
  dependencyOwner: DependencyOwner;
  openedAt: string;
  resolvedAt?: string;
}

export interface Approval extends BaseRecord {
  projectId: string;
  title: string;
  type: ApprovalType;
  deliverableRef: string;
  requestedFrom: string;
  requestedDate?: string;
  dueDate: string;
  status: ApprovalStatus;
  internalNotes: string;
  clientMessage: string;
  approvedAt?: string;
  rejectedAt?: string;
  revisionReason?: string;
}

export interface ApprovalEvent extends BaseRecord {
  approvalId: string;
  eventType: "requested" | "approved" | "rejected" | "expired";
  actor: string;
  message: string;
}

export interface ChangeRequest extends BaseRecord {
  projectId: string;
  requestTitle: string;
  requestDescription: string;
  requestedBy: string;
  dateSubmitted: string;
  status: ChangeRequestStatus;
  impactSummary: string;
  timelineImpactDays: number;
  costImpact: string;
  internalAssessment: string;
  clientSummary: string;
  decisionResult?: string;
}

export interface OnboardingWorkspace extends BaseRecord {
  projectId: string;
  clientName: string;
  kickoffDate: string;
  kickoffReadiness: "ready" | "at-risk" | "blocked";
  internalNotes: string;
  nextStepsClient: string;
}

export type OnboardingCategory =
  | "assets"
  | "credentials"
  | "brand"
  | "content"
  | "approvals"
  | "technical-access"
  | "kickoff-prep";

export interface OnboardingItem extends BaseRecord {
  workspaceId: string;
  projectId: string;
  category: OnboardingCategory;
  title: string;
  description: string;
  status: "pending" | "submitted" | "approved" | "blocked";
  waitingOn: DependencyOwner;
  dueDate: string;
  clientVisible: boolean;
  internalNotes?: string;
}

export interface ProjectUpdate extends BaseRecord {
  projectId: string;
  summary: string;
  audience: "internal" | "client";
  createdBy: string;
}

export interface ClientPortalVisibilityRule extends BaseRecord {
  projectId: string;
  resource: "milestones" | "approvals" | "onboarding" | "files" | "updates";
  visible: boolean;
}

export interface ProjectHealthSignals {
  overdueMilestones: number;
  unresolvedBlockers: number;
  stalePendingApprovals: number;
  missingClientDependencies: number;
  openChangeRequests: number;
}

export interface ProjectHealthReport {
  projectId: string;
  health: ProjectHealth;
  blockersCount: number;
  approvalsPendingCount: number;
  waitingOnClientCount: number;
  openChangeRequestsCount: number;
  reasons: string[];
  signals: ProjectHealthSignals;
}
