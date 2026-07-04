import prisma from "@/lib/db";
import { GithubAppService } from "@/server/services/github/github-app-service";

export interface GithubRepo {
    id: number;
    name: string;
    fullName: string;
    description: string | null;
    defaultBranch: string;
    language: string | null;
    private: boolean;
}

export interface InstallationReposPage {
    repos: GithubRepo[];
    totalCount: number;
    page: number;
    hasMore: boolean;
}

export function mapRepo(repo: any): GithubRepo {
    return {
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        defaultBranch: repo.default_branch,
        language: repo.language,
        private: repo.private,
    };
}

const REPOS_PER_PAGE = 100;

export async function getInstallationReposPage(
    userId: string | number,
    page = 1
): Promise<InstallationReposPage> {
    try {
        let installationId: number;

        if (typeof userId === "number") {
            installationId = userId;
        } else {
            const installation = await prisma.githubInstallation.findUnique({
                where: { userId: userId },
                select: { installationId: true },
            });

            if (!installation?.installationId) {
                throw new Error("GitHub installation not found for this user.");
            }

            installationId = installation.installationId;
        }

        const app = GithubAppService.getGithubApp();
        const octokit = await app.getInstallationOctokit(installationId);

        const { data } = await octokit.request("GET /installation/repositories", {
            per_page: REPOS_PER_PAGE,
            page,
        });

        const totalCount = data.total_count ?? 0;
        const repos = (data.repositories ?? []).map(mapRepo);

        return {
            repos,
            totalCount,
            page,
            hasMore: page * REPOS_PER_PAGE < totalCount,
        };
    } catch (error) {
        console.error("Error fetching installation repositories:", error);
        throw new Error("Failed to fetch GitHub repositories");
    }
}