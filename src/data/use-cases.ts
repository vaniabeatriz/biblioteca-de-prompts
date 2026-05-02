import type { UseCaseSlug, UseCaseSummary } from "@/types/prompt-library";

export const RESPONSIBLE_USE_MESSAGE =
  "These prompts support workflow, education, drafting, and communication. They do not replace licensed professional judgment, diagnosis, treatment, or compliance obligations.";

export const PROFESSIONAL_USE_CASE_SLUGS = [
  "doctors",
  "nutritionists",
  "psychologists",
  "dentists"
] as const satisfies readonly UseCaseSlug[];

export const USE_CASES: UseCaseSummary[] = [
  {
    slug: "high-school-students",
    displayName: "High School Students",
    description: "Study, revise, organize homework, and prepare for exams with structured prompts.",
    routePath: "/use-cases/high-school-students",
    sortOrder: 1,
    responsibleUseRequired: false,
    status: "active"
  },
  {
    slug: "university-students",
    displayName: "University Students",
    description: "Plan research, summarize reading, draft outlines, and manage coursework.",
    routePath: "/use-cases/university-students",
    sortOrder: 2,
    responsibleUseRequired: false,
    status: "active"
  },
  {
    slug: "entry-level-developers",
    displayName: "Entry Level Developers",
    description: "Understand code, debug errors, prepare portfolios, and practice interviews.",
    routePath: "/use-cases/entry-level-developers",
    sortOrder: 3,
    responsibleUseRequired: false,
    status: "active"
  },
  {
    slug: "data-analysts",
    displayName: "Data Analysts",
    description: "Frame analysis, clean data, explain insights, and prepare stakeholder summaries.",
    routePath: "/use-cases/data-analysts",
    sortOrder: 4,
    responsibleUseRequired: false,
    status: "active"
  },
  {
    slug: "small-medium-business",
    displayName: "Small/Medium Business",
    description: "Improve operations, customer communication, planning, and internal workflows.",
    routePath: "/use-cases/small-medium-business",
    sortOrder: 5,
    responsibleUseRequired: false,
    status: "active"
  },
  {
    slug: "social-media",
    displayName: "Social Media",
    description: "Plan posts, write captions, repurpose content, and structure content calendars.",
    routePath: "/use-cases/social-media",
    sortOrder: 6,
    responsibleUseRequired: false,
    status: "active"
  },
  {
    slug: "marketing",
    displayName: "Marketing",
    description: "Develop campaign ideas, messaging, landing-page copy, and audience research.",
    routePath: "/use-cases/marketing",
    sortOrder: 7,
    responsibleUseRequired: false,
    status: "active"
  },
  {
    slug: "designer",
    displayName: "Designer",
    description: "Clarify briefs, critique concepts, organize moodboards, and document decisions.",
    routePath: "/use-cases/designer",
    sortOrder: 8,
    responsibleUseRequired: false,
    status: "active"
  },
  {
    slug: "web-designer",
    displayName: "Web Designer",
    description: "Plan pages, improve UX copy, structure layouts, and prepare client handoffs.",
    routePath: "/use-cases/web-designer",
    sortOrder: 9,
    responsibleUseRequired: false,
    status: "active"
  },
  {
    slug: "product",
    displayName: "Product",
    description: "Shape product requirements, user stories, prioritization, and launch notes.",
    routePath: "/use-cases/product",
    sortOrder: 10,
    responsibleUseRequired: false,
    status: "active"
  },
  {
    slug: "personal-assistant",
    displayName: "Personal Assistant",
    description: "Manage schedules, draft communications, organize tasks, and prepare briefings.",
    routePath: "/use-cases/personal-assistant",
    sortOrder: 11,
    responsibleUseRequired: false,
    status: "active"
  },
  {
    slug: "agencies",
    displayName: "Agencies",
    description: "Draft proposals, manage client communication, create briefs, and report progress.",
    routePath: "/use-cases/agencies",
    sortOrder: 12,
    responsibleUseRequired: false,
    status: "active"
  },
  {
    slug: "doctors",
    displayName: "Doctors",
    description: "Support administrative drafting, patient-friendly explanations, and clinic workflows.",
    routePath: "/use-cases/doctors",
    sortOrder: 13,
    responsibleUseRequired: true,
    status: "active"
  },
  {
    slug: "nutritionists",
    displayName: "Nutritionists",
    description: "Draft educational materials, intake notes, and client communication workflows.",
    routePath: "/use-cases/nutritionists",
    sortOrder: 14,
    responsibleUseRequired: true,
    status: "active"
  },
  {
    slug: "psychologists",
    displayName: "Psychologists",
    description: "Support session admin, educational resources, and reflective communication drafts.",
    routePath: "/use-cases/psychologists",
    sortOrder: 15,
    responsibleUseRequired: true,
    status: "active"
  },
  {
    slug: "dentists",
    displayName: "Dentists",
    description: "Prepare appointment communication, aftercare explanations, and clinic admin drafts.",
    routePath: "/use-cases/dentists",
    sortOrder: 16,
    responsibleUseRequired: true,
    status: "active"
  },
  {
    slug: "hair-salon",
    displayName: "Hair Salon",
    description: "Create service descriptions, client messages, promotions, and booking workflows.",
    routePath: "/use-cases/hair-salon",
    sortOrder: 17,
    responsibleUseRequired: false,
    status: "active"
  },
  {
    slug: "nail-salon",
    displayName: "Nail Salon",
    description: "Draft service menus, appointment messages, promotions, and aftercare content.",
    routePath: "/use-cases/nail-salon",
    sortOrder: 18,
    responsibleUseRequired: false,
    status: "active"
  }
];
