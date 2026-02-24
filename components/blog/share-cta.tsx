"use client"

import { useCallback, useState } from "react"
import { Share2, Check } from "lucide-react"

interface ShareCtaProps {
    /** URL to share (defaults to current page) */
    shareUrl?: string
    /** Title for the share dialog */
    shareTitle?: string
}

export function ShareCta({ shareUrl, shareTitle }: ShareCtaProps) {
    const [copied, setCopied] = useState(false)

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

    return (
        <div className="flex items-center justify-between rounded-lg  px-5 py-4">
            <p className="text-sm text-muted-foreground">
                Enjoyed this article? Share it with others.
            </p>
            <button
                type="button"
                onClick={handleShare}
                className="flex shrink-0 items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/85"
                aria-label="Share this article"
            >
                {copied ? (
                    <>
                        <Check className="h-4 w-4" />
                        <span>Copied</span>
                    </>
                ) : (
                    <>
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                    </>
                )}
            </button>
        </div>
    )
}
