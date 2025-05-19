import { MetadataRoute } from "next";
import { headerNavLinks } from "~/components/layout/Header";

interface RouteEntry {
  path: string;
  priority: number;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
}

const getSitemapRoutes = (): RouteEntry[] => {
  const navLinks = Array.isArray(headerNavLinks) ? headerNavLinks : [];
  const routes = navLinks.map((link) => ({
    path: link.href,
    priority: link.href === "/" ? 1.0 : 0.8,
    changeFrequency: "weekly" as const,
  }));

  const subpages: RouteEntry[] = [
    {
      path: "/dreps/profile",
      priority: 0.7,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/dreps/registration",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/governance/actions",
      priority: 0.7,
      changeFrequency: "daily" as const,
    },
    {
      path: "/governance/votes",
      priority: 0.7,
      changeFrequency: "daily" as const,
    },
    {
      path: "/proposals/details",
      priority: 0.7,
      changeFrequency: "daily" as const,
    },
    {
      path: "/proposals/create",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/cookie-policy",
      priority: 0.5,
      changeFrequency: "yearly" as const,
    },
    {
      path: "/privacy-policy",
      priority: 0.5,
      changeFrequency: "yearly" as const,
    },
    {
      path: "/terms",
      priority: 0.5,
      changeFrequency: "yearly" as const,
    },
    // Removed the sitemap-page entry
  ];

  return [...routes, ...subpages];
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL || "https://governance.space";
  let routes: RouteEntry[] = [];

  try {
    routes = getSitemapRoutes();
  } catch (error) {
    console.error("Error generating sitemap routes:", error);
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1.0,
      },
    ];
  }

  const supportedLocales = ["en-us", "pt"];
  const sitemap: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    // Create main entry
    sitemap.push({
      url: `${baseUrl}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    });

    // Add localized entries
    supportedLocales.forEach((locale) => {
      if (locale !== "en-us") {
        sitemap.push({
          url: `${baseUrl}/${locale}${route.path}`,
          lastModified: new Date(),
          changeFrequency: route.changeFrequency,
          priority: route.priority - 0.1,
        });
      }
    });
  }

  return sitemap;
}
