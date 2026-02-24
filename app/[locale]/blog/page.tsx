import type { Metadata } from "next"
import { PostCard } from "@/components/blog/post-card"
import { getBlogPosts } from "@/types/api"
import { NavbarSmall } from "@/components/blog/navbar-small";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Clock } from "lucide-react";
import BrowseGrid from "@/components/blog/browse-grid";

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
                <BrowseGrid locale={locale}/>
            </div>
            

        </>
    )
}
