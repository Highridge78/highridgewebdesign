import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Loader2,
  ArrowRight,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const CONTACT_EMAIL = "estimates@fradysflooring.com";
const CONTACT_PHONE = "(828) 555-0147";

export default function ContactSection() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    message: "",
    botcheck: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    setErrorMessage("");

    const subject = encodeURIComponent(
      `New Lead from ${formData.name} — ${formData.business || "Website Inquiry"}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nBusiness: ${formData.business}\n\nMessage:\n${formData.message}`
    );

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          business: formData.business,
          message: formData.message,
          botcheck: formData.botcheck,
        }),
      });

      if (res.ok) {
        setFormState("sent");
        setFormData({ name: "", email: "", phone: "", business: "", message: "", botcheck: "" });
        return;
      }

      const payload = await res.json().catch(() => null);
      const message =
        typeof payload?.message === "string"
          ? payload.message
          : "Unable to submit your request right now.";
      setFormState("error");
      setErrorMessage(message);
    } catch {
      setFormState("error");
      setErrorMessage("Network issue detected. Opening your email app as a fallback.");
    }

    // Last-resort fallback to mailto to avoid losing lead details.
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setFormData({ name: "", email: "", phone: "", business: "", message: "", botcheck: "" });
  };

  return (
    <section id="contact" className="relative py-20 md:py-24">
      <div className="absolute inset-0 bg-[oklch(0.13_0.03_250)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-orange/[0.04] rounded-full blur-3xl" />

      <div className="relative z-10 container">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
              Request an Estimate
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
              Let&apos;s Talk About{" "}
              <span className="text-gradient-orange">Your Flooring Project</span>
            </h2>
            <p className="mt-4 text-foreground/60 max-w-2xl mx-auto">
              Share a few details about your space and we will follow up with next
              steps for a clear, no-pressure estimate.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Form */}
            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                noValidate
                aria-describedby="contact-response-status"
              >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="text-sm font-medium text-foreground/70 mb-1.5 block"
                    >
                      Your Name *
                    </label>
                    <Input
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      required
                      className="bg-[oklch(0.18_0.03_249)] border-border focus:border-brand-orange"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="text-sm font-medium text-foreground/70 mb-1.5 block"
                    >
                      Email Address *
                    </label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@email.com"
                      required
                      className="bg-[oklch(0.18_0.03_249)] border-border focus:border-brand-orange"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="text-sm font-medium text-foreground/70 mb-1.5 block"
                    >
                      Phone Number
                    </label>
                    <Input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                      className="bg-[oklch(0.18_0.03_249)] border-border focus:border-brand-orange"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-business"
                      className="text-sm font-medium text-foreground/70 mb-1.5 block"
                    >
                      Home / Project Name
                    </label>
                    <Input
                      id="contact-business"
                      name="business"
                      value={formData.business}
                      onChange={handleChange}
                      placeholder="Smith Home Remodel"
                      className="bg-[oklch(0.18_0.03_249)] border-border focus:border-brand-orange"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-medium text-foreground/70 mb-1.5 block"
                  >
                    Tell Us About Your Project *
                  </label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us the rooms involved, current floor condition, and your project timeline."
                    required
                    rows={4}
                    className="bg-[oklch(0.18_0.03_249)] border-border focus:border-brand-orange resize-none"
                  />
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
                  className="w-full bg-brand-orange hover:bg-brand-orange-bright text-white font-semibold py-6 text-base glow-orange transition-all duration-300 rounded-lg"
                >
                  {formState === "sending" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : formState === "sent" ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Request My Free Estimate
                    </>
                  )}
                </Button>

                {formState === "sent" && (
                  <p
                    id="contact-response-status"
                    role="status"
                    aria-live="polite"
                    className="text-center text-sm text-green-400"
                  >
                    Thanks. We will reach out shortly with estimate details.
                  </p>
                )}
                {formState === "error" && (
                  <p
                    id="contact-response-status"
                    role="alert"
                    className="text-center text-sm text-red-400"
                  >
                    {errorMessage || "Something went wrong while sending your message."}
                  </p>
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
                    href="tel:+18285550147"
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
                        Serving Western North Carolina communities
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-brand-orange/10 to-transparent border border-brand-orange/20">
                <h4 className="font-serif font-bold text-white mb-2">
                  What Happens Next
                </h4>
                <ul className="space-y-2">
                  {[
                    "Quick review of your project scope",
                    "Recommended service approach",
                    "Expected timeline and scheduling window",
                    "Transparent pricing conversation",
                    "Clear next steps to get started",
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
              <a
                href="#services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-amber hover:text-brand-orange transition-colors"
              >
                Review services again
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
