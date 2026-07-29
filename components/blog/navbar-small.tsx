"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button, buttonVariants } from "@/components/ui/button"
import { ButtonBlock, ButtonItem } from "../blocks/button-block"
import { VariantProps } from "class-variance-authority"
import { Data } from "@strapi/strapi"
import CalendarButton from "../client/calendarButton"
import { ArrowBigLeft, ArrowLeft } from "lucide-react"

// interface ButtonItem {
//   label: string
//   href: string
//   variant?: "primary" | "outline" | "secondary"
// }

interface NavbarProps {
    title: string;
    pageTitle: string;
    buttons: Data.Entity<'api::navbar.navbar'>['buttons'];//(ButtonItem & VariantProps<typeof buttonVariants>)[]
    bgColor?: "primary" | "secondary" | "accent" | "background"
}

export function NavbarSmall({ title, pageTitle, buttons, bgColor = "background" }: NavbarProps) {

    const bgClasses = {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        accent: "bg-accent text-accent-foreground",
        background: "bg-background text-foreground",
    }

    return (
        <nav className={`w-full px-3 pt-3 py-2 sm:px-12 flex justify-between  items-center align-middle gap-4 ${bgClasses[bgColor]} `}>
            <a href={`./`} className="cursor-pointer flex gap-2 items-center">
                <ArrowLeft />

                <div className="max-w-5 h-full flex items-center align-middle">
                    <h1 className="font-sans uppercase italic text-[9px] align-middle font-bold leading-[1.05] mb-1 text-balance">
                        {title}
                    </h1>
                </div>
            </a>
            {/* <div className="flex flex-wrap gap-2 sm:gap-3 py-6 sm:py-4">
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

            </div> */}
            <div className="sm:mx-1 mx-4">
                <h1 className="font-sans italic sm:text-3xl text-2xl align-middle font-bold leading-[1.05] mb-1 text-balance">
                    {pageTitle}
                </h1>
            </div>
        </nav>
    )
}
