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
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      if (location === "/") {
        const el = document.querySelector(href);
        if (el) {
          const navHeight = scrolled ? 72 : 96;
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
          ? "bg-[oklch(0.08_0.02_260/0.98)] backdrop-blur-md shadow-2xl py-2"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container flex items-center justify-between px-6">
        {/* Logo — Enhanced size for authority */}
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
          className="flex items-center shrink-0 min-w-[200px]"
        >
          <img
            src={LOGO_PATH}
            alt="High Ridge Web Design"
            className={`w-auto transition-all duration-300 object-contain ${
              scrolled ? "h-12 md:h-16" : "h-16 md:h-24"
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
            className="bg-brand-orange hover:bg-brand-orange-bright text-white font-bold px-10 py-7 text-base rounded-xl shadow-xl shadow-brand-orange/40 transition-all hover:scale-[1.05] active:scale-95 glow-orange"
          >
            Get My Free Audit
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-foreground p-3 focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[oklch(0.10_0.02_260/0.99)] backdrop-blur-3xl border-t border-white/5 p-10 space-y-8 shadow-2xl">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="block text-xl font-bold uppercase tracking-widest text-foreground/90 border-b border-white/5 pb-6"
            >
              {link.label}
            </a>
          ))}
          <Button
            onClick={() => handleNavClick("#contact")}
            className="w-full bg-brand-orange hover:bg-brand-orange-bright text-white font-bold py-10 text-xl rounded-2xl shadow-2xl shadow-brand-orange/40"
          >
            Get My Free Audit
          </Button>
        </div>
      )}
    </nav>
  );
}
