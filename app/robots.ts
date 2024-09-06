import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/schedule/"],
    },
    sitemap: "https://www.schedtrack.com/sitemap.xml",
  };
}
