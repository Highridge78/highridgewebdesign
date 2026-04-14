import { useEffect } from "react";

interface PageMetaOptions {
  title: string;
  description?: string;
}

export function usePageMeta({ title, description }: PageMetaOptions) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const metaDescription = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;
    const previousDescription = metaDescription?.content;

    if (metaDescription && description) {
      metaDescription.content = description;
    }

    return () => {
      document.title = previousTitle;
      if (metaDescription && previousDescription) {
        metaDescription.content = previousDescription;
      }
    };
  }, [title, description]);
}
