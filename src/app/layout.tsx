import "./globals.css"
import type { Metadata } from "next"
import { heading, mono } from "./fonts"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Toaster from "@/components/Toaster"

const site = "https://jsg-ironworks.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL("https://jsg-ironworks.vercel.app"),           // ✅ lets OG/Twitter resolve absolute URLs
  title: "JSG Ironworks Training",
  description: "Strength coaching demo. Programs, pricing, results, booking.",
  alternates: { canonical: site },
  openGraph: {
    type: "website",
    url: site,
    title: "JSG Ironworks Training",
    description: "Strength coaching demo",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSG Ironworks Training",
    description: "Strength coaching demo",
    images: ["/og.jpg"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${mono.variable}`}>
      <body className="min-h-dvh bg-ink text-zinc-200 antialiased">
        <Header />
        <main className="px-4 sm:px-6 lg:px-8">{children}</main>
        <Footer />
        <Toaster />
        <div id="mobile-sticky-root" />
      </body>
    </html>
  )
}