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

import localFont from 'next/font/local';

export const cooperBLack = localFont({
  src: [
    {
      path: '../../public/fonts/CooperBlackStd.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-cooper-black',
  display: 'swap', 
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
