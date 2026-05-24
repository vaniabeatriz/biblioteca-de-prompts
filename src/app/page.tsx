import type { Metadata } from "next";
import Link from "next/link";
import { EmailCaptureForm } from "@/components/email-capture-form";
import { JsonLd } from "@/components/json-ld";
import {
  absoluteUrl,
  canonicalUrl,
  openGraphImage,
  organizationJsonLd,
  siteConfig,
  useCaseItemListJsonLd,
  websiteJsonLd
} from "@/lib/seo";

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

const previewUseCases = [
  "Students",
  "Developers",
  "Analysts",
  "Businesses",
  "Agencies",
  "Clinics",
  "Salons"
];

const promptBenefits = [
  "create clearer outputs",
  "save time on repetitive work",
  "improve communication",
  "unlock better ideas",
  "reduce blank-page syndrome",
  "challenge your assumptions",
  "turn messy thoughts into structured action"
];

const promptingSkills = [
  "ask better questions",
  "give useful context",
  "communicate intent clearly",
  "collaborate with AI effectively"
];

const heroStats = [
  { value: "18", label: "use-case paths" },
  { value: "36", label: "starter prompts" },
  { value: "0", label: "account gate" }
];

export default function HomePage() {
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
      <section className="page hero">
        <div className="hero-copy">
          <p className="eyebrow">Practical AI prompts for real work</p>
          <h1>Prompt Library</h1>
          <p className="lead">
            A curated collection of practical prompts designed to help you
            think clearer, work smarter, and get better results with AI.
          </p>
          <p>
            AI is powerful, but the quality of what you get back depends on
            what you ask. The right prompt can turn AI from a simple chatbot
            into a creative partner, editor, strategist, researcher, or coach.
          </p>
          <p>This library exists to make that easier.</p>
          <div className="hero-actions">
            <Link className="button" href="/use-cases">
              Explore prompts
            </Link>
            <Link className="button secondary" href="/register">
              Save your path
            </Link>
          </div>
          <ul className="tag-list" aria-label="Example use cases">
            {previewUseCases.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        </div>
        <div className="hero-stack">
          <aside className="panel signup-panel" aria-label="Register interest">
            <p className="eyebrow">Start faster</p>
            <h2>Get guided into the library</h2>
            <p>
              Save your preferred use case and start with prompts you can adapt
              immediately.
            </p>
            <EmailCaptureForm />
            <Link className="card-link" href="/use-cases">
              Browse the prompt library first
            </Link>
          </aside>
          <div className="product-preview" aria-label="Prompt library preview">
            <div className="preview-topbar">
              <span />
              <span />
              <span />
            </div>
            <div className="preview-message user-message">
              I need to turn a rough idea into a clear plan.
            </div>
            <div className="preview-message ai-message">
              Try a planning prompt with objective, constraints, next actions,
              and risks.
            </div>
            <div className="preview-checklist">
              <p>Prompt output</p>
              <ul>
                <li>Clarify the goal</li>
                <li>Structure the work</li>
                <li>Decide the next step</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="page proof-strip" aria-label="Library overview">
        {heroStats.map((stat) => (
          <div className="proof-item" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="page home-section">
        <div className="section-heading">
          <p className="eyebrow">What is inside</p>
          <h2>Prompts for real-life work and everyday use.</h2>
          <p className="lead">
            Inside, you will find prompts for writing emails, organising ideas,
            solving problems, preparing for meetings, brainstorming, learning,
            and making decisions.
          </p>
        </div>
        <div className="panel home-copy-block">
          <p>
            Each prompt is meant to be practical, reusable, and easy to adapt to
            your own context. Use the prompts as they are, remix them, and make
            them yours.
          </p>
        </div>
      </section>

      <section className="page home-section">
        <div className="section-heading">
          <p className="eyebrow">Why prompts matter</p>
          <h2>Prompting is more than typing a question into AI.</h2>
          <p className="lead">It is a way of thinking.</p>
        </div>
        <div className="grid benefit-grid" aria-label="Prompt benefits">
          {promptBenefits.map((benefit) => (
            <article className="card benefit-card" key={benefit}>
              <p>{benefit}</p>
            </article>
          ))}
        </div>
        <p className="lead home-truth">
          The better the input, the more useful the outcome.
        </p>
      </section>

      <section className="page home-section">
        <div className="panel conversion-panel">
          <div>
            <p className="eyebrow">A useful skill</p>
            <h2>Learning how to prompt well means learning how to think with AI.</h2>
            <p>
              It is becoming an increasingly valuable skill across work,
              learning, and everyday life.
            </p>
          </div>
          <ul className="skill-list" aria-label="Prompting skills">
            {promptingSkills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="page home-section closing-section">
        <div className="section-heading">
          <p className="eyebrow">Start the conversation</p>
          <h2>The goal is not to find the perfect prompt.</h2>
          <p className="lead">
            It is to help you start the conversation with more clarity, context,
            and momentum.
          </p>
        </div>
        <Link className="button" href="/use-cases">
          Explore use cases
        </Link>
      </section>
    </>
  );
}
