import type { Metadata } from "next";
import Link from "next/link";
import { noIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = noIndexMetadata(
  "Registration complete",
  "Registration confirmation for the Prompt Library."
);

export default function RegistrationSuccessPage() {
  return (
    <section className="page narrow">
      <div className="panel">
        <h1>Registration complete</h1>
        <p className="lead">
          Your registration is complete. Continue to the use-case directory to
          choose a prompt library.
        </p>
        <Link className="button" href="/use-cases">
          View use cases
        </Link>
      </div>
    </section>
  );
}
