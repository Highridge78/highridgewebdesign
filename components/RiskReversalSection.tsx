import { ShieldCheck, CheckCircle2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const guarantees = [
  "If your new site doesn't outscore your old one on Beacon, we rebuild it free.",
  "Fixed pricing on every package — no scope creep, no surprise invoices.",
  "You own everything: code, domain, content, hosting account. No lock-in.",
  "If we're not the right fit, we'll tell you on the first call and point you somewhere better.",
];

export default function RiskReversalSection() {
  return (
    <section className="relative py-16 md:py-20 bg-[oklch(0.10_0.02_260)]">
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl rounded-2xl border border-brand-orange/20 bg-gradient-to-br from-[oklch(0.14_0.03_50)] to-[oklch(0.11_0.02_260)] p-8 sm:p-10 shadow-[0_30px_80px_-40px_rgba(255,106,0,0.2)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-orange/15 border border-brand-orange/25">
                <ShieldCheck className="h-6 w-6 text-brand-orange" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Zero-Risk Guarantee
              </h2>
            </div>

            <ul className="space-y-4">
              {guarantees.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-base text-foreground/75 leading-relaxed"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
