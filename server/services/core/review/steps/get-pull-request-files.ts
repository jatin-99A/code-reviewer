import { GithubAppService } from "@/server/services/integrations/github-app-service";
import { Prfile, PullRequestFilesInput } from "./types";

const FILES_PER_PAGE = 100;

export async function getPullRequestFiles(
    {
        installationId, repositoryName, pullRequestNumber
    }: PullRequestFilesInput
): Promise<Prfile[]> {
    const octokit = await GithubAppService.getGithubApp().getInstallationOctokit(installationId);
    const [owner, repo] = repositoryName.split("/");

    let page = 1;
    let allFiles: Prfile[] = [];

    while (true) {
        const response = await octokit.request(
            "GET /repos/{owner}/{repo}/pulls/{pull_number}/files",
            {
                owner,
                repo,
                pull_number: pullRequestNumber,
                per_page: FILES_PER_PAGE,
                page,
            }
        );

        if (response.data.length === 0) break;

        allFiles.push(
            ...response.data.map((file) => ({
                filePath: file.filename,
                patch: file.patch || "",
            }))
        );

        page++;
    }

    return allFiles;
}