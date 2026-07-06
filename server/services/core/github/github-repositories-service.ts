import prisma from "@/lib/db";
import { GithubAppService } from "@/server/services/integrations/github-app-service";

export interface GithubRepo {
    id: number;
    name: string;
    fullName: string;
    description: string | null;
    defaultBranch: string;
    language: string | null;
    private: boolean;

    stars: number;
    branch: string;
    health: number;
    status: "healthy" | "risky" | "critical";
    lastReview: string;
    issues: number;
}

export interface InstallationReposPage {
    repos: GithubRepo[];
    totalCount: number;
    page: number;
    hasMore: boolean;
}

function calculateRepoHealth(repo: any): number {
    const issues = Number(repo?.open_issues_count ?? 0);

    if (issues > 20) {
        return 40;
    }

    if (issues > 10) {
        return 70;
    }

    return 100;
}

function getRepoStatus(repo: any): "healthy" | "risky" | "critical" {
    const health = calculateRepoHealth(repo);

    if (health < 50) {
        return "critical";
    }

    if (health < 80) {
        return "risky";
    }

    return "healthy";
}

function getLastReviewTime(repo: any): string {
    if (repo?.updated_at) {
        const diff = Date.now() - new Date(repo.updated_at).getTime();

        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        if (minutes < 1) return "just now";
        if (minutes < 60) return `${minutes} min ago`;
        if (hours < 24) return `${hours} hr ago`;
        if (days < 30) return `${days} day ago`;
        if (months < 12) return `${months} month ago`;
        return `${years} year ago`;
    }

    return "No review yet";
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

        stars: repo.stargazers_count,
        issues: repo.open_issues_count,
        branch: repo.default_branch,

        health: calculateRepoHealth(repo),
        status: getRepoStatus(repo),
        lastReview: getLastReviewTime(repo),
    };
}

const REPOS_PER_PAGE = 100;

export async function getInstallationReposPage(
    userId: string,
    page = 1
): Promise<InstallationReposPage> {
    try {
        const installation = await prisma.githubInstallation.findUnique({
            where: { userId },
            select: { installationId: true },
        });

        if (!installation?.installationId) {
            throw new Error("GitHub installation not found for this user.");
        }

        const installationId = installation.installationId;

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