import { AiAction } from "@/lib/agency-os/phase3/types";

export function runAiAssist(action: AiAction, inputContext: string) {
  const normalized = inputContext.trim();

  if (action === "extract-seo-opportunities") {
    return {
      draft: "AI draft: prioritize high-intent service pages, map internal links from location pages, and expand FAQ clusters.",
      structured: {
        priorityOpportunities: [
          "Service page refresh for conversion terms",
          "Location page expansion for top revenue cities",
          "FAQ blocks around pricing and timeline objections",
        ],
        warning: "Validate keyword cannibalization before publishing location variants.",
      },
    };
  }

  if (action === "generate-brief-draft") {
    return {
      draft:
        "AI draft brief: Objective is to convert commercial search traffic into consultations with trust-forward proof and a single CTA path.",
      structured: {
        outline: ["Hero promise", "Problem framing", "Solution sections", "Proof", "FAQ", "CTA"],
        missingInfo: ["Specific offer", "Primary objection handling", "Asset list"],
      },
    };
  }

  if (action === "summarize-report-notes") {
    return {
      draft: "AI report summary: momentum is positive, but local ranking consistency and lead qualification need attention.",
      structured: {
        wins: ["Improved conversion path clarity", "Higher local profile activity"],
        concerns: ["Ranking volatility in secondary markets"],
      },
    };
  }

  if (action === "find-missing-info") {
    return {
      draft: "AI gap check: audience specificity, concrete conversion target, and required proof assets are incomplete.",
      structured: {
        missingFields: ["Target persona detail", "Quantified conversion goal", "Trust asset inventory"],
      },
    };
  }

  if (action === "draft-report-commentary") {
    return {
      draft: "AI commentary draft: we improved qualified traffic and site engagement, and next month will focus on local intent coverage and lead capture consistency.",
      structured: {
        suggestedSections: ["What changed", "Why it matters", "What we will do next"],
      },
    };
  }

  if (action === "draft-sop-outline") {
    return {
      draft: "AI SOP draft: define trigger, owner handoff, QA checklist, escalation path, and completion criteria.",
      structured: {
        steps: [
          "Trigger and scope",
          "Preparation checklist",
          "Execution sequence",
          "QA and approval",
          "Handoff and retrospective",
        ],
      },
    };
  }

  if (action === "detect-local-seo-risks") {
    return {
      draft: "AI risk draft: several location pages appear to reuse near-identical service blocks and may trigger thin-page concerns.",
      structured: {
        risks: ["Duplication across city pages", "Insufficient local proof depth"],
        recommendations: ["Differentiate city-specific trust blocks", "Add location-specific FAQs and internal links"],
      },
    };
  }

  return {
    draft: "AI internal summary draft: consolidate decision and risk notes into one concise operations update.",
    structured: {
      notes: [normalized.slice(0, 140)],
    },
  };
}
