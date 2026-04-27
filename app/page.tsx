import HeroSection from "@/components/HeroSection";
import OpportunityScorecard from "@/components/OpportunityScorecard";
import ProofBar from "@/components/ProofBar";
import LeadImpactCalculator from "@/components/LeadImpactCalculator";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ResultsSection from "@/components/ResultsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "High Ridge Web Design",
  url: "https://highridgewebdesign.com/",
  telephone: "+1-828-598-9262",
  email: "jeremy@highridgewebdesign.com",
  areaServed: ["Western North Carolina", "Sylva, NC"],
  description:
    "High Ridge Web Design builds conversion-focused websites and lead generation systems for contractors and local service businesses.",
  sameAs: [],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <HeroSection />
      <OpportunityScorecard />
      <ProofBar />
      <LeadImpactCalculator />
      <ServicesSection />
      <AboutSection />
      <ResultsSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
