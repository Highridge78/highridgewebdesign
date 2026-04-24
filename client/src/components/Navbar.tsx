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
          const navHeight = scrolled ? 100 : 140;
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
          ? "bg-[oklch(0.08_0.02_260/0.99)] backdrop-blur-xl shadow-2xl py-4"
          : "bg-transparent py-10"
      }`}
    >
      <div className="container flex items-center justify-between px-8 gap-10">
        {/* Logo — Extreme scale for authority, flex-shrink-0 to prevent compression */}
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
          className="flex items-center flex-shrink-0"
        >
          <img
            src={LOGO_PATH}
            alt="High Ridge Web Design"
            className={`w-auto transition-all duration-500 object-contain block ${
              scrolled ? "h-20 md:h-28" : "h-28 md:h-56"
            }`}
            loading="eager"
            fetchPriority="high"
          />
        </a>

        {/* Desktop Links & CTA */}
        <div className="hidden lg:flex items-center gap-14">
          <div className="flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm font-black uppercase tracking-[0.2em] text-foreground/80 hover:text-brand-orange transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          
          <Button
            onClick={() => handleNavClick("#contact")}
            className="bg-brand-orange hover:bg-brand-orange-bright text-white font-black px-14 py-10 text-xl rounded-2xl shadow-2xl shadow-brand-orange/40 transition-all hover:scale-[1.05] active:scale-95 glow-orange"
          >
            Get My Free Audit
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-white p-3 focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={48} /> : <Menu size={48} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[oklch(0.08_0.02_260/1)] backdrop-blur-3xl border-t border-white/10 p-12 space-y-12 shadow-2xl min-h-screen">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="block text-4xl font-black uppercase tracking-widest text-foreground/90 border-b border-white/10 pb-10"
            >
              {link.label}
            </a>
          ))}
          <Button
            onClick={() => handleNavClick("#contact")}
            className="w-full bg-brand-orange hover:bg-brand-orange-bright text-white font-black py-12 text-3xl rounded-3xl shadow-2xl shadow-brand-orange/40"
          >
            Get My Free Audit
          </Button>
        </div>
      )}
    </nav>
  );
}
