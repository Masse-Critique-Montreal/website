"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface LikeButtonProps {
  initialLikes: number
}

export function LikeButton({ initialLikes }: LikeButtonProps) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(initialLikes)

  function handleLike() {
    setLiked((prev) => !prev)
    setLikes((prev) => (liked ? prev - 1 : prev + 1))
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLike}
      className={cn(
        "gap-2 transition-colors",
        liked && "border-destructive/30 bg-destructive/5 text-destructive hover:bg-destructive/10 hover:text-destructive"
      )}
      aria-label={liked ? "Unlike this post" : "Like this post"}
    >
      <Heart
        className={cn("h-4 w-4 transition-all", liked && "fill-current")}
      />
      <span className="text-sm font-medium tabular-nums">{likes}</span>
    </Button>
  )
}
