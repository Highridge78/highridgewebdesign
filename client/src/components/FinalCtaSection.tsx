import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function FinalCtaSection() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-20 md:py-24">
      <div className="absolute inset-0 bg-[oklch(0.10_0.02_260)]" />
      <div className="relative z-10 container">
        <ScrollReveal>
          <div className="rounded-2xl border border-brand-orange/20 bg-gradient-to-br from-[oklch(0.15_0.03_50)] to-[oklch(0.12_0.02_260)] p-8 md:p-12 text-center max-w-4xl mx-auto">
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
              Ready to Fix Your Funnel
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
              Stop Losing Leads to a Weak Website
            </h2>
            <p className="mt-4 text-foreground/70 max-w-2xl mx-auto">
              We&apos;ll show you exactly where your current site is losing leads
              and how to fix it.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={scrollToContact}
                className="bg-brand-orange hover:bg-brand-orange-bright text-white font-semibold px-8 py-6 rounded-lg glow-orange transition-all duration-300"
                size="lg"
              >
                Get a Free Website &amp; Lead Audit
              </Button>
              <Button
                onClick={scrollToContact}
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-6 rounded-lg"
              >
                See How Your Website Can Generate More Leads
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
