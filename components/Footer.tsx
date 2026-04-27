"use client";

import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import BrandLogo from "./BrandLogo";

const CONTACT_EMAIL = "jeremy@highridgewebdesign.com";
const CONTACT_PHONE = "(828) 598-9262";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Demo Sites", href: "/demos" },
];

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleNavClick = (href: string) => {
    if (href.startsWith("/")) {
      router.push(href);
      return;
    }
    if (href.startsWith("#")) {
      if (pathname === "/") {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = `/${href}`;
      }
    }
  };

  return (
    <footer className="relative border-t border-white/5 bg-[oklch(0.08_0.02_260)] py-24">
      <div className="container px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
          
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="block w-fit">
              <BrandLogo variant="footer" imgClassName="max-h-16 md:max-h-20 brightness-110" />
            </Link>
            <p className="text-lg text-foreground/60 leading-relaxed max-w-sm">
              We help local service businesses turn underperforming websites into lead-generating machines. Design. Automate. Grow.
            </p>
            <div className="pt-4 space-y-2 border-t border-white/5 w-fit pr-10">
              <p className="text-base font-bold text-white uppercase tracking-widest">Jeremy Black</p>
              <p className="text-sm text-foreground/40 uppercase tracking-widest">Founder - Sylva, North Carolina</p>
            </div>
          </div>

          {/* Nav Column */}
          <div className="space-y-8">
            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-white/90 border-b border-white/5 pb-2">Navigation</h4>
            <nav className="flex flex-col gap-5">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-base font-medium text-foreground/50 hover:text-brand-orange transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Column */}
          <div className="space-y-8">
            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-white/90 border-b border-white/5 pb-2">Contact</h4>
            <div className="flex flex-col gap-6">
              <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-4 text-base text-foreground/50 hover:text-brand-orange transition-colors">
                <Mail size={20} className="text-brand-orange" />
                {CONTACT_EMAIL}
              </a>
              <a href={`tel:+18285989262`} className="flex items-center gap-4 text-base text-foreground/50 hover:text-brand-orange transition-colors">
                <Phone size={20} className="text-brand-orange" />
                {CONTACT_PHONE}
              </a>
              <div className="flex items-start gap-4 text-base text-foreground/50">
                <MapPin size={20} className="text-brand-orange mt-1 shrink-0" />
                <span>Serving all of Western North Carolina & Globally available.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal/Bottom Bar */}
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-sm font-medium text-foreground/30">
            &copy; {new Date().getFullYear()} High Ridge Web Design. Results driven.
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-foreground/40 hover:text-white transition-all"
          >
            Back to Top
            <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform text-brand-orange" />
          </button>
        </div>
      </div>
    </footer>
  );
}
