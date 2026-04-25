/**
 * Configuration utility for High Ridge Web Design.
 * Centralizes environment variables and fallbacks.
 */

export const AUDIT_URL = import.meta.env.VITE_AUDIT_URL || "#contact";

/**
 * Helper to determine if the audit URL is an external link or an internal anchor.
 */
export const isExternalAudit = () => AUDIT_URL.startsWith("http");
