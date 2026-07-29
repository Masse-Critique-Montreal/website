'use client'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    useSidebar,
} from "@/components/ui/sidebar"
import { Data } from "@strapi/strapi"
import { XIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"

export function AppSidebar({ buttons }: { buttons: Data.Entity<'api::navbar.navbar'>['buttons'] }) {

    const { setOpen } = useSidebar();

    return (
        <Sidebar>
            <SidebarHeader className="flex justify-end items-end w-full min-w-16">
                <Button onClick={() => setOpen(false)} variant={'ghost'} className="hover:bg-gray-200 hover:text-gray-900 sm:inline hidden h-auto">
                    <XIcon className="min-w-8 min-h-8"/>
                </Button>
            </SidebarHeader>
            <SidebarContent>
                <div className="flex flex-col gap-0 w-full mx-auto py-0 pt-8">
                    {buttons && buttons.map((btn, i) => {
                        return <a key={i}
                            className="text-left hover:bg-secondary active:bg-secondary cursor-pointer p-4 px-12"
                            href={btn.href || '#'}
                            onClick={() => setOpen(false)}>
                            <p className="text-xl leading-6">{btn.label}</p>
                        </a>
                    })}
                </div>

            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
