import { getProjectHealth, getProjects } from "@/lib/agency-os/domain/selectors";
import { phase4Seed } from "@/lib/agency-os/phase4/seed";
import { AutomationRule, ClientHealth, DealValue } from "@/lib/agency-os/phase4/types";

export function getAutomationRules() {
  return phase4Seed.automationRules;
}

export function getAutomationRuleById(id: string) {
  return phase4Seed.automationRules.find((rule) => rule.id === id);
}

export function getAutomationLogs(automationId?: string) {
  if (!automationId) return phase4Seed.automationLogs;
  return phase4Seed.automationLogs.filter((log) => log.automationId === automationId);
}

function checkTriggerMatch(rule: AutomationRule): { matched: boolean; reason: string } {
  if (rule.trigger === "approval-overdue") {
    const matched = phase4Seed.automationLogs.some((log) => log.trigger === "approval-overdue" && log.matched);
    return { matched, reason: matched ? "Detected overdue approval signal" : "No overdue approvals detected" };
  }

  if (rule.trigger === "onboarding-incomplete") {
    const matched = phase4Seed.automationLogs.some((log) => log.trigger === "onboarding-incomplete" && log.matched);
    return { matched, reason: matched ? "Detected stalled onboarding signal" : "No stalled onboarding signal" };
  }

  if (rule.trigger === "proposal-no-response") {
    return { matched: true, reason: "Proposal response threshold reached in demo data" };
  }

  return { matched: false, reason: "No matching trigger in demo runtime" };
}

export function evaluateAutomations() {
  return phase4Seed.automationRules.map((rule) => {
    const { matched, reason } = checkTriggerMatch(rule);
    return {
      rule,
      matched,
      reason,
      wouldRun: matched && rule.status === "enabled",
    };
  });
}

export function getDealValues(): DealValue[] {
  return phase4Seed.dealValues;
}

export function getRevenueSnapshot() {
  const deals = getDealValues();
  const byStage = deals.reduce<Record<string, number>>((acc, deal) => {
    acc[deal.stage] = (acc[deal.stage] ?? 0) + deal.dealValue;
    return acc;
  }, {});

  const total = deals.reduce((sum, d) => sum + d.dealValue, 0);
  const weighted = deals.reduce((sum, d) => sum + d.expectedRevenue, 0);
  const mrr = deals
    .filter((d) => d.isRetainer)
    .reduce((sum, d) => sum + (d.monthlyRecurringValue ?? 0), 0);

  return {
    byStage,
    total,
    weighted,
    mrr,
    upcoming30Days: phase4Seed.pipelineSnapshots[0]?.projectedNext30Days ?? 0,
  };
}

export function getClientsHealthView() {
  return phase4Seed.clientHealth.map((health) => ({
    health,
    retentionSignals: phase4Seed.retentionSignals.filter((signal) => signal.projectId === health.projectId),
    expansionOpportunities: phase4Seed.expansionOpportunities.filter(
      (item) => item.projectId === health.projectId,
    ),
  }));
}

export function getClientHealthByProject(projectId: string): ClientHealth | undefined {
  return phase4Seed.clientHealth.find((entry) => entry.projectId === projectId);
}

export function getCommunications() {
  return phase4Seed.communicationMessages;
}

export function getIntegrationConfigs() {
  return phase4Seed.integrationsConfig;
}

export function getOperationalInsights() {
  const projectHealth = getProjects().map((project) => getProjectHealth(project.id)).filter(Boolean);
  const atRiskProjects = projectHealth.filter((report) => report?.health !== "green").length;

  return {
    metrics: phase4Seed.derivedMetrics,
    bottlenecks: [
      "Approvals are the most frequent delivery delay trigger",
      "Onboarding technical access requests have the highest wait time",
      "Scope creep appears most in design and local-page expansion",
    ],
    atRiskProjects,
  };
}

export function getAuditLogs() {
  return phase4Seed.auditLogs;
}
