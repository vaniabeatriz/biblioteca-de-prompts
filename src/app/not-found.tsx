import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page">
      <div className="panel">
        <h1>Use case not found</h1>
        <p className="lead">
          This path does not match a supported prompt-library use case. Choose a
          category from the directory to continue.
        </p>
        <Link className="button" href="/use-cases">
          View use cases
        </Link>
      </div>
    </section>
  );
}
