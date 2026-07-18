import { RepositoriesView } from "@/features/dashboard/components/repos/repositories.view";
import { TopBar } from "@/features/dashboard/components/topbar";
import { getGithubInstallationRepositories } from "@/features/github/actions";
import { GithubRepo } from "@/server/services/core/github/github-repositories-service";

export default async function RepositoriesPage() {
  let repositories: Awaited<ReturnType<typeof getGithubInstallationRepositories>> | null = null;

  try {
    repositories = await getGithubInstallationRepositories();
  } catch (error) {
    console.error("Failed to load repositories", error);
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <TopBar
        title="Repositories"
        description="Manage and monitor your connected repositories"
      />

      <main className="flex-1 p-4 sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
            <span className="font-medium text-foreground">{repositories?.repos.length}</span>
            <span>repositories</span>
          </div>
        </div>

        {!repositories || repositories?.totalCount === 0 ? (
          <div className="rounded-lg border border-dashed border-border/70 bg-background/60 p-8 text-center text-sm text-muted-foreground">
            No repositories available yet.
          </div>
        ) : (
          <RepositoriesView
            repos={repositories?.repos}
            totalCount={repositories?.totalCount}
            page={repositories.page}
            hasMore={repositories.hasMore}
          />
        )}
      </main>
    </div>
  );
}
