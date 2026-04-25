/**
 * Home — High Ridge Web Design
 * Single-page layout: conversion-focused structure for service businesses.
 * No pricing section per owner request.
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import OpportunityScorecard from "@/components/OpportunityScorecard";
import ProofBar from "@/components/ProofBar";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ResultsSection from "@/components/ResultsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useEffect } from "react";

export default function Home() {
  usePageMeta({
    title:
      "High Ridge Web Design | Contractor Websites That Generate Leads and Booked Jobs",
    description:
      "High Ridge Web Design builds conversion-focused websites for contractors and service businesses that need more qualified leads, booked calls, and revenue growth.",
    canonicalPath: "/",
  });
  useEffect(() => {
    const scriptId = "home-local-business-schema";
    const existing = document.getElementById(scriptId);
    if (existing) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "High Ridge Web Design",
      url: "https://www.highridgewebdesign.com/",
      telephone: "+1-828-598-9262",
      email: "jeremy@highridgewebdesign.com",
      areaServed: [
        "Western North Carolina",
        "Sylva, NC",
      ],
      description:
        "High Ridge Web Design builds conversion-focused websites and lead generation systems for contractors and local service businesses.",
      sameAs: [],
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
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <header>
        <Navbar />
      </header>
      <main id="main-content">
        <HeroSection />
        <OpportunityScorecard />
        <ProofBar />
        <ServicesSection />
        <AboutSection />
        <ResultsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
