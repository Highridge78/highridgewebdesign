import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";
import BrandLogo from "./BrandLogo";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Why Choose Us", href: "#about" },
  { label: "Gallery", href: "#results" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, setLocation] = useLocation();

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
      className="fixed top-0 left-0 right-0 z-50 bg-[oklch(0.13_0.03_250/0.95)] backdrop-blur-md shadow-lg shadow-black/35 border-b border-brand-orange/20"
    >
      <div
        className="container flex items-center justify-between h-20 md:h-24"
      >
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
          className="flex items-center shrink-0 py-2 pr-4 mr-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/70"
          aria-label="Frady's Flooring homepage"
        >
          <BrandLogo
            priority
            imgClassName="h-14 md:h-16 drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
          />
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
                  : "text-foreground/90 hover:text-brand-orange-bright"
              }`}
            >
              {link.label}
            </a>
          ))}
          <Button
            onClick={() => handleNavClick("#contact")}
            className="bg-brand-orange hover:bg-brand-orange-bright text-white font-semibold px-6 glow-orange transition-all duration-300"
          >
            Request Free Estimate
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-foreground p-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/70"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[oklch(0.13_0.03_250/0.98)] backdrop-blur-md border-t border-border">
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
                    : "text-foreground/95 hover:text-brand-orange-bright"
                }`}
              >
                {link.label}
              </a>
            ))}
            <Button
              onClick={() => handleNavClick("#contact")}
              className="bg-brand-orange hover:bg-brand-orange-bright text-white font-semibold mt-2 glow-orange"
            >
              Request Free Estimate
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
