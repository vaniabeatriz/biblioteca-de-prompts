# Implementation Plan: Prompt Library Website

**Branch**: `001-prompt-library` | **Date**: 2026-05-02 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/001-prompt-library/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Build a responsive prompt-library website with a landing page email capture, a basic registration form with explicit GDPR confirmation, a use-case directory, and dedicated prompt-library paths for the 18 specified use cases. The implementation will use a single full-stack TypeScript web application so the product can persist lead registrations, enforce duplicate email behavior, store consent records, preserve intended use-case destinations, and serve routed prompt-library pages from one source of truth.

## Technical Context

**Language/Version**: TypeScript 5.x on Node.js 25.8.0 local development runtime  
**Primary Dependencies**: Next.js App Router, React, Zod for form/data validation, Prisma for data access, SQLite for local persistence, Vitest, Playwright  
**Storage**: SQLite database for registrations, consent records, use-case metadata, and curated prompt content  
**Testing**: Vitest for unit/integration tests; Playwright for end-to-end registration and routing flows  
**Target Platform**: Responsive web application served by a Node-compatible host  
**Project Type**: Full-stack web application  
**Performance Goals**: Landing email capture and registration transitions complete in under 1 second after submission on normal broadband; use-case pages render within 2 seconds for the initial 18 categories; users can reach a relevant prompt in under 90 seconds  
**Constraints**: GDPR data-processing confirmation must be explicit and not preselected; marketing consent must be separate if present; professional categories require responsible-use messaging; all 18 use-case paths must remain stable and testable; full prompt access requires completed basic registration while direct use-case visits may show registration-oriented previews  
**Scale/Scope**: Initial public website with 18 use cases, curated prompt collections, early lead capture volume, and no paid checkout or full account-security flow in this feature

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The project constitution defines gates for testable journeys, privacy and consent, accessible web experience, simplicity, and traceable delivery. This plan satisfies those gates by defining independent user-story tests, separating required GDPR confirmation from optional marketing consent, including accessibility polish, keeping the feature in one full-stack app, and mapping implementation tasks to user stories and requirements.

**Initial Gate Status**: PASS

## Project Structure

### Documentation (this feature)

```text
specs/001-prompt-library/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── http-api.yaml
│   └── ui-routes.md
└── tasks.md
```

### Source Code (repository root)

```text
package.json
next.config.ts
tsconfig.json
prisma/
├── schema.prisma
└── seed.ts
src/
├── app/
│   ├── page.tsx
│   ├── register/
│   │   └── page.tsx
│   ├── registration/
│   │   └── success/
│   │       └── page.tsx
│   ├── use-cases/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── api/
│   │   ├── lead-captures/
│   │   │   └── route.ts
│   │   ├── registrations/
│   │   │   └── route.ts
│   │   └── use-cases/
│   │       ├── route.ts
│   │       └── [slug]/
│   │           └── route.ts
│   ├── layout.tsx
│   └── not-found.tsx
├── components/
│   ├── email-capture-form.tsx
│   ├── registration-form.tsx
│   ├── use-case-card.tsx
│   ├── prompt-card.tsx
│   └── prompt-collection.tsx
├── data/
│   ├── use-cases.ts
│   └── prompt-seed.ts
├── lib/
│   ├── db.ts
│   ├── validation.ts
│   ├── routing.ts
│   ├── access.ts
│   ├── consent.ts
│   ├── consent-records.ts
│   ├── http.ts
│   ├── lead-captures.ts
│   ├── prompts.ts
│   ├── registrations.ts
│   └── use-cases.ts
└── types/
    └── prompt-library.ts
tests/
├── contract/
│   ├── lead-captures.test.ts
│   ├── registrations.test.ts
│   ├── use-case-detail.test.ts
│   └── use-cases.test.ts
├── integration/
│   ├── landing-email-capture.test.ts
│   ├── prompt-browsing.test.ts
│   ├── registration-flow.test.ts
│   └── use-case-routing.test.ts
├── e2e/
│   ├── landing-to-registration.spec.ts
│   ├── gdpr-required.spec.ts
│   ├── performance-smoke.spec.ts
│   ├── responsible-use.spec.ts
│   └── use-case-navigation.spec.ts
└── unit/
    ├── validation.test.ts
    ├── routing.test.ts
    └── consent.test.ts
```

**Structure Decision**: Use one full-stack application at the repository root. The app router owns public pages and route handlers; shared validation, routing, access, consent, HTTP, and database helpers live under `src/lib`; curated use-case and prompt seed data lives under `src/data`; tests are separated by contract, integration, end-to-end, and unit scope.

## Complexity Tracking

No constitution violations are present. The full-stack application structure is justified by feature requirements for persisted registrations, duplicate email handling, consent records, intended-destination routing, and stable routed prompt-library pages.

## Phase 0: Research Summary

Research decisions are documented in [research.md](./research.md). All technical unknowns were resolved during planning.

## Phase 1: Design Summary

Design artifacts produced:

- [data-model.md](./data-model.md)
- [contracts/http-api.yaml](./contracts/http-api.yaml)
- [contracts/ui-routes.md](./contracts/ui-routes.md)
- [quickstart.md](./quickstart.md)

## Post-Design Constitution Check

The design satisfies the active constitution. It keeps the feature scoped to one application, preserves testability through contract, integration, and end-to-end tasks, documents privacy-sensitive consent behavior, includes accessibility checks, and avoids additional subsystems beyond those needed for the stated requirements.

**Post-Design Gate Status**: PASS
