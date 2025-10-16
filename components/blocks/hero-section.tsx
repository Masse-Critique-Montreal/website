import { cn } from "@/lib/utils";
import LocaleToggle from "../LocaleToggle";
import { getLocale } from "next-intl/server";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  locale: 'en'|'fr';
}

export async function HeroSection({ title, subtitle, locale }: HeroSectionProps) { 

  return (
    <section className="relative min-h-[30vh] sm:min-h-[38vh] md:min-h-[42vh] xl:min-h-[54vh] flex items-start justify-start bg-primary text-primary-foreground px-10 py-16 sm:py-10 pb-9">

      <LocaleToggle locale={locale}/>
      {/* Hero content */}
      <div className={cn("mt-8 sm:mt-16", "max-w-2/3 xl:max-w-2xl")}>
        <h1 className="font-sans uppercase italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-4 text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">{subtitle}</p>
        )}
      </div>
    </section>
  )
}
