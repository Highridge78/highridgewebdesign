/**
 * Footer — High Ridge Web Design
 * Compact footer with contact details and utility nav.
 */
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useLocation } from "wouter";

const CONTACT_EMAIL = "Jeremy@highridgewebdesign.com";
const CONTACT_PHONE = "(828) 598-9262";

const footerLinks = [
  { label: "Demo Sites", href: "/demos" },
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#proof" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const [location, setLocation] = useLocation();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith("/")) {
      setLocation(href);
      return;
    }

    if (href.startsWith("#")) {
      if (location === "/") {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = `/${href}`;
      }
    }
  };

  return (
    <footer className="relative border-t border-border bg-[oklch(0.08_0.02_260)]">
      <ScrollReveal>
        <div className="container py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Brand */}
            <div>
              <picture>
                <source srcSet="/logo-trimmed-256.avif" type="image/avif" />
                <source srcSet="/logo-trimmed-256.webp" type="image/webp" />
                <img
                  src="/logo-trimmed-512.webp"
                  alt="High Ridge Web Design"
                  className="mb-4 h-16 w-16 rounded-md border border-white/15 bg-white/5 object-contain"
                  loading="lazy"
                  decoding="async"
                  width={64}
                  height={64}
                />
              </picture>
              <p className="max-w-xs text-sm leading-relaxed text-foreground/50">
                High Ridge Web Design builds conversion-focused websites, local SEO systems, and lead automation for
                service businesses.
              </p>
              <p className="text-xs text-foreground/40 mt-3">
                Founded by Jeremy Black in Sylva, NC
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white font-serif">
                Quick Links
              </h4>
              <nav className="flex flex-col gap-2">
                {footerLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-sm text-foreground/55 transition-colors hover:text-brand-orange"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white font-serif">
                Contact
              </h4>
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 text-sm text-foreground/55 transition-colors hover:text-brand-orange"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  {CONTACT_EMAIL}
                </a>
                <a
                  href="tel:+18285989262"
                  className="inline-flex items-center gap-2 text-sm text-foreground/55 transition-colors hover:text-brand-orange"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  {CONTACT_PHONE}
                </a>
                <div className="inline-flex items-start gap-2 text-sm text-foreground/40">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    Sylva, NC — Proudly serving Western North Carolina
                    <br />
                    <span className="text-foreground/30">Also available globally for remote projects</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-foreground/40">
              &copy; {new Date().getFullYear()} High Ridge Web Design. All rights
              reserved.
            </p>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs text-foreground/40 hover:text-brand-orange transition-colors"
              aria-label="Back to top"
            >
              Back to top
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}
