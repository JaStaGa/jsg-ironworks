import "./globals.css"
import type { Metadata } from "next"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const site = "https://jsg-ironworks.vercel.app"

export const metadata: Metadata = {
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
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  return (
    <html lang="en">
      <body className="min-h-dvh bg-ink text-zinc-200 antialiased">
        {plausibleDomain ? (
          <script defer data-domain={plausibleDomain} src="https://plausible.io/js/script.js" />
        ) : null}
        <Header />
        <main className="px-4 sm:px-6 lg:px-8">{children}</main>
        <Footer />
        <div id="mobile-sticky-root" />
      </body>
    </html>
  )
}
