import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/account/"],
      },
    ],
    sitemap: "https://luxeshoplondon.co.uk/sitemap.xml",
    host: "https://luxeshoplondon.co.uk",
  };
}
