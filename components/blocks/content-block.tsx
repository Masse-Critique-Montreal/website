import type React from "react"
export interface ContentBlockProps {
    children: React.ReactNode
    bgColor?: "primary" | "secondary" | "accent" | "dark" | "white"
}

export function ContentBlock({ children, bgColor = "white" }: ContentBlockProps) {
    const bgColorMap = {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        accent: "bg-accent text-accent-foreground",
        dark: "bg-dark text-dark-foreground",
        white: "bg-background text-foreground",
    }

    return (
        <section className={`w-full px-8 sm:px-12 py-12 sm:py-16 ${bgColorMap[bgColor]}`}>
            <div className="max-w-4xl overflow-hidden mb-2">{children}</div>
        </section>
    )
}
