import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Data } from "@strapi/strapi"

interface PostCardProps {
    post: Data.Entity<'api::article.article'>
    locale: string;
}

export function PostCard({ post, locale }: PostCardProps) {
    const author_name = post.author?.name; //post.author?.admin_user?.firstname + ' ' + post.author?.admin_user?.lastname;

    const initials = (author_name || '')
        .split(" ")
        .map((n) => n[0])
        .join("")

    return (
        <Link href={`/${locale}/blog/${post.slug}`} className="group block">
            <article className="flex flex-col gap-4 mb-2">
                {/* Thumbnail */}
                <div className="overflow-hidden rounded-lg bg-muted">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_HOST}${post.image ? (post.image.formats.medium.url || post.image.url) : ''}`}
                        alt={post.title || 'Article Picture'}
                        width={720}
                        height={400}
                        className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                </div>

                {/* Meta */}
                <div className="flex flex-col gap-2">

                    <h2 className="text-lg font-semibold leading-snug tracking-tight text-foreground text-balance group-hover:text-muted-foreground transition-colors md:text-xl">
                        {post.title}
                    </h2>

                    <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {post.short_description}
                    </p>
                </div>

                {/* Author row */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={`${process.env.NEXT_PUBLIC_HOST}${post.author.picture ? (post.author?.picture.formats.thumbnail.url || post.author?.picture.url) : ''}`} alt={author_name || 'Article Author'} />
                            <AvatarFallback className="text-[10px] bg-muted text-muted-foreground">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium text-foreground">{author_name}</span>
                    </div>

                    <span className="text-xs text-muted-foreground">{new Date(post.createdAt || post.publishedAt || new Date()).toLocaleDateString(locale, {
                        month: "short",
                        year: "numeric",
                        day: "numeric"
                    })}</span>
                </div>
            </article>
        </Link>
    )
}