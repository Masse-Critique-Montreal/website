'use client'

import { BlocksContent } from '@strapi/blocks-react-renderer';
import CustomBlocksRenderer from '../BlockRenderer';


interface BlogContentProps {
  content: BlocksContent;
}

export function BlogContent({ content }: BlogContentProps) {
  return (<CustomBlocksRenderer
    content={content}
    variant='white'
  />)
}



