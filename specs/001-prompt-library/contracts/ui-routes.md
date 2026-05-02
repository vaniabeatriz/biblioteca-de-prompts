# UI Route Contract: Prompt Library Website

## Route: `/`

**Purpose**: Landing page for first-time visitors.

**Required content and behavior**:

- Introduces the prompt library as organized by use case.
- Presents email capture as the primary action.
- Rejects blank or invalid email addresses with a clear correction message.
- On valid email capture, routes the user to `/register?email={encodedEmail}`.
- For duplicate emails, gives a continuation path without blocking the user.

## Route: `/register`

**Purpose**: Basic registration form after email capture.

**Required content and behavior**:

- Retains or pre-populates the email submitted on the landing page when provided.
- Preserves an intended destination when the user arrived from a direct use-case path.
- Collects full name, email, primary use case, role or occupation, and optional organization or business name.
- Includes an explicit GDPR data-processing confirmation that is not preselected.
- Keeps optional marketing consent separate if marketing consent is offered.
- Blocks submission when required information is invalid or GDPR confirmation is missing.
- On success, routes to `/use-cases/{selectedSlug}` when a primary use case is selected.
- On success, routes to the preserved intended destination when one is present and valid.
- On success without a selected primary use case, routes to `/use-cases`.

## Route: `/registration/success`

**Purpose**: Confirmation state after registration completion.

**Required content and behavior**:

- Confirms that registration is complete.
- Offers the next destination determined by selected use case or the directory.
- Does not require the user to repeat the email capture flow.

## Route: `/use-cases`

**Purpose**: Directory of all supported use cases.

**Required content and behavior**:

- Shows exactly 18 initial use cases:
  - High School Students
  - University Students
  - Entry Level Developers
  - Data Analysts
  - Small/Medium Business
  - Social Media
  - Marketing
  - Designer
  - Web Designer
  - Product
  - Personal Assistant
  - Agencies
  - Doctors
  - Nutritionists
  - Psychologists
  - Dentists
  - Hair Salon
  - Nail Salon
- Each directory item links to its canonical `/use-cases/{slug}` path.
- Public labels use the corrected spellings `Nutritionists` and `Psychologists`.

## Route: `/use-cases/{slug}`

**Purpose**: Dedicated prompt-library page for one use case.

**Required content and behavior**:

- Supports only canonical slugs listed in `data-model.md`.
- Allows direct visits before registration to show a category preview and a registration prompt that preserves the current use-case path.
- Shows the use-case display name, description, prompt collections, and prompt items.
- Groups prompts by task, goal, or workflow.
- Each prompt item shows title, intended outcome, prompt text, suggested inputs, and usage note.
- For `doctors`, `nutritionists`, `psychologists`, and `dentists`, displays responsible-use messaging that prompts do not replace professional judgment.
- If a collection is empty, shows a useful empty state rather than a broken page.

## Route: Unsupported Paths

**Purpose**: Recovery from invalid, misspelled, or unsupported use-case paths.

**Required content and behavior**:

- Shows a clear recovery message.
- Provides a direct path back to `/use-cases`.
- Does not expose a broken or blank page.
