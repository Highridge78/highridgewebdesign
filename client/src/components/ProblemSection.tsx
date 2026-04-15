import { AlertTriangle, UserX, ShieldX, MessageSquareX } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

const problemPoints = [
  {
    icon: MessageSquareX,
    title: "Unclear Messaging",
    description:
      "Visitors land on your site and still don't understand what you do or why they should call you.",
  },
  {
    icon: UserX,
    title: "Lost Leads",
    description:
      "People click around, get confused, and leave without calling, booking, or filling out your form.",
  },
  {
    icon: ShieldX,
    title: "Weak Trust Signals",
    description:
      "Outdated pages, inconsistent branding, and generic copy make your business feel risky to buyers.",
  },
  {
    icon: AlertTriangle,
    title: "Low Conversion Rates",
    description:
      "Traffic alone doesn't grow revenue. If your site can't convert visitors, your marketing spend gets wasted.",
  },
];

export default function ProblemSection() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="problem" className="relative py-20 md:py-24">
      <div className="absolute inset-0 bg-[oklch(0.10_0.02_260)]" />

      <div className="relative z-10 container">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
              Why Most Websites Fail
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 max-w-4xl mx-auto">
              Most Service Business Websites Look Fine, But{" "}
              <span className="text-gradient-orange">Still Lose Jobs</span>
            </h2>
            <p className="mt-4 text-foreground/60 max-w-3xl mx-auto text-lg">
              If your website isn't built to guide action, build trust fast, and
              make contacting you effortless, potential customers leave and hire
              someone else.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problemPoints.map((point, index) => (
            <ScrollReveal key={point.title} delay={index * 100}>
              <div className="h-full rounded-xl border border-border bg-[oklch(0.15_0.02_260)] p-6 hover:border-brand-orange/40 transition-all duration-300">
                <div className="w-11 h-11 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-4">
                  <point.icon className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-3">
                  {point.title}
                </h3>
                <p className="text-foreground/65 leading-relaxed text-sm">
                  {point.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={200}>
          <div className="mt-10 text-center">
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-brand-orange hover:bg-brand-orange-bright text-white font-semibold text-base px-8 py-6 glow-orange transition-all duration-300 rounded-lg"
            >
              See How Your Website Can Generate More Leads
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
