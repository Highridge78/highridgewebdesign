import { useEffect } from "react";

interface PageMetaOptions {
  title: string;
  description?: string;
  canonicalPath?: string;
}

export function usePageMeta({ title, description, canonicalPath }: PageMetaOptions) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const metaDescription = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;
    const previousDescription = metaDescription?.content;
    const canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const previousCanonical = canonicalLink?.href;

    if (metaDescription && description) {
      metaDescription.content = description;
    }
    if (canonicalLink && canonicalPath) {
      canonicalLink.href = `${window.location.origin}${canonicalPath}`;
    }

    return () => {
      document.title = previousTitle;
      if (metaDescription && previousDescription) {
        metaDescription.content = previousDescription;
      }
      if (canonicalLink && previousCanonical) {
        canonicalLink.href = previousCanonical;
      }
    };
  }, [title, description, canonicalPath]);
}
