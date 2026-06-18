
import { Footer } from "@/components/blocks/footer"

export default async function SiteLayout({
  params,
  children
}: {
  params: Promise<{locale:string}>
  children: React.ReactNode;
}) {

  const { locale } = await params;
  console.log('LOCALE', locale)

  return (
    <>
      {children}
      <Footer mode="site" locale={locale}/>
    </>
  )
}
