import { phase3Seed } from "@/lib/agency-os/phase3/seed";
import {
  ContentBrief,
  PageBrief,
  PlannedPage,
  Report,
  SeoStrategy,
  Sop,
} from "@/lib/agency-os/phase3/types";

export function getSeoStrategies(): SeoStrategy[] {
  return phase3Seed.seoStrategies;
}

export function getSeoStrategyById(id: string): SeoStrategy | undefined {
  return phase3Seed.seoStrategies.find((s) => s.id === id);
}

export function getKeywordClustersByStrategy(strategyId: string) {
  return phase3Seed.keywordClusters.filter((cluster) => cluster.strategyId === strategyId);
}

export function getPlannedPagesByStrategy(strategyId: string): PlannedPage[] {
  return phase3Seed.plannedPages.filter((page) => page.strategyId === strategyId);
}

export function getPageBriefs(): PageBrief[] {
  return phase3Seed.pageBriefs;
}

export function getPageBriefById(id: string): PageBrief | undefined {
  return phase3Seed.pageBriefs.find((brief) => brief.id === id);
}

export function getContentBriefByPageBrief(pageBriefId: string): ContentBrief | undefined {
  return phase3Seed.contentBriefs.find((brief) => brief.pageBriefId === pageBriefId);
}

export function getReports(): Report[] {
  return phase3Seed.reports;
}

export function getReportById(id: string): Report | undefined {
  return phase3Seed.reports.find((report) => report.id === id);
}

export function getReportSections(reportId: string) {
  return phase3Seed.reportSections.filter((section) => section.reportId === reportId);
}

export function getSops(query?: string): Sop[] {
  if (!query) return phase3Seed.sops;
  const value = query.toLowerCase();
  return phase3Seed.sops.filter((sop) =>
    [sop.title, sop.category, sop.purpose, sop.owner].join(" ").toLowerCase().includes(value),
  );
}

export function getSopById(id: string): Sop | undefined {
  return phase3Seed.sops.find((sop) => sop.id === id);
}

export function getSopSteps(sopId: string) {
  return phase3Seed.sopSteps
    .filter((step) => step.sopId === sopId)
    .sort((a, b) => a.stepOrder - b.stepOrder);
}

export function getAiGenerations() {
  return phase3Seed.aiGenerations;
}
