/**
 * Home — High Ridge Web Design
 * Single-page layout: Navbar, Hero, Services, About, Results, Contact, Footer.
 * No pricing section per owner request.
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import CostOfInactionSection from "@/components/CostOfInactionSection";
import AuditOfferSection from "@/components/AuditOfferSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ResultsSection from "@/components/ResultsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <CostOfInactionSection />
      <AuditOfferSection />
      <ServicesSection />
      <AboutSection />
      <ResultsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
