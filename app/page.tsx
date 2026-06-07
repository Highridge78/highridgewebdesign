import HeroSection from "@/components/HeroSection";
import ProofBar from "@/components/ProofBar";
import FourPillarsSection from "@/components/FourPillarsSection";
import BeaconAuditSection from "@/components/BeaconAuditSection";
import ServicesSection from "@/components/ServicesSection";
import ResultsSection from "@/components/ResultsSection";
import FounderBlock from "@/components/FounderBlock";
import PricingSection from "@/components/PricingSection";
import RiskReversalSection from "@/components/RiskReversalSection";
import WhoWeWontWorkWith from "@/components/WhoWeWontWorkWith";
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
      <ProofBar />
      <FourPillarsSection />
      <BeaconAuditSection />
      <ServicesSection />
      <ResultsSection />
      <FounderBlock />
      <PricingSection />
      <RiskReversalSection />
      <WhoWeWontWorkWith />
      <FAQSection />
      <ContactSection />
    </>
  );
}
