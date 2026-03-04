import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { StrapiImage } from "@/types/image"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface BlogAuthorProps {
  name: string
  role?: string
  avatar: StrapiImage;
  date: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}


export function BlogAuthor({ name, role, avatar, date }: BlogAuthorProps) {
  const imageUrl = avatar
    ? `${process.env.NEXT_PUBLIC_HOST}${avatar.formats?.thumbnail?.url ?? avatar.url}`
    : undefined

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-12 w-12">
        {imageUrl && <AvatarImage src={imageUrl} alt={name} />}
        <AvatarFallback className="text-sm font-medium">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-foreground">{name}</span>
        <span className="text-sm text-muted-foreground">
          {role || "Membre de Masse Critique"}
        </span>
      </div>
    </div>
  )
}