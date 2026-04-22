import { buildHealthReport } from "@/lib/agency-os/domain/health";
import {
  Approval,
  ApprovalEvent,
  Blocker,
  ChangeRequest,
  ClientPortalVisibilityRule,
  DeliveryItem,
  OnboardingItem,
  OnboardingWorkspace,
  Project,
  ProjectHealthReport,
  ProjectMilestone,
  ProjectUpdate,
} from "@/lib/agency-os/domain/types";
import { seed } from "@/lib/agency-os/seed/data";

export function getProjects(): Project[] {
  return seed.projects;
}

export function getProjectById(projectId: string): Project | undefined {
  return seed.projects.find((p) => p.id === projectId);
}

export function getProjectMilestones(projectId: string): ProjectMilestone[] {
  return seed.projectMilestones.filter((m) => m.projectId === projectId);
}

export function getProjectDeliveryItems(projectId: string): DeliveryItem[] {
  return seed.deliveryItems.filter((item) => item.projectId === projectId);
}

export function getProjectBlockers(projectId: string): Blocker[] {
  return seed.blockers.filter((b) => b.projectId === projectId);
}

export function getProjectApprovals(projectId: string): Approval[] {
  return seed.approvals.filter((a) => a.projectId === projectId);
}

export function getApprovalEventsByApprovalId(approvalId: string): ApprovalEvent[] {
  return seed.approvalEvents.filter((event) => event.approvalId === approvalId);
}

export function getProjectChangeRequests(projectId: string): ChangeRequest[] {
  return seed.changeRequests.filter((c) => c.projectId === projectId);
}

export function getProjectOnboardingWorkspace(projectId: string): OnboardingWorkspace | undefined {
  return seed.onboardingWorkspaces.find((workspace) => workspace.projectId === projectId);
}

export function getOnboardingItems(workspaceId: string): OnboardingItem[] {
  return seed.onboardingItems.filter((item) => item.workspaceId === workspaceId);
}

export function getProjectClientUpdates(projectId: string): ProjectUpdate[] {
  return seed.projectUpdates.filter(
    (update) => update.projectId === projectId && update.audience === "client",
  );
}

export function getProjectInternalUpdates(projectId: string): ProjectUpdate[] {
  return seed.projectUpdates.filter(
    (update) => update.projectId === projectId && update.audience === "internal",
  );
}

export function getProjectHealth(projectId: string): ProjectHealthReport | undefined {
  const project = getProjectById(projectId);
  if (!project) return undefined;

  return buildHealthReport(
    project,
    getProjectMilestones(projectId),
    getProjectBlockers(projectId),
    getProjectApprovals(projectId),
    getProjectDeliveryItems(projectId),
    getProjectChangeRequests(projectId),
  );
}

export function getDashboardOperationalFeed() {
  const reports = seed.projects
    .map((project) => getProjectHealth(project.id))
    .filter((report): report is ProjectHealthReport => Boolean(report));

  return {
    projectsAtRisk: reports.filter((report) => report.health !== "green"),
    overdueApprovals: seed.approvals.filter(
      (approval) => approval.status === "requested" && new Date(approval.dueDate).getTime() < Date.now(),
    ),
    onboardingBlockers: seed.onboardingItems.filter((item) => item.status === "blocked"),
    waitingOnClient: reports.filter((report) => report.waitingOnClientCount > 0),
    recentChangeRequests: seed.changeRequests
      .slice()
      .sort((a, b) => (a.dateSubmitted > b.dateSubmitted ? -1 : 1))
      .slice(0, 5),
    launchesApproaching: seed.projects.filter(
      (project) => new Date(project.targetLaunchDate).getTime() - Date.now() < 1000 * 60 * 60 * 24 * 21,
    ),
    overdueMilestones: seed.projectMilestones.filter(
      (milestone) => !milestone.completedAt && new Date(milestone.dueDate).getTime() < Date.now(),
    ),
  };
}

export function canClientSeeResource(
  projectId: string,
  resource: ClientPortalVisibilityRule["resource"],
): boolean {
  return seed.clientPortalVisibility.some(
    (rule) => rule.projectId === projectId && rule.resource === resource && rule.visible,
  );
}
