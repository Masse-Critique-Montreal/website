import { getBlogPosts, getPages } from '@/types/api'
import type { MetadataRoute } from 'next'

//export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const pages = (await getPages({ cache: 'force-cache '}) || []);


    // Group pages by documentId to pair en/fr versions
    const pageMap = new Map<string, typeof pages>();
    for (const page of pages) {
        const key = page.documentId; // or whatever shared ID links translations
        if (!pageMap.has(key)) pageMap.set(key, []);
        pageMap.get(key)!.push(page);
    }

    const pageSitemap = [...pageMap.values()].map(versions => {
        const canonical = versions[0];
        const languages = Object.fromEntries(
            versions.map(v => [v.locale, `${process.env.NEXT_PUBLIC_SITE_URL}/${v.locale}/${v.slug}`])
        );
        return {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${canonical.locale}/${canonical.slug}`,
            lastModified: canonical.publishedAt as Date,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
            alternates: { languages },
        };
    });


    const articlesSitemap = (await getBlogPosts({ cache: 'force-cache '}) || []).map(b => ({
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${b.locale}/blog/${b.slug}`,
        lastModified: b.publishedAt as Date,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
        alternates: {
            languages: {
                fr: `${process.env.NEXT_PUBLIC_SITE_URL}/fr/blog/${b.slug}`,
                en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/blog/${b.slug}`,
                'x-default': `${process.env.NEXT_PUBLIC_SITE_URL}/${b.locale}/blog/${b.slug}`,
            },
        },
    }));

    return [
        {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/fr`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
            alternates: {
                languages: {
                    en: `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
                    fr: `${process.env.NEXT_PUBLIC_SITE_URL}/fr`,
                },
            },
        },
        ...pageSitemap as any[],
        ...articlesSitemap as any[]
    ]
}