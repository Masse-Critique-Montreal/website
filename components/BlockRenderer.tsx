'use client'
import { cn } from "@/lib/utils"
import { type BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer"
import Link from "next/link"
import { ButtonWVariant } from "./blocks/button-block"
import { ContentBlockProps } from "./blocks/content-block"

export default function CustomBlocksRenderer(props: { variant: ContentBlockProps['bgColor'], textSize?: string, content: BlocksContent }) {
  return <BlocksRenderer blocks={{
    paragraph: ({ children }) => <p className={cn("font-sans leading-relaxed text-wrap", props.textSize || 'text-xl')}>
      {children}
    </p>,
    heading: ({ children, level }) => {
      switch (level) {
        case 1:
          return <h1 className="font-sans text-5xl font-bold mb-6">{children}</h1>
        case 2:
          return <h2 className="font-sans text-4xl font-bold mb-6">{children}</h2>
        case 3:
          return <h3 className="font-sans text-3xl font-bold mb-6">{children}</h3>
        case 4:
          return <h4 className="font-sans text-2xl font-semibold mb-6">{children}</h4>
        default:
          return <h5 className="font-sans text-xl font-semibold mb-6">{children}</h5>
      }
    },

    link: ({ children, url }) => {
      return <Link
        className={cn(`underline wrap-anywhere`, {})}
        href={url}
        rel={url.includes('jasette.facil.services') ? "me" : ""}>{children}</Link>
    },

    list: ({ children, format }) => {
      if (format === 'ordered') {
        return <ol className="list-decimal list-inside my-3 space-y-2">{children}</ol>
      }
      return <ul className="list-disc list-inside my-3 space-y-2">{children}</ul>
    },

    'list-item': ({ children }) => (
      <li className="font-sans text-sm leading-snug text-wrap">
        {children}
      </li>
    ),

  }} {...props} />
}