import { CodeChunk, Prfile } from "./types";

const MAX_CHUNK_LINES = 300;

function buildChunkId(prNumber: number, filePath: string, part: number) {
    return `pr-${prNumber}--${filePath}--part-${part}`;
}

function isReviewableFile(filePath: string): boolean {
    const lowerPath = filePath.toLowerCase();

    // Exclude common build/dependency directories and lock files
    const excludedPatterns = [
        /node_modules\//,
        /\.next\//,
        /dist\//,
        /build\//,
        /out\//,
        /coverage\//,
        /\.git\//,
        /(^|\/)package-lock\.json$/,
        /(^|\/)yarn\.lock$/,
        /(^|\/)pnpm-lock\.yaml$/,
        /(^|\/)bun\.lockb$/
    ];

    if (excludedPatterns.some(pattern => pattern.test(lowerPath))) {
        return false;
    }

    // Exclude binary, image, font, and archive extensions
    const excludedExtensions = [
        // Images & Media
        '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico', '.mp3', '.mp4', '.avi', '.mov', '.wav',
        // Documents
        '.pdf', '.epub',
        // Fonts
        '.woff', '.woff2', '.ttf', '.eot', '.otf',
        // Archives
        '.zip', '.tar', '.gz', '.rar', '.7z', '.tgz',
        // Build maps/binaries
        '.map', '.bin', '.exe', '.dll', '.so', '.dylib'
    ];

    if (excludedExtensions.some(ext => lowerPath.endsWith(ext))) {
        return false;
    }

    return true;
}

export function chunkPrFiles(prNumber: number, files: Prfile[]): CodeChunk[] {
    const chunks: CodeChunk[] = [];

    for (const file of files) {
        if (!isReviewableFile(file.filePath) || !file.patch || file.patch.trim() === "") {
            continue;
        }

        const lines = file.patch.split("\n");

        for (let start = 0; start < lines.length; start += MAX_CHUNK_LINES) {
            const part = start / MAX_CHUNK_LINES;
            const text = lines.slice(start, start + MAX_CHUNK_LINES).join("\n");

            chunks.push({
                id: buildChunkId(prNumber, file.filePath, part),
                filePath: file.filePath,
                text,
            });
        }
    }

    return chunks;
}
