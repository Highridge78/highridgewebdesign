const configuredLogo = import.meta.env.VITE_BRAND_LOGO_SRC?.trim();

/**
 * Upload-ready brand logo source.
 * Set VITE_BRAND_LOGO_SRC to your production logo URL.
 */
export const BRAND_LOGO_SRC =
  configuredLogo && configuredLogo.length > 0
    ? configuredLogo
    : "/logo-placeholder.svg";

export const BRAND_LOGO_ALT =
  "High Ridge Web Design logo placeholder. Replace with your uploaded logo.";
