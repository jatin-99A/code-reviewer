export interface PRProviderAdapter {
    getPRData(payload: any): {
        repositoryId: string | number;
        repositoryName: string;
        prNumber: number;
        title: string;
        branchName: string;
        headSha: string;
        openedBy: string;
        createdAt: string;
    };

    isValidEvent(payload: any): boolean;

    getAllowedActions(): string[];
}