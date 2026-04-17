import { useEffect } from "react";

interface PageMetaOptions {
  title: string;
  description?: string;
  canonicalUrl?: string;
  schema?: Record<string, unknown>;
}

function upsertMeta(name: string, content: string) {
  let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.name = name;
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function upsertPropertyMeta(property: string, content: string) {
  let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function upsertCanonical(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = url;
}

function upsertSchema(schema: Record<string, unknown>) {
  let script = document.querySelector(
    'script[data-schema="local-business"]'
  ) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.schema = "local-business";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema);
}

export function usePageMeta({
  title,
  description,
  canonicalUrl,
  schema,
}: PageMetaOptions) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    const previousDescription = metaDescription?.content ?? "";
    const existingCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const previousCanonical = existingCanonical?.href ?? "";
    const existingSchema = document.querySelector(
      'script[data-schema="local-business"]'
    ) as HTMLScriptElement | null;
    const previousSchema = existingSchema?.textContent ?? "";

    if (description) {
      upsertMeta("description", description);
      upsertPropertyMeta("og:description", description);
    }
    upsertPropertyMeta("og:title", title);

    if (canonicalUrl) upsertCanonical(canonicalUrl);
    if (schema) upsertSchema(schema);

    return () => {
      document.title = previousTitle;
      upsertMeta("description", previousDescription);
      upsertPropertyMeta("og:description", previousDescription);

      const ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null;
      if (ogTitle) ogTitle.content = previousTitle;

      if (canonicalUrl) {
        if (previousCanonical) {
          upsertCanonical(previousCanonical);
        } else {
          document.querySelector('link[rel="canonical"]')?.remove();
        }
      }

      if (schema) {
        if (previousSchema) {
          try {
            upsertSchema(JSON.parse(previousSchema));
          } catch {
            document.querySelector('script[data-schema="local-business"]')?.remove();
          }
        } else {
          document.querySelector('script[data-schema="local-business"]')?.remove();
        }
      }
    };
  }, [title, description, canonicalUrl, schema]);
}
