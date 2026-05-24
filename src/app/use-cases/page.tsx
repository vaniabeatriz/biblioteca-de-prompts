import type { Metadata } from "next";
import { UseCaseCard } from "@/components/use-case-card";
import { JsonLd } from "@/components/json-ld";
import { listUseCases } from "@/lib/use-cases";
import {
  absoluteUrl,
  canonicalUrl,
  openGraphImage,
  siteConfig,
  useCaseItemListJsonLd
} from "@/lib/seo";

const useCasesDescription =
  "Browse practical AI prompt categories for students, developers, analysts, small businesses, marketers, designers, agencies, clinics, salons, and everyday work.";

export const metadata: Metadata = {
  title: "AI Prompt Use Cases",
  description: useCasesDescription,
  alternates: {
    canonical: canonicalUrl("/use-cases")
  },
  openGraph: {
    title: "AI Prompt Use Cases",
    description: useCasesDescription,
    url: absoluteUrl("/use-cases"),
    images: [openGraphImage()]
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Prompt Use Cases",
    description: useCasesDescription,
    images: ["/opengraph-image"]
  }
};

export default function UseCasesPage() {
  const useCases = listUseCases();

  return (
    <section className="page">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "AI Prompt Use Cases",
            url: canonicalUrl("/use-cases"),
            description: useCasesDescription,
            isPartOf: {
              "@type": "WebSite",
              name: siteConfig.name,
              url: canonicalUrl("/")
            }
          },
          useCaseItemListJsonLd()
        ]}
      />
      <div className="section-heading">
        <h1 className="page-title">Use cases</h1>
        <p className="lead">
          Choose the path that matches your context and open a focused prompt
          library for that work.
        </p>
      </div>
      <div className="grid" aria-label="Supported use cases">
        {useCases.map((useCase) => (
          <UseCaseCard key={useCase.slug} useCase={useCase} />
        ))}
      </div>
    </section>
  );
}
