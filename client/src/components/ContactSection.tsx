/**
 * ContactSection — High Ridge Web Design
 * Lead capture form + contact info. Form submits via Web3Forms API.
 * Jeremy Black — Sylva, NC | Western NC | Globally Available
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

const CONTACT_EMAIL = "Jeremy@highridgewebdesign.com";
const CONTACT_PHONE = "(828) 598-9262";
const WEB3FORMS_KEY = "87f4e030-820f-4c08-b796-f5efa493fbe7";

export default function ContactSection() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    const subject = encodeURIComponent(
      `New Lead from ${formData.name} — ${formData.business || "Website Inquiry"}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nBusiness: ${formData.business}\n\nMessage:\n${formData.message}`
    );

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          business: formData.business,
          message: formData.message,
          subject: `New Lead: ${formData.name} — ${formData.business || "Website Inquiry"}`,
        }),
      });

      if (res.ok) {
        setFormState("sent");
        setFormData({ name: "", email: "", phone: "", business: "", message: "" });
        return;
      }
    } catch {
      // Fallback to mailto
    }

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setFormState("sent");
    setFormData({ name: "", email: "", phone: "", business: "", message: "" });
  };

  return (
    <section id="contact" className="relative py-20 md:py-24">
      <div className="absolute inset-0 bg-[oklch(0.12_0.02_260)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-orange/[0.04] rounded-full blur-3xl" />

      <div className="relative z-10 container">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
              Get Started
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
              Claim Your{" "}
              <span className="text-gradient-orange">Free Audit</span>
            </h2>
            <p className="mt-4 text-foreground/60 max-w-2xl mx-auto">
              Tell us about your business and we'll show you exactly where
              you're losing leads — and how to fix it. No cost, no obligation.
            </p>
            <p className="mt-3 text-sm text-foreground/70">
              No pressure. No obligation. Just a quick look at how your site can improve.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground/70 mb-1.5 block">
                      Your Name *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      required
                      className="bg-[oklch(0.15_0.02_260)] border-border focus:border-brand-orange"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground/70 mb-1.5 block">
                      Email Address *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@business.com"
                      required
                      className="bg-[oklch(0.15_0.02_260)] border-border focus:border-brand-orange"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground/70 mb-1.5 block">
                      Phone Number
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                      className="bg-[oklch(0.15_0.02_260)] border-border focus:border-brand-orange"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground/70 mb-1.5 block">
                      Business Name
                    </label>
                    <Input
                      name="business"
                      value={formData.business}
                      onChange={handleChange}
                      placeholder="Smith's HVAC"
                      className="bg-[oklch(0.15_0.02_260)] border-border focus:border-brand-orange"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground/70 mb-1.5 block">
                      Website (Optional)
                    </label>
                    <Input
                      name="website"
                      value={(formData as typeof formData & { website?: string }).website ?? ""}
                      onChange={handleChange}
                      placeholder="https://yourbusiness.com"
                      className="bg-[oklch(0.15_0.02_260)] border-border focus:border-brand-orange"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground/70 mb-1.5 block">
                    Tell Us About Your Business *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="What does your business do? What's your biggest challenge with getting new customers online?"
                    required
                    rows={4}
                    className="bg-[oklch(0.15_0.02_260)] border-border focus:border-brand-orange resize-none"
                  />
                </div>

                <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

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
                      Get My Free Audit
                    </>
                  )}
                </Button>

                {formState === "sent" && (
                  <p className="text-center text-sm text-green-400">
                    Thanks! We'll be in touch within 24 hours.
                  </p>
                )}
              </form>
            </div>

            {/* Contact info sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-xl bg-[oklch(0.15_0.02_260)] border border-border">
                <h3 className="font-serif text-lg font-bold text-white mb-4">
                  Get In Touch
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
                  What You'll Get
                </h4>
                <ul className="space-y-2">
                  {[
                    "Complete digital presence audit",
                    "SEO & AI search visibility report",
                    "Competitor analysis breakdown",
                    "Custom automation roadmap",
                    "No-obligation strategy call",
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
      </div>
    </section>
  );
}
