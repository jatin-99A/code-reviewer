export interface TriggerPayload {
    deliveryId: string;
    installationId: number;
    repositoryId: number;
    repositoryName: string;
    pullRequestNumber: number;
    pullRequestTitle: string;
    headSha: string;
    action: "opened" | "synchronize" | "reopened";
}