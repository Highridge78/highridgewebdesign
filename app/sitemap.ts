import type { MetadataRoute } from "next";

const baseUrl = "https://www.highridgewebdesign.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/demos",
    "/demos/demo-conversion",
    "/demos/demo-premium",
    "/demos/demo-creative",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
