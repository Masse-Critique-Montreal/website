import type React from "react"
import { GeistSans } from "geist/font/sans"
//import { GeistMono } from "geist/font/mono"

import { REM } from "next/font/google"
import '../globals.css'


const libreFranklin = REM({
  subsets: ["latin"],
  variable: "--font-libre-franklin",
  display: "swap",
})

// src/ui/fonts.ts or app/fonts.ts
import localFont from 'next/font/local';

export const cooperBLack = localFont({
  src: [
    {
      path: '../../public/fonts/CooperBlackStd.otf', // Adjust path based on your file location
      weight: '400',
      style: 'normal',
    },
    // Add more objects for different weights/styles if available (e.g., bold, italic)
  ],
  variable: '--font-cooper-black', // Optional: for use with CSS variables (e.g., Tailwind CSS)
  display: 'swap', // Helps prevent layout shift (CLS)
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`font-sans ${GeistSans.variable} ${cooperBLack.variable} ${libreFranklin.variable}`}>
        {children}
      </body>
    </html>
  )
}
