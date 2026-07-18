import { GithubRepo } from "@/server/services/core/github/github-repositories-service";
import { RepoCard } from "./repo-card";

interface RepoListProps {
    repos: GithubRepo[];
    totalCount: number;
}

export function RepoList({ repos, totalCount }: RepoListProps) {
    return (
        <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {repos.map((repo) => (
                    <RepoCard key={repo.id} repo={repo} />
                ))}
            </div>
            <p className="text-center text-xs text-muted-foreground">
                Showing {repos.length} of {totalCount} repositories
            </p>
        </div>
    );
}
