'use client'
import { getBlogPosts } from "@/types/api"
import { useEffect, useState, useCallback, useTransition, Suspense } from "react"
import { PostCard } from "./post-card";
import { Data } from "@strapi/strapi";
import { Spinner } from "../ui/spinner";

function PostGrid({ posts, locale }: { posts: Data.Entity<'api::article.article'>[], locale: string }) {
    return (
        <div className="grid gap-14 sm:grid-cols-2 md:gap-10">
            {posts.map((post, i) => (
                <PostCard key={post.slug || i} post={post} locale={locale} />
            ))}
        </div>
    );
}

export default function BrowseGrid({ locale }: { locale: string }) {
    const [blogPosts, setBlogPosts] = useState<Data.Entity<'api::article.article'>[]>([]);
    const [isPending, startTransition] = useTransition();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = useCallback((isRefresh = false) => {
        if (isRefresh) setIsRefreshing(true);
        setError(null);

        startTransition(() => {
            getBlogPosts()
                .then(posts => {
                    if (posts) setBlogPosts(posts);
                })
                .catch(() => setError('Failed to load posts. Please try again.'))
                .finally(() => setIsRefreshing(false));
        });
    }, []);

    useEffect(() => { fetchPosts() }, [fetchPosts]);

    const isLoading = isPending && blogPosts.length === 0;

    return (
        <main className="mx-auto max-w-3xl px-6 pb-16 mt-12 relative">
            {/* <PullToRefresh onRefresh={() => fetchPosts(true)} /> */}

            {/* Refresh indicator at top */}
            {isRefreshing && (
                <div className="flex justify-center mb-6">
                    <Spinner />
                </div>
            )}

            {error && (
                <div className="text-center text-red-500 mb-6">
                    <p>{error}</p>
                    <button onClick={() => fetchPosts()} className="underline text-sm mt-1">
                        Try again
                    </button>
                </div>
            )}

            <Suspense fallback={<div className="flex justify-center mt-20"><Spinner /></div>}>
                {isLoading ? (
                    <div className="flex justify-center mt-20">
                        <Spinner />
                    </div>
                ) : blogPosts.length > 0 ? (
                    <PostGrid posts={blogPosts} locale={locale} />
                ) : !error && (
                    <p className="text-center text-gray-400 mt-20">No articles yet.</p>
                )}
            </Suspense>
        </main>
    );
}