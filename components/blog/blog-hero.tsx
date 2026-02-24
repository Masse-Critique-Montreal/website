import { StrapiImage } from "@/types/image"
import Image from "next/image"

export function BlogHero(image: StrapiImage) {
  return (
    <div className="relative h-[28vh] sm:h-[50vh] w-full">
      <Image
        src={image ? `${process.env.HOST}${(image.url)}` : "/placeholder.svg?height=400&width=800"}
        alt={image.alternativeText || 'Main article image'}
        fill
        priority={true}
        className="object-cover"
      />
    </div>
  )
}