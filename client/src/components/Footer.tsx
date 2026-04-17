/**
 * Footer — High Ridge Web Design
 * Dark footer with logo, links, contact info, and copyright.
 * Jeremy Black, Founder — Sylva, NC | Western NC | Globally Available
 */
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useLocation } from "wouter";
import BrandLogo from "./BrandLogo";

const CONTACT_EMAIL = "Jeremy@highridgewebdesign.com";
const CONTACT_PHONE = "(828) 598-9262";

const footerLinks = [
  { label: "Demo Sites", href: "/demos" },
  { label: "How It Works", href: "#services" },
  { label: "Why Highridge", href: "#about" },
  { label: "Process", href: "#results" },
  { label: "Book a Call", href: "#contact" },
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
            {/* Logo & tagline */}
            <div>
              <a
                href="/"
                onClick={(event) => {
                  event.preventDefault();
                  setLocation("/");
                }}
                className="inline-flex rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/70"
                aria-label="Highridge Web Design homepage"
              >
                <BrandLogo
                  variant="footer"
                  className="mb-4 py-1"
                  imgClassName="h-8 md:h-9 opacity-95 drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
                />
              </a>
              <p className="text-sm text-foreground/70 leading-relaxed max-w-xs">
                We build conversion-focused websites and lead systems for
                contractors and service businesses that need more qualified jobs.
              </p>
              <p className="text-xs text-foreground/60 mt-3">
                Founded by Jeremy Black in Sylva, NC
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
                  href="tel:+18285989262"
                  className="inline-flex items-center gap-2 text-sm text-foreground/75 hover:text-brand-orange transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  {CONTACT_PHONE}
                </a>
                <div className="inline-flex items-start gap-2 text-sm text-foreground/65">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    Sylva, NC — Proudly serving Western North Carolina
                    <br />
                    <span className="text-foreground/50">Also available globally for remote projects</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-foreground/60">
              &copy; {new Date().getFullYear()} High Ridge Web Design. All rights
              reserved.
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
