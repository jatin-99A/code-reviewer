"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export interface RepoFilterState {
    search: string;
    status: "all" | "healthy" | "risky" | "critical";
    language: string;
    sort: "name" | "stars" | "issues";
}

interface RepoFiltersProps {
    value: RepoFilterState;
    onChange: (next: RepoFilterState) => void;
    languages: string[];
    resultCount: number;
}

export function RepoFilters({
    value,
    onChange,
    languages,
    resultCount,
}: RepoFiltersProps) {
    const set = (patch: Partial<RepoFilterState>) => onChange({ ...value, ...patch });

    return (
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    value={value.search}
                    onChange={(e) => set({ search: e.target.value })}
                    placeholder="Search repositories..."
                    className="pl-9"
                />
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <Select
                    value={value.status}
                    onValueChange={(v) =>
                        set({ status: v as RepoFilterState["status"] })
                    }
                >
                    <SelectTrigger className="h-9 w-35">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All statuses</SelectItem>
                        <SelectItem value="healthy">Healthy</SelectItem>
                        <SelectItem value="risky">At risk</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    value={value.language}
                    onValueChange={(v) => set({ language: v })}
                >
                    <SelectTrigger className="h-9 w-37.5">
                        <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All languages</SelectItem>
                        {languages.map((language) => (
                            <SelectItem key={language} value={language}>
                                {language}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={value.sort}
                    onValueChange={(v) => set({ sort: v as RepoFilterState["sort"] })}
                >
                    <SelectTrigger className="h-9 w-35">
                        <SelectValue placeholder="Sort" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="stars">Stars</SelectItem>
                        <SelectItem value="issues">Open issues</SelectItem>
                    </SelectContent>
                </Select>

                <span className="text-xs text-muted-foreground">{resultCount} shown</span>
            </div>
        </div>
    );
}
