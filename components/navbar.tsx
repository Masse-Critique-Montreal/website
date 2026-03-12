"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button, buttonVariants } from "@/components/ui/button"
import { ButtonBlock, ButtonItem } from "./blocks/button-block"
import { VariantProps } from "class-variance-authority"
import { Data } from "@strapi/strapi"
import CalendarButton from "./client/calendarButton"

// interface ButtonItem {
//   label: string
//   href: string
//   variant?: "primary" | "outline" | "secondary"
// }

interface NavbarProps {
    title: string;
    buttons: Data.Entity<'api::navbar.navbar'>['buttons'];//(ButtonItem & VariantProps<typeof buttonVariants>)[]
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
        <nav className={`w-full px-8 sm:px-12 py-6 pb-0 ${bgClasses[bgColor]}`}>
          {/* <h1 className="font-sans uppercase italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-bold leading-[1.05] mb-4 text-balance">
            {title}
          </h1> */}

            <a href={`/`} className="cursor-pointer max-w-12 w-12">
            <div className="max-w-12">
                <h1 className="font-sans uppercase italic text-md sm:text-lg md:text-xl lg:text-xl xl:text-xl font-bold leading-[1.05] mb-0 text-balance">{title}</h1>
                </div>
                </a>
            <div className="flex flex-wrap gap-2 sm:gap-3 py-5 sm:py-3">
                {buttons && buttons.map((button, index) => (
                    (button.calendar_link) ? (

                        <CalendarButton key={index} size="sm" button={button} />
                    ) : (
                        button.href ? <Button
                            key={index}
                            size="sm"
                            // className="bg-primary text-primary-foreground hover:opacity-90 font-bold uppercase text-lg px-8"

                            variant={button.variant}
                            // className="bg-primary text-primary-foreground hover:opacity-90 font-semibold uppercase text-lg px-8 rounded-full"
                            asChild
                        >
                            <Link href={button.href || '#'}>{button.label}</Link>
                        </Button> : <></>

                    )
                ))}

            </div>

        </nav>
    )
}
