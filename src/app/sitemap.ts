import type { MetadataRoute } from "next";
import { listUseCases } from "@/lib/use-cases";
import { absoluteUrl } from "@/lib/seo";

const lastModified = new Date("2026-05-24");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: absoluteUrl("/use-cases"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9
    }
  ];

  const useCaseRoutes: MetadataRoute.Sitemap = listUseCases().map((useCase) => ({
    url: absoluteUrl(useCase.routePath),
    lastModified,
    changeFrequency: "monthly",
    priority: useCase.responsibleUseRequired ? 0.75 : 0.8
  }));

  return [...staticRoutes, ...useCaseRoutes];
}
