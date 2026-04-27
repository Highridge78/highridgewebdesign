import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.highridgewebdesign.com"),
  title: {
    default:
      "High Ridge Web Design | Contractor Websites That Generate Leads and Booked Jobs",
    template: "%s | High Ridge Web Design",
  },
  description:
    "High Ridge Web Design builds conversion-focused websites for contractors and service businesses that need more qualified leads, booked calls, and revenue growth.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "High Ridge Web Design | Contractor Websites That Generate Leads and Booked Jobs",
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
