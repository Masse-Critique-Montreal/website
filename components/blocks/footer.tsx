import { cn } from "@/lib/utils";
import { Facebook, Instagram, MapPin } from "lucide-react";
import Link from "next/link";

export function Footer({ mode='site' }: { mode: 'blog'|'site'}) {
    const styles = mode === 'blog' ? "w-full sm:w-1/3" : "w-full px-6 sm:px-12"
    
    return (
        <footer className="pt-2.5 bg-primary text-primary-foreground w-full">
            <div className={cn("flex justify-between mx-auto py-4", styles)}>
                <div className="max-w-18 ">
                    <h1 className="font-sans uppercase italic text-sm font-bold leading-[1.05] mb-4 text-balance">
                        {'Masse Critique Montreal'}
                    </h1>
                </div>

                <div className='flex gap-2 items-center pb-4 '>
                    <div className='p-2 rounded-[50%] bg-secondary text-secondary-foreground' >
                        <Link href="https://www.instagram.com/masse_critique_montreal/" >
                            <Instagram />
                        </Link>
                    </div>

                    <div className='p-2 rounded-[50%] bg-secondary text-secondary-foreground' >
                        <Link href="https://www.facebook.com/massecritiqueamtl/" >
                            <Facebook />
                        </Link>
                    </div>

                    <div className='p-2 rounded-[50%] bg-secondary text-secondary-foreground' >
                        <Link href="https://petitionmaps.org" >
                            <MapPin />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}