// app/(errors)/[...not-found]/page.tsx
import { notFound } from "next/navigation";

// export const dynamic = 'force-static';

export function generateStaticParams() {
    // Provides one static path to satisfy the 'output: export' requirement
    return [{ "not-found": ["404"] }];
  }
  

export default function CatchAllPage() {
  notFound(); // This triggers the nearest not-found.js
}