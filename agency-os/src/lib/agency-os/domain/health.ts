import {
  Approval,
  Blocker,
  ChangeRequest,
  DeliveryItem,
  Project,
  ProjectHealthReport,
  ProjectMilestone,
} from "@/lib/agency-os/domain/types";

function isPast(dateIso: string): boolean {
  return new Date(dateIso).getTime() < Date.now();
}

export function buildHealthReport(
  project: Project,
  milestones: ProjectMilestone[],
  blockers: Blocker[],
  approvals: Approval[],
  deliveryItems: DeliveryItem[],
  changeRequests: ChangeRequest[],
): ProjectHealthReport {
  const overdueMilestones = milestones.filter((m) => !m.completedAt && isPast(m.dueDate)).length;
  const unresolvedBlockers = blockers.filter((b) => b.status === "open").length;
  const stalePendingApprovals = approvals.filter(
    (a) => a.status === "requested" && isPast(a.dueDate),
  ).length;
  const missingClientDependencies = deliveryItems.filter(
    (d) => d.status !== "done" && d.dependencyOwner === "client",
  ).length;
  const openChangeRequests = changeRequests.filter((c) =>
    ["submitted", "reviewing"].includes(c.status),
  ).length;

  const reasons: string[] = [];
  if (overdueMilestones > 0) reasons.push(`${overdueMilestones} overdue milestone(s)`);
  if (unresolvedBlockers > 0) reasons.push(`${unresolvedBlockers} unresolved blocker(s)`);
  if (stalePendingApprovals > 0) reasons.push(`${stalePendingApprovals} overdue approval(s)`);
  if (missingClientDependencies > 0) reasons.push(`${missingClientDependencies} waiting on client dependency(ies)`);
  if (openChangeRequests > 0) reasons.push(`${openChangeRequests} open change request(s)`);

  let health: ProjectHealthReport["health"] = "green";
  if (overdueMilestones + unresolvedBlockers + stalePendingApprovals >= 2) {
    health = "yellow";
  }
  if (overdueMilestones >= 2 || unresolvedBlockers >= 2 || stalePendingApprovals >= 2) {
    health = "red";
  }

  return {
    projectId: project.id,
    health,
    blockersCount: unresolvedBlockers,
    approvalsPendingCount: approvals.filter((a) => a.status === "requested").length,
    waitingOnClientCount: missingClientDependencies,
    openChangeRequestsCount: openChangeRequests,
    reasons,
    signals: {
      overdueMilestones,
      unresolvedBlockers,
      stalePendingApprovals,
      missingClientDependencies,
      openChangeRequests,
    },
  };
}
