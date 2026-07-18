export const statusConfig = {
    healthy: {
        label: "Healthy",
        badge: "border-[#22C55E]/20 bg-[#22C55E]/10 text-[#22C55E]",
        dot: "bg-[#22C55E]",
        bar: "bg-[#22C55E]",
    },
    risky: {
        label: "At risk",
        badge: "border-[#FACC15]/20 bg-[#FACC15]/10 text-[#FACC15]",
        dot: "bg-[#FACC15]",
        bar: "bg-[#FACC15]",
    },
    critical: {
        label: "Critical",
        badge: "border-[#EF4444]/20 bg-[#EF4444]/10 text-[#EF4444]",
        dot: "bg-[#EF4444]",
        bar: "bg-[#EF4444]",
    },
};

const languageColors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572a5",
    Go: "#00add8",
    Rust: "#dea584",
    Ruby: "#701516",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
};

export function getLanguageColor(language: string | null): string | undefined {
    if (!language) return undefined;
    return languageColors[language];
}

export function formatCount(value: number): string {
    if (value >= 1000) {
        return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}k`;
    }
    return `${value}`;
}