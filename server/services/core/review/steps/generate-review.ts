import { generateText } from "ai";
import { llm } from "@/lib/ai";
import { SYSTEM_PROMPT } from "@/lib/prompts/system";
import { CHUNK_REVIEW_PROMPT } from "@/lib/prompts/review-prompt";

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

export async function generateChunkReview(
    repoName: string,
    title: string,
    chunkText: string,
    contextSnippets: string[]
) {
    const { text } = await generateText({
        model: llm(REVIEW_MODEL),
        system: CHUNK_REVIEW_PROMPT,
        prompt: `Repository: ${repoName}
Pull request title: ${title}

## Code Chunk to review:
${chunkText}${buildRepoContextSection(contextSnippets)}`,
    });

    return text;
}

export async function generateReview(repoName: string, title: string, chunkReviewsContent: string) {
    const { text } = await generateText({
        model: llm(REVIEW_MODEL),
        system: SYSTEM_PROMPT,
        prompt: `Repository: ${repoName}
Pull request title: ${title}

## Generated chunk findings to consolidate:

${chunkReviewsContent}`,
    });

    return text;
}
