import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="flex flex-col gap-2">
            <h1 className="font-mono text-8xl font-bold tracking-tight text-foreground md:text-9xl">404</h1>
            <div className="h-1 w-full bg-primary" />
          </div>
  
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold text-foreground md:text-3xl">Page Not Found</h2>
            <p className="max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              {"The page you're looking for doesn't exist or has been moved."}
            </p>
          </div>
  
          <Button asChild size="lg" className="mt-2">
            <Link href="/en">Return Home</Link>
          </Button>
        </div>
      </main>
    )
  }  