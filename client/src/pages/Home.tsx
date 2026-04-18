import { useEffect } from "react";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ResultsSection from "@/components/ResultsSection";
import ServicesSection from "@/components/ServicesSection";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Home() {
  usePageMeta({
    title: "Frady's Flooring | Hardwood Installation and Refinishing in Western NC",
    description:
      "Frady's Flooring delivers hardwood installation, sanding, refinishing, and repair services across Western North Carolina with craftsmanship homeowners trust.",
    canonicalPath: "/",
  });

  useEffect(() => {
    const scriptId = "home-local-business-schema";
    const existing = document.getElementById(scriptId);
    if (existing) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Frady's Flooring",
      image: "/files/fradys-logo.png",
      areaServed: [
        "Sylva, NC",
        "Waynesville, NC",
        "Franklin, NC",
        "Asheville, NC",
        "Western North Carolina",
      ],
      description:
        "Family-owned flooring company serving Western North Carolina with hardwood floor installation, sanding, refinishing, and repairs.",
      serviceType: [
        "Hardwood Installation",
        "Sanding and Refinishing",
        "Floor Repair",
      ],
    };

    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header>
        <Navbar />
      </header>
      <main id="main-content">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ResultsSection />
        <ContactSection />
      </main>
      <a
        href="#contact"
        className="fixed inset-x-3 bottom-3 z-40 rounded-lg bg-brand-orange px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_8px_28px_rgba(0,0,0,0.35)] md:hidden"
      >
        Request a Free Estimate
      </a>
      <Footer />
    </div>
  );
}
