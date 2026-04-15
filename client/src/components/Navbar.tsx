/**
 * Navbar — High Ridge Web Design
 * Design: Dark sticky nav with logo, smooth-scroll links, and CTA button.
 * Brand: Deep black bg, fiery orange accent, IBM Plex Serif headings, Inter body.
 */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";

const LOGO_FALLBACK = "/new-logo-640.webp";
const LOGO_AVIF = "/new-logo-320.avif";
const LOGO_WEBP = "/new-logo-320.webp";

const NAV_LINKS = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "What You Get", href: "#outcomes" },
  { label: "Process", href: "#process" },
  { label: "Proof", href: "#proof" },
  { label: "Demo Sites", href: "/demos" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      if (location === "/") {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.location.href = `/${href}`;
      }
      return;
    }

    setLocation(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.08_0.02_260/0.95)] backdrop-blur-md shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-[7.5rem] md:h-[10.5rem]">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (location === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              setLocation("/");
            }
          }}
          className="flex items-center shrink-0"
        >
          <picture>
            <source srcSet={LOGO_AVIF} type="image/avif" />
            <source srcSet={LOGO_WEBP} type="image/webp" />
            <img
              src={LOGO_FALLBACK}
              alt="High Ridge Web Design"
              className="h-[7.5rem] md:h-[10.5rem] w-auto"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width={320}
              height={320}
            />
          </picture>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href.startsWith("#") ? link.href : link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              aria-current={
                !link.href.startsWith("#") && location.startsWith(link.href) ? "page" : undefined
              }
              className={`text-sm font-medium transition-colors duration-200 tracking-wide uppercase ${
                !link.href.startsWith("#") && location.startsWith(link.href)
                  ? "text-brand-orange"
                  : "text-foreground/70 hover:text-brand-orange-bright"
              }`}
            >
              {link.label}
            </a>
          ))}
          <Button
            onClick={() => handleNavClick("#contact")}
            className="bg-brand-orange hover:bg-brand-orange-bright text-white font-semibold px-6 glow-orange transition-all duration-300"
          >
            Get a Free Website &amp; Lead Audit
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[oklch(0.10_0.02_260/0.98)] backdrop-blur-md border-t border-border">
          <div className="container py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href.startsWith("#") ? link.href : link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                aria-current={
                  !link.href.startsWith("#") && location.startsWith(link.href) ? "page" : undefined
                }
                className={`text-base font-medium py-2 transition-colors uppercase tracking-wide ${
                  !link.href.startsWith("#") && location.startsWith(link.href)
                    ? "text-brand-orange"
                    : "text-foreground/80 hover:text-brand-orange-bright"
                }`}
              >
                {link.label}
              </a>
            ))}
            <Button
              onClick={() => handleNavClick("#contact")}
              className="bg-brand-orange hover:bg-brand-orange-bright text-white font-semibold mt-2 glow-orange"
            >
              Get a Free Website &amp; Lead Audit
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
