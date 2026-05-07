import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://highridgewebdesign.com"),
  title: {
    default:
      "Contractor Websites That Generate Leads | Sylva, NC",
    template: "%s | High Ridge Web Design",
  },
  description:
    "High Ridge Web Design builds lead-generation websites for contractors and service businesses in Western NC. More calls, more booked jobs.",
  alternates: {
    canonical: "https://highridgewebdesign.com/",
  },
  openGraph: {
    title:
      "Contractor Websites That Generate Leads | Sylva, NC",
    description:
      "Conversion-focused websites and lead generation systems for contractors and local service businesses.",
    url: "/",
    siteName: "High Ridge Web Design",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Navbar />
        </header>
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
