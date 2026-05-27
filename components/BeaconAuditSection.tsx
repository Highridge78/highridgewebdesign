"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

type FormData = {
  name: string;
  email: string;
  business: string;
  website: string;
  botcheck: string;
};

type FieldErrors = Partial<Record<keyof FormData, string>>;

const initialFormData: FormData = {
  name: "",
  email: "",
  business: "",
  website: "",
  botcheck: "",
};

const BEACON_CHECKS = [
  "Conversion paths",
  "Trust signals",
  "Local SEO structure",
  "Mobile experience",
  "Technical foundation",
];

function isValidUrl(value: string) {
  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    return url.hostname.includes(".");
  } catch {
    return false;
  }
}

export default function BeaconAuditSection() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    if (formState !== "sending") {
      setFormState("idle");
      setErrorMessage("");
    }
  };

  const validate = (): boolean => {
    const errors: FieldErrors = {};

    if (formData.name.trim().length < 2) {
      errors.name = "Please enter your name.";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (!formData.business.trim()) {
      errors.business = "Business name is required.";
    }
    if (!formData.website.trim()) {
      errors.website = "Website URL is required.";
    } else if (!isValidUrl(formData.website.trim())) {
      errors.website = "Please enter a valid URL (e.g. yoursite.com).";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState === "sending") return;
    if (!validate()) return;

    setFormState("sending");
    setErrorMessage("");
    setFieldErrors({});

    if (formData.botcheck.trim()) {
      setFormState("idle");
      return;
    }

    const website = formData.website.trim();
    const normalizedUrl = website.startsWith("http") ? website : `https://${website}`;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          business: formData.business.trim(),
          website: normalizedUrl,
          message: "Beacon Audit Request",
          botcheck: "",
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        if (data?.issues) {
          const nextErrors: FieldErrors = {};
          for (const issue of data.issues as Array<{ field: keyof FormData; message: string }>) {
            nextErrors[issue.field] = issue.message;
          }
          setFieldErrors(nextErrors);
        }
        throw new Error(data?.message || "The form could not submit.");
      }

      setFormState("sent");
      setFormData(initialFormData);
    } catch (error) {
      setFormState("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "The form could not submit. Please email jeremy@highridgewebdesign.com directly."
      );
    }
  };

  return (
    <section
      id="beacon-audit"
      className="relative overflow-hidden bg-[oklch(0.095_0.018_260)] py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[50rem] -translate-x-1/2 rounded-full bg-brand-orange/[0.05] blur-3xl" />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.28em] text-brand-orange/70">
            Beacon Audit
          </span>
          <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-white md:text-5xl">
            See What Your Site Is Actually Costing You
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/65 md:text-lg">
            Beacon scores your site on the 5 signals that decide whether visitors call or leave.
            We&apos;ll send your full report within 24 hours.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-[3fr_2fr] lg:gap-14 lg:items-start">
          {/* Form */}
          <div className="rounded-2xl border border-white/10 bg-black/20 p-6 shadow-[0_30px_80px_-40px_rgba(255,106,0,0.4)] sm:p-8">
            {formState === "sent" ? (
              <div className="flex flex-col items-center gap-5 py-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-emerald-400" />
                <div>
                  <p className="font-serif text-2xl font-bold text-white">Request received.</p>
                  <p className="mt-2 text-base text-foreground/60">
                    Your Beacon report will arrive within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Honeypot */}
                <input
                  type="text"
                  name="botcheck"
                  value={formData.botcheck}
                  onChange={handleChange}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="hidden"
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="beacon-name"
                      className="mb-2 block text-sm font-semibold text-foreground/80"
                    >
                      Your Name *
                    </label>
                    <Input
                      id="beacon-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      placeholder="John Smith"
                      aria-invalid={Boolean(fieldErrors.name)}
                      className="h-12 border-border bg-[oklch(0.15_0.02_260)] px-4 text-base focus:border-brand-orange"
                    />
                    {fieldErrors.name && (
                      <p className="mt-1.5 text-xs text-red-300">{fieldErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="beacon-email"
                      className="mb-2 block text-sm font-semibold text-foreground/80"
                    >
                      Email Address *
                    </label>
                    <Input
                      id="beacon-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      inputMode="email"
                      placeholder="john@business.com"
                      aria-invalid={Boolean(fieldErrors.email)}
                      className="h-12 border-border bg-[oklch(0.15_0.02_260)] px-4 text-base focus:border-brand-orange"
                    />
                    {fieldErrors.email && (
                      <p className="mt-1.5 text-xs text-red-300">{fieldErrors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="beacon-business"
                    className="mb-2 block text-sm font-semibold text-foreground/80"
                  >
                    Business Name *
                  </label>
                  <Input
                    id="beacon-business"
                    name="business"
                    value={formData.business}
                    onChange={handleChange}
                    autoComplete="organization"
                    placeholder="Smith Roofing & Gutters"
                    aria-invalid={Boolean(fieldErrors.business)}
                    className="h-12 border-border bg-[oklch(0.15_0.02_260)] px-4 text-base focus:border-brand-orange"
                  />
                  {fieldErrors.business && (
                    <p className="mt-1.5 text-xs text-red-300">{fieldErrors.business}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="beacon-website"
                    className="mb-2 block text-sm font-semibold text-foreground/80"
                  >
                    Website URL *
                  </label>
                  <Input
                    id="beacon-website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleChange}
                    autoComplete="url"
                    inputMode="url"
                    placeholder="https://yoursite.com"
                    aria-invalid={Boolean(fieldErrors.website)}
                    className="h-12 border-border bg-[oklch(0.15_0.02_260)] px-4 text-base focus:border-brand-orange"
                  />
                  {fieldErrors.website && (
                    <p className="mt-1.5 text-xs text-red-300">{fieldErrors.website}</p>
                  )}
                </div>

                {formState === "error" && errorMessage && (
                  <p className="rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-200">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-4 text-sm font-black text-white shadow-[0_18px_45px_rgba(255,106,0,0.3)] transition-all hover:-translate-y-0.5 hover:bg-brand-orange-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {formState === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    "Request My Beacon Audit"
                  )}
                </button>
              </form>
            )}
          </div>

          {/* What Beacon Checks */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-brand-amber/70">
                What Beacon Checks
              </p>
              <ul className="mt-5 space-y-4">
                {BEACON_CHECKS.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground/75">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-orange" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 px-1 text-sm text-foreground/45">
              <p>Free. No obligation. Full written report.</p>
              <p>Western NC contractors and home service businesses only.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
