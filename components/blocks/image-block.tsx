"use client"

import Image from "next/image"
import { useState, useCallback, useRef, Fragment } from "react"
import { Info } from "lucide-react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import Link from "next/link"
import { cn } from "@/lib/utils"
type InfoText = {
  fullname: string;
  link?: string;
}

interface ImageBlockProps {
  src: string
  alt: string
  aspectRatio?: "square" | "video" | "wide" | "portrait" | "none"
  fullWidth?: boolean
  /** Optional info text shown in a tooltip on hover (desktop) or tap (mobile) */
  info?: (InfoText);
  locale: string;
  priority: boolean;
}

function InfoButton({ info, locale }: { info: InfoText, locale: string }) {
  const [open, setOpen] = useState(false)
  const hoverTimeout = useRef<ReturnType<typeof setTimeout>>(null)

  const handlePointerEnter = useCallback(() => {
    if (window.matchMedia("(hover: hover)").matches) {
      hoverTimeout.current = setTimeout(() => setOpen(true), 100)
    }
  }, [])

  const handlePointerLeave = useCallback(() => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current)
      hoverTimeout.current = null
    }
    if (window.matchMedia("(hover: hover)").matches) {
      setOpen(false)
    }
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex h-7 w-7 lg:h-9 lg:w-9 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
          aria-label="More information"
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
        >
          <Info className="h-4 w-4 lg:h-6 lg:w-6 text-gray-700" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="center"
        className="w-auto max-w-64 rounded-md px-3 py-1.75 ml-1 text-sm"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        {locale === 'en' ? 'Picture by ' : 'Photo par '} {
          info.link ? (
            <Link className="underline font-semibold text-secondary" href={info.link}>{info.fullname}</Link>
          ) : info.fullname
        }
      </PopoverContent>
    </Popover>
  )
}

export function ImageBlock({
  src,
  alt,
  aspectRatio = "video",
  info,
  locale,
  fullWidth = true,
  priority = false,
}: ImageBlockProps) {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[21/9]",
    portrait: "aspect-[3/4]",
    none: "",
  }

  return (
    <section className={cn("relative", !fullWidth ? "lg:m-4" : "")}>
      <div
        className={`relative w-full overflow-hidden after:absolute after:inset-0 ${fullWidth
            ? `h-[36vh] sm:h-auto sm:${aspectClasses[aspectRatio]}`
            : aspectClasses[aspectRatio]
          }`}
      >
        {!fullWidth ? <Image
          src={src || "/placeholder.svg"}
          alt={alt || ""}
          fill
          sizes="100vw"
          priority={priority}
          className="object-cover"
        />:

        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className={`w-full ${fullWidth
            ? "h-full object-cover"
            : "h-full object-cover"
            }`}
        />}

      </div>

      {info && (
        <div className="absolute bottom-4 left-4">
          <InfoButton info={info} locale={locale} />
        </div>
      )}
    </section>
  )
}
