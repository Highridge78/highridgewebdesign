import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useLocation } from "wouter";
import BrandLogo from "./BrandLogo";

const CONTACT_EMAIL = "estimates@fradysflooring.com";
const CONTACT_PHONE = "(828) 555-0147";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Why Choose Us", href: "#about" },
  { label: "Gallery", href: "#results" },
  { label: "Request Estimate", href: "#contact" },
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
    <footer className="relative border-t border-brand-orange/20 bg-[oklch(0.13_0.03_250)]">
      <ScrollReveal>
        <div className="container py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Logo & tagline */}
            <div>
              <a
                href="/"
                onClick={(event) => {
                  event.preventDefault();
                  setLocation("/");
                }}
                className="inline-flex rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/70"
                aria-label="Frady's Flooring homepage"
              >
                <BrandLogo
                  variant="footer"
                  className="mb-4 py-1"
                  imgClassName="h-14 md:h-16 opacity-95 drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
                />
              </a>
              <p className="text-sm text-foreground/70 leading-relaxed max-w-xs">
                Frady&apos;s Flooring installs, repairs, and refinishes hardwood floors
                for homeowners across Western North Carolina.
              </p>
              <p className="text-xs text-foreground/60 mt-3">
                Family-owned and operated in Sylva, NC
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-serif font-bold text-white mb-4 text-sm uppercase tracking-wider">
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
                    className="text-sm text-foreground/75 hover:text-brand-orange transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-serif font-bold text-white mb-4 text-sm uppercase tracking-wider">
                Contact
              </h4>
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 text-sm text-foreground/75 hover:text-brand-orange transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  {CONTACT_EMAIL}
                </a>
                <a
                  href="tel:+18285550147"
                  className="inline-flex items-center gap-2 text-sm text-foreground/75 hover:text-brand-orange transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  {CONTACT_PHONE}
                </a>
                <div className="inline-flex items-start gap-2 text-sm text-foreground/65">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    Sylva, NC — Proudly serving Western North Carolina
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-foreground/60">
              &copy; {new Date().getFullYear()} Frady&apos;s Flooring. All rights reserved.
            </p>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs text-foreground/60 hover:text-brand-orange transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/70"
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
