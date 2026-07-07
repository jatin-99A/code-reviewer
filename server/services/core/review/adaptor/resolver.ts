import { GitHubAdapter } from "./github/github-adaptor";

export function getProviderAdapter(provider: "github") {
    switch (provider) {
        case "github":
            return new GitHubAdapter();

        default:
            throw new Error("Unsupported provider");
    }
}