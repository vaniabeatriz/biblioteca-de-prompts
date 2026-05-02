import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prompt Library",
  description: "A curated library of prompts organized by practical use case.",
  applicationName: "Prompt Library"
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
            <Link href="/register">Register</Link>
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
