"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button, buttonVariants } from "@/components/ui/button"
import { ButtonBlock, ButtonItem } from "./blocks/button-block"
import { VariantProps } from "class-variance-authority"

// interface ButtonItem {
//   label: string
//   href: string
//   variant?: "primary" | "outline" | "secondary"
// }

interface NavbarProps {
    title: string;
    buttons: (ButtonItem & VariantProps<typeof buttonVariants>)[]
    bgColor?: "primary" | "secondary" | "accent" | "background"
}

export function Navbar({ title, buttons, bgColor = "background" }: NavbarProps) {

    const bgClasses = {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        accent: "bg-accent text-accent-foreground",
        background: "bg-background text-foreground",
    }

    return (
        <nav className={`w-full px-8 sm:px-12 py-7 pb-0 ${bgClasses[bgColor]}`}>
            <a href={`/`} className="cursor-pointer"><h3 className="font-sans max-w-24 font-semibold italic text-3xl">{title}</h3></a>
            <div className="flex gap-2 sm:gap-3 py-6 sm:py-4">
                {buttons.map((button, index) =>
                    button.href ? (
                        <Button
                            key={index}
                            size="sm"
                            // className="bg-primary text-primary-foreground hover:opacity-90 font-bold uppercase text-lg px-8"

                            variant={button.variant}
                            // className="bg-primary text-primary-foreground hover:opacity-90 font-semibold uppercase text-lg px-8 rounded-full"
                            asChild
                        >
                            <Link href={button.href}>{button.label}</Link>
                        </Button>
                    ) : (
                        <Button
                            key={index}
                            size="sm"
                            // className="bg-primary text-primary-foreground hover:opacity-90 font-bold uppercase text-lg px-8"

                            variant={button.variant}
                            onClick={button.onClick}
                        >
                            {button.label}
                        </Button>
                    ),
                )}
            </div>

        </nav>
    )
}
