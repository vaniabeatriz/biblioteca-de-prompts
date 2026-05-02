import { EmailCaptureForm } from "@/components/email-capture-form";

const previewUseCases = [
  "Students",
  "Developers",
  "Analysts",
  "Businesses",
  "Agencies",
  "Clinics",
  "Salons"
];

export default function HomePage() {
  return (
    <section className="page hero">
      <div>
        <h1>Prompt Library</h1>
        <p className="lead">
          Find practical prompts organized by the way you work. Choose a use case,
          register once, and go straight to the prompt path that fits your goal.
        </p>
        <ul className="tag-list" aria-label="Example use cases">
          {previewUseCases.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ul>
      </div>
      <aside className="panel" aria-label="Register interest">
        <h2>Start with your email</h2>
        <p>
          Enter your email to continue to the short registration form and unlock
          the prompt library.
        </p>
        <EmailCaptureForm />
      </aside>
    </section>
  );
}
