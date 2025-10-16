import { Navbar } from '@/components/navbar'
import { getNavbar } from '@/types/api';
import { PropsWithChildren } from 'react'

export default async function Layout({ children, params }: PropsWithChildren<{ params: Promise<{slug:string, locale:'en'|'fr'}> }>) {
    const { slug, locale } = await params;

    const navbarData = await getNavbar(locale);
    if (navbarData === null) return <>{children}</>

    return (
        <>
            <Navbar
                title={'Masse Critique Montréal'}
                bgColor="primary"
                buttons={(navbarData.buttons || []).map(b => ({...b, variant: (b.href || '').endsWith(slug) ? 'black' : 'outline'}))}
            />
            <main>
                {children}
            </main>
        </>
    )
}