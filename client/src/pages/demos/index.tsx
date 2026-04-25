import { ArrowRight, Gauge, Palette, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";

const demoOptions = [
  {
    title: "Conversion Focused",
    path: "/demos/demo-conversion",
    description:
      "A lead-first layout for local businesses that need more calls, form submissions, and booked jobs.",
    icon: Gauge,
    highlights: [
      "Immediate offer clarity",
      "Aggressive CTA positioning",
      "Objection handling sections",
    ],
  },
  {
    title: "Premium Agency",
    path: "/demos/demo-premium",
    description:
      "A high-ticket, elevated brand presentation designed to justify premium pricing and strategic positioning.",
    icon: Palette,
    highlights: [
      "Editorial service layout",
      "Refined typography hierarchy",
      "Consultative process framing",
    ],
  },
  {
    title: "AI-Powered",
    path: "/demos/demo-creative",
    description:
      "A differentiation-first concept showing how websites, chatbots, and automations work together as one system.",
    icon: Sparkles,
    highlights: [
      "AI + automation narrative",
      "Lead-to-close system breakdown",
      "Outcome and efficiency metrics",
    ],
  },
];

export default function DemosIndexPage() {
  usePageMeta({
    title: "Website Demo Concepts | High Ridge Web Design",
    description:
      "Compare three strategic homepage concepts built to improve conversion, positioning, and differentiation for local business websites.",
    canonicalPath: "/demos",
  });
  const canonicalHref =
    typeof window !== "undefined"
      ? `${window.location.origin}/demos`
      : "https://www.highridgewebdesign.com/demos";

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "High Ridge Website Demo Concepts",
    url: canonicalHref,
    description:
      "Three homepage concept directions for service businesses focused on conversion, positioning, and lead quality.",
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="relative py-16 md:py-20">
        <div className="absolute inset-0 bg-[oklch(0.10_0.02_260)]" />
        <div className="relative z-10 container">
          <div className="max-w-4xl">
            <p className="text-brand-orange uppercase tracking-widest text-sm font-semibold">
              Demo Navigation
            </p>
            <h1 className="mt-3 font-serif text-4xl md:text-6xl font-bold leading-tight">
              Website Demo Concepts
            </h1>
            <p className="mt-5 text-foreground/70 text-lg max-w-3xl">
              Explore three fully built homepage strategies designed for different
              business goals. Each concept improves clarity, trust, and conversion
              while showcasing your core services in a stronger sales flow.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {demoOptions.map((demo) => {
              const Icon = demo.icon;
              return (
                <article
                  key={demo.path}
                  className="rounded-2xl border border-border bg-[oklch(0.14_0.02_260)] p-6 md:p-7 flex flex-col"
                >
                  <div className="inline-flex items-center gap-2 text-brand-amber text-xs uppercase tracking-wider font-semibold">
                    <Icon className="w-4 h-4 text-brand-orange" />
                    Demo Concept
                  </div>
                  <h2 className="mt-3 font-serif text-2xl font-bold text-white">
                    {demo.title}
                  </h2>
                  <p className="mt-3 text-sm text-foreground/70 leading-relaxed flex-1">
                    {demo.description}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {demo.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="text-sm text-foreground/75 flex items-start gap-2"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={demo.path}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-orange hover:text-white transition-colors"
                  >
                    View Demo
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </article>
              );
            })}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground/80 hover:bg-white/5 hover:text-white transition-colors"
            >
              Back to main site
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-orange-bright transition-colors"
            >
              Request Your Version
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
