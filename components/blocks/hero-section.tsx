import { cn } from "@/lib/utils";
import LocaleToggle from "../LocaleToggle";
import { getLocale } from "next-intl/server";
import { Fragment } from "react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  locale: 'en' | 'fr';
}

export async function HeroSection({ title, subtitle, locale }: HeroSectionProps) {

  const t = (subtitle || '').split('\\n');

  return (
    <section className="relative min-h-[30vh] sm:min-h-[38vh] md:min-h-[42vh] xl:min-h-[54vh] flex items-start justify-start bg-primary text-primary-foreground px-7 py-16 sm:py-10 pb-9">

      <LocaleToggle locale={locale} />
      {/* Hero content */}
      <div className={cn("mt-8 sm:mt-16")}>
        <div className="max-w-1/3 xl:max-w-2xl">
          <h1 className="font-sans uppercase italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-4 text-balance">
            {title}
          </h1>
        </div>
        {subtitle && (
          <p className="text-primary-foreground/90 font-sans text-lg sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-tight mt-5 mb-1">{
            t.map((line, i) => {
              return <Fragment key={i}>{line}{((t.length > 1) && i !== t.length - 1) ? <br /> : <></>}</Fragment>
            })
          }</p>
        )}

      </div>
    </section>
  )
}
