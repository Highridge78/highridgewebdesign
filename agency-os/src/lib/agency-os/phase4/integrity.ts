import { seed } from "@/lib/agency-os/seed/data";
import { phase4Seed } from "@/lib/agency-os/phase4/seed";

export function runIntegrityChecks(): string[] {
  const issues: string[] = [];
  const projectIds = new Set(seed.projects.map((project) => project.id));

  for (const deal of phase4Seed.dealValues) {
    if (!projectIds.has(deal.projectId)) {
      issues.push(`Deal ${deal.id} references missing project ${deal.projectId}`);
    }
  }

  for (const message of phase4Seed.communicationMessages) {
    if (!projectIds.has(message.projectId)) {
      issues.push(`Message ${message.id} references missing project ${message.projectId}`);
    }
  }

  for (const signal of phase4Seed.retentionSignals) {
    if (!projectIds.has(signal.projectId)) {
      issues.push(`Retention signal ${signal.id} references missing project ${signal.projectId}`);
    }
  }

  return issues;
}
