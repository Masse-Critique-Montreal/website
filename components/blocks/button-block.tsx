import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Data } from "@strapi/strapi"
import { VariantProps } from "class-variance-authority"
import Link from "next/link"
import CalendarButton from "../client/calendarButton"

export interface ButtonItem {
  label: string | null;
  href?: string | null;
  onClick?: () => void
  
}

export type ButtonWVariant = (ButtonItem & VariantProps<typeof buttonVariants>);


export interface ButtonBlockProps {
  wrap?:boolean;
  buttons: Data.Component<'inputs.button'>[]
  bgColor?: "primary" | "secondary" | "accent" | "background"
  className?: string
}

export function ButtonBlock({ wrap=true, buttons, className, bgColor = "background" }: ButtonBlockProps) {
  const bgClasses = {
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    accent: "bg-accent text-accent-foreground",
    background: "bg-background text-foreground",
  }


  return (
    <section className={cn(`py-6 px-8 sm:px-12 ${bgClasses[bgColor]}`, className)}>
      <div className={cn("flex justify-start gap-4", wrap ? "flex-wrap" : "sm:flex-nowrap flex-wrap")}>
        {buttons.map((button, index) => 
          (button.calendar_link) ? (

            <CalendarButton key={index} button={button}/>
          ) : (
            button.href ? <Button
              key={index}
              size="lg"
              // className="bg-primary text-primary-foreground hover:opacity-90 font-bold uppercase text-lg px-8"
              
              variant={button.variant}
              className="normal-case min-w-48 sm:min-w-none"
             // className="bg-primary text-primary-foreground hover:opacity-90 font-semibold uppercase text-lg px-8 rounded-full"
              asChild
            >
              <Link href={button.href || '#'}>{button.label}</Link>
            </Button> : <></>

          ),
        )}
      </div>
    </section>
  )
}
