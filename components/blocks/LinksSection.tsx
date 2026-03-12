import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Data } from "@strapi/strapi";
import { ArrowRight } from "lucide-react";

import { uri } from "@/types/api";
import { StrapiImage } from "@/types/image";



interface LinkTreeProps {
  Links: Data.Component<'blocks.link'>[];
}

function LinkCard({ item }: { item: Data.Component<'blocks.link'> }) {
  return (
    <a href={item.link || '#'} target="_blank" rel="noopener noreferrer" className="block group">
      <Card className="transition-all duration-200 hover:bg-accent hover:shadow-md hover:-translate-y-0.5">
        <CardContent className="flex items-center gap-5 p-2 px-4">
          {item.thumbnail && <Avatar className="h-24 w-24 rounded-lg shrink-0 border">
            <AvatarImage src={uri.img(item.thumbnail ? item.thumbnail.url : item.thumbnail.formats.thumbnail.url)} alt={item.Label || 'Link thumbnail'} className="object-cover" />
            <AvatarFallback className="rounded-lg text-muted-foreground font-semibold">
              {(item.Label || '').charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>}

          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-foreground truncate text-wrap">{item.Label}</p>
            {item.description && (
              <p className="text-xs text-muted-foreground mt-0.5 truncate text-wrap">{item.description}</p>
            )}
          </div>

          <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
        </CardContent>
      </Card>
    </a>
  );
}

function LinkCardBubbly({ item }: { item: Data.Component<'blocks.link'> }) {
    return (
      <a href={item.link || '#'} target="_blank" rel="noopener noreferrer" className="block group">
        <Card className="min-h-8 shadow-[3px_5px_0px_0px_rgba(185,49,80,1))] transition-all duration-200 hover:bg-secondary/80 hover:shadow-[0px_0px_0px_0px_rgba(185,49,80,1))] hover:-translate-y-0.5 border-0 rounded-3xl bg-secondary m-4 my-2.5 py-1">
          <CardContent className="flex items-center gap-5 p-2 px-4">
            {item.thumbnail && <Avatar className="h-16 w-16 shrink-0 border-0 rounded-2xl">
              <AvatarImage src={uri.img(item.thumbnail ? item.thumbnail.url : item.thumbnail.formats.thumbnail.url)} alt={item.Label || 'Link thumbnail'} className="object-cover" />
              <AvatarFallback className="rounded-lg text-muted-foreground font-semibold">
                {(item.Label || '').charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>}
  
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-secondary-foreground truncate text-wrap">{item.Label}</p>
              {item.description && (
                <p className="text-xs text-secondary-foreground/70 mt-0.5 truncate text-wrap">{item.description}</p>
              )}
            </div>
  
            <ArrowRight className="h-4 w-4 text-secondary-foreground shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
          </CardContent>
        </Card>
      </a>
    );
  }
  

export function LinkTree({ Links }: LinkTreeProps) {
    console.log(Links)
  return (
    <div className="bg-accent h-full min-h-full">
        <div className="w-full md:max-w-lg mx-auto flex flex-col gap-0 pt-2">
        {Links.map((item, i) => (
            <LinkCardBubbly key={i} item={item} />
        ))}
        </div>
        <br/><br/>
    </div>
  );
}