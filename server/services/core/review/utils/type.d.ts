export interface FirstStep {
    deliveryId: string;
    installationId: number;
    repositoryId: number;
    repositoryName: string;
    pullRequestNumber: number;
    pullRequestTitle: string;
    headSha: string;
    action: "opened" | "synchronize" | "reopened";
}

export interface PullRequestPayload {
    action: "opened" | "synchronize" | "reopened";

    pull_request: {
        id: number;
        title: string;
        head: {
            sha: string;
            ref: string;
        };
        created_at: string;
    };

    repository: {
        id: number;
    };
}

export interface TriggerPayload {
    payload: GitHubPullRequestPayload;
    deliveryId: string;
    installationId: number;
    provider: "github";
}
