/**
 * Home — High Ridge Web Design
 * Single-page layout focused on conversion-first messaging.
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import WhatYouGetSection from "@/components/WhatYouGetSection";
import ProcessSection from "@/components/ProcessSection";
import ProofSection from "@/components/ProofSection";
import WhoThisIsForSection from "@/components/WhoThisIsForSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <WhatYouGetSection />
      <ProcessSection />
      <ProofSection />
      <WhoThisIsForSection />
      <FinalCtaSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
