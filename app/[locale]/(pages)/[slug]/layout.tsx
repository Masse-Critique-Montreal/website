import { Footer } from '@/components/blocks/footer';
import ClientT from '@/components/ClientT';
import { Navbar } from '@/components/navbar'
import { getNavbar, getPage } from '@/types/api';
import Image from 'next/image';
import { PropsWithChildren } from 'react'

export default async function Layout({ children, params }: PropsWithChildren<{ params: Promise<{ slug: string, locale: 'en' | 'fr' }> }>) {
    const { slug, locale } = await params;

    const navbarData = await getNavbar(locale);
    if (navbarData === null) return <>{children}</>

    const response = await getPage(slug, locale);
    if (response === null) return <>{JSON.stringify(response)}<ClientT /></>

    return (
        <>
            {response.background === 'kids' ? (

                <nav className='w-full px-8 py-4 sm:px-12 bg-[#fdfdfd] flex sm:flex-row flex-row-reverse pb-8 lg:mx-auto lg:w-1/2'>

                    <Image
                        className="w-[100%] xl-[24%] lg:w-[50%] md:w-[60%] sm:w-[70%]  h-auto object-contain"
                        alt="kidical logo by phil.math"
                        src="/phil_logo_1.png"
                        width={627}
                        height={380}
                    ></Image>
                </nav>

            ) : (
                <Navbar
                    title={'Masse Critique Montréal'}
                    bgColor="primary"
                    buttons={(navbarData.buttons || []).map(b => ({ ...b, variant: (b.href || '').endsWith(slug) ? 'black' : 'outline' }))}
                />
            )}
            <main className=''>
                {children}
            </main>

        </>
    )
}