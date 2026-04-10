/**
 * Footer — High Ridge Web Design
 * Minimal dark footer with logo, links, and copyright.
 */
import { Mail, ArrowUp } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663455642890/NdrKoxrvNzAjAncKbyczK5/logo-trimmed_4ca12aee.png";

const CONTACT_EMAIL = "Jeremy@highridgewebdesign.com";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Results", href: "#results" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border bg-[oklch(0.08_0.02_260)]">
      <ScrollReveal>
        <div className="container py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Logo & tagline */}
            <div>
              <img
                src={LOGO_URL}
                alt="High Ridge Web Design"
                className="h-12 w-auto mb-4"
              />
              <p className="text-sm text-foreground/50 leading-relaxed max-w-xs">
                Design. Automate. Grow. — We build websites, AI bots, and
                automations that help local businesses thrive.
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
                    className="text-sm text-foreground/50 hover:text-brand-orange transition-colors"
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
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-brand-orange transition-colors"
              >
                <Mail className="w-4 h-4" />
                {CONTACT_EMAIL}
              </a>
              <p className="text-sm text-foreground/40 mt-2">
                Serving local businesses nationwide
              </p>
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
