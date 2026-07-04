/*
  Warnings:

  - A unique constraint covering the columns `[installationId]` on the table `github_installation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "RepositoryHealthStatus" AS ENUM ('HEALTHY', 'WARNING', 'CRITICAL');

-- CreateEnum
CREATE TYPE "PullRequestStatus" AS ENUM ('OPEN', 'MERGED', 'IN_REVIEW', 'APPROVED');

-- CreateEnum
CREATE TYPE "AIIssueSeverity" AS ENUM ('CRITICAL', 'WARNING', 'NOTICE');

-- CreateEnum
CREATE TYPE "AIIssueStatus" AS ENUM ('OPEN', 'RESOLVED');

-- AlterTable
ALTER TABLE "github_installation" ADD COLUMN     "rateLimitRemaining" INTEGER,
ADD COLUMN     "rateLimitTotal" INTEGER;

-- CreateTable
CREATE TABLE "repositories" (
    "id" TEXT NOT NULL,
    "installationId" TEXT NOT NULL,
    "githubRepoId" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "mainBranch" TEXT NOT NULL,
    "healthScore" INTEGER NOT NULL,
    "healthStatus" "RepositoryHealthStatus" NOT NULL,
    "language" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "repositories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pull_requests" (
    "id" TEXT NOT NULL,
    "repositoryId" TEXT NOT NULL,
    "githubPrId" BIGINT NOT NULL,
    "prNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "branchName" TEXT NOT NULL,
    "status" "PullRequestStatus" NOT NULL,
    "aiScore" INTEGER,
    "linesAdded" INTEGER,
    "linesDeleted" INTEGER,
    "openedBy" TEXT NOT NULL,
    "githubCreatedAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pull_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_issues" (
    "id" TEXT NOT NULL,
    "pullRequestId" TEXT NOT NULL,
    "repositoryId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "severity" "AIIssueSeverity" NOT NULL,
    "filePath" TEXT NOT NULL,
    "lineNumber" INTEGER NOT NULL,
    "status" "AIIssueStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_issues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_analytics" (
    "id" SERIAL NOT NULL,
    "repositoryId" TEXT NOT NULL,
    "logDate" DATE NOT NULL,
    "reviewsCount" INTEGER NOT NULL,
    "issuesCount" INTEGER NOT NULL,

    CONSTRAINT "daily_analytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "repositories_githubRepoId_key" ON "repositories"("githubRepoId");

-- CreateIndex
CREATE INDEX "idx_repo_github_id" ON "repositories"("githubRepoId");

-- CreateIndex
CREATE INDEX "idx_repo_installation" ON "repositories"("installationId");

-- CreateIndex
CREATE UNIQUE INDEX "pull_requests_githubPrId_key" ON "pull_requests"("githubPrId");

-- CreateIndex
CREATE INDEX "idx_pr_repo_status" ON "pull_requests"("repositoryId", "status");

-- CreateIndex
CREATE INDEX "idx_pr_github_id" ON "pull_requests"("githubPrId");

-- CreateIndex
CREATE INDEX "idx_issues_pr" ON "ai_issues"("pullRequestId");

-- CreateIndex
CREATE INDEX "idx_issues_repo_severity" ON "ai_issues"("repositoryId", "severity");

-- CreateIndex
CREATE UNIQUE INDEX "idx_analytics_repo_date" ON "daily_analytics"("repositoryId", "logDate");

-- CreateIndex
CREATE UNIQUE INDEX "github_installation_installationId_key" ON "github_installation"("installationId");

-- CreateIndex
CREATE INDEX "idx_installation_github_id" ON "github_installation"("installationId");

-- CreateIndex
CREATE INDEX "idx_installation_user" ON "github_installation"("userId");

-- AddForeignKey
ALTER TABLE "repositories" ADD CONSTRAINT "repositories_installationId_fkey" FOREIGN KEY ("installationId") REFERENCES "github_installation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pull_requests" ADD CONSTRAINT "pull_requests_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "repositories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_issues" ADD CONSTRAINT "ai_issues_pullRequestId_fkey" FOREIGN KEY ("pullRequestId") REFERENCES "pull_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_issues" ADD CONSTRAINT "ai_issues_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "repositories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_analytics" ADD CONSTRAINT "daily_analytics_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "repositories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
