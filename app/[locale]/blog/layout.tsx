import { Footer } from '@/components/blocks/footer';
import { NavbarSmall } from '@/components/blog/navbar-small';
import { Navbar } from '@/components/navbar'
import { getNavbar } from '@/types/api';
import { Facebook, Instagram, MapPin } from 'lucide-react';
import Link from 'next/link';
import { PropsWithChildren } from 'react'

export default async function Layout({ children, params }: PropsWithChildren<{ params: Promise<{ slug: string, locale: 'en' | 'fr' }> }>) {
    const { slug, locale } = await params;

    // const navbarData = await getNavbar(locale);
    // if (navbarData === null) return <>{children}</>

    return (
        <>
            {/* <NavbarSmall
                title={'Masse Critique Montréal'}
                bgColor="primary"
                buttons={[
                ]}
            /> */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <Footer mode="blog"/>
        </>
    )
}