interface ImageBlockProps {
  src: string
  alt: string
  aspectRatio?: "square" | "video" | "wide" | "portrait"
}

export function ImageBlock({ src, alt, aspectRatio = "video" }: ImageBlockProps) {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[21/9]",
    portrait: "aspect-[3/4]",
  }

  return (
    <section>
      <div className={`w-full  ${aspectClasses[aspectRatio]} overflow-hidden`}>
        <img src={src || "/placeholder.svg"} alt={alt} className="brightness-105 w-full h-full object-cover" />
      </div>
    </section>
  )
}
