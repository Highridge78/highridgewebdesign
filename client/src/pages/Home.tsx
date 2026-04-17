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
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Home() {
  usePageMeta({
    title: "High Ridge Web Design | Web Design, SEO, AI Bots & Automation",
    description:
      "High Ridge Web Design helps local service businesses get more calls and leads with fast websites, SEO visibility, AI chatbots, and automation systems.",
    canonicalUrl: "https://highridgewebdesign.com/",
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "High Ridge Web Design",
      description:
        "Web design, SEO, AI chatbots, and automation for local service businesses.",
      areaServed: [
        "Sylva, NC",
        "Western North Carolina",
        "United States",
      ],
      telephone: "+1-828-598-9262",
      email: "Jeremy@highridgewebdesign.com",
      url: "https://highridgewebdesign.com/",
      sameAs: [],
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <ServicesSection />
        <ResultsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
