import { GithubAppService } from "@/server/services/integrations/github-app-service";

export async function postPrComment(
    installationId: number,
    repositoryName: string,
    pullRequestNumber: number,
    comment: string
) {
    const octokit = await GithubAppService.getGithubApp().getInstallationOctokit(installationId);
    const [owner, repo] = repositoryName.split("/");

    await octokit.request(
        "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
        {
            owner,
            repo,
            issue_number: pullRequestNumber,
            body: comment,
        }
    );
}