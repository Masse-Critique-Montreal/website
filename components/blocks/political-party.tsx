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
    imageAlignment = 'top',

}: Data.Component<'blocks.political-party'>) {
    const variantStyles = {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        accent: "bg-accent text-accent-foreground",
        dark: "bg-dark text-dark-foreground",
        white: ''// "bg-background text-foreground",
    }

    return (
        <Card className={cn("w-full border-none rounded-none pl-4 sm:pl-12 md:pl-16  shadow-none flex flex-col items-stretch", variantStyles[variant || 'white'])}>
            <div className={cn("flex flex-1 md:flex-row flex-col p-6 pb-0 lg:w-5xl xl:w-4xl max-w-4xl items-stretch", imageAlignment === 'top' ? 'items-start' : '')}>


                {/* Left side: Headline and Description */}
                <div className="flex-1 flex flex-col gap-4 pr-4flex-grow w-full">
                    <CardTitle className="text-lg md:text-xl text-balance">{headline}</CardTitle>
                    <CardDescription
                        className={cn("text-base leading-relaxed", variant !== "white" && "text-inherit opacity-90")}
                    >
                        {description && <CustomBlocksRenderer textSize={'text-base'} variant={variant || 'white'} content={description} />}
                    </CardDescription>
                </div>
                <div className={cn("flex md:flex-col pt-12 md:pt-0 items-start justify-between gap-2 space-y-4 w-full md:w-auto", imageAlignment === 'top' ? '' : '')}>

                    <div className="flex md:items-center gap-2">
                        <span className="text-lg">Note:</span>
                        <span className="text-lg font-bold">{rating}/10</span>
                    </div>
                    {/* <div className="relative h-20 w-28 md:h-24 md:w-32 lg:h-28 lg:w-42 flex-shrink-0 overflow-hidden border border-current">
                        <Image src={uri.img(image.url) || "/placeholder.svg"} alt={image.alternativeText || 'Party logo'} fill className="object-cover" />
                    </div> */}

                    <div className="relative aspect-auto m-8 md:m-3 w-40 md:w-52 lg:w-56 flex-shrink-0 overflow-hidden ">
                        <Image
                            src={uri.img(image.url) || "/placeholder.svg"}
                            alt={image.alternativeText || 'Party logo'}
                    
                            width={image.width}
                            height={image.height}
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </Card>
    )
}
