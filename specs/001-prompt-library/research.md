# Research: Prompt Library Website

## Decision: Use a single full-stack TypeScript web application

**Rationale**: The feature is a public website, but it also needs persisted email capture, basic registration, duplicate email handling, GDPR consent records, and routed prompt-library pages. A single full-stack app keeps the user-facing pages and server-side validation close together while avoiding separate frontend and backend projects for the first release.

**Alternatives considered**:

- Static-only website: rejected because it cannot reliably persist registrations or consent records.
- Separate frontend and API projects: rejected for initial scope because it increases setup and deployment overhead without a clear benefit for 18 use-case pages and simple lead capture.
- Third-party form-only capture: rejected as the primary plan because duplicate handling, consent records, and use-case routing need product-owned behavior.

## Decision: Use Next.js App Router with React

**Rationale**: The application needs public routes, form pages, dynamic use-case paths, and route handlers. Next.js App Router supports these in one project structure and allows the prompt-library pages to be rendered from shared curated data.

**Alternatives considered**:

- Vite with a separate server: viable, but would require choosing and wiring an additional routing and API layer.
- Plain server-rendered templates: simpler for forms, but less ergonomic for rich prompt browsing and component reuse.

## Decision: Use PostgreSQL with Prisma for the deployed persisted data store

**Rationale**: The first release needs durable records for registrations and consent, and production deployment targets Supabase. PostgreSQL keeps production data on managed infrastructure while Prisma provides typed data access and schema migrations.

**Alternatives considered**:

- Browser local storage: rejected because it does not satisfy actual lead capture or consent record persistence.
- File-backed JSON: rejected because uniqueness, duplicate handling, and consent audit records are easier and safer with relational constraints.
- SQLite: used during initial local planning, then replaced for deployment because Supabase provides managed PostgreSQL.
- External CRM or email marketing platform: deferred because the current feature does not require external campaign automation.

## Decision: Validate all form and route inputs with shared schemas

**Rationale**: Email capture, registration, GDPR confirmation, and use-case slugs are user-controlled inputs. Shared validation schemas keep page-level and route-handler behavior consistent, including duplicate email handling and unsupported path recovery.

**Alternatives considered**:

- Browser-only validation: rejected because server-side validation is still required for trustworthy records.
- Ad hoc validation in each page or handler: rejected because it increases drift between user interface behavior and persisted data requirements.

## Decision: Treat email capture and full registration as separate states

**Rationale**: The feature explicitly asks for a landing page email capture that takes the user to a registration form. Keeping an `email_captured` state before `registration_completed` supports abandoned registrations, duplicate handling, and resume behavior.

**Alternatives considered**:

- Single combined registration form on the landing page: rejected because it removes the requested two-step flow.
- Email capture with no persisted state until registration: rejected because it weakens resume and duplicate behavior.

## Decision: Model GDPR data-processing confirmation separately from marketing consent

**Rationale**: The spec requires GDPR confirmation and states that promotional consent must be separate if offered. A consent record with purpose, accepted state, version, and timestamp gives an auditable record without assuming marketing consent.

**Alternatives considered**:

- Single checkbox for all consent: rejected because it mixes required processing with optional promotional communication.
- Implicit consent on form submission: rejected because the requirement calls for explicit GDPR confirmation.

## Decision: Use canonical slugs for the 18 use-case paths

**Rationale**: Stable slugs make the exact required paths testable and support direct routing after registration. Public labels can be spelling-corrected while preserving the user-requested categories.

**Alternatives considered**:

- Generate slugs dynamically from labels at runtime: rejected because route stability is a requirement.
- Use numeric identifiers in public paths: rejected because the spec asks to take users into a specified use-case path, and descriptive slugs are clearer.

## Decision: Seed curated prompt content from structured data

**Rationale**: The prompt library is curated content for a bounded set of use cases. Structured seed data supports consistent page rendering, testable prompt fields, and future editorial workflows without adding an admin interface to this feature.

**Alternatives considered**:

- Hard-code prompts directly in page components: rejected because it makes content updates and tests harder.
- Build a full prompt CMS now: rejected because the feature asks for the public library experience, not content administration.

## Decision: Use Vitest and Playwright for validation

**Rationale**: Unit and integration tests can cover validation, routing, duplicate behavior, and consent rules. End-to-end tests can verify the landing-to-registration flow, GDPR blocking, direct use-case routing, unsupported path recovery, and the presence of all 18 use cases.

**Alternatives considered**:

- Manual testing only: rejected because the feature has many user journeys and exact path requirements.
- End-to-end tests only: rejected because validation and consent behavior should fail fast at lower test layers too.

## Decision: Include responsible-use notices on regulated professional use-case pages

**Rationale**: Doctors, nutritionists, psychologists, and dentists are professional categories where prompts could be misread as advice. The spec requires messaging that prompts support workflow and communication but do not replace professional judgment.

**Alternatives considered**:

- Single global disclaimer only: rejected because category-specific pages need local context.
- No disclaimer in prompt pages: rejected because it conflicts with the feature's edge cases and FR-019.
