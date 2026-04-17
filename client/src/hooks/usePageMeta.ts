import { useEffect } from "react";

interface PageMetaOptions {
  title: string;
  description?: string;
  keywords?: string;
}

export function usePageMeta({ title, description, keywords }: PageMetaOptions) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const metaDescription = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;
    const previousDescription = metaDescription?.content;
    const metaKeywords = document.querySelector(
      'meta[name="keywords"]'
    ) as HTMLMetaElement | null;
    const previousKeywords = metaKeywords?.content;

    if (metaDescription && description) {
      metaDescription.content = description;
    }
    if (metaKeywords && keywords) {
      metaKeywords.content = keywords;
    }

    return () => {
      document.title = previousTitle;
      if (metaDescription && previousDescription) {
        metaDescription.content = previousDescription;
      }
      if (metaKeywords && previousKeywords) {
        metaKeywords.content = previousKeywords;
      }
    };
  }, [title, description, keywords]);
}
