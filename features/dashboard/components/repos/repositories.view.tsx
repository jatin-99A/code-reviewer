"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RepoEmpty } from "./repo-empty";
import { RepoFilters, type RepoFilterState } from "./repo-filters";
import { RepoList } from "./repo-list";
import { RepoStats } from "./repo-stats";
import { GithubRepo } from "@/server/services/core/github/github-repositories-service";
import { getGithubInstallationRepositories } from "@/features/github/actions";

interface RepositoriesViewProps {
    repos: GithubRepo[];
    totalCount: number;
    page: number;
    hasMore: boolean;
}

const initialFilters: RepoFilterState = {
    search: "",
    status: "all",
    language: "all",
    sort: "name",
};

export function RepositoriesView({
    repos: initialRepos,
    totalCount,
    page: initialPage,
    hasMore: initialHasMore,
}: RepositoriesViewProps) {
    const [repos, setRepos] = useState<GithubRepo[]>(initialRepos);
    const [page, setPage] = useState(initialPage);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState<RepoFilterState>(initialFilters);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    const loadMoreRepos = async () => {
        if (loading || !hasMore) return;
        setLoading(true);

        try {
            const response = await getGithubInstallationRepositories(page + 1);

            setRepos((prev) => [...prev, ...response.repos]);
            setPage(response.page);
            setHasMore(response.hasMore);
        } catch (error) {
            console.error("Failed to load more repositories", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    loadMoreRepos();
                }
            },
            {
                threshold: 1,
            }
        );

        const current = loaderRef.current;

        if (current) {
            observer.observe(current);
        }

        return () => {
            if (current) observer.unobserve(current);
        };
    }, [hasMore, page, loading]);


    const languages = useMemo(
        () =>
            Array.from(
                new Set(repos.map((r) => r.language).filter(Boolean) as string[])
            ).sort(),
        [repos]
    );

    const visibleRepos = useMemo(() => {
        const query = filters.search.trim().toLowerCase();

        const filtered = repos.filter((repo) => {
            if (query) {
                const haystack = `${repo.name} ${repo.fullName} ${repo.description ?? ""}`.toLowerCase();

                if (!haystack.includes(query)) return false;
            }

            if (filters.status !== "all" && repo.status !== filters.status) {
                return false;
            }

            if (
                filters.language !== "all" &&
                repo.language !== filters.language
            ) {
                return false;
            }

            return true;
        });

        return [...filtered].sort((a, b) => {
            switch (filters.sort) {
                case "stars":
                    return b.stars - a.stars;

                case "issues":
                    return b.issues - a.issues;

                case "name":
                default:
                    return a.name.localeCompare(b.name);
            }
        });

    }, [repos, filters]);


    const hasFilters =
        filters.search.trim() !== "" ||
        filters.status !== "all" ||
        filters.language !== "all";

    return (
        <div className="space-y-6">

            <RepoStats repos={repos} />

            <RepoFilters
                value={filters}
                onChange={setFilters}
                languages={languages}
                resultCount={visibleRepos.length}
            />

            {visibleRepos.length === 0 ? (
                <RepoEmpty
                    hasFilters={hasFilters}
                    onReset={() => setFilters(initialFilters)}
                />
            ) : (
                <>
                    <RepoList
                        repos={visibleRepos}
                        totalCount={totalCount}
                    />

                    {hasMore && (
                        <div
                            ref={loaderRef}
                            className="h-10 flex items-center justify-center text-sm text-muted-foreground"
                        >
                            {loading && "Loading more repositories..."}
                        </div>
                    )}
                </>
            )}

        </div>
    );
}