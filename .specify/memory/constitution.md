<!--
Sync Impact Report
Version change: template -> 1.0.0
Modified principles:
- Placeholder Principle 1 -> I. Testable User Journeys
- Placeholder Principle 2 -> II. Privacy and Consent
- Placeholder Principle 3 -> III. Accessible Web Experience
- Placeholder Principle 4 -> IV. Simplicity First
- Placeholder Principle 5 -> V. Traceable Delivery
Added sections:
- Additional Constraints
- Development Workflow
Removed sections:
- None
Templates requiring updates:
- .specify/templates/spec-template.md: reviewed, no update required
- .specify/templates/plan-template.md: reviewed, no update required
- .specify/templates/tasks-template.md: updated for constitution-driven tests
Runtime guidance:
- AGENTS.md: reviewed, no update required
Follow-up items:
- None
-->
# Biblioteca Constitution

## Core Principles

### I. Testable User Journeys

Every user-facing feature MUST define independently testable user journeys before
implementation. Critical flows MUST include automated checks at the appropriate
level, such as contract, integration, or end-to-end tests. Acceptance criteria
MUST be specific enough for an implementer to validate without guessing intent.

Rationale: The project should be built in increments that can be demonstrated,
verified, and changed without breaking unrelated flows.

### II. Privacy and Consent

Any feature collecting personal data MUST state the purpose of collection and
separate required processing confirmation from optional marketing consent.
Required consent MUST be explicit, not preselected, and recorded with enough
context to prove what the user accepted. Features MUST avoid collecting personal
data that is not needed for the stated user or business value.

Rationale: Lead capture and registration are useful only if they respect user
trust and support privacy obligations from the start.

### III. Accessible Web Experience

Public web pages MUST support keyboard navigation, readable validation errors,
semantic page structure, and responsive layouts. Interactive controls MUST make
their state and required actions clear without relying on color alone.

Rationale: The prompt library is intended for broad public use, so access and
clarity are product requirements rather than polish.

### IV. Simplicity First

Features SHOULD use the simplest architecture that satisfies the specification,
quality gates, and expected near-term scale. Additional services, frameworks,
or abstractions MUST be justified by a concrete requirement, integration need,
or measurable reduction in implementation complexity.

Rationale: Keeping the first version focused reduces delivery risk and makes
future iteration easier.

### V. Traceable Delivery

Implementation tasks MUST map back to user stories, functional requirements, or
cross-cutting quality gates. Plans and task lists MUST use concrete file paths,
state dependencies clearly, and identify which work can run in parallel. Drift
between the specification, plan, and tasks MUST be resolved before implementation.

Rationale: Traceability keeps the team aligned on what is being built and why.

## Additional Constraints

- Requirements that affect privacy, consent, accessibility, or regulated
  professional use MUST be explicit in the specification or task list.
- Performance targets that are stated as measurable goals MUST have a
  corresponding validation task or an explicit reason they are manual checks.
- Public content for professional categories MUST make clear that prompts support
  workflow, drafting, communication, or education and do not replace professional
  judgment.

## Development Workflow

- Specifications define what users need and why, without implementation details.
- Plans define technical choices, project structure, quality gates, and tradeoffs.
- Tasks define executable work by user story, with dependencies and file paths.
- Analysis is read-only and should be run before implementation when artifacts
  change materially.
- Implementation should proceed incrementally, validating each independently
  testable user journey before adding the next one.

## Governance

This constitution supersedes conflicting project guidance. Amendments require a
documented rationale, a semantic version bump, and review of dependent templates
or active feature artifacts for consistency.

Versioning policy:

- MAJOR version increments apply to removed principles or governance changes
  that invalidate prior compliant work.
- MINOR version increments apply to new principles, new mandatory sections, or
  materially expanded quality gates.
- PATCH version increments apply to clarifications, wording fixes, or
  non-semantic refinements.

Compliance review expectations:

- Every plan MUST include a constitution check before design and after design.
- Every task list MUST preserve traceability to user stories or cross-cutting
  quality gates.
- Any known violation MUST be documented with a remediation plan before
  implementation proceeds.

**Version**: 1.0.0 | **Ratified**: 2026-05-02 | **Last Amended**: 2026-05-02
