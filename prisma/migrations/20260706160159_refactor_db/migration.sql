/*
  Warnings:

  - The values [OPEN,MERGED,IN_REVIEW,APPROVED] on the enum `PullRequestStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `ai_issues` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `daily_analytics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `repositories` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[deliveryId]` on the table `pull_requests` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[repositoryId,prNumber]` on the table `pull_requests` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deliveryId` to the `pull_requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `headSha` to the `pull_requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `installationId` to the `pull_requests` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `repositoryId` on the `pull_requests` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PullRequestStatus_new" AS ENUM ('PROCESSING', 'REVIEWED', 'FAILED');
ALTER TABLE "pull_requests" ALTER COLUMN "status" TYPE "PullRequestStatus_new" USING ("status"::text::"PullRequestStatus_new");
ALTER TYPE "PullRequestStatus" RENAME TO "PullRequestStatus_old";
ALTER TYPE "PullRequestStatus_new" RENAME TO "PullRequestStatus";
DROP TYPE "public"."PullRequestStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "ai_issues" DROP CONSTRAINT "ai_issues_pullRequestId_fkey";

-- DropForeignKey
ALTER TABLE "ai_issues" DROP CONSTRAINT "ai_issues_repositoryId_fkey";

-- DropForeignKey
ALTER TABLE "daily_analytics" DROP CONSTRAINT "daily_analytics_repositoryId_fkey";

-- DropForeignKey
ALTER TABLE "pull_requests" DROP CONSTRAINT "pull_requests_repositoryId_fkey";

-- DropForeignKey
ALTER TABLE "repositories" DROP CONSTRAINT "repositories_installationId_fkey";

-- DropIndex
DROP INDEX "idx_pr_github_id";

-- DropIndex
DROP INDEX "idx_pr_repo_status";

-- AlterTable
ALTER TABLE "pull_requests" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deliveryId" TEXT NOT NULL,
ADD COLUMN     "headSha" TEXT NOT NULL,
ADD COLUMN     "installationId" INTEGER NOT NULL,
ADD COLUMN     "reviewComment" TEXT,
ADD COLUMN     "reviewedAt" TIMESTAMP(3),
DROP COLUMN "repositoryId",
ADD COLUMN     "repositoryId" BIGINT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PROCESSING';

-- DropTable
DROP TABLE "ai_issues";

-- DropTable
DROP TABLE "daily_analytics";

-- DropTable
DROP TABLE "repositories";

-- DropEnum
DROP TYPE "AIIssueSeverity";

-- DropEnum
DROP TYPE "AIIssueStatus";

-- DropEnum
DROP TYPE "RepositoryHealthStatus";

-- CreateIndex
CREATE UNIQUE INDEX "pull_requests_deliveryId_key" ON "pull_requests"("deliveryId");

-- CreateIndex
CREATE INDEX "idx_pr_installation" ON "pull_requests"("installationId");

-- CreateIndex
CREATE INDEX "idx_pr_repository" ON "pull_requests"("repositoryId");

-- CreateIndex
CREATE INDEX "idx_pr_status" ON "pull_requests"("status");

-- CreateIndex
CREATE INDEX "idx_pr_head_sha" ON "pull_requests"("headSha");

-- CreateIndex
CREATE INDEX "idx_pr_github_created" ON "pull_requests"("githubCreatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "pull_requests_repositoryId_prNumber_key" ON "pull_requests"("repositoryId", "prNumber");
