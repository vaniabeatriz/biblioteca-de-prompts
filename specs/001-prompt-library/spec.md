# Feature Specification: Prompt Library Website

**Feature Branch**: `001-prompt-library`  
**Created**: 2026-05-02  
**Status**: Implemented  
**Input**: User description: "create a website for a library of prompts organised by usecases and take the user into the specified path for that use case. the use cases are: high school students, university students, entry level developers, data analysts, small/medium business, social media, marketing, designer, web designer, product, personal assistant, agencies, doctors, nutrionists, psycologist, dentists, hair salon, nail salon. Include a landing page to capture user's email. prompt it to a register form with basic info. include GDPR confirmation."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Capture Visitor Email From Landing Page (Priority: P1)

A first-time visitor arrives on the landing page, understands that the website offers prompts organized by use case, enters their email address, and continues to the registration form.

**Why this priority**: The landing page and email capture are the entry point for the business goal and must work before deeper prompt-library journeys can be valuable.

**Independent Test**: Can be fully tested by opening the landing page, entering a valid email address, and confirming that the visitor is taken to a registration form with the email retained.

**Acceptance Scenarios**:

1. **Given** a visitor is on the landing page, **When** they submit a valid email address, **Then** they see a registration form and the submitted email is already associated with that form.
2. **Given** a visitor is on the landing page, **When** they submit a blank or invalid email address, **Then** they remain on the landing page and receive a clear correction message.

---

### User Story 2 - Complete Basic Registration With GDPR Confirmation (Priority: P1)

A visitor who has submitted an email completes a short registration form with basic personal and interest information, confirms GDPR-related data processing, and receives confirmation that registration is complete.

**Why this priority**: The website must collect usable lead information while meeting the stated privacy requirement before directing users into the library experience.

**Independent Test**: Can be fully tested by completing the registration form with valid basic information, confirming GDPR processing, and verifying successful completion.

**Acceptance Scenarios**:

1. **Given** a visitor is on the registration form, **When** they provide required basic information and actively confirm GDPR data processing, **Then** the registration completes and they receive a clear success state.
2. **Given** a visitor is on the registration form, **When** they try to register without GDPR confirmation, **Then** registration is blocked and the page explains that confirmation is required.
3. **Given** a visitor has already submitted an email address, **When** they reach the registration form, **Then** they do not need to re-enter the same email unless they choose to edit it.

---

### User Story 3 - Choose a Use Case and Enter Its Prompt Library Path (Priority: P2)

A visitor selects one of the supported use cases and is directed to the corresponding prompt-library path for that audience or business type without needing to register first.

**Why this priority**: The core product value is organizing prompts around user intent and taking each user to the right use-case destination.

**Independent Test**: Can be fully tested by selecting each use case from the directory and confirming that the user lands on the matching prompt-library path.

**Acceptance Scenarios**:

1. **Given** the user has completed registration and selected a primary use case, **When** registration succeeds, **Then** the user is taken to the selected use-case path.
2. **Given** the user has not selected a primary use case, **When** registration succeeds, **Then** the user is taken to a use-case directory where all supported use cases are available.
3. **Given** a user selects "Data Analysts" from the directory, **When** they confirm the selection, **Then** they arrive at the Data Analysts prompt library path.
4. **Given** an unregistered visitor opens a direct use-case path, **When** the page loads, **Then** the visitor can see the prompt collections and prompt items without completing registration.

---

### User Story 4 - Browse Relevant Prompts by Use Case (Priority: P3)

A user on a use-case page browses prompts grouped by practical tasks, reviews prompt purpose and usage guidance, and chooses a prompt relevant to their goal.

**Why this priority**: Prompt discovery turns the captured lead into an actual product experience and helps validate whether the use-case organization is useful.

**Independent Test**: Can be fully tested by visiting a use-case path and confirming that prompts are relevant, grouped, understandable, and available for user action.

**Acceptance Scenarios**:

1. **Given** a user is on a supported use-case page, **When** they review the page, **Then** they see prompts relevant to that use case grouped by task or objective.
2. **Given** a user opens a prompt item, **When** they review its details, **Then** they see the prompt text, intended outcome, suggested inputs, and any responsible-use note needed for that use case.
3. **Given** a user is in a professional or regulated use case, **When** they view prompts, **Then** the page makes clear that prompts support workflow and communication but do not replace professional judgment or legal obligations.

### Edge Cases

- Duplicate email submission: the user should receive a clear message and a way to continue or update their existing registration details.
- GDPR confirmation not selected: registration must not complete.
- Invalid, misspelled, or unsupported use-case path: the user should be redirected to the use-case directory with a clear explanation.
- User submits an email but leaves before registration: the system should preserve enough progress to let them resume from the registration step when practical.
- Direct use-case visit before registration: the page should show the complete prompt library for that use case without requiring registration.
- Regulated professional categories such as doctors, nutritionists, psychologists, and dentists: prompts must avoid implying diagnosis, treatment, or replacement of licensed professional judgment.
- Empty or not-yet-populated prompt collection for a use case: the page should still explain the category and offer a clear next action rather than appearing broken.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The website MUST provide a landing page that clearly introduces the prompt library and presents email capture as the primary action.
- **FR-002**: The email capture step MUST validate that the email is present and formatted as an email address before allowing the user to continue.
- **FR-003**: After a valid email capture, the website MUST take the user to a registration form that retains or pre-populates the captured email.
- **FR-004**: The registration form MUST collect basic information needed to identify and route the user: full name, email address, primary use case, role or occupation, and optional organization or business name.
- **FR-005**: The registration form MUST include an explicit GDPR data-processing confirmation that is not preselected.
- **FR-006**: The website MUST block registration completion unless required basic information is valid and GDPR confirmation has been actively selected.
- **FR-007**: The website MUST keep promotional or marketing consent separate from required GDPR data-processing confirmation if promotional messaging is offered.
- **FR-008**: The website MUST provide a completion state after registration that confirms success and gives the user a clear next destination.
- **FR-009**: The website MUST display a use-case directory containing exactly these initial use cases: High School Students, University Students, Entry Level Developers, Data Analysts, Small/Medium Business, Social Media, Marketing, Designer, Web Designer, Product, Personal Assistant, Agencies, Doctors, Nutritionists, Psychologists, Dentists, Hair Salon, and Nail Salon.
- **FR-010**: Each supported use case MUST have a dedicated user-facing path and a matching prompt-library page.
- **FR-011**: The initial use-case paths MUST be:
  - `/use-cases/high-school-students`
  - `/use-cases/university-students`
  - `/use-cases/entry-level-developers`
  - `/use-cases/data-analysts`
  - `/use-cases/small-medium-business`
  - `/use-cases/social-media`
  - `/use-cases/marketing`
  - `/use-cases/designer`
  - `/use-cases/web-designer`
  - `/use-cases/product`
  - `/use-cases/personal-assistant`
  - `/use-cases/agencies`
  - `/use-cases/doctors`
  - `/use-cases/nutritionists`
  - `/use-cases/psychologists`
  - `/use-cases/dentists`
  - `/use-cases/hair-salon`
  - `/use-cases/nail-salon`
- **FR-012**: If the user selects a primary use case during registration, successful registration MUST take the user directly to that use case's prompt-library path.
- **FR-013**: If the user does not select a primary use case, successful registration MUST take the user to the use-case directory.
- **FR-014**: Each use-case page MUST present prompts grouped by task, goal, or workflow so users can quickly identify relevant prompts without registration.
- **FR-015**: Each prompt item MUST include a title, intended outcome, prompt text, suggested inputs or context to provide, and a brief usage note.
- **FR-016**: The website MUST provide clear navigation between the landing page, registration form, use-case directory, and individual use-case pages.
- **FR-017**: The website MUST handle duplicate email registrations with a non-blocking path to continue, update details, or access the relevant use-case directory.
- **FR-018**: The website MUST show a clear fallback for unsupported use-case paths and provide a path back to the use-case directory.
- **FR-019**: Prompt pages for doctors, nutritionists, psychologists, and dentists MUST include responsible-use messaging that prompts are for productivity, education, drafting, or administrative support and are not a substitute for professional judgment.
- **FR-020**: The website MUST preserve the spelling-corrected public labels "Nutritionists" and "Psychologists" while still satisfying the user's requested use cases.
- **FR-021**: The website MUST allow unregistered visitors to view prompt collections and prompt items on direct use-case paths.

### Key Entities *(include if feature involves data)*

- **Visitor**: A person arriving at the website before completing registration; identified initially by submitted email if provided.
- **Lead Capture**: The first email submission from the landing page, including duplicate handling and continuation state before registration is complete.
- **Registration**: The captured basic information for a visitor, including name, email, primary use case, role or occupation, optional organization or business name, and completion status.
- **Consent Record**: The user's GDPR data-processing confirmation, including whether confirmation was given, when it was given, and the context in which it was requested.
- **Use Case**: A supported audience or business category with a display name, description, and dedicated user-facing path.
- **Prompt Collection**: The set of prompts associated with a use case, grouped by user goals, workflows, or tasks.
- **Prompt**: A reusable prompt item containing title, prompt text, intended outcome, suggested inputs, and usage guidance.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At least 90% of first-time test users can submit a valid email and reach the registration form in under 60 seconds without assistance.
- **SC-002**: At least 95% of registration attempts with valid required information and GDPR confirmation complete successfully in under 2 minutes.
- **SC-003**: 100% of the 18 supported use cases are visible in the use-case directory and reachable through their dedicated paths.
- **SC-004**: At least 90% of users who select a primary use case during registration arrive at the matching use-case prompt library without needing another selection.
- **SC-005**: 100% of tested registration attempts without GDPR confirmation are blocked with a clear explanation.
- **SC-006**: At least 85% of test users can find a relevant prompt for their selected use case within 90 seconds of arriving on that use-case page.
- **SC-007**: 100% of tested invalid email, duplicate email, and unsupported path cases produce a clear recovery option.
- **SC-008**: At least 80% of surveyed test users report that the use-case organization makes the prompt library easier to navigate than a single unsegmented list.

## Assumptions

- The website's primary business goal for this feature is lead capture followed by guided prompt discovery.
- "Register" means a short lead or access form, not a paid checkout flow or full account-security feature.
- The initial prompt library is curated content organized by use case; live prompt generation is outside this feature's scope.
- Full prompt access does not require completed basic registration. Direct visits to `/use-cases/{slug}` show the prompt library immediately.
- Public labels correct the misspellings "nutrionists" and "psycologist" to "Nutritionists" and "Psychologists".
- GDPR confirmation covers data processing for registration. Optional marketing communication, if offered, requires separate consent.
- Professional-use prompts are positioned as drafting, workflow, education, or communication aids and do not replace licensed professional advice or compliance obligations.
