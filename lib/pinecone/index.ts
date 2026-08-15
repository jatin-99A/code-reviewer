import { Pinecone } from "@pinecone-database/pinecone";

let pineconeClient: Pinecone | null = null;

function getPineconeClient(): Pinecone | null {
    const apiKey = process.env.PINECONE_API_KEY;
    if (!apiKey) {
        return null;
    }
    if (!pineconeClient) {
        pineconeClient = new Pinecone({
            apiKey,
        });
    }
    return pineconeClient;
}

export async function queryPineconeContext(repoName: string, textChunk: string): Promise<string[]> {
    const pc = getPineconeClient();
    if (!pc) {
        return [];
    }

    const indexName = process.env.PINECONE_INDEX_NAME;
    if (!indexName) {
        return [];
    }

    try {
        const embeddings = await pc.inference.embed({
            model: "llama-text-embed-v2",
            inputs: [textChunk],
            parameters: {
                inputType: "query"
            }
        });

        if (!embeddings.data || embeddings.data.length === 0) {
            return [];
        }

        const firstEmbedding = embeddings.data[0];
        if (!firstEmbedding || !("values" in firstEmbedding) || !firstEmbedding.values) {
            return [];
        }

        const queryVector = firstEmbedding.values;
        const index = pc.index(indexName);
        const queryResponse = await index.query({
            vector: queryVector,
            topK: 3,
            includeMetadata: true,
            filter: {
                repoName: { $eq: repoName }
            }
        });

        const snippets: string[] = [];
        if (queryResponse.matches) {
            for (const match of queryResponse.matches) {
                if (match.metadata && typeof match.metadata.text === "string") {
                    snippets.push(match.metadata.text);
                }
            }
        }
        return snippets;
    } catch (error) {
        // Fallback: return empty on failure or connection issues
        return [];
    }
}

