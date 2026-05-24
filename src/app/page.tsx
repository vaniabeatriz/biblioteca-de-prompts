import type { Metadata } from "next";
import Link from "next/link";
import { EmailCaptureForm } from "@/components/email-capture-form";
import { JsonLd } from "@/components/json-ld";
import { PromptSearch } from "@/components/prompt-search";
import {
  absoluteUrl,
  canonicalUrl,
  openGraphImage,
  organizationJsonLd,
  siteConfig,
  useCaseItemListJsonLd,
  websiteJsonLd
} from "@/lib/seo";
import { listUseCases } from "@/lib/use-cases";

export const metadata: Metadata = {
  title: "AI Prompt Library for Work, Study and Everyday Use",
  description: siteConfig.shortDescription,
  alternates: {
    canonical: canonicalUrl("/")
  },
  openGraph: {
    title: "AI Prompt Library for Work, Study and Everyday Use",
    description: siteConfig.shortDescription,
    url: absoluteUrl("/"),
    images: [openGraphImage()]
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Prompt Library for Work, Study and Everyday Use",
    description: siteConfig.shortDescription,
    images: ["/opengraph-image"]
  }
};

export default function HomePage() {
  const useCases = listUseCases();
  const searchUseCases = useCases.map(({ displayName, description, routePath }) => ({
    displayName,
    description,
    routePath
  }));

  return (
    <>
      <JsonLd
        data={[
          websiteJsonLd(),
          organizationJsonLd(),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Prompt Library",
            url: canonicalUrl("/"),
            description: siteConfig.shortDescription,
            isPartOf: {
              "@type": "WebSite",
              name: siteConfig.name,
              url: canonicalUrl("/")
            },
            about: [
              "AI prompts",
              "prompt engineering",
              "AI productivity",
              "writing prompts",
              "business prompts"
            ]
          },
          useCaseItemListJsonLd()
        ]}
      />
      <section className="page simplified-home">
        <div className="simplified-hero">
          <p className="eyebrow">Practical AI prompts for real work</p>
          <h1>Prompt Library</h1>
          <p className="lead">
            Find the right AI prompt faster. Search by role, task, or use case,
            then open practical prompts you can adapt to your own work.
          </p>
          <PromptSearch useCases={searchUseCases} />
          <nav className="use-case-pills" aria-label="Use case shortcuts">
            {useCases.map((useCase) => (
              <Link key={useCase.slug} href={useCase.routePath}>
                {useCase.displayName}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="page newsletter-section" aria-labelledby="newsletter-title">
        <div className="newsletter-copy">
          <p className="eyebrow">New prompts and AI ideas</p>
          <h2 id="newsletter-title">
            Register to receive useful AI updates and new prompt drops.
          </h2>
          <p>
            Get practical ideas for writing, research, planning, meetings,
            content, learning, and better everyday AI use.
          </p>
        </div>
        <EmailCaptureForm
          buttonLabel="Get updates"
          placeholder="you@example.com"
          source="homepage_newsletter"
        />
      </section>
    </>
  );
}
