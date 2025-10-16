import { Navbar } from '@/components/navbar'
import { PropsWithChildren } from 'react'

export default async function Layout({ children, params }: PropsWithChildren<{ params: Promise<{slug:string}> }>) {
    const { slug } = await params;

    return (
        <>
            <Navbar
                title={'Masse Critique Montréal'}
                bgColor="primary"
                buttons={[
                    { label: "Je participe !", href: "#", variant: "outline" },
                    { label: "C'est quoi ?", href: "/about", variant: "outline" },
                ].map(b => ({...b, variant: b.href.endsWith(slug) ? 'black' : 'outline'}))}
            />
            <main>
                {children}
            </main>
        </>
    )
}