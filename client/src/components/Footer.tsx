import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { useLocation } from "wouter";

const LOGO_PATH = "/new-logo.png";
const CONTACT_EMAIL = "Jeremy@highridgewebdesign.com";
const CONTACT_PHONE = "(828) 598-9262";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Demo Sites", href: "/demos" },
];

export default function Footer() {
  const [location, setLocation] = useLocation();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

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
    <footer className="relative border-t border-white/5 bg-[oklch(0.08_0.02_260)] py-20">
      <div className="container px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <a href="/" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="block w-fit">
              <img
                src={LOGO_PATH}
                alt="High Ridge Web Design"
                className="h-20 w-auto object-contain brightness-110"
                loading="lazy"
              />
            </a>
            <p className="text-base text-foreground/50 leading-relaxed max-w-sm">
              We help local service businesses turn underperforming websites into lead-generating machines. Design. Automate. Grow.
            </p>
            <div className="pt-4 space-y-2">
              <p className="text-sm font-bold text-white uppercase tracking-widest">Jeremy Black</p>
              <p className="text-xs text-foreground/40 uppercase tracking-widest">Founder — Sylva, North Carolina</p>
            </div>
          </div>

          {/* Nav Column */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/90">Navigation</h4>
            <nav className="flex flex-col gap-4">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-sm font-medium text-foreground/50 hover:text-brand-orange transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/90">Contact</h4>
            <div className="flex flex-col gap-4">
              <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 text-sm text-foreground/50 hover:text-brand-orange transition-colors">
                <Mail size={16} className="text-brand-orange" />
                {CONTACT_EMAIL}
              </a>
              <a href={`tel:+18285989262`} className="flex items-center gap-3 text-sm text-foreground/50 hover:text-brand-orange transition-colors">
                <Phone size={16} className="text-brand-orange" />
                {CONTACT_PHONE}
              </a>
              <div className="flex items-start gap-3 text-sm text-foreground/50">
                <MapPin size={16} className="text-brand-orange mt-1 shrink-0" />
                <span>Serving all of Western North Carolina & Globally available.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal/Bottom Bar */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs font-medium text-foreground/30">
            &copy; {new Date().getFullYear()} High Ridge Web Design. Built for Conversion.
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/40 hover:text-white transition-all"
          >
            Back to Top
            <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform text-brand-orange" />
          </button>
        </div>
      </div>
    </footer>
  );
}
