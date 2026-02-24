import type { Metadata } from "next"
import { PostCard } from "@/components/blog/post-card"
import { getBlogPosts } from "@/types/api"
import { NavbarSmall } from "@/components/blog/navbar-small";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Clock } from "lucide-react";

export const dynamic = 'force-static';

export async function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'fr' },
    ]
}

export function generateMetadata(): Metadata {
    return {
        // title: blogMeta.title,
        // description: blogMeta.description,
        // openGraph: {
        //   title: blogMeta.title,
        //   description: blogMeta.description,
        // },
    }
}

export default async function BlogBrowserPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const blogPosts = await getBlogPosts();
    return (
        <>

            <NavbarSmall
                title={'Masse Critique Montréal'}
                pageTitle="Blog"
                bgColor="primary"
                buttons={[
                ]}
            />
            <div className="min-h-screen bg-background sm:px-0 px-3">
                {/* Header */}
                {/* <header className="mb-6">
                    <div className="mx-auto flex max-w-3xl flex-col gap-1 px-5 py-5 md:py-14">
                        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                            {'Blog'}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {'Les articles de Masse Critique Montréal'}
                        </p>
                    </div>
                </header> */}

                <main className="mx-auto max-w-3xl px-6 pb-16 mt-12">
                    {/* Post grid */}
                    {blogPosts && blogPosts.length > 0 && (
                        <div className="grid gap-12 sm:grid-cols-2 md:gap-10">
                            {blogPosts.map((post) => (
                                <PostCard  key={post.slug} post={post} locale={locale}/>
                            ))}
                        </div>
                    )}
                </main>
            </div>
            

        </>
    )
}
