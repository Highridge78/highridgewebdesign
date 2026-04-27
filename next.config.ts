import type { NextConfig } from "next";

const config: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.highridgewebdesign.com" }],
        destination: "https://highridgewebdesign.com/:path*",
        permanent: true,
      },
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/results", destination: "/#results", permanent: true },
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/services/", destination: "/#services", permanent: true },
      { source: "/results/", destination: "/#results", permanent: true },
      { source: "/about/", destination: "/#about", permanent: true },
      { source: "/contact/", destination: "/#contact", permanent: true },
    ];
  },
};

export default config;
