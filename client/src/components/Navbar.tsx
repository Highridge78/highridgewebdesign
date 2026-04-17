import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";

const LOGO_PLACEHOLDER = "/logo-trimmed-512.webp";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#proof" },
  { label: "Portfolio", href: "#portfolio" },
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
    <header
      className={`sticky top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-white/10 bg-[oklch(0.08_0.02_260/0.95)] backdrop-blur-md shadow-lg shadow-black/30"
          : "border-transparent bg-[oklch(0.08_0.02_260/0.82)] backdrop-blur-sm"
      }`}
    >
      <div className="container flex min-h-20 items-center justify-between gap-4 py-3">
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
          className="flex items-center gap-3 shrink-0"
        >
          <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-md border border-white/15 bg-white/5 sm:h-14 sm:w-14">
            <img
              src={LOGO_PLACEHOLDER}
              alt="High Ridge Web Design logo"
              className="h-full w-full object-contain"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width={56}
              height={56}
            />
          </span>
          <span className="hidden text-sm font-semibold uppercase tracking-[0.18em] text-white/80 sm:inline">
            High Ridge Web Design
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6" aria-label="Primary navigation">
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
              className={`text-sm font-medium transition-colors duration-200 tracking-wide uppercase py-2 ${
                !link.href.startsWith("#") && location.startsWith(link.href)
                  ? "text-brand-orange"
                  : "text-foreground/75 hover:text-brand-orange-bright"
              }`}
            >
              {link.label}
            </a>
          ))}
          <Button
            onClick={() => handleNavClick("#contact")}
            className="bg-brand-orange hover:bg-brand-orange-bright text-white font-semibold px-6 min-h-11 glow-orange transition-all duration-300"
          >
            Get Free Audit
          </Button>
        </nav>

        <button
          className="md:hidden text-foreground p-2 rounded-md border border-white/15 bg-white/5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav"
          className="md:hidden border-t border-white/10 bg-[oklch(0.10_0.02_260/0.98)] backdrop-blur-md"
          aria-label="Mobile navigation"
        >
          <div className="container py-4 flex flex-col gap-2">
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
                className={`text-base font-medium py-3 transition-colors uppercase tracking-wide ${
                  !link.href.startsWith("#") && location.startsWith(link.href)
                    ? "text-brand-orange"
                    : "text-foreground/85 hover:text-brand-orange-bright"
                }`}
              >
                {link.label}
              </a>
            ))}
            <Button
              onClick={() => handleNavClick("#contact")}
              className="bg-brand-orange hover:bg-brand-orange-bright text-white font-semibold mt-2 min-h-11 glow-orange"
            >
              Get Free Audit
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
