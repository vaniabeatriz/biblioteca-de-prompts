"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

interface EmailCaptureFormProps {
  buttonLabel?: string;
  inputLabel?: string;
  placeholder?: string;
  source?: string;
}

export function EmailCaptureForm({
  buttonLabel = "Continue",
  inputLabel = "Email address",
  placeholder,
  source = "landing_page"
}: EmailCaptureFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/lead-captures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source })
      });
      const payload = await response.json();

      if (!response.ok) {
        setError(payload.fieldErrors?.email ?? payload.message ?? "Enter a valid email address.");
        return;
      }

      if (payload.status === "duplicate_detected") {
        setNotice("We found this email. Continue registration or update your details.");
      }

      router.push(payload.nextPath);
    } catch {
      setError("We could not submit the form. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="form-stack" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="landing-email">{inputLabel}</label>
        <input
          id="landing-email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          placeholder={placeholder}
          required
        />
        {error ? <p className="error">{error}</p> : null}
      </div>
      {notice ? <p className="notice">{notice}</p> : null}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : buttonLabel}
      </button>
    </form>
  );
}
