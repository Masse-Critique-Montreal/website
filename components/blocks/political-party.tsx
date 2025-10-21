import Image from "next/image"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Data } from "@strapi/strapi"
import CustomBlocksRenderer from "../BlockRenderer";
import { uri } from "@/types/api";


type TVariant = "primary" | "secondary" | "accent" | "dark" | "white";

export function PartyBlock({
    headline,
    description,
    rating,
    image,
    variant = "white",
    imageAlignment = 'top'
}: Data.Component<'blocks.political-party'>) {
    const variantStyles = {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        accent: "bg-accent text-accent-foreground",
        dark: "bg-dark text-dark-foreground",
        white: "bg-background text-foreground",
    }

    return (
        <Card className={cn("w-full max-w-2xl rounded-none shadow-none flex flex-col", variantStyles[variant || 'white'])}>
            <div className={cn("flex flex-1 p-6", imageAlignment === 'top' ? 'items-start' : '')}>


                {/* Left side: Headline and Description */}
                <div className="flex-1 flex flex-col gap-4 pr-4">
                    <CardTitle className="text-lg md:text-xl text-balance">{headline}</CardTitle>
                    <CardDescription
                        className={cn("text-base leading-relaxed", variant !== "white" && "text-inherit opacity-90")}
                    >
                        {description && <CustomBlocksRenderer textSize={'text-base'} variant={variant || 'white'} content={description} />}
                    </CardDescription>
                </div>

                {(
                    <div className={cn("flex flex-col items-end justify-end gap-2", imageAlignment === 'top' ? 'flex-col-reverse' : '')}>

                        <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">{rating}/10</span>
                        </div>
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden border border-current">
                            <Image src={uri.img(image.url) || "/placeholder.svg"} alt={image.alternativeText || 'Party logo'} fill className="object-cover" />
                        </div>
                    </div>
                )}
            </div>
        </Card>
    )
}
