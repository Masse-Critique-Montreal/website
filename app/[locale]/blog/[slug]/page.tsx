
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

export function absoluteUrl(path: string) {
    if (path.startsWith('http')) return path;
    return `${process.env.NEXT_PUBLIC_HOST}${path}`;
}

export function getBestOgImage(image:StrapiImage, formats: Record<string, StrapiImage>, host: string) {
    const OG_IDEAL_WIDTH = 1200;
    const OG_IDEAL_HEIGHT = 630;
    const OG_IDEAL_RATIO = OG_IDEAL_WIDTH / OG_IDEAL_HEIGHT; // 1.91
    const OG_MIN_WIDTH = 600;
    const OG_MAX_WIDTH = 2000;
    const OG_RATIO_TOLERANCE = 0.2; // acceptable ratio range: 1.71–2.11
  
    const candidates = Object.values({...formats, original: image}).filter((img) => {
      const ratio = img.width / img.height;
      const ratioDiff = Math.abs(ratio - OG_IDEAL_RATIO);
      return (
        img.width >= OG_MIN_WIDTH &&
        img.width <= OG_MAX_WIDTH &&
        ratioDiff <= OG_RATIO_TOLERANCE
      );
    });
  
    // If no candidates pass the ratio filter, fall back to all formats
    const pool = candidates.length > 0 ? candidates : Object.values(formats);
  
    const scored = pool.map((img) => {
      const ratio = img.width / img.height;
      const ratioDiff = Math.abs(ratio - OG_IDEAL_RATIO);
      const widthDiff = Math.abs(img.width - OG_IDEAL_WIDTH);
  
      // Ratio is the priority, width is the tiebreaker
      const score = ratioDiff * 5000 + widthDiff;
  
      return { img, score };
    });
  
    scored.sort((a, b) => a.score - b.score);
    const best = scored[0].img;
    console.log('CHOSEN IMAGE', best);
    return {
      url: `${host}${best.url}`,
      width: best.width,
      height: best.height,
      alt: best.alternativeText || 'Masse Critique'
    };
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

    const originalLocale = blogPost.locale || 'fr';
    const image = getBestOgImage(blogPost.image, blogPost.image.formats, process.env.NEXT_PUBLIC_HOST || '')

    const title = blogPost.title ? `${blogPost.title} | ${locale === 'fr' ?
            'Masse Critique Montreal' :
            'Critical Mass Montreal'
        }` : '';
    const description = blogPost.short_description ?? blogPost.long_description ?? '';
    const canonical = `${process.env.SITE_URL}/${originalLocale}/blog/${slug}`;

    const authors = [
        {
            name: 'Masse Critique Montréal',
            url: `https://massecritiquemtl.ca/`
        }
    ];

    const isOriginal = locale === originalLocale;

    if (blogPost.author) authors.unshift({
        name: blogPost.author.name || '',
        url: blogPost.author.link || ''
    })

    return {
        title,
        description,
        authors,
        icons: [
            { url: '/favicon_128.ico', sizes: '128x128' },
            { url: '/favicon_256.ico', sizes: '256x256' },
            { url: '/favicon_512.ico', sizes: '512x512' }
        ],
        alternates: isOriginal
            ? {
                canonical,
                languages: {
                    [originalLocale]: canonical,
                    'x-default': canonical,
                },
            }
            : {
                canonical,
            },
        openGraph: {
            title,
            description,
            url: canonical,
            siteName: process.env.NEXT_PUBLIC_SITE_NAME,
            locale: originalLocale === 'fr' ? 'fr_FR' : 'en_US',
            type: 'article',
            modifiedTime: blogPost.publishedAt ? new Date(blogPost.publishedAt).toISOString() : undefined,
            publishedTime: blogPost.createdAt ? new Date(blogPost.createdAt).toISOString() : undefined,
            ...(image ? {
                images: [
                    {
                        url: absoluteUrl(image.url),
                        width: image.width,
                        height: image.height,
                        alt: blogPost.image.alternativeText || 'Thumbnail',
                        type: blogPost.image!.mime,
                    },
                ],
            } : {}),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            ...(image ? {
                images: [
                    {
                        url: absoluteUrl(image.url),
                        width: image.width,
                        height: image.height,
                        alt: blogPost.image.alternativeText || 'Thumbnail',
                        type: blogPost.image!.mime,
                    },
                ],
            } : {}),
        },
        robots: {
            index: isOriginal,
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
            <TelemetryProvider pageName={slug}/>
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
                        {blogPost.author && blogPost.createdAt && <BlogAuthor
                            name={blogPost.author.name || (locale === 'en' ? 'Author' : 'Auteur')}
                            // role={blogPost.author.role}
                            avatar={blogPost.author.picture}
                            date={new Date(blogPost.createdAt).toDateString()}
                        />}
                        {/* <LikeButton initialLikes={blogPost.likes || 0} /> */}
                    </div>

                    {/* Meta row + separator */}
                    <div className="mt-6 mb-6">
                        <BlogMeta
                            readTime={blogPost.readTimeMin || 2}
                            publishedAt={new Date(blogPost.createdAt || blogPost.createdAt || new Date())}
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


                    <ShareCta locale={locale} />
                </main>

            </div>

        </>
    )
}
