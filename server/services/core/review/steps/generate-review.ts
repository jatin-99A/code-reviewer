import { generateText } from "ai";
import { llm } from "@/lib/ai";
import { SYSTEM_PROMPT } from "@/lib/prompts/system";

const REVIEW_MODEL = "openrouter/free";

function buildRepoContextSection(repoContextSnippets: string[]) {
    if (repoContextSnippets.length === 0) {
        return "";
    }

    const repoContext = repoContextSnippets.join("\n\n---\n\n");

    return `

Related code from the repository (for context only, not part of the change):

${repoContext}`;
}


export async function generateReview(repoName: string, title: string, diff: string) {
    const { text } = await generateText({
        model: llm(REVIEW_MODEL),
        system: SYSTEM_PROMPT,
        prompt: `Repository: ${repoName}
Pull request title: ${title}

## Changed files (unified diff)

${diff}${buildRepoContextSection([])}`,
    });

    return text;
}