"use client"

import { useCallback } from "react"
import { Share2, Clock, Calendar } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface BlogMetaProps {
    /** Estimated read time in minutes */
    readTime?: number
    /** Published date string or Date object */
    publishedAt?: Date;
    /** URL to share (defaults to current page) */
    shareUrl?: string
    /** Title for the share dialog */
    shareTitle?: string,
    locale: string;
}

export function BlogMeta({
    readTime,
    publishedAt,
    shareUrl,
    shareTitle,
    locale='fr'
}: BlogMetaProps) {

    const formattedDate = publishedAt
        ? new Date(publishedAt).toLocaleDateString(locale, {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : null

    const handleShare = useCallback(async () => {
        const url = shareUrl || window.location.href
        const title = shareTitle || document.title

        if (navigator.share) {
            try {
                await navigator.share({ title, url })
            } catch { }
        } else {
            try {
                await navigator.clipboard.writeText(url)
            } catch (e) { }
        }
    }, [shareUrl, shareTitle])

    const hasContent = readTime || formattedDate

    if (!hasContent) return null

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {readTime && (
                        <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{readTime} min</span>
                        </span>
                    )}
                    {readTime && formattedDate && (
                        <Separator orientation="vertical" className="!h-3.5 bg-muted-foreground" />
                    )}
                    {formattedDate && (
                        <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{formattedDate}</span>
                        </span>
                    )}
                </div>

                <button
                    type="button"
                    onClick={handleShare}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    aria-label="Share this article"
                >
                    <Share2 className="h-4 w-4" />
                </button>
            </div>

            <Separator className="bg-muted-foreground"/>
        </div>
    )
}
