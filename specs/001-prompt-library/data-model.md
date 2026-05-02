# Data Model: Prompt Library Website

## Entity: UseCase

Represents one supported audience or business category.

**Fields**:

- `slug`: Canonical path identifier. Required, unique.
- `displayName`: Public label shown to users. Required.
- `description`: Short explanation of the use case. Required.
- `routePath`: Public path, derived from `slug`. Required.
- `sortOrder`: Directory ordering. Required.
- `responsibleUseRequired`: Whether the page needs professional responsible-use messaging. Required.
- `status`: `active` or `empty`. Required.

**Initial slugs**:

- `high-school-students`
- `university-students`
- `entry-level-developers`
- `data-analysts`
- `small-medium-business`
- `social-media`
- `marketing`
- `designer`
- `web-designer`
- `product`
- `personal-assistant`
- `agencies`
- `doctors`
- `nutritionists`
- `psychologists`
- `dentists`
- `hair-salon`
- `nail-salon`

**Validation Rules**:

- `slug` must match one of the initial supported slugs for this feature.
- `routePath` must equal `/use-cases/{slug}`.
- `Nutritionists` and `Psychologists` are the public labels for the spelling-corrected requested categories.
- `responsibleUseRequired` must be true for `doctors`, `nutritionists`, `psychologists`, and `dentists`.

## Entity: PromptCollection

Groups prompts within a use case by task, goal, or workflow.

**Fields**:

- `id`: Unique identifier. Required.
- `useCaseSlug`: Parent use-case slug. Required.
- `title`: Collection title. Required.
- `description`: Short purpose of the collection. Required.
- `sortOrder`: Ordering within the use-case page. Required.
- `status`: `active` or `empty`. Required.

**Relationships**:

- Belongs to one `UseCase`.
- Has many `Prompt` records.

**Validation Rules**:

- `useCaseSlug` must reference a supported `UseCase`.
- Empty collections may be shown only with a clear next action or explanatory state.

## Entity: Prompt

Represents a reusable prompt item.

**Fields**:

- `id`: Unique identifier. Required.
- `useCaseSlug`: Parent use-case slug. Required.
- `collectionId`: Parent collection identifier. Required.
- `title`: User-facing prompt title. Required.
- `intendedOutcome`: What the prompt helps the user accomplish. Required.
- `promptText`: The prompt content. Required.
- `suggestedInputs`: Context the user should provide when using the prompt. Required.
- `usageNote`: Brief usage guidance. Required.
- `responsibleUseNote`: Category-specific responsible-use note when required. Optional.
- `tags`: Optional labels for scanning and future filtering.
- `status`: `draft`, `active`, or `archived`. Required.
- `sortOrder`: Ordering within the collection. Required.

**Relationships**:

- Belongs to one `UseCase`.
- Belongs to one `PromptCollection`.

**Validation Rules**:

- Active prompts must have non-empty `title`, `intendedOutcome`, `promptText`, `suggestedInputs`, and `usageNote`.
- Prompts for regulated professional use cases must include or inherit responsible-use messaging.

## Entity: LeadCapture

Represents the first landing-page email submission before full registration.

**Fields**:

- `id`: Unique identifier. Required.
- `email`: Submitted email address. Required, normalized, unique by email.
- `source`: Capture source such as `landing_page`. Required.
- `status`: `email_captured`, `registration_completed`, or `duplicate_detected`. Required.
- `capturedAt`: Time the email was first submitted. Required.
- `lastSeenAt`: Time the email last interacted with the flow. Required.

**Relationships**:

- May become one `Registration`.

**Validation Rules**:

- Email must be present and formatted as an email address.
- Duplicate email capture must return a continuation path instead of creating a second active lead.

## Entity: Registration

Represents the basic registration form submission.

**Fields**:

- `id`: Unique identifier. Required.
- `email`: Registered email address. Required, normalized, unique.
- `fullName`: User's full name. Required.
- `roleOrOccupation`: User-provided role or occupation. Required.
- `organizationName`: Optional organization or business name.
- `primaryUseCaseSlug`: Selected primary use case. Optional.
- `intendedDestination`: Preserved use-case path from a direct visit before registration. Optional.
- `status`: `started`, `completed`, or `updated`. Required.
- `createdAt`: Registration creation time. Required.
- `updatedAt`: Last update time. Required.

**Relationships**:

- References one `LeadCapture` by email when one exists.
- Has at least one accepted `ConsentRecord` for GDPR data processing.
- May reference one primary `UseCase`.

**Validation Rules**:

- `email`, `fullName`, and `roleOrOccupation` are required.
- `primaryUseCaseSlug`, when present, must match a supported `UseCase`.
- `intendedDestination`, when present, must be a supported `/use-cases/{slug}` path.
- Registration cannot complete without an accepted GDPR data-processing consent record.
- Duplicate registration must allow continuation or update without creating duplicate active registration records.

## Entity: ConsentRecord

Represents explicit user consent or confirmation related to registration.

**Fields**:

- `id`: Unique identifier. Required.
- `email`: Email associated with the consent record. Required.
- `purpose`: `registration_data_processing` or `marketing_communications`. Required.
- `accepted`: Whether the user accepted the consent item. Required.
- `consentTextVersion`: Version of the text shown when consent was recorded. Required.
- `acceptedAt`: Time consent was actively accepted. Required when `accepted` is true.
- `context`: Page or flow where consent was requested. Required.

**Relationships**:

- Belongs to a `Registration` by email after registration completion.

**Validation Rules**:

- `registration_data_processing` consent must be explicit, accepted, and not preselected before registration completion.
- `marketing_communications` consent must be optional and separate from required GDPR data-processing confirmation.
- Consent text version must be stored so future wording changes do not obscure what the user accepted.

## State Transitions

### Lead and Registration Flow

1. Visitor submits valid email on landing page.
2. `LeadCapture` is created with `email_captured`, or an existing lead is returned with a continuation path.
3. Visitor opens the registration form with email retained.
4. Visitor submits required details and actively confirms GDPR data processing.
5. `ConsentRecord` is created for `registration_data_processing`.
6. `Registration` moves to `completed`.
7. User is routed to a preserved intended destination, the selected use-case path, or `/use-cases` in that order.

### Duplicate Email Flow

1. Visitor submits an email already known to the system.
2. Existing `LeadCapture` or `Registration` is found.
3. User receives a non-blocking continuation or update path.
4. No duplicate active registration is created.

### Unsupported Use-Case Path Flow

1. User requests a slug outside the supported list.
2. The app shows a clear recovery state.
3. User is directed back to `/use-cases`.
