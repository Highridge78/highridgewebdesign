/**
 * Home — High Ridge Web Design
 * Conversion flow: Hero -> Services -> Proof -> Contact CTA.
 */
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ResultsSection from "@/components/ResultsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { usePageMeta } from "@/hooks/usePageMeta";

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "High Ridge Web Design",
  url: "https://highridgewebdesign.com",
  description:
    "High Ridge Web Design builds conversion-focused websites, local SEO systems, and AI-powered automations for service businesses.",
  areaServed: ["Western North Carolina", "United States"],
  telephone: "+1-828-598-9262",
  email: "Jeremy@highridgewebdesign.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sylva",
    addressRegion: "NC",
    addressCountry: "US",
  },
};

export default function Home() {
  usePageMeta({
    title: "High Ridge Web Design | Websites, SEO & Automation for Local Businesses",
    description:
      "Get a conversion-focused website built for local service businesses. High Ridge Web Design helps you generate more calls and leads with fast sites, SEO, and automation.",
    keywords: "web design for local business, conversion-focused websites, local SEO services, AI chatbot automation",
  });

  useEffect(() => {
    const scriptId = "local-business-schema";
    let schemaEl = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!schemaEl) {
      schemaEl = document.createElement("script");
      schemaEl.type = "application/ld+json";
      schemaEl.id = scriptId;
      document.head.appendChild(schemaEl);
    }

    schemaEl.text = JSON.stringify(LOCAL_BUSINESS_SCHEMA);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <ResultsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
