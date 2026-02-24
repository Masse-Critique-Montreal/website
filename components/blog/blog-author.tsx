import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { StrapiImage } from "@/types/image"

interface BlogAuthorProps {
  name: string
  role?: string
  avatar: StrapiImage;
  date: string;
}

export function BlogAuthor({ name, role, avatar, date }: BlogAuthorProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
        <Image
          src={`${process.env.NEXT_PUBLIC_HOST}${avatar.formats?.thumbnail?.url ?? avatar.url}`}
          alt={name}
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-foreground">{name}</span>
        <span className="text-sm text-muted-foreground">{role || 'Membre de Masse Critique'}</span>
      </div>
      {/* <Separator orientation="vertical" className="mx-1 h-6" />
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">{date}</span>
      </div> */}
    </div>
  )
}
