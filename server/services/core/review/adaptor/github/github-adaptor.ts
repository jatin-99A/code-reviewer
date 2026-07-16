import { TriggerPayload } from "../../utils/type";
import { PRProviderAdapter } from "./type";

export class GitHubAdapter implements PRProviderAdapter {

    getPRData(payload: TriggerPayload["payload"]) {
        const pr = payload.pull_request;

        return {
            repositoryId: payload.repository.id,
            repositoryName: payload.repository.full_name,
            prNumber: pr.number,
            title: pr.title,
            branchName: pr.head.ref,
            headSha: pr.head.sha,
            openedBy: pr.user.login,
            createdAt: pr.created_at,
        };
    }
}