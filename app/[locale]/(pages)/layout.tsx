
import { Footer } from "@/components/blocks/footer"

export default function SiteLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      {children}
      <Footer mode="site"/>
    </>
  )
}
