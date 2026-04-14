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

export default function Home() {
  usePageMeta({
    title:
      "Highridge Web Design | Contractor Websites That Generate Leads and Booked Jobs",
    description:
      "Highridge Web Design builds conversion-focused websites for contractors and service businesses that need more qualified leads, booked calls, and revenue growth.",
  });

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
