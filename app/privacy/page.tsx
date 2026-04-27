import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for High Ridge Web Design, including contact form data and anonymous site analytics.",
  alternates: {
    canonical: "https://highridgewebdesign.com/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-background py-20 text-foreground md:py-24">
      <div className="container max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-brand-orange/70">
          Privacy Policy
        </p>
        <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-white md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-foreground/50">Last updated: April 27, 2026</p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-foreground/70">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-white">Information We Collect</h2>
            <p>
              When you submit a contact form, High Ridge Web Design may collect your
              name, email address, phone number, website URL, business details, and
              message content. We also use Vercel Analytics to collect anonymous,
              aggregate usage data about site visits and performance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-white">How We Use Information</h2>
            <p>
              We use contact form information to respond to inquiries, prepare audit
              calls, provide requested services, and communicate about potential or
              active projects. We use anonymous analytics data to understand site
              performance and improve the website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-white">No Selling of Personal Data</h2>
            <p>
              We do not sell, rent, or trade personal information. We only share
              information when needed to operate the website, respond to your request,
              provide services, comply with legal obligations, or protect our rights.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-white">Data Deletion Requests</h2>
            <p>
              You can request that we delete your contact form information by emailing
              jeremy@highridgewebdesign.com. We will respond to deletion requests as
              soon as reasonably possible, unless retention is required for legal,
              security, or legitimate business reasons.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-white">Contact</h2>
            <p>
              For privacy questions or data requests, contact High Ridge Web Design at
              jeremy@highridgewebdesign.com.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
