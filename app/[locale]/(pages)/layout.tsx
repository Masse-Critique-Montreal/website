
import { AppSidebar } from "@/components/app-sidebar";
import { Footer } from "@/components/blocks/footer"
import { SidebarProvider } from "@/components/ui/sidebar";
import { getNavbar } from "@/types/api";

export default async function SiteLayout({
  params,
  children
}: {
  params: Promise<{ locale: string }>
  children: React.ReactNode;
}) {
  const { locale } = await params;
  const navbarData = await getNavbar(locale as 'en'|'fr');

  return (
    <>
      <SidebarProvider>
        <AppSidebar buttons={navbarData?.buttons}/>

        {children}

        <Footer mode="site" locale={locale} />
      </SidebarProvider>
    </>
  )
}
