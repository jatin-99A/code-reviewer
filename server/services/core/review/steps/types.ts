export interface Prfile {
    filePath: string,
    patch: string
}

export interface PullRequestFilesInput {
    installationId: number;
    repositoryName: string;
    pullRequestNumber: number;
}

export type CodeChunk = {
    id: string;
    filePath: string;
    text: string;
};
