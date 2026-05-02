# Tasks: Prompt Library Website

**Input**: Design documents from `specs/001-prompt-library/`
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)

**Tests**: Automated test tasks are included because the implementation plan and quickstart define Vitest and Playwright validation commands for the required API contracts, route behavior, GDPR blocking, and exact use-case paths.

**Organization**: Tasks are grouped by user story to support independent implementation and validation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it touches different files and has no dependency on incomplete tasks.
- **[Story]**: User story label for story-scoped tasks only.
- Every task includes an exact target file or directory path.

## Phase 1: Setup

**Purpose**: Initialize the full-stack TypeScript web application, app shell, and test tooling.

- [X] T001 Create the Next.js project package manifest with Next.js, React, Zod, Prisma, SQLite tooling, Vitest, Playwright, and scripts for `dev`, `build`, `start`, `lint`, `test`, `test:e2e`, `db:setup`, and `seed` in `package.json`
- [X] T002 [P] Configure Next.js application settings in `next.config.ts`
- [X] T003 [P] Configure TypeScript compiler options and path aliases in `tsconfig.json`
- [X] T004 [P] Configure Vitest for unit, integration, and contract tests in `vitest.config.ts`
- [X] T005 [P] Create shared Vitest setup file in `tests/setup.ts`
- [X] T006 [P] Configure Playwright end-to-end testing in `playwright.config.ts`
- [X] T007 [P] Create the environment variable template for SQLite and app URLs in `.env.example`
- [X] T008 [P] Create the root application layout shell in `src/app/layout.tsx`
- [X] T009 [P] Create global responsive styles for the public website in `src/app/globals.css`
- [X] T010 Create source and test directory placeholders in `src/app/.gitkeep`, `src/components/.gitkeep`, `src/lib/.gitkeep`, `src/data/.gitkeep`, `src/types/.gitkeep`, `tests/contract/.gitkeep`, `tests/integration/.gitkeep`, `tests/e2e/.gitkeep`, and `tests/unit/.gitkeep`

---

## Phase 2: Foundational

**Purpose**: Build shared data, validation, routing, persistence, and consent infrastructure required by every user story.

**Critical**: No user story implementation should start until this phase is complete.

- [X] T011 Define Prisma models for LeadCapture, Registration, ConsentRecord, UseCase, PromptCollection, and Prompt in `prisma/schema.prisma`
- [X] T012 Implement the Prisma client singleton for server-side data access in `src/lib/db.ts`
- [X] T013 [P] Define shared TypeScript entities and enums from the data model in `src/types/prompt-library.ts`
- [X] T014 [P] Define the canonical 18 use cases, corrected labels, slugs, route paths, ordering, and professional-use flags in `src/data/use-cases.ts`
- [X] T015 [P] Define curated starter prompt collections and prompt seed records for each supported use case in `src/data/prompt-seed.ts`
- [X] T016 Implement canonical slug, route path, unsupported-path, and next-destination helpers in `src/lib/routing.ts`
- [X] T017 Implement Zod schemas for email capture, registration, GDPR confirmation, marketing consent, and use-case slug validation in `src/lib/validation.ts`
- [X] T018 Implement GDPR data-processing and optional marketing consent text/version helpers in `src/lib/consent.ts`
- [X] T019 [P] Implement normalized JSON success/error response helpers in `src/lib/http.ts`
- [X] T020 Create the Prisma seed script for use cases and prompts in `prisma/seed.ts`
- [X] T021 Implement the public unsupported-route recovery page with a link to `/use-cases` in `src/app/not-found.tsx`

**Checkpoint**: Shared data, persistence, validation, routing, and consent behavior are available for all stories.

---

## Phase 3: User Story 1 - Capture Visitor Email From Landing Page (Priority: P1)

**Goal**: A first-time visitor can enter a valid email on the landing page and continue to the registration form with the email retained.

**Independent Test**: Open `/`, submit an invalid email and see a correction message, then submit a valid email and verify the user reaches `/register?email={encodedEmail}`.

### Tests for User Story 1

- [X] T022 [P] [US1] Create contract tests for valid, invalid, and duplicate `POST /api/lead-captures` responses in `tests/contract/lead-captures.test.ts`
- [X] T023 [P] [US1] Create integration tests for email capture validation and continuation paths in `tests/integration/landing-email-capture.test.ts`
- [X] T024 [P] [US1] Create Playwright coverage for landing-page invalid and valid email submission in `tests/e2e/landing-to-registration.spec.ts`

### Implementation for User Story 1

- [X] T025 [P] [US1] Implement LeadCapture create-or-continue behavior and duplicate email lookup in `src/lib/lead-captures.ts`
- [X] T026 [US1] Implement the `POST /api/lead-captures` route using shared validation and response helpers in `src/app/api/lead-captures/route.ts`
- [X] T027 [P] [US1] Implement the reusable email capture form with inline error display in `src/components/email-capture-form.tsx`
- [X] T028 [US1] Implement the landing page content and email capture entry point in `src/app/page.tsx`
- [X] T029 [US1] Add duplicate email continuation messaging and next-path handling in `src/components/email-capture-form.tsx`
- [X] T030 [US1] Wire landing page form submission to route users to `/register?email={encodedEmail}` in `src/app/page.tsx`

**Checkpoint**: User Story 1 is independently functional and testable.

---

## Phase 4: User Story 2 - Complete Basic Registration With GDPR Confirmation (Priority: P1)

**Goal**: A visitor can complete the registration form with basic information and explicit GDPR data-processing confirmation.

**Independent Test**: Open `/register?email=test@example.com`, confirm the email is retained, submit without GDPR confirmation and verify blocking, then complete the form and verify a success state.

### Tests for User Story 2

- [X] T031 [P] [US2] Create contract tests for valid registration, missing GDPR confirmation, invalid fields, and duplicate continuation in `tests/contract/registrations.test.ts`
- [X] T032 [P] [US2] Create integration tests for registration completion, consent records, and duplicate update behavior in `tests/integration/registration-flow.test.ts`
- [X] T033 [P] [US2] Create Playwright coverage proving GDPR confirmation is required and not preselected in `tests/e2e/gdpr-required.spec.ts`

### Implementation for User Story 2

- [X] T034 [P] [US2] Implement registration create-or-update behavior and required-field validation orchestration in `src/lib/registrations.ts`
- [X] T035 [P] [US2] Implement consent record creation for required GDPR and optional marketing purposes in `src/lib/consent-records.ts`
- [X] T036 [US2] Implement the `POST /api/registrations` route with 400 and 422 error handling in `src/app/api/registrations/route.ts`
- [X] T037 [P] [US2] Implement the registration form with email retention, required fields, primary use-case select, GDPR checkbox, and optional marketing consent in `src/components/registration-form.tsx`
- [X] T038 [US2] Implement the `/register` page and pre-populate the email query value in `src/app/register/page.tsx`
- [X] T039 [US2] Implement the registration success confirmation page in `src/app/registration/success/page.tsx`
- [X] T040 [US2] Add duplicate registration continuation and update messaging in `src/components/registration-form.tsx`
- [X] T041 [US2] Ensure marketing consent remains optional and separate from required GDPR processing in `src/lib/consent-records.ts`

**Checkpoint**: User Story 2 is independently functional and testable.

---

## Phase 5: User Story 3 - Choose a Use Case and Enter Its Prompt Library Path (Priority: P2)

**Goal**: A user can select a supported use case and reach the matching dedicated prompt-library path.

**Independent Test**: Open `/use-cases`, verify all 18 supported use cases are visible, select one, and confirm the user lands on the matching `/use-cases/{slug}` path.

### Tests for User Story 3

- [X] T042 [P] [US3] Create contract tests for `GET /api/use-cases` returning exactly the 18 supported use cases in `tests/contract/use-cases.test.ts`
- [X] T043 [P] [US3] Create integration tests for canonical slugs, corrected labels, route paths, and unsupported path recovery in `tests/integration/use-case-routing.test.ts`
- [X] T044 [P] [US3] Create Playwright coverage for use-case directory navigation, direct-path intended destination preservation, and registration-selected next paths in `tests/e2e/use-case-navigation.spec.ts`

### Implementation for User Story 3

- [X] T045 [P] [US3] Implement use-case directory query and ordering helpers in `src/lib/use-cases.ts`
- [X] T046 [US3] Implement the `GET /api/use-cases` route using the HTTP API contract in `src/app/api/use-cases/route.ts`
- [X] T047 [P] [US3] Implement a reusable use-case card with canonical path links in `src/components/use-case-card.tsx`
- [X] T048 [US3] Implement the `/use-cases` directory page with all 18 categories in `src/app/use-cases/page.tsx`
- [X] T049 [US3] Connect `primaryUseCaseSlug` registration success routing to `/use-cases/{slug}` or `/use-cases` in `src/app/api/registrations/route.ts`
- [X] T050 [US3] Add use-case-directory recovery copy and call-to-action behavior in `src/app/not-found.tsx`
- [X] T051 [US3] Verify all 18 labels, corrected spellings, and canonical paths match the specification in `src/data/use-cases.ts`
- [X] T052 [US3] Implement registration-state and intended-destination helpers in `src/lib/access.ts`
- [X] T053 [US3] Preserve `next` destination from direct use-case visits through `/register` in `src/app/use-cases/[slug]/page.tsx`
- [X] T054 [US3] Route successful registration to the preserved `next` path when present in `src/app/api/registrations/route.ts`

**Checkpoint**: User Story 3 is independently functional and testable.

---

## Phase 6: User Story 4 - Browse Relevant Prompts by Use Case (Priority: P3)

**Goal**: A user on a use-case page can browse relevant prompts grouped by task, goal, or workflow and review prompt details.

**Independent Test**: Open a supported `/use-cases/{slug}` page, verify grouped prompt collections and prompt details are visible, and confirm professional use-case pages show responsible-use messaging.

### Tests for User Story 4

- [X] T055 [P] [US4] Create contract tests for `GET /api/use-cases/{slug}` prompt collections, invalid slug 404s, and responsible-use payloads in `tests/contract/use-case-detail.test.ts`
- [X] T056 [P] [US4] Create integration tests for prompt grouping, required prompt fields, and empty collection states in `tests/integration/prompt-browsing.test.ts`
- [X] T057 [P] [US4] Create Playwright coverage for doctors, nutritionists, psychologists, and dentists responsible-use messages in `tests/e2e/responsible-use.spec.ts`

### Implementation for User Story 4

- [X] T058 [P] [US4] Implement prompt collection and prompt lookup helpers by use-case slug in `src/lib/prompts.ts`
- [X] T059 [US4] Implement the `GET /api/use-cases/[slug]` route using the HTTP API detail contract in `src/app/api/use-cases/[slug]/route.ts`
- [X] T060 [P] [US4] Implement the reusable prompt card with title, intended outcome, prompt text, suggested inputs, usage note, and tags in `src/components/prompt-card.tsx`
- [X] T061 [P] [US4] Implement the prompt collection section with grouped task or workflow headings in `src/components/prompt-collection.tsx`
- [X] T062 [US4] Implement the dynamic `/use-cases/[slug]` page with use-case detail loading in `src/app/use-cases/[slug]/page.tsx`
- [X] T063 [US4] Render responsible-use messaging for doctors, nutritionists, psychologists, and dentists in `src/app/use-cases/[slug]/page.tsx`
- [X] T064 [US4] Render useful empty prompt collection states in `src/components/prompt-collection.tsx`
- [X] T065 [US4] Verify starter prompt coverage and required fields for every supported use case in `src/data/prompt-seed.ts`

**Checkpoint**: User Story 4 is independently functional and testable.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final quality, accessibility, documentation, and contract checks across the feature.

- [X] T066 [P] Add page metadata and accessible document landmarks for public pages in `src/app/layout.tsx`
- [X] T067 [P] Add keyboard-focus, validation-message, and responsive behavior refinements in `src/app/globals.css`
- [X] T068 [P] Review implemented HTTP behavior against `specs/001-prompt-library/contracts/http-api.yaml`
- [X] T069 [P] Review implemented route behavior against `specs/001-prompt-library/contracts/ui-routes.md`
- [X] T070 [P] Update setup and manual validation notes after implementation in `specs/001-prompt-library/quickstart.md`
- [X] T071 [P] Add Playwright timing assertions for landing capture, registration completion, and use-case page render goals in `tests/e2e/performance-smoke.spec.ts`
- [X] T072 Run all configured lint, unit, integration, contract, and end-to-end checks defined in `package.json`
- [X] T073 Resolve any final implementation drift from the feature specification in `specs/001-prompt-library/spec.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 Setup**: No dependencies; can start immediately.
- **Phase 2 Foundational**: Depends on Phase 1; blocks all user story implementation.
- **Phase 3 US1**: Depends on Phase 2; delivers the MVP email capture flow.
- **Phase 4 US2**: Depends on Phase 2; can be built independently through `/register?email=...`, then integrated with US1.
- **Phase 5 US3**: Depends on Phase 2; directory can be built independently, while registration-selected routing integrates with US2.
- **Phase 6 US4**: Depends on Phase 2; prompt browsing can be built independently from the directory once slugs and seed data exist.
- **Phase 7 Polish**: Depends on completed target user stories.

### User Story Dependencies

- **US1 (P1)**: No dependency on other user stories.
- **US2 (P1)**: No hard dependency on US1 for direct `/register` testing; integrates with US1 for retained email flow.
- **US3 (P2)**: No hard dependency for `/use-cases`; selected-use-case registration redirect depends on US2.
- **US4 (P3)**: No hard dependency on US3 for direct `/use-cases/{slug}` testing; integrates with US3 navigation links.

### Story Completion Order

1. Complete Phase 1 and Phase 2.
2. Complete US1 for MVP lead capture.
3. Complete US2 for registration and GDPR confirmation.
4. Complete US3 for use-case directory and routing.
5. Complete US4 for prompt browsing.
6. Complete polish and cross-cutting validation.

---

## Parallel Execution Examples

### User Story 1

```text
Task: T022 Contract tests in tests/contract/lead-captures.test.ts
Task: T023 Integration tests in tests/integration/landing-email-capture.test.ts
Task: T024 E2E tests in tests/e2e/landing-to-registration.spec.ts
Task: T025 Lead capture service in src/lib/lead-captures.ts
Task: T027 Email capture form in src/components/email-capture-form.tsx
```

### User Story 2

```text
Task: T031 Contract tests in tests/contract/registrations.test.ts
Task: T032 Integration tests in tests/integration/registration-flow.test.ts
Task: T033 E2E tests in tests/e2e/gdpr-required.spec.ts
Task: T034 Registration service in src/lib/registrations.ts
Task: T035 Consent record service in src/lib/consent-records.ts
Task: T037 Registration form in src/components/registration-form.tsx
```

### User Story 3

```text
Task: T042 Contract tests in tests/contract/use-cases.test.ts
Task: T043 Integration tests in tests/integration/use-case-routing.test.ts
Task: T044 E2E tests in tests/e2e/use-case-navigation.spec.ts
Task: T045 Use-case helper in src/lib/use-cases.ts
Task: T047 Use-case card in src/components/use-case-card.tsx
```

### User Story 4

```text
Task: T055 Contract tests in tests/contract/use-case-detail.test.ts
Task: T056 Integration tests in tests/integration/prompt-browsing.test.ts
Task: T057 E2E tests in tests/e2e/responsible-use.spec.ts
Task: T058 Prompt helper in src/lib/prompts.ts
Task: T060 Prompt card in src/components/prompt-card.tsx
Task: T061 Prompt collection component in src/components/prompt-collection.tsx
```

---

## Implementation Strategy

### MVP First

1. Complete Phase 1 setup.
2. Complete Phase 2 foundational infrastructure.
3. Complete Phase 3 US1 only.
4. Validate the landing email capture flow independently.
5. Demo MVP before adding registration, directory, and prompt browsing.

### Incremental Delivery

1. Add US1 for lead capture.
2. Add US2 for registration and GDPR confirmation.
3. Add US3 for use-case directory and routing.
4. Add US4 for prompt browsing.
5. Run Phase 7 checks after each deployable increment.

### Parallel Team Strategy

After Phase 2, separate contributors can work on US1, US2, US3, and US4 in parallel because each phase has isolated test files, component files, and service files. Coordinate only on shared files called out by non-parallel tasks, especially `src/app/api/registrations/route.ts`, `src/app/not-found.tsx`, `src/data/use-cases.ts`, and `src/data/prompt-seed.ts`.

---

## Notes

- [P] tasks are limited to different files with no direct dependency on incomplete tasks.
- User story phases include test tasks because the plan and quickstart define automated validation.
- Tasks that touch shared files are intentionally not marked [P].
- Stop at each checkpoint to validate that the current story works independently.
