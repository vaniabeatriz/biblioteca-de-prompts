"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CONSENT_TEXT_VERSION,
  GDPR_DATA_PROCESSING_TEXT,
  MARKETING_CONSENT_TEXT
} from "@/lib/consent";
import type { UseCaseSummary } from "@/types/prompt-library";

interface RegistrationFormProps {
  initialEmail?: string;
  intendedDestination?: string;
  useCases: UseCaseSummary[];
}

type FieldErrors = Record<string, string>;

export function RegistrationForm({
  initialEmail = "",
  intendedDestination,
  useCases
}: RegistrationFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState(initialEmail);
  const [fullName, setFullName] = useState("");
  const [roleOrOccupation, setRoleOrOccupation] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [primaryUseCaseSlug, setPrimaryUseCaseSlug] = useState("");
  const [gdprDataProcessingConfirmed, setGdprDataProcessingConfirmed] =
    useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [notice, setNotice] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const selectedUseCaseLabel = useMemo(
    () =>
      useCases.find((useCase) => useCase.slug === primaryUseCaseSlug)
        ?.displayName,
    [primaryUseCaseSlug, useCases]
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});
    setNotice("");

    if (!gdprDataProcessingConfirmed) {
      setFieldErrors({
        gdprDataProcessingConfirmed:
          "GDPR data-processing confirmation is required."
      });
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          fullName,
          roleOrOccupation,
          organizationName: organizationName || undefined,
          primaryUseCaseSlug: primaryUseCaseSlug || undefined,
          intendedDestination,
          gdprDataProcessingConfirmed,
          marketingConsent,
          consentTextVersion: CONSENT_TEXT_VERSION
        })
      });
      const payload = await response.json();

      if (!response.ok) {
        setFieldErrors(payload.fieldErrors ?? {});
        setNotice(payload.message ?? "Check the form and try again.");
        return;
      }

      if (payload.status === "updated") {
        setNotice("We updated your existing registration and will continue now.");
      } else if (selectedUseCaseLabel) {
        setNotice(`Registration complete. Opening ${selectedUseCaseLabel}.`);
      }

      router.push(payload.nextPath ?? "/use-cases");
    } catch {
      setNotice("We could not complete registration. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="form-stack" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="register-full-name">Full name</label>
        <input
          id="register-full-name"
          name="fullName"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          autoComplete="name"
          required
        />
        {fieldErrors.fullName ? (
          <p className="error">{fieldErrors.fullName}</p>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor="register-email">Email address</label>
        <input
          id="register-email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />
        {fieldErrors.email ? <p className="error">{fieldErrors.email}</p> : null}
      </div>

      <div className="field">
        <label htmlFor="register-role">Role or occupation</label>
        <input
          id="register-role"
          name="roleOrOccupation"
          value={roleOrOccupation}
          onChange={(event) => setRoleOrOccupation(event.target.value)}
          autoComplete="organization-title"
          required
        />
        {fieldErrors.roleOrOccupation ? (
          <p className="error">{fieldErrors.roleOrOccupation}</p>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor="register-organization">Organization or business name</label>
        <input
          id="register-organization"
          name="organizationName"
          value={organizationName}
          onChange={(event) => setOrganizationName(event.target.value)}
          autoComplete="organization"
        />
      </div>

      <div className="field">
        <label htmlFor="register-use-case">Primary use case</label>
        <select
          id="register-use-case"
          name="primaryUseCaseSlug"
          value={primaryUseCaseSlug}
          onChange={(event) => setPrimaryUseCaseSlug(event.target.value)}
        >
          <option value="">Choose later</option>
          {useCases.map((useCase) => (
            <option key={useCase.slug} value={useCase.slug}>
              {useCase.displayName}
            </option>
          ))}
        </select>
        {fieldErrors.primaryUseCaseSlug ? (
          <p className="error">{fieldErrors.primaryUseCaseSlug}</p>
        ) : null}
      </div>

      <label className="checkbox" htmlFor="register-gdpr">
        <input
          id="register-gdpr"
          name="gdprDataProcessingConfirmed"
          type="checkbox"
          checked={gdprDataProcessingConfirmed}
          onChange={(event) =>
            setGdprDataProcessingConfirmed(event.target.checked)
          }
          required
        />
        <span>{GDPR_DATA_PROCESSING_TEXT}</span>
      </label>
      {fieldErrors.gdprDataProcessingConfirmed ? (
        <p className="error">{fieldErrors.gdprDataProcessingConfirmed}</p>
      ) : null}

      <label className="checkbox" htmlFor="register-marketing">
        <input
          id="register-marketing"
          name="marketingConsent"
          type="checkbox"
          checked={marketingConsent}
          onChange={(event) => setMarketingConsent(event.target.checked)}
        />
        <span>{MARKETING_CONSENT_TEXT}</span>
      </label>

      {intendedDestination ? (
        <p className="notice">
          After registration, you will continue to {intendedDestination}.
        </p>
      ) : null}
      {notice ? <p className="notice" aria-live="polite">{notice}</p> : null}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Completing..." : "Complete registration"}
      </button>
    </form>
  );
}
