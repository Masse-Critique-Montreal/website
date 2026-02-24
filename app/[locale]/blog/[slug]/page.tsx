
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BlogHero } from "@/components/blog/blog-hero"
import { BlogAuthor } from "@/components/blog/blog-author"
import { BlogContent } from "@/components/blog/blog-content"
import { LikeButton } from "@/components/blog/like-button"
import { getBlogPost, getBlogPosts } from "@/types/api"
import { StrapiImage } from "@/types/image"
import { NavbarSmall } from "@/components/blog/navbar-small"
import { TelemetryProvider } from "@/lib/telemetry"
import { BlogMeta } from "@/components/blog/blog-meta"
import { ShareCta } from "@/components/blog/share-cta"

export const dynamic = 'force-static';


export async function generateStaticParams() {
    const posts = await getBlogPosts() || [];

    return posts.map((post) => {
        return { locale: 'en', slug: post.slug }
    }).concat(posts.map((post) => {
        return { locale: 'fr', slug: post.slug }
    }));
}

function absoluteUrl(path: string) {
    if (path.startsWith('http')) return path;
    return `${process.env.NEXT_PUBLIC_HOST}${path}`;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const { slug, locale } = await params;
    const blogPost = await getBlogPost(slug, '*');

    console.log('POST:', blogPost)
    if (!blogPost) return {};


    console.log('Original locale', blogPost.locale);

    const originalLocale = blogPost.locale;
    const image = blogPost.image as StrapiImage | null;

    const title = blogPost.title ?? '';
    const description = blogPost.short_description ?? blogPost.long_description ?? '';
    const canonical = `${process.env.SITE_URL}/${locale}/blog/${slug}`;

    const authors = [
        {
            name: 'Masse Critique Montréal',
            url: 'https://massecritiquemtl.ca/'
        }
    ];

    if (blogPost.author) authors.unshift({
        name: blogPost.author.name || '',
        url: blogPost.author.link || ''
    })

    return {
        title,
        description,
        authors,
        alternates: {
            canonical,
            languages: {
                "en": `${process.env.SITE_URL}/en/blog/${slug}`,
                "fr": `${process.env.SITE_URL}/fr/blog/${slug}`,
                "x-default": `${process.env.SITE_URL}/${originalLocale}/blog/${slug}`,
            },
        },
        openGraph: {
            title,
            description,
            url: canonical,
            siteName: process.env.NEXT_PUBLIC_SITE_NAME,
            locale: locale === 'fr' ? 'fr_FR' : 'en_US',
            type: 'article',
            modifiedTime: blogPost.updatedAt ? new Date(blogPost.updatedAt).toISOString() : undefined,
            publishedTime: blogPost.publishedAt ? new Date(blogPost.publishedAt).toISOString() : undefined,
            ...(image && {
                images: [
                    {
                        url: absoluteUrl(image.url),
                        width: image.width,
                        height: image.height,
                        alt: image.alternativeText || 'Thumbnail',
                        type: image!.mime,
                    },
                ],
            }),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            ...(image && {
                images: [
                    {
                        url: absoluteUrl(image.url),
                        width: image.width,
                        height: image.height,
                        alt: image.alternativeText || 'Thumbnail',
                    },
                ],
            }),
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default async function Page({ params }: { params: Promise<{ locale: string, slug: string }> }) {
    const { slug, locale } = await params;
    const blogPost = await getBlogPost(slug, '*');

    console.log('post:', blogPost);
    if (!blogPost) return <>Page not found</>;

    return (
        <>
            <TelemetryProvider pageName={slug}>
                <></>
            </TelemetryProvider>
            <NavbarSmall
                title={'Masse Critique Montréal'}
                pageTitle=""
                bgColor="primary"
                buttons={[
                ]}
            />
            <div className="min-h-screen bg-background">

                {/* Hero image */}
                {blogPost.image && <BlogHero {...blogPost.image} />}

                {/* Article content */}
                <main className="max-w-2xl px-6 py-7 md:py-14 sm:mx-auto mx-1">
                    {/* Category + Title */}
                    <div className="flex flex-col gap-4">
                        {/* <Badge variant="secondary" className="w-fit text-xs font-medium uppercase tracking-widest">
                        {blogPost.category}
                    </Badge> */}
                        <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl lg:leading-tight">
                            {blogPost.title}
                        </h1>
                        <p className="text-lg leading-relaxed text-muted-foreground text-pretty md:text-xl">
                            {blogPost.short_description}
                        </p>
                    </div>

                    {/* Author + meta row */}
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                        {blogPost.author && blogPost.publishedAt && <BlogAuthor
                            name={blogPost.author.name || (locale === 'en' ? 'Author' : 'Auteur')}
                            // role={blogPost.author.role}
                            avatar={blogPost.author.picture}
                            date={new Date(blogPost.publishedAt).toDateString()}
                        />}
                        {/* <LikeButton initialLikes={blogPost.likes || 0} /> */}
                    </div>

                    {/* Meta row + separator */}
                    <div className="mt-6 mb-6">
                        <BlogMeta
                            readTime={8}
                            publishedAt={new Date(blogPost.publishedAt || blogPost.createdAt || new Date())}
                            shareTitle={blogPost.short_description || ''}
                            locale={locale}
                        />
                    </div>


                    {/* Body text */}
                    {blogPost.content && <article>
                        <BlogContent content={blogPost.content} />
                    </article>}

                    <Separator className="my-8" />

                    {/* Bottom actions */}
       

                    <ShareCta/>
                </main>

            </div>

        </>
    )
}
