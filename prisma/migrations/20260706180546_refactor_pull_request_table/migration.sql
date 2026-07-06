/*
  Warnings:

  - The `status` column on the `pull_requests` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `userId` to the `pull_requests` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GitHubPullRequestStatus" AS ENUM ('PROCESSING', 'REVIEWED', 'FAILED');

-- AlterTable
ALTER TABLE "pull_requests" ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "GitHubPullRequestStatus" NOT NULL DEFAULT 'PROCESSING';

-- DropEnum
DROP TYPE "PullRequestStatus";

-- CreateIndex
CREATE INDEX "pull_requests_userId_idx" ON "pull_requests"("userId");

-- CreateIndex
CREATE INDEX "pull_requests_status_idx" ON "pull_requests"("status");

-- AddForeignKey
ALTER TABLE "pull_requests" ADD CONSTRAINT "pull_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pull_requests" ADD CONSTRAINT "pull_requests_installationId_fkey" FOREIGN KEY ("installationId") REFERENCES "github_installation"("installationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "idx_pr_github_created" RENAME TO "pull_requests_githubCreatedAt_idx";

-- RenameIndex
ALTER INDEX "idx_pr_head_sha" RENAME TO "pull_requests_headSha_idx";

-- RenameIndex
ALTER INDEX "idx_pr_installation" RENAME TO "pull_requests_installationId_idx";

-- RenameIndex
ALTER INDEX "idx_pr_repository" RENAME TO "pull_requests_repositoryId_idx";

-- RenameIndex
ALTER INDEX "idx_pr_status" RENAME TO "pull_requests_status_idx";
