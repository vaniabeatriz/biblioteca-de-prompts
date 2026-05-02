# Quickstart: Prompt Library Website

## Prerequisites

- Node.js available locally. Current detected runtime: `v25.8.0`.
- npm available locally. Current detected version: `11.11.0`.

## Setup

Install dependencies, configure a PostgreSQL database URL, apply migrations, and
seed the starter use-case prompt data:

```bash
npm install
cp .env.example .env
# Edit DATABASE_URL for your local Supabase or PostgreSQL database.
npm run db:setup
npm run seed
```

For production deployment details, see [Deployment](../../docs/deployment.md).

## Run Locally

```bash
npm run dev
```

Open the local development URL shown by the command.

## Expected Manual Flow

1. Open `/`.
2. Submit an invalid email and confirm the page shows a correction message.
3. Submit a valid email and confirm the app routes to `/register?email={encodedEmail}`.
4. Confirm the registration form retains the email.
5. Submit the registration form without GDPR confirmation and confirm submission is blocked.
6. Complete the form with GDPR confirmation and a primary use case.
7. Confirm successful registration routes to the selected `/use-cases/{slug}` page.
8. Open a direct use-case path before registration and confirm the page preserves the intended destination through registration.
9. Open `/use-cases` and verify all 18 supported use cases are present.
10. Open `/use-cases/doctors`, `/use-cases/nutritionists`, `/use-cases/psychologists`, and `/use-cases/dentists` and verify responsible-use messaging is visible.
11. Open an unsupported path such as `/use-cases/unknown` and verify the app offers a clear path back to `/use-cases`.

## Test Commands

```bash
npm run lint
npm run test
npm run test:e2e
npm run test:e2e -- performance-smoke
```

## Contract Checks

Implementation should satisfy:

- [HTTP API contract](./contracts/http-api.yaml)
- [UI route contract](./contracts/ui-routes.md)
- [Data model](./data-model.md)

## Done Criteria

- Landing email capture and registration flow pass automated and manual checks.
- Registration cannot complete without explicit GDPR data-processing confirmation.
- Direct use-case visits before registration preserve the intended destination after registration.
- Duplicate email handling gives the user a continuation path without duplicate active registrations.
- All 18 use-case paths render the matching prompt-library page.
- Regulated professional use-case pages include responsible-use messaging.
- Unsupported paths recover to `/use-cases`.
