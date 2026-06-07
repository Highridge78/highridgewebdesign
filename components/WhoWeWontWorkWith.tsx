import { XCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const exclusions = [
  "E-commerce stores or product brands",
  "Restaurants, salons, or lifestyle businesses",
  "Agencies looking for white-label work",
  "Anyone who wants the cheapest option available",
  "Businesses outside Western North Carolina",
];

export default function WhoWeWontWorkWith() {
  return (
    <section className="relative py-16 md:py-20 bg-[oklch(0.12_0.02_260)]">
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-widest">
              Honest Fit Check
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-3 mb-8">
              Who We <span className="text-gradient-orange">Won&apos;t</span> Work With
            </h2>

            <div className="rounded-xl border border-white/10 bg-[oklch(0.13_0.02_260)] p-6 sm:p-8 text-left">
              <ul className="space-y-4">
                {exclusions.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-base text-foreground/65"
                  >
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400/70" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-foreground/45 border-t border-white/10 pt-5">
                We say no to most inquiries. It keeps our work sharp and our clients&apos; results strong.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
