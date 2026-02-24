import { HeroSection } from "@/components/blocks/hero-section"
import { PhraseBlock, SVGShape } from "@/components/blocks/phrase-block"
import { ButtonBlock, ButtonWVariant } from "@/components/blocks/button-block"
import { ImageBlock } from "@/components/blocks/image-block"
import ClientT from "@/components/ClientT"
import { getHome, getPage, getPages, uri } from "@/types/api"
import { ContentBlock } from "@/components/blocks/content-block"
import CustomBlocksRenderer from "@/components/BlockRenderer"
import { BlocksContent } from "@strapi/blocks-react-renderer"
import { ReactNode } from "react"
import { Metadata } from "next"
import { PartyBlock } from "@/components/blocks/political-party"

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const pages = await getPages();
  if (pages == null ) return [];

  return pages.map(page => ({
    slug: page.slug,
    locale: page.locale
  }))
}

export async function generateMetadata({ params }: { params: Promise<{slug:string, locale:'en'|'fr'}>}): Promise<Metadata> {

  const { slug, locale } = await params;
  const response = await getPage(slug, locale);
  
  if (response == null || response.seo == null) {
    throw new Error("SEO is undefined!");
  }
  const seo = response.seo;
  const publisher = "Masse Critique Montréal";
  const creator = "Matias Vazquez-Levi";
  const images = seo.images ? seo.images.map(image => ({
    url: `${process.env.NEXT_PUBLIC_HOST}${image.url}`,
    width: image.width,
    height: image.height,
    alt: image.alternativeText || 'Masse Critique'
  })): [];

  return {
    title: seo.title,
    description: seo.description,
    publisher,
    creator,
    icons:[
      { url: '/favicon_128.ico', sizes: '128x128'},
      { url: '/favicon_256.ico', sizes: '256x256'},
      { url: '/favicon_512.ico', sizes: '512x512'}
    ],
    openGraph: {
      type: 'website',
      url: `${process.env.SITE_URL}`,
      title: seo.title || '',
      description: seo.description || '',
      siteName: 'Masse Critique Montréal',
      images
    },
    twitter: {
      card: 'summary_large_image',
      site: publisher,
      creator,
      images
    },
    alternates: {
      canonical: '/',
      languages: {
        'en': `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
        'fr': `${process.env.NEXT_PUBLIC_SITE_URL}/fr`,
        'x-default': `${process.env.NEXT_PUBLIC_SITE_URL}/fr`
      }
    },
    robots: {
      index: true,
      follow: true
    }
  }
}

export default async function Page({ params }: { params: Promise<{ slug:string, locale: 'en'|'fr' }> }) {
  const { slug, locale } = await params;
  const response = await getPage(slug, locale);
  if (response === null) return <>{JSON.stringify(response)}<ClientT /></>
  const { blocks } = response;
  if (!blocks) return <></>

  return (
    <div className="min-h-screen">
      {blocks && blocks.map((block, index) => {
        switch (block.__component) {
          case 'blocks.image': {
            return <ImageBlock
              key={index}
              locale={locale}
              src={uri.img(block.image ? block.image.url : '')}
              info={block.pictureBy ? {
                fullname: block.pictureBy || '',
                link: block.pictureByLink || undefined,
              } : undefined}
              alt="Community gathering"
              aspectRatio="wide"
            />
          }
          case 'blocks.buttons': {
            return <ButtonBlock
              key={index}
              bgColor={block.style || 'primary'}
              buttons={block.buttons || []}
            />
          }
          case 'blocks.text': {
            return <ContentBlock key={index} bgColor={block.style || 'secondary'}>
              <CustomBlocksRenderer variant={block.style || 'secondary'} content={block.content as BlocksContent} />
            </ContentBlock>
          }
          case 'blocks.political-party': {
            
            return <PartyBlock key={index} {...block}  />
          }
          case 'blocks.note': {
            if (block.text == null) return null;


            const nodes: ReactNode[] = [];
            block.text.forEach((para) => {
              nodes.concat(para.children.map((elem, i:number) => {
                const e = elem as { code:boolean, text:string };
                if (e.code) return <span key={'elem'+i} className="text-secondary brightness-125">{e.text}</span>
                else return e.text;
              }))
            })

            return <PhraseBlock
              key={index}
              text={
                <>
                  {nodes}
                </>
              }
              className="font-normal"
              bgColor={block.style || 'dark'}
              shapes={block.shapes as SVGShape[]}
            />
          }
        }
      })}
    </div>
  )
}
