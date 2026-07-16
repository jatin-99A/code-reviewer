export interface ReturnTypeOfHandlePr {
    deliveryId: string;
    installationId: number;
    repositoryId: number;
    repositoryName: string;
    pullRequestNumber: number;
    pullRequestTitle: string;
    headSha: string;
    action: "opened" | "synchronize" | "reopened";
}

interface GitHubPullRequestPayload {
    action: "opened" | "synchronize" | "reopened";

    pull_request: {
        id: number;
        number: number;
        title: string;

        head: {
            sha: string;
            ref: string;
        };

        user: {
            login: string;
        };

        created_at: string;
    };

    repository: {
        id: number;
        full_name: string;
    };
}

export interface TriggerPayload {
    payload: GitHubPullRequestPayload;
    deliveryId: string;
    installationId: number;
    provider: "github";
}
