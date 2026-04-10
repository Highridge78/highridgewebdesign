/**
 * Home — High Ridge Web Design
 * Single-page layout: Navbar, Hero, Services, About, Results, Contact, Footer.
 * No pricing section per owner request.
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
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
      <ServicesSection />
      <AboutSection />
      <ResultsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
