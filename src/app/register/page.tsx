import type { Metadata } from "next";
import { RegistrationForm } from "@/components/registration-form";
import { USE_CASES } from "@/data/use-cases";
import { noIndexMetadata } from "@/lib/seo";
import { isSupportedUseCasePath } from "@/lib/routing";

export const metadata: Metadata = noIndexMetadata(
  "Register",
  "Register for the Prompt Library and save your preferred AI prompt use case."
);

type RegisterSearchParams = Promise<
  Record<string, string | string[] | undefined>
>;

function stringParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function RegisterPage({
  searchParams
}: {
  searchParams: RegisterSearchParams;
}) {
  const params = await searchParams;
  const email = stringParam(params.email) ?? "";
  const next = stringParam(params.next);
  const intendedDestination =
    next && isSupportedUseCasePath(next) ? next : undefined;

  return (
    <section className="page narrow">
      <div className="section-heading">
        <h1 className="page-title">Register</h1>
        <p className="lead">
          Add the basic details needed to route you to the right prompt library.
        </p>
      </div>
      <div className="panel">
        <RegistrationForm
          initialEmail={email}
          intendedDestination={intendedDestination}
          useCases={USE_CASES}
        />
      </div>
    </section>
  );
}
