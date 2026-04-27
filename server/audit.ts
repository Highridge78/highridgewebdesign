import { load } from "cheerio";
import type {
  AuditFinding,
  AuditResult,
  AuditScores,
  AuditSignals,
  ConversionSignals,
  LocalSignals,
  SeoSignals,
  TechnicalSignals,
  TrustSignals,
} from "../shared/audit.js";

// ─── URL normalization ────────────────────────────────────────────────────────

export function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) throw new Error("URL is required");
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    return new URL(withProtocol).href;
  } catch {
    throw new Error(`Invalid URL: "${input}"`);
  }
}

function buildAuditUrlCandidates(input: string): string[] {
  const primaryUrl = new URL(normalizeUrl(input));
  const hostVariants = primaryUrl.hostname.startsWith("www.")
    ? [primaryUrl.hostname, primaryUrl.hostname.replace(/^www\./, "")]
    : [primaryUrl.hostname, `www.${primaryUrl.hostname}`];
  const protocolVariants = primaryUrl.protocol === "http:" ? ["http:", "https:"] : ["https:", "http:"];

  const candidates = protocolVariants.flatMap((protocol) =>
    hostVariants.map((hostname) => {
      const candidate = new URL(primaryUrl.href);
      candidate.protocol = protocol;
      candidate.hostname = hostname;
      return candidate.href;
    })
  );

  return Array.from(new Set(candidates));
}

// ─── Homepage fetch ───────────────────────────────────────────────────────────

export async function fetchHomepage(
  url: string
): Promise<{ html: string; responseTimeMs: number; finalUrl: string }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12_000);
  const startMs = Date.now();

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; HighRidgeAuditBot/1.0; +https://highridgewebdesign.com)",
        Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      redirect: "follow",
    });

    clearTimeout(timeoutId);
    const responseTimeMs = Date.now() - startMs;

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) {
      throw new Error(
        `Non-HTML response: ${contentType || "unknown content type"}`
      );
    }
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = (await response.text()).slice(0, 2_000_000);
    return { html, responseTimeMs, finalUrl: response.url || url };
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error("Request timed out after 12 seconds");
    }
    throw err;
  }
}

async function fetchFirstReachableHomepage(
  input: string
): Promise<{ html: string; responseTimeMs: number; finalUrl: string }> {
  const candidates = buildAuditUrlCandidates(input);
  let lastError: unknown;

  for (const candidate of candidates) {
    try {
      return await fetchHomepage(candidate);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

// ─── Signal extractors ────────────────────────────────────────────────────────

function extractSeoSignals($: ReturnType<typeof load>): SeoSignals {
  const title = $("title").first().text().trim() || null;
  const metaDescription =
    $('meta[name="description"]').attr("content")?.trim() ||
    $('meta[name="Description"]').attr("content")?.trim() ||
    null;
  const h1 = $("h1").first().text().replace(/<[^>]*>/g, "").trim() || null;
  const h2Count = $("h2").length;
  const canonicalEl = $('link[rel="canonical"]');
  const hasCanonical = canonicalEl.length > 0;
  const canonicalUrl = canonicalEl.attr("href") ?? "";
  const hasOgTitle = $('meta[property="og:title"]').length > 0;
  const hasOgDescription = $('meta[property="og:description"]').length > 0;
  const hasOgImage = $('meta[property="og:image"]').length > 0;
  const hasRobotsNoindex = /noindex/i.test(
    $('meta[name="robots"]').attr("content") ?? ""
  );

  const schemaTypes: string[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const data = JSON.parse($(el).html() ?? "") as Record<string, unknown>;
      const t = data["@type"];
      if (typeof t === "string") schemaTypes.push(t);
      else if (Array.isArray(t)) schemaTypes.push(...(t as string[]));
    } catch {
      // malformed JSON-LD — skip
    }
  });

  let imagesTotal = 0;
  let imagesMissingAlt = 0;
  $("img").each((_, el) => {
    imagesTotal++;
    const alt = $(el).attr("alt");
    if (alt === undefined || !alt.trim()) imagesMissingAlt++;
  });

  return {
    title,
    titleLength: title?.length ?? 0,
    metaDescription,
    metaDescriptionLength: metaDescription?.length ?? 0,
    h1,
    h2Count,
    hasCanonical,
    canonicalUrl,
    hasOgTitle,
    hasOgDescription,
    hasOgImage,
    hasSchema: schemaTypes.length > 0,
    schemaTypes,
    imagesTotal,
    imagesMissingAlt,
    hasRobotsNoindex,
  };
}

function extractConversionSignals(
  $: ReturnType<typeof load>,
  html: string
): ConversionSignals {
  const telLinks: string[] = [];
  $('a[href^="tel:"], a[href^="Tel:"]').each((_, el) => {
    const href = $(el).attr("href") ?? "";
    const number = href.replace(/^tel:/i, "").trim();
    if (number) telLinks.push(number);
  });
  const hasClickToCall = telLinks.length > 0;

  const bodyText = $("body").text();
  const phonePattern = /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}/g;
  const phoneInText = Array.from(bodyText.matchAll(phonePattern)).map((m) => m[0].trim());
  const phoneNumbers = Array.from(new Set([...telLinks, ...phoneInText]));
  const hasPhoneNumber = phoneNumbers.length > 0;

  const ctaPattern =
    /\b(call\s+(?:now|us|today)|get\s+(?:a\s+)?(?:free\s+)?(?:quote|estimate|consultation)|free\s+(?:quote|estimate|consultation)|contact\s+us|book\s+(?:now|online|an?\s+(?:appointment|consultation))|schedule\s+(?:now|online|an?\s+(?:appointment|service|call))|request\s+(?:a\s+)?(?:quote|service|estimate))\b/gi;
  const ctaMatches = html.match(ctaPattern) ?? [];
  const ctaKeywords = Array.from(new Set(ctaMatches.map((c) => c.toLowerCase())));

  const formCount = $("form").length;
  const hasEmailLink = $('a[href^="mailto:"]').length > 0;
  const chatWidgetDetected =
    /tawk\.to|intercom|drift\.com|crisp\.chat|tidio|livechat|olark|zendesk.*chat|freshchat|chatra/i.test(
      html
    );

  return {
    hasPhoneNumber,
    phoneNumbers,
    hasClickToCall,
    hasCta: ctaKeywords.length > 0,
    ctaKeywords,
    hasContactForm: formCount > 0,
    formCount,
    hasEmailLink,
    chatWidgetDetected,
  };
}

function extractTrustSignals(
  $: ReturnType<typeof load>,
  html: string
): TrustSignals {
  const fullText = $("html").text().toLowerCase();

  const hasTestimonials =
    /testimonial|what\s+(?:our\s+)?clients?\s+say|what\s+(?:our\s+)?customers?\s+say/i.test(
      fullText
    );
  const hasReviews =
    /\breview|\brating|⭐|google\s+review|bbb\s+(?:accredited|rating)/i.test(fullText);

  const reviewPlatforms: string[] = [];
  if (/google(?:\.com)?.*review|maps\.google/i.test(html)) reviewPlatforms.push("Google");
  if (/yelp\.com|yelp\s+review/i.test(html)) reviewPlatforms.push("Yelp");
  if (/bbb\.org|better\s+business\s+bureau/i.test(html)) reviewPlatforms.push("BBB");
  if (/angi\.com|angie(?:'s)?\s+list|homeadvisor/i.test(html)) reviewPlatforms.push("Angi");
  if (/houzz\.com/i.test(html)) reviewPlatforms.push("Houzz");
  if (/thumbtack\.com/i.test(html)) reviewPlatforms.push("Thumbtack");

  const hasLicensed =
    /licens(?:ed|e\s+#|ing)|contractor\s+license|\blic\s*#/i.test(fullText);
  const hasInsured = /insur(?:ed|ance)|fully\s+insured|\bbonded\b/i.test(fullText);
  const hasWarranty = /warrant(?:y|ied)|guarantee(?:d)?/i.test(fullText);
  const hasPrivacyPolicy = /privacy\s+policy/i.test(fullText);
  const hasAboutSection =
    /about\s+us|our\s+story|who\s+we\s+are|our\s+team|meet\s+the\s+team/i.test(fullText);
  const yearsMatch = fullText.match(
    /(\d+)\+?\s+years?\s+(?:of\s+)?(?:experience|in\s+business|serving)/i
  );
  const yearsInBusiness = yearsMatch ? parseInt(yearsMatch[1], 10) : null;

  return {
    hasTestimonials,
    hasReviews,
    reviewPlatforms,
    hasBbbBadge: reviewPlatforms.includes("BBB"),
    hasLicensed,
    hasInsured,
    hasWarranty,
    hasPrivacyPolicy,
    hasAboutSection,
    hasYearsInBusiness: yearsInBusiness !== null,
    yearsInBusiness,
  };
}

function extractLocalSignals(
  $: ReturnType<typeof load>,
  html: string,
  seo: SeoSignals
): LocalSignals {
  const fullText = $("html").text();

  const localSchemaTypes = seo.schemaTypes.filter((t) =>
    /LocalBusiness|HomeAndConstructionBusiness|Plumber|Electrician|GeneralContractor|Roofer|HVACBusiness|LandscapingBusiness|ProfessionalService/i.test(
      t
    )
  );

  const cityStatePattern = /[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?,\s*[A-Z]{2}\b/;
  const cityInTitle = cityStatePattern.test(seo.title ?? "");
  const cityInMeta = cityStatePattern.test(seo.metaDescription ?? "");

  const globalCityPattern = /[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?,\s*[A-Z]{2}\b/g;
  const cityStateMentions = Array.from(new Set(fullText.match(globalCityPattern) ?? []));

  let hasAddress = false;
  let addressText = "";
  $('script[type="application/ld+json"]').each((_, el) => {
    if (hasAddress) return;
    try {
      const data = JSON.parse($(el).html() ?? "") as Record<string, unknown>;
      const addr = data["address"] as Record<string, string> | undefined;
      if (addr?.streetAddress) {
        hasAddress = true;
        addressText = [
          addr.streetAddress,
          addr.addressLocality,
          addr.addressRegion,
          addr.postalCode,
        ]
          .filter(Boolean)
          .join(", ");
      }
    } catch {
      // malformed JSON-LD — skip
    }
  });
  if (!hasAddress) {
    const usAddrPattern =
      /\d{1,5}\s[\w\s.]+(?:street|st\.?|avenue|ave\.?|boulevard|blvd\.?|road|rd\.?|drive|dr\.?|lane|ln\.?|way|court|ct\.?|place|pl\.?)[,\s][\w\s]+,\s*[A-Z]{2}\s+\d{5}/i;
    const addrMatch = $("body").text().match(usAddrPattern);
    if (addrMatch) {
      hasAddress = true;
      addressText = addrMatch[0].trim();
    }
  }

  const hasMapEmbed =
    /google\.com\/maps\/embed|maps\.googleapis\.com|maps\.google\.com/i.test(html);
  const hasServiceArea =
    /service\s+area|areas?\s+(?:we\s+)?serve|serving\s+[\w\s,]+|we\s+serve\s+the/i.test(
      fullText
    );

  const serviceTerms = [
    "plumbing",
    "hvac",
    "roofing",
    "flooring",
    "electrical",
    "landscaping",
    "painting",
    "remodeling",
    "renovation",
    "contractor",
    "carpentry",
    "masonry",
    "concrete",
    "drywall",
    "insulation",
    "gutters",
    "siding",
    "fencing",
    "deck",
    "paving",
    "cleaning",
    "pest control",
    "tree service",
  ];
  const serviceKeywords = serviceTerms.filter((term) =>
    new RegExp(`\\b${term}\\b`, "i").test(fullText)
  );

  return {
    hasLocalSchema: localSchemaTypes.length > 0,
    localSchemaTypes,
    cityInTitle,
    cityInMeta,
    cityStateMentions,
    hasAddress,
    addressText,
    hasMapEmbed,
    hasServiceArea,
    serviceKeywords,
  };
}

function extractTechnicalSignals(
  $: ReturnType<typeof load>,
  html: string,
  isHttps: boolean,
  responseTimeMs: number,
  imageCount: number
): TechnicalSignals {
  return {
    hasViewport: $('meta[name="viewport"]').length > 0,
    htmlSizeKb: Math.round(html.length / 1024),
    scriptCount: $("script").length,
    imageCount,
    isHttps,
    responseTimeMs,
  };
}

export function extractSignals(
  html: string,
  isHttps: boolean,
  responseTimeMs: number,
  url: string
): AuditSignals {
  const $ = load(html);
  const seo = extractSeoSignals($);
  const conversion = extractConversionSignals($, html);
  const trust = extractTrustSignals($, html);
  const local = extractLocalSignals($, html, seo);
  const technical = extractTechnicalSignals($, html, isHttps, responseTimeMs, seo.imagesTotal);

  const bodyText = $("body").text().trim();
  const isLikelyJsRendered =
    bodyText.length < 800 &&
    !seo.h1 &&
    conversion.formCount === 0 &&
    conversion.ctaKeywords.length === 0;

  return {
    url,
    fetchedAt: new Date().toISOString(),
    isLikelyJsRendered,
    seo,
    conversion,
    trust,
    local,
    technical,
  };
}

// ─── Scoring ──────────────────────────────────────────────────────────────────

export function scoreAudit(signals: AuditSignals): AuditScores {
  // Technical (0–10)
  let technical = 0;
  if (signals.technical.isHttps) technical += 2;
  if (signals.seo.title) {
    technical +=
      signals.seo.titleLength >= 30 && signals.seo.titleLength <= 65 ? 2 : 1;
  }
  if (signals.seo.metaDescription) {
    technical +=
      signals.seo.metaDescriptionLength >= 50 &&
      signals.seo.metaDescriptionLength <= 160
        ? 1.5
        : 0.75;
  }
  if (signals.seo.h1) technical += 1.5;
  if (signals.seo.hasSchema) technical += 1.5;
  if (signals.seo.hasCanonical) technical += 0.5;
  if (signals.technical.hasViewport) technical += 0.5;
  if (signals.seo.imagesTotal > 0 && signals.seo.imagesMissingAlt === 0)
    technical += 0.5;
  if (signals.seo.hasRobotsNoindex) technical = Math.max(0, technical - 3);
  const technicalScore = round1(Math.min(10, technical));

  // Conversion (0–10)
  let conversion = 0;
  if (signals.conversion.hasPhoneNumber) conversion += 2;
  if (signals.conversion.hasClickToCall) conversion += 1;
  if (signals.conversion.hasCta) conversion += 3;
  if (signals.conversion.hasContactForm) conversion += 2.5;
  if (signals.conversion.hasEmailLink) conversion += 1;
  if (signals.conversion.chatWidgetDetected) conversion += 0.5;
  const conversionScore = round1(Math.min(10, conversion));

  // Trust (0–10)
  let trust = 0;
  if (signals.trust.hasTestimonials || signals.trust.hasReviews) trust += 2.5;
  if (signals.trust.reviewPlatforms.length > 0) trust += 1.5;
  if (signals.trust.hasLicensed) trust += 2;
  if (signals.trust.hasInsured) trust += 1.5;
  if (signals.trust.hasAboutSection) trust += 1;
  if (signals.trust.hasPrivacyPolicy) trust += 0.5;
  if (signals.trust.hasYearsInBusiness) trust += 0.5;
  if (signals.trust.hasWarranty) trust += 0.5;
  const trustScore = round1(Math.min(10, trust));

  // Local visibility (0–10)
  let local = 0;
  if (signals.local.hasLocalSchema) local += 3;
  if (signals.local.cityInTitle) local += 2;
  if (signals.local.hasAddress) local += 2;
  if (signals.local.hasMapEmbed) local += 1.5;
  if (signals.local.hasServiceArea) local += 1;
  if (signals.local.cityInMeta) local += 0.5;
  const localVisibilityScore = round1(Math.min(10, local));

  // Revenue opportunity = inverse of average (higher score → lower opportunity)
  const avg = (technicalScore + conversionScore + trustScore + localVisibilityScore) / 4;
  const revenueOpportunity = round1(Math.min(10, Math.max(0, 10 - avg)));

  if (signals.isLikelyJsRendered) {
    // Conversion and trust signals cannot be measured from raw HTML; hold at neutral 5.
    // Technical and local are derived from <head> elements and remain accurate.
    return {
      conversionScore: 5,
      trustScore: 5,
      localVisibilityScore: Math.max(5, localVisibilityScore),
      technicalScore,
      revenueOpportunity: 5,
      confidence: "low",
    };
  }

  return {
    conversionScore,
    localVisibilityScore,
    trustScore,
    technicalScore,
    revenueOpportunity,
    confidence: "high",
  };
}

function round1(n: number) {
  return Math.round(n * 10) / 10;
}

// ─── Findings generation ──────────────────────────────────────────────────────

const SEVERITY_ORDER: Record<string, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
};

export function generateFindings(
  signals: AuditSignals,
  _scores: AuditScores
): AuditFinding[] {
  const f: AuditFinding[] = [];

  if (signals.isLikelyJsRendered) {
    f.push({
      category: "technical",
      severity: "medium",
      title: "Page content could not be fully analyzed",
      evidence:
        "The site appears to rely on client-side rendering. The raw HTML does not contain the visible page content.",
      whyItMatters:
        "Automated scans cannot reliably evaluate conversion and SEO elements on JavaScript-rendered sites without rendering the page in a browser.",
      recommendedFix:
        "Run a rendered-page audit (headless browser) or manual review to accurately assess the site.",
    });
  }

  // ── Technical ──────────────────────────────────────────────────────────────

  if (!signals.technical.isHttps) {
    f.push({
      category: "technical",
      severity: "critical",
      title: "Site is not served over HTTPS",
      evidence: `The submitted URL uses HTTP: ${signals.url}`,
      whyItMatters:
        "Google marks non-HTTPS sites as 'Not Secure' in Chrome. This kills visitor trust before they read a single word and causes a measurable drop in search rankings.",
      recommendedFix:
        "Install an SSL certificate (free via Let's Encrypt) and add a server-level redirect from HTTP to HTTPS.",
    });
  }

  if (signals.seo.hasRobotsNoindex) {
    f.push({
      category: "technical",
      severity: "critical",
      title: "Homepage is blocked from Google indexing",
      evidence:
        'A <meta name="robots" content="noindex"> tag was found on the homepage.',
      whyItMatters:
        "Google cannot index or rank this page. No organic traffic can reach the site at all.",
      recommendedFix:
        'Remove the noindex directive from the robots meta tag. Also check robots.txt for conflicting Disallow rules.',
    });
  }

  if (!signals.technical.hasViewport) {
    f.push({
      category: "technical",
      severity: "high",
      title: "Missing viewport meta tag — site may not be mobile-friendly",
      evidence: "No <meta name=\"viewport\"> tag was detected on the homepage.",
      whyItMatters:
        "Without a viewport tag, browsers render the page at desktop width on mobile. Google uses mobile-first indexing, so a broken mobile experience directly harms rankings and leads.",
      recommendedFix:
        'Add <meta name="viewport" content="width=device-width, initial-scale=1"> inside the <head>.',
    });
  }

  // ── SEO ────────────────────────────────────────────────────────────────────

  if (!signals.seo.title) {
    f.push({
      category: "seo",
      severity: "critical",
      title: "Missing page title tag",
      evidence: "No <title> tag was found on the homepage.",
      whyItMatters:
        "The title tag is Google's primary signal for what a page is about. Without it, search result snippets are blank or auto-generated poorly, crushing click-through rates.",
      recommendedFix:
        "Add a descriptive <title> tag: [Business Name] | [Primary Service] | [City, State]",
    });
  } else if (signals.seo.titleLength < 30) {
    f.push({
      category: "seo",
      severity: "medium",
      title: "Page title is too short",
      evidence: `Title is only ${signals.seo.titleLength} characters: "${signals.seo.title}"`,
      whyItMatters:
        "Short titles miss the opportunity to include the service type and location — two keywords critical for local search rankings.",
      recommendedFix: `Expand the title to 50–65 characters. Example: "${signals.seo.title} | Serving [City, State]"`,
    });
  } else if (signals.seo.titleLength > 65) {
    f.push({
      category: "seo",
      severity: "low",
      title: "Page title will be truncated in search results",
      evidence: `Title is ${signals.seo.titleLength} characters — Google typically cuts off at ~65: "${signals.seo.title?.slice(0, 65)}…"`,
      whyItMatters:
        "Truncated titles hide the call to action or location, reducing click-through rates from search results.",
      recommendedFix:
        "Shorten the title to 50–65 characters, keeping the most important keywords at the front.",
    });
  }

  if (!signals.seo.metaDescription) {
    f.push({
      category: "seo",
      severity: "high",
      title: "Missing meta description",
      evidence: "No meta description tag was found on the homepage.",
      whyItMatters:
        "Meta descriptions are the snippet text shown in Google results. Without one, Google auto-generates something unhelpful, reducing click-through rates.",
      recommendedFix:
        "Add a meta description of 120–160 characters: what you do, where you serve, and one clear call to action.",
    });
  } else if (signals.seo.metaDescriptionLength < 50) {
    f.push({
      category: "seo",
      severity: "medium",
      title: "Meta description is too short",
      evidence: `Meta description is only ${signals.seo.metaDescriptionLength} characters: "${signals.seo.metaDescription}"`,
      whyItMatters:
        "A thin meta description leaves most of the search snippet blank, wasting the chance to persuade searchers to click.",
      recommendedFix:
        "Expand the meta description to 120–160 characters with the primary service, location, and a CTA.",
    });
  }

  if (!signals.seo.h1) {
    f.push({
      category: "seo",
      severity: "high",
      title: "No H1 heading found on the homepage",
      evidence: "The homepage has no H1 tag.",
      whyItMatters:
        "The H1 is the primary on-page topic signal Google uses to understand the page. Without it, the page lacks a clear keyword anchor.",
      recommendedFix:
        "Add exactly one H1 near the top of the page that states what you do and where — e.g., 'Expert Roofing Contractor Serving Asheville, NC'.",
    });
  }

  if (!signals.seo.hasSchema) {
    f.push({
      category: "seo",
      severity: "high",
      title: "No structured data (Schema.org) found",
      evidence: "No JSON-LD or Schema.org markup was detected on the homepage.",
      whyItMatters:
        "Structured data is how Google validates your business type, location, hours, and services for the local map pack and Knowledge Panel. Competitors who have it rank above those who don't.",
      recommendedFix:
        "Add LocalBusiness JSON-LD to the homepage with: @type, name, telephone, address, openingHours, and areaServed.",
    });
  }

  if (!signals.local.hasLocalSchema) {
    f.push({
      category: "seo",
      severity: "high",
      title: "No LocalBusiness structured data found",
      evidence: `Schema types detected: ${signals.seo.schemaTypes.length > 0 ? signals.seo.schemaTypes.join(", ") : "none"}. None are a LocalBusiness type.`,
      whyItMatters:
        "LocalBusiness schema is the direct signal Google uses to populate local search results and the map pack. Without it, you are invisible to this high-intent traffic.",
      recommendedFix:
        "Use the most specific LocalBusiness subtype available (e.g., Plumber, Roofer, GeneralContractor) with full NAP details.",
    });
  }

  if (!signals.local.cityInTitle) {
    f.push({
      category: "seo",
      severity: "high",
      title: "Service city not mentioned in page title",
      evidence: `Page title: "${signals.seo.title ?? "(not detected)"}" — no City, State pattern found.`,
      whyItMatters:
        "Local searches like 'roofer in Asheville NC' match titles that include a location. Without it, the page is unlikely to rank for high-intent local queries.",
      recommendedFix:
        "Add your primary city and state to the page title. Example: 'Roofing Contractor | Asheville, NC'",
    });
  }

  if (!signals.local.hasAddress) {
    f.push({
      category: "seo",
      severity: "high",
      title: "No physical address detected on the homepage",
      evidence:
        "No street address was found in the page content or structured data.",
      whyItMatters:
        "A visible address validates your Google Business Profile and signals to visitors that you are a real, established business.",
      recommendedFix:
        "Display your full business address in the footer and in LocalBusiness schema markup.",
    });
  }

  if (signals.seo.imagesTotal > 0 && signals.seo.imagesMissingAlt > 0) {
    f.push({
      category: "seo",
      severity: signals.seo.imagesMissingAlt > 3 ? "medium" : "low",
      title: `${signals.seo.imagesMissingAlt} image${signals.seo.imagesMissingAlt > 1 ? "s" : ""} missing alt text`,
      evidence: `${signals.seo.imagesMissingAlt} of ${signals.seo.imagesTotal} images have no alt attribute.`,
      whyItMatters:
        "Alt text helps search engines understand image content, contributes to overall page quality, and is required for accessibility compliance.",
      recommendedFix:
        "Add descriptive alt text to every image, especially photos of your work, team, or service area.",
    });
  }

  if (!signals.seo.hasOgImage) {
    f.push({
      category: "seo",
      severity: "low",
      title: "No Open Graph image configured",
      evidence: "No og:image meta tag was found on the homepage.",
      whyItMatters:
        "When your site is shared on Facebook, LinkedIn, or via iMessage, no preview image appears — reducing social referral click-through rates.",
      recommendedFix:
        "Add an og:image meta tag pointing to a 1200×630px image showcasing your business or work.",
    });
  }

  if (!signals.local.hasServiceArea) {
    f.push({
      category: "seo",
      severity: "medium",
      title: "No service area content detected",
      evidence:
        "No 'areas we serve,' 'service area,' or similar language was found on the homepage.",
      whyItMatters:
        "Listing the specific towns and counties you serve helps Google match your site to local searches from those areas — especially important for wide service areas.",
      recommendedFix:
        "Add a 'Service Areas' section listing every city, town, or county you serve.",
    });
  }

  if (!signals.local.hasMapEmbed) {
    f.push({
      category: "seo",
      severity: "low",
      title: "No Google Map embed found",
      evidence: "No Google Maps embed was detected on the homepage.",
      whyItMatters:
        "An embedded map reinforces your location to both search engines and visitors and makes it easier for customers to find you.",
      recommendedFix:
        "Embed a Google Map of your business location on the homepage footer or contact page.",
    });
  }

  // ── Conversion ─────────────────────────────────────────────────────────────
  // Skipped entirely for JS-rendered pages — content is not in raw HTML.

  if (!signals.isLikelyJsRendered) {
    if (!signals.conversion.hasPhoneNumber) {
      f.push({
        category: "conversion",
        severity: "critical",
        title: "No phone number found on the homepage",
        evidence:
          "No telephone number was detected in the page content or links.",
        whyItMatters:
          "For local service businesses, phone calls convert at 10–15× the rate of form submissions. A visitor who can't find your number quickly will call a competitor.",
        recommendedFix:
          "Display your phone number prominently in the header and body. Wrap it in a tel: link so mobile users can tap to call.",
      });
    } else if (!signals.conversion.hasClickToCall) {
      f.push({
        category: "conversion",
        severity: "high",
        title: "Phone number is not click-to-call",
        evidence: `Phone detected in text but no tel: link found. Numbers: ${signals.conversion.phoneNumbers.slice(0, 2).join(", ")}`,
        whyItMatters:
          "More than 60% of local service searches happen on mobile. Without a tap-to-call link, mobile visitors must manually dial — most won't.",
        recommendedFix: `Wrap every phone number in: <a href="tel:+1XXXXXXXXXX">Your Number</a>`,
      });
    }

    if (!signals.conversion.hasCta) {
      f.push({
        category: "conversion",
        severity: "critical",
        title: "No clear call-to-action detected",
        evidence:
          "No CTA phrases ('Get a Free Quote', 'Call Now', 'Book Online', etc.) were found on the homepage.",
        whyItMatters:
          "Without a clear next step, visitors leave without contacting you. A strong above-the-fold CTA is the single highest-leverage change for conversion rate.",
        recommendedFix:
          "Add a prominent CTA button above the fold — 'Get Your Free Estimate' or 'Call Now: [Phone]'. Repeat it after each service description.",
      });
    }

    if (!signals.conversion.hasContactForm) {
      f.push({
        category: "conversion",
        severity: "high",
        title: "No contact form detected",
        evidence: "No HTML form element was found on the homepage.",
        whyItMatters:
          "Many visitors prefer submitting a form over calling, especially outside business hours. Without a form, you lose all after-hours leads.",
        recommendedFix:
          "Add a short contact form (name, phone, email, message) directly on the homepage — not only on a separate contact page.",
      });
    }
  }

  // ── Trust ──────────────────────────────────────────────────────────────────
  // Skipped entirely for JS-rendered pages — content is not in raw HTML.

  if (!signals.isLikelyJsRendered) {
    if (!signals.trust.hasTestimonials && !signals.trust.hasReviews) {
      f.push({
        category: "trust",
        severity: "critical",
        title: "No social proof or reviews detected",
        evidence:
          "No testimonials, star ratings, review counts, or review platform references were found on the homepage.",
        whyItMatters:
          "92% of consumers read online reviews before choosing a local service. Zero social proof means visitors have no reason to trust you over competitors who show reviews.",
        recommendedFix:
          "Add 3–5 real customer testimonials with names and project descriptions. Embed or link to your Google Business Profile reviews.",
      });
    }

    if (!signals.trust.hasLicensed) {
      f.push({
        category: "trust",
        severity: "high",
        title: "No license information visible",
        evidence:
          "No contractor license number or licensing language was found on the homepage.",
        whyItMatters:
          "Homeowners frequently search for 'licensed contractor' specifically. Not displaying license info raises questions about legitimacy and loses deals to competitors who show it.",
        recommendedFix:
          "Display your state contractor license number in the site header, footer, and About section.",
      });
    }

    if (!signals.trust.hasInsured) {
      f.push({
        category: "trust",
        severity: "high",
        title: "No insurance or bonding information visible",
        evidence:
          "No mention of insurance, bonded, or liability coverage was found on the homepage.",
        whyItMatters:
          "Homeowners and property managers require proof of insurance before hiring contractors. Its absence is a friction point that loses deals to competitors who mention it.",
        recommendedFix:
          "Add 'Fully Licensed & Insured' to your headline area, footer, and About section.",
      });
    }

    if (!signals.trust.hasAboutSection) {
      f.push({
        category: "trust",
        severity: "medium",
        title: "No About section detected",
        evidence:
          "No 'About Us', 'Our Story', or 'Meet the Team' content was found on the homepage.",
        whyItMatters:
          "People hire people, not websites. An About section with a real name, face, and story dramatically increases trust and conversion for local service businesses.",
        recommendedFix:
          "Add an About section with your name, photo, years of experience, and why you started the business.",
      });
    }
  }

  if (!signals.trust.hasPrivacyPolicy) {
    f.push({
      category: "trust",
      severity: "low",
      title: "No privacy policy link found",
      evidence: "No link to a privacy policy page was detected.",
      whyItMatters:
        "A privacy policy is legally required when collecting personal information (contact forms, analytics). Its absence can deter privacy-conscious visitors and creates legal risk.",
      recommendedFix:
        "Add a simple privacy policy page and link it in the footer.",
    });
  }

  f.sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]);
  return f;
}

// ─── Summary ──────────────────────────────────────────────────────────────────

function buildSummary(
  signals: AuditSignals,
  scores: AuditScores,
  findings: AuditFinding[]
): string {
  const avg = round1(
    (scores.technicalScore +
      scores.conversionScore +
      scores.trustScore +
      scores.localVisibilityScore) /
      4
  );
  const critical = findings.filter((f) => f.severity === "critical").length;
  const high = findings.filter((f) => f.severity === "high").length;

  const parts: string[] = [];

  if (signals.isLikelyJsRendered) {
    parts.push(
      "This site uses client-side rendering. The diagnostic is based on limited raw HTML and may not reflect visible content."
    );
  }

  parts.push(`Overall score: ${avg}/10.`);

  if (critical > 0) {
    parts.push(
      `${critical} critical issue${critical > 1 ? "s" : ""} found that are actively blocking leads.`
    );
  }
  if (high > 0) {
    parts.push(`${high} high-priority issue${high > 1 ? "s" : ""} need attention.`);
  }

  const weakAreas: string[] = [];
  if (scores.conversionScore < 5) weakAreas.push("conversion");
  if (scores.localVisibilityScore < 5) weakAreas.push("local visibility");
  if (scores.trustScore < 5) weakAreas.push("trust signals");
  if (scores.technicalScore < 5) weakAreas.push("technical SEO");
  if (weakAreas.length > 0) {
    parts.push(`Biggest gaps: ${weakAreas.join(", ")}.`);
  }

  if (!signals.isLikelyJsRendered && (!signals.conversion.hasPhoneNumber || !signals.conversion.hasCta)) {
    parts.push(
      "Conversion fundamentals (phone number and CTA) are missing — fixing these alone could double lead volume."
    );
  } else if (scores.revenueOpportunity >= 6) {
    parts.push(
      "There is a significant revenue opportunity — fixing these issues could substantially increase lead volume."
    );
  } else if (scores.revenueOpportunity >= 4) {
    parts.push(
      "Targeted improvements available that would meaningfully increase lead conversion."
    );
  } else {
    parts.push("Solid foundation — targeted refinements available.");
  }

  return parts.join(" ");
}

// ─── Main entry point ─────────────────────────────────────────────────────────

export async function runWebsiteAudit(url: string): Promise<AuditResult> {
  const { html, responseTimeMs, finalUrl } = await fetchFirstReachableHomepage(url);
  const isHttps = finalUrl.startsWith("https://");

  const signals = extractSignals(html, isHttps, responseTimeMs, finalUrl);
  const scores = scoreAudit(signals);
  const findings = generateFindings(signals, scores);
  const summary = buildSummary(signals, scores, findings);

  return { url: finalUrl, signals, scores, findings, summary };
}
