import type { Metadata } from "next"
import { PostCard } from "@/components/blog/post-card"
import { getBlogBrowser, getBlogPosts } from "@/types/api"
import { NavbarSmall } from "@/components/blog/navbar-small";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Clock } from "lucide-react";
import BrowseGrid from "@/components/blog/browse-grid";
import { getBestOgImage } from "./[slug]/page";

export const dynamic = 'force-static';

export async function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'fr' },
    ]
}


export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const blogPage = await getBlogBrowser(locale);
    if (!blogPage) return {};

    const originalLocale = blogPage.locale || 'fr';
    const image = getBestOgImage(blogPage.image, blogPage.image.formats, process.env.NEXT_PUBLIC_HOST || '')

    const title = blogPage.title ? `${blogPage.title} | ${locale === 'fr' ?
            'Masse Critique Montreal' :
            'Critical Mass Montreal'
        }` : '';
    const description = blogPage.short_description ?? blogPage.long_description ?? '';
    const canonical = `${process.env.SITE_URL}/${originalLocale}/blog`;

    const authors = [
        {
            name: 'Masse Critique Montréal',
            url: `https://massecritiquemtl.ca/`
        }
    ];

    return {
        title,
        description,
        authors,
        alternates: {
            canonical,
            languages: {
                fr: `${process.env.SITE_URL}/fr/blog`,
                en: `${process.env.SITE_URL}/en/blog`,
            },
        },
        openGraph: {
            title,
            description,
            url: canonical,
            siteName: 'Masse Critique MTL',
            locale: locale === 'fr' ? 'fr_CA' : 'en_US',
            type: 'website',
            images: image ? [image] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: image ? [image.url] : undefined,
        },
        robots: {
            index: true,
            follow: true
        }
    };
}

export default async function BlogBrowserPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
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
                <BrowseGrid locale={locale} />
            </div>


        </>
    )
}
