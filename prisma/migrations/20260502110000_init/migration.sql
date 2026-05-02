-- CreateTable
CREATE TABLE "LeadCapture" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'landing_page',
    "status" TEXT NOT NULL DEFAULT 'email_captured',
    "capturedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeadCapture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registration" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "roleOrOccupation" TEXT NOT NULL,
    "organizationName" TEXT,
    "primaryUseCaseSlug" TEXT,
    "intendedDestination" TEXT,
    "status" TEXT NOT NULL DEFAULT 'completed',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsentRecord" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL,
    "consentTextVersion" TEXT NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "context" TEXT NOT NULL,

    CONSTRAINT "ConsentRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UseCase" (
    "slug" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "routePath" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "responsibleUseRequired" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'active',

    CONSTRAINT "UseCase_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "PromptCollection" (
    "id" TEXT NOT NULL,
    "useCaseSlug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',

    CONSTRAINT "PromptCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prompt" (
    "id" TEXT NOT NULL,
    "useCaseSlug" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "intendedOutcome" TEXT NOT NULL,
    "promptText" TEXT NOT NULL,
    "suggestedInputs" TEXT NOT NULL,
    "usageNote" TEXT NOT NULL,
    "responsibleUseNote" TEXT,
    "tags" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LeadCapture_email_key" ON "LeadCapture"("email");

-- CreateIndex
CREATE INDEX "LeadCapture_status_idx" ON "LeadCapture"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Registration_email_key" ON "Registration"("email");

-- CreateIndex
CREATE INDEX "Registration_primaryUseCaseSlug_idx" ON "Registration"("primaryUseCaseSlug");

-- CreateIndex
CREATE INDEX "ConsentRecord_email_idx" ON "ConsentRecord"("email");

-- CreateIndex
CREATE INDEX "ConsentRecord_purpose_idx" ON "ConsentRecord"("purpose");

-- CreateIndex
CREATE UNIQUE INDEX "UseCase_routePath_key" ON "UseCase"("routePath");

-- CreateIndex
CREATE INDEX "PromptCollection_useCaseSlug_idx" ON "PromptCollection"("useCaseSlug");

-- CreateIndex
CREATE INDEX "Prompt_useCaseSlug_idx" ON "Prompt"("useCaseSlug");

-- CreateIndex
CREATE INDEX "Prompt_collectionId_idx" ON "Prompt"("collectionId");

-- AddForeignKey
ALTER TABLE "PromptCollection" ADD CONSTRAINT "PromptCollection_useCaseSlug_fkey" FOREIGN KEY ("useCaseSlug") REFERENCES "UseCase"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_useCaseSlug_fkey" FOREIGN KEY ("useCaseSlug") REFERENCES "UseCase"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "PromptCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
