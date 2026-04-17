import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";

const LOGO_PATH = "/new-logo.png";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      if (location === "/") {
        const el = document.querySelector(href);
        if (el) {
          const navHeight = scrolled ? 64 : 80;
          const target = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({ top: target, behavior: "smooth" });
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
          ? "bg-[oklch(0.08_0.02_260/0.98)] backdrop-blur-md shadow-xl py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container flex items-center justify-between px-6">
        {/* Logo */}
        <a
          href="/"
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
          <img
            src={LOGO_PATH}
            alt="High Ridge Web Design"
            className={`w-auto transition-all duration-300 ${
              scrolled ? "h-9 md:h-12" : "h-10 md:h-14"
            }`}
            loading="eager"
            fetchPriority="high"
          />
        </a>

        {/* Desktop Links & CTA */}
        <div className="hidden lg:flex items-center gap-12">
          <div className="flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-xs font-bold uppercase tracking-widest text-foreground/80 hover:text-brand-orange transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          
          <Button
            onClick={() => handleNavClick("#contact")}
            className="bg-brand-orange hover:bg-brand-orange-bright text-white font-bold px-8 py-6 rounded-lg shadow-lg shadow-brand-orange/30 transition-all hover:scale-[1.02] active:scale-95 glow-orange"
          >
            Get My Free Audit
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-foreground p-2 focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[oklch(0.10_0.02_260/0.99)] backdrop-blur-2xl border-t border-white/5 p-8 space-y-6 shadow-2xl">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="block text-lg font-bold uppercase tracking-widest text-foreground/90 border-b border-white/5 pb-4"
            >
              {link.label}
            </a>
          ))}
          <Button
            onClick={() => handleNavClick("#contact")}
            className="w-full bg-brand-orange hover:bg-brand-orange-bright text-white font-bold py-8 text-lg rounded-xl shadow-xl shadow-brand-orange/30"
          >
            Get My Free Audit
          </Button>
        </div>
      )}
    </nav>
  );
}
