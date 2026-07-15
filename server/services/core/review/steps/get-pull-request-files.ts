import { GithubAppService } from "@/server/services/integrations/github-app-service";
import { Prfile } from "./types";

const FILES_PER_PAGE = 100;

export async function getPullRequestFiles(
    installationId: number,
    repositoryName: string,
    pullRequestNumber: number
): Promise<Prfile[]> {
    const octokit = await GithubAppService.getGithubApp().getInstallationOctokit(installationId);
    const [owner, repo] = repositoryName.split("/");

    const response = await octokit.request(
        "GET /repos/{owner}/{repo}/pulls/{pull_number}/files",
        {
            owner,
            repo,
            pull_number: pullRequestNumber,
            per_page: FILES_PER_PAGE,
        }
    );

    const files: Prfile[] = response.data.map((file) => ({
        filePath: file.filename,
        patch: file.patch || "",
    }));

    return files;
}