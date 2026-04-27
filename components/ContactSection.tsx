"use client";

/**
 * ContactSection — High Ridge Web Design
 * Conversion-focused contact section for strategy calls.
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const CONTACT_EMAIL = "jeremy@highridgewebdesign.com";
const CONTACT_PHONE = "(828) 598-9262";
const CONTACT_TEL = "+18285989262";
const FOUNDER_PHOTO = "/images/founder-jeremy-profile.webp";
const FALLBACK_PHOTO = "/images/founder-jeremy-460.webp";

type FormDataState = {
  name: string;
  email: string;
  phone: string;
  business: string;
  website: string;
  message: string;
  botcheck: string;
};

type FieldErrors = Partial<Record<keyof FormDataState, string>>;

const initialFormData: FormDataState = {
  name: "",
  email: "",
  phone: "",
  business: "",
  website: "",
  message: "",
  botcheck: "",
};

export default function ContactSection() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formData, setFormData] = useState<FormDataState>(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    if (formState !== "sending") {
      setFormState("idle");
      setErrorMessage("");
    }
  };

  const validateForm = () => {
    const nextErrors: FieldErrors = {};
    const email = formData.email.trim();
    const phone = formData.phone.trim();

    if (formData.name.trim().length < 2) {
      nextErrors.name = "Please enter your name.";
    }
    if (!email && !phone) {
      nextErrors.email = "Add an email or phone number.";
      nextErrors.phone = "Add an email or phone number.";
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (formData.message.trim().length < 10) {
      nextErrors.message = "Share a few details about the project or audit.";
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formState === "sending") return;
    if (!validateForm()) {
      setFormState("error");
      setErrorMessage("Please check the highlighted fields and try again.");
      return;
    }

    setFormState("sending");
    setErrorMessage("");
    setFieldErrors({});

    if (formData.botcheck.trim()) {
      setFormState("idle");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        if (data?.issues) {
          const nextErrors: FieldErrors = {};
          for (const issue of data.issues as Array<{ field: keyof FormDataState; message: string }>) {
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
          : `The form could not submit. Please call or text ${CONTACT_PHONE}, or email me directly.`
      );
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-24">
      <div className="absolute inset-0 bg-[oklch(0.12_0.02_260)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-orange/[0.04] rounded-full blur-3xl" />

      <div className="relative z-10 container">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
              Book a Strategy Call
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
              Build a Website That{" "}
              <span className="text-gradient-orange">Produces Better Leads</span>
            </h2>
            <p className="mt-4 text-foreground/60 max-w-2xl mx-auto">
              Tell us about your business goals and current pipeline challenges.
              We will map your highest-impact website and conversion opportunities.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Form */}
            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-2xl border border-white/10 bg-black/20 p-5 shadow-[0_30px_80px_-50px_rgba(255,106,0,0.55)] sm:p-6"
                noValidate
                aria-describedby="contact-response-status"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="text-sm font-semibold text-foreground/80 mb-2 block"
                    >
                      Your Name *
                    </label>
                    <Input
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      placeholder="John Smith"
                      required
                      aria-invalid={Boolean(fieldErrors.name)}
                      className="h-12 bg-[oklch(0.15_0.02_260)] border-border px-4 text-base focus:border-brand-orange"
                    />
                    {fieldErrors.name && (
                      <p className="mt-2 text-xs text-red-300">{fieldErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="text-sm font-semibold text-foreground/80 mb-2 block"
                    >
                      Email Address
                    </label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      inputMode="email"
                      placeholder="john@business.com"
                      aria-invalid={Boolean(fieldErrors.email)}
                      className="h-12 bg-[oklch(0.15_0.02_260)] border-border px-4 text-base focus:border-brand-orange"
                    />
                    {fieldErrors.email && (
                      <p className="mt-2 text-xs text-red-300">{fieldErrors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="text-sm font-semibold text-foreground/80 mb-2 block"
                    >
                      Phone Number
                    </label>
                    <Input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="828-598-9262"
                      aria-invalid={Boolean(fieldErrors.phone)}
                      className="h-12 bg-[oklch(0.15_0.02_260)] border-border px-4 text-base focus:border-brand-orange"
                    />
                    {fieldErrors.phone && (
                      <p className="mt-2 text-xs text-red-300">{fieldErrors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="contact-business"
                      className="text-sm font-semibold text-foreground/80 mb-2 block"
                    >
                      Business Name
                    </label>
                    <Input
                      id="contact-business"
                      name="business"
                      value={formData.business}
                      onChange={handleChange}
                      autoComplete="organization"
                      placeholder="Smith's HVAC"
                      className="h-12 bg-[oklch(0.15_0.02_260)] border-border px-4 text-base focus:border-brand-orange"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-website"
                    className="text-sm font-semibold text-foreground/80 mb-2 block"
                  >
                    Current Website
                  </label>
                  <Input
                    id="contact-website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleChange}
                    autoComplete="url"
                    inputMode="url"
                    placeholder="https://yourbusiness.com"
                    aria-invalid={Boolean(fieldErrors.website)}
                    className="h-12 bg-[oklch(0.15_0.02_260)] border-border px-4 text-base focus:border-brand-orange"
                  />
                  {fieldErrors.website && (
                    <p className="mt-2 text-xs text-red-300">{fieldErrors.website}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-semibold text-foreground/80 mb-2 block"
                  >
                    Project Details *
                  </label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="What services do you offer, where do you serve, and where are leads dropping off today?"
                    required
                    rows={5}
                    aria-invalid={Boolean(fieldErrors.message)}
                    className="min-h-32 bg-[oklch(0.15_0.02_260)] border-border px-4 py-3 text-base leading-relaxed focus:border-brand-orange resize-none"
                  />
                  {fieldErrors.message && (
                    <p className="mt-2 text-xs text-red-300">{fieldErrors.message}</p>
                  )}
                </div>

                <input
                  type="text"
                  aria-hidden="true"
                  name="botcheck"
                  value={formData.botcheck}
                  onChange={handleChange}
                  autoComplete="off"
                  tabIndex={-1}
                  className="hidden"
                  style={{ display: "none" }}
                />

                <Button
                  type="submit"
                  disabled={formState === "sending"}
                  className="w-full min-h-14 bg-brand-orange hover:bg-brand-orange-bright text-white font-black py-6 text-base glow-orange transition-all duration-300 rounded-xl disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {formState === "sending" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : formState === "sent" ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Request Sent
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Book My Strategy Call
                    </>
                  )}
                </Button>

                {formState === "sent" && (
                  <p
                    id="contact-response-status"
                    role="status"
                    aria-live="polite"
                    className="rounded-xl border border-green-400/20 bg-green-400/10 px-4 py-3 text-center text-sm text-green-300"
                  >
                    Thanks. Your request was sent successfully, and I will get back to you soon.
                  </p>
                )}
                {formState === "error" && (
                  <div
                    id="contact-response-status"
                    role="alert"
                    className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200"
                  >
                    <p>
                      {errorMessage || "The form could not submit right now."}
                    </p>
                    <p className="mt-2 text-red-100/85">
                      Direct fallback: call/text{" "}
                      <a className="font-semibold underline underline-offset-4" href={`tel:${CONTACT_TEL}`}>
                        {CONTACT_PHONE}
                      </a>
                      {" "}or email{" "}
                      <a className="font-semibold underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>
                        {CONTACT_EMAIL}
                      </a>
                      .
                    </p>
                  </div>
                )}
              </form>
            </div>

            {/* Contact info sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-xl bg-[oklch(0.15_0.02_260)] border border-border">
                <h3 className="font-serif text-lg font-bold text-white mb-4">
                  Contact Details
                </h3>
                <div className="space-y-4">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="flex items-start gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center shrink-0 group-hover:bg-brand-orange/20 transition-colors">
                      <Mail className="w-4 h-4 text-brand-orange" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground/80 group-hover:text-brand-orange transition-colors">
                        Email Us
                      </div>
                      <div className="text-xs text-foreground/50">
                        {CONTACT_EMAIL}
                      </div>
                    </div>
                  </a>

                  <a
                    href="tel:+18285989262"
                    className="flex items-start gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center shrink-0 group-hover:bg-brand-orange/20 transition-colors">
                      <Phone className="w-4 h-4 text-brand-orange" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground/80 group-hover:text-brand-orange transition-colors">
                        Call Us
                      </div>
                      <div className="text-xs text-foreground/50">
                        {CONTACT_PHONE}
                      </div>
                    </div>
                  </a>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-brand-orange" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground/80">
                        Based in Sylva, NC
                      </div>
                      <div className="text-xs text-foreground/50">
                        Serving all of Western North Carolina
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center shrink-0">
                      <Globe className="w-4 h-4 text-brand-orange" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground/80">
                        Available Globally
                      </div>
                      <div className="text-xs text-foreground/50">
                        Remote projects welcome worldwide
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick promise */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-brand-orange/10 to-transparent border border-brand-orange/20">
                <h4 className="font-serif font-bold text-white mb-2">
                  What Happens on the Call
                </h4>
                <ul className="space-y-2">
                  {[
                    "Review of your current site and conversion flow",
                    "Breakdown of lead leaks hurting booked jobs",
                    "Prioritized roadmap for pages, SEO, and follow-up",
                    "Clear recommendation on fit and next steps",
                    "Zero pressure if it is not the right match",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-foreground/70"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={220}>
          <div className="mx-auto mt-10 grid max-w-md grid-cols-[auto_minmax(0,1fr)] items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
            <div className="relative w-[104px] overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] sm:w-[118px]">
              <img
                src={FOUNDER_PHOTO}
                alt="Jeremy Black - Founder of High Ridge Web Design"
                className="block h-auto w-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== FALLBACK_PHOTO) {
                    target.src = FALLBACK_PHOTO;
                  }
                }}
              />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-brand-orange">
                Founder-led
              </p>
              <p className="mt-2 text-lg font-black text-white">You work directly with Jeremy.</p>
              <p className="mt-2 text-sm leading-6 text-foreground/60">
                Small enough to stay personal. Focused enough to stay practical.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
