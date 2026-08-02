import { HeroSection } from "@/components/blocks/hero-section"
import { PhraseBlock, SVGShape } from "@/components/blocks/phrase-block"
import { ButtonBlock, ButtonWVariant } from "@/components/blocks/button-block"
import { ImageBlock } from "@/components/blocks/image-block"
import ClientT from "@/components/ClientT"
import { getHome, uri } from "@/types/api"
import { ContentBlock } from "@/components/blocks/content-block"
import CustomBlocksRenderer from "@/components/BlockRenderer"
import { BlocksContent } from "@strapi/blocks-react-renderer"
import { ReactNode } from "react"
import { Metadata } from "next"
import { Data } from "@strapi/strapi"
import NextLastFriday from "@/components/NextLastFriday"
import { TelemetryProvider } from "@/lib/telemetry"
import { absoluteUrl, getBestOgImage } from "../blog/[slug]/page"

export const dynamic = 'force-static';

export function generateStaticParams() {
  return [{
    locale: 'fr'
  }, {
    locale: 'en'
  }];
}

export async function generateMetadata({ params }: { params: Promise<{locale:'en'|'fr'}>}): Promise<Metadata> {

  const { locale } = await params;
  const response = await getHome(locale);
  
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

  if (!seo.images) {
    throw new Error("No seo thumbnails!!!");
  }
  
  const image = getBestOgImage(seo.images[0], seo.images[0].formats, process.env.NEXT_PUBLIC_HOST || '')

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
      url: `${process.env.SITE_URL}/${locale}`,
      title: seo.title || '',
      description: seo.description || '',
      siteName: 'Masse Critique Montréal',
      ...(image && seo.images ? {
        images: [
            {
                url: absoluteUrl(image.url),
                width: image.width,
                height: image.height,
                alt: seo.images[0].alternativeText || 'Thumbnail',
                type: seo.images[0]!.mime,
            },
        ],
    } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      site: publisher,
      creator,
      ...(image && seo.images ? {
        images: [
            {
                url: absoluteUrl(image.url),
                width: image.width,
                height: image.height,
                alt: seo.images[0].alternativeText || 'Thumbnail',
                type: seo.images[0]!.mime,
            },
        ],
    } : {}),
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

export default async function HomePage({ params }: { params: Promise<{locale:'en'|'fr'}>}) {
  
  const { locale } = await params;
  const response = await getHome(locale);
  if (response === null || !response.Blocks) return null;
  
  return (
    <>
      <TelemetryProvider pageName="home"/>
      <div className="min-h-screen">
      {response.Blocks && response.Blocks.map((block, index) => {
        switch (block.__component) {
          case 'blocks.hero': {
            return <HeroSection
              key={index}
              title={block.title || 'Title'}
              subtitle={block.subtitle || 'Subtitle'}
              locale={locale}
            />
          }
          case 'blocks.image': {
            return <ImageBlock
              key={index}
              locale={locale}
              src={uri.img(block.image ? block.image.url : '')}
              info={block.pictureBy ? {
                fullname: block.pictureBy || '',
                link: block.pictureByLink || undefined,
                date: block.date || undefined
              } : undefined}
              
              alt="Community gathering"
              aspectRatio="wide"
            />
          }
          case 'blocks.text': {
            return <ContentBlock key={index} bgColor={block.style || 'secondary'}>
              <CustomBlocksRenderer variant={block.style || 'secondary'} content={block.content as BlocksContent} />
            </ContentBlock>
          }
          case 'blocks.buttons': {
            return <ButtonBlock
              key={index}
              bgColor={block.style || 'primary'}
              buttons={block.buttons as Data.Component<'inputs.button'>[]}
            />
          }
          case 'blocks.note': {
            if (block.text == null) return null;
            let nodes: ReactNode[] = [];
            block.text.forEach((para, j) => {
              nodes = nodes.concat(para.children.map((elem, i: number) => {
                const e = elem as { code: boolean, text: string };

                if (e.code && e.text.includes("[next-last-friday]")) 
                  return <NextLastFriday key={'elem' + i} locale={locale} text={e.text}/>;

                if (e.code) 
                  return <span key={'elem' + i} className="text-secondary brightness-125">{e.text}</span>
                
                return e.text;
              }))
              nodes.push(<br key={'line-break_' + j} className="inline sm:hidden" />)
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
    </>
    
  )
}
