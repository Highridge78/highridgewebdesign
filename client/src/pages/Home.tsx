/**
 * Home — High Ridge Web Design
 * Single-page layout: conversion-focused structure for service businesses.
 * No pricing section per owner request.
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
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
      "Highridge Web Design | Contractor Websites That Generate Leads and Booked Jobs",
    description:
      "Highridge Web Design builds conversion-focused websites for contractors and service businesses that need more qualified leads, booked calls, and revenue growth.",
    canonicalPath: "/",
  });
  useEffect(() => {
    const scriptId = "home-local-business-schema";
    const existing = document.getElementById(scriptId);
    if (existing) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Highridge Web Design",
      url: "https://www.highridgewebdesign.com/",
      telephone: "+1-828-598-9262",
      email: "Jeremy@highridgewebdesign.com",
      areaServed: [
        "Western North Carolina",
        "Sylva, NC",
      ],
      description:
        "Highridge Web Design builds conversion-focused websites and lead generation systems for contractors and local service businesses.",
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
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ResultsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
