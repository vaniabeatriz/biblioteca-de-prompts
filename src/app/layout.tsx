import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  absoluteUrl,
  openGraphImage,
  siteConfig,
  siteUrl
} from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteConfig.defaultTitle,
    template: siteConfig.titleTemplate
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  category: "productivity",
  classification: "AI prompt library",
  keywords: [...siteConfig.keywords],
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: absoluteUrl("/")
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    images: [openGraphImage()]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    images: ["/opengraph-image"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg"
  },
  manifest: "/manifest.webmanifest"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <header className="site-header">
          <Link className="brand" href="/">Prompt Library</Link>
          <nav aria-label="Primary navigation">
            <Link href="/use-cases">Use cases</Link>
            <Link className="nav-cta" href="/register">Register</Link>
          </nav>
        </header>
        <main id="content" tabIndex={-1}>
          {children}
        </main>
        <footer className="site-footer">
          <Link href="/use-cases">Browse use cases</Link>
          <Link href="/register">Register</Link>
        </footer>
      </body>
    </html>
  );
}
