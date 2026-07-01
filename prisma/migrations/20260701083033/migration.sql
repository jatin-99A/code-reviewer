/*
  Warnings:

  - The `status` column on the `github_installation` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "GithubInstallationStatus" AS ENUM ('ACTIVE', 'PENDING_DELETE');

-- AlterTable
ALTER TABLE "github_installation" DROP COLUMN "status",
ADD COLUMN     "status" "GithubInstallationStatus" NOT NULL DEFAULT 'ACTIVE';
