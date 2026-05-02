import Link from "next/link";

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
