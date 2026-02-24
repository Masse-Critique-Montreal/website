'use client'

import { BlocksContent, BlocksRenderer } from '@strapi/blocks-react-renderer';
import Link from 'next/link';


interface BlogContentProps {
  content: BlocksContent;
}

export function BlogContent({ content }: BlogContentProps) {
  return <BlocksRenderer
    content={content}
    blocks={{
      // You can use the default components to set class names...
      paragraph: ({ children }) => <p className="text-neutral900 max-w-prose">{children}</p>,
      // ...or point to a design system
      heading: ({ children, level }) => {
        switch (level) {
          case 1:
            return <h1 className='text-3xl font-bold mb-2 mt-4'>{children}</h1>
          case 2:
            return <h2 className='text-2xl font-bold mb-2 mt-4'>{children}</h2>
          case 3:
            return <h3 className='text-2xl font-bold mb-2 mt-3'>{children}</h3>
          case 4:
            return <h4 className='text-xl font-bold mb-1 mt-3'>{children}</h4>
          case 5:
            return <h5 className='text-xl font-semibold mb-1 mt-2'>{children}</h5>
          case 6:
            return <h6 className='text-lg font-semibold mb-1 mt-2'>{children}</h6>
          default:
            return <h3>{children}</h3>
        }
      },
      // For links, you may want to use the component from your router or framework
      link: ({ children, url }) => <Link href={url} className='underline text-secondary'>{children}</Link>,
    }}
    modifiers={{
      bold: ({ children }) => <strong>{children}</strong>,
      italic: ({ children }) => <span className="italic">{children}</span>,
    }}
  />
}



