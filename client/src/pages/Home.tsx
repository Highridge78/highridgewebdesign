/**
 * Home — High Ridge Web Design
 * Single-page layout: Navbar, Hero, Services, About, Results, Contact, Footer.
 * No pricing section per owner request.
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustStripSection from "@/components/TrustStripSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import DemoConversionSection from "@/components/DemoConversionSection";
import PainPointSection from "@/components/PainPointSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ResultsSection from "@/components/ResultsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <TrustStripSection />
        <BeforeAfterSection />
        <DemoConversionSection />
        <PainPointSection />
        <ServicesSection />
        <AboutSection />
        <ResultsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
