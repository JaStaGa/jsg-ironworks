"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

const links = [
    { href: "/", label: "Home" },
    { href: "/programs", label: "Programs" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/book", label: "Book" },
]

export default function Header() {
    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 120)
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return (
        <header className="sticky top-0 z-50 bg-ink/70 backdrop-blur border-b border-steel">
            <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
                <Link href="/" className="font-semibold tracking-tight text-zinc-100">JSG Ironworks</Link>

                <nav className="hidden md:flex gap-6 text-sm">
                    {links.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className={pathname === l.href ? "text-safety" : "text-zinc-300 hover:text-safety"}
                        >
                            {l.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:block">
                    <Button
                        asChild
                        className={"bg-safety text-black hover:opacity-90 transition-transform " + (scrolled ? "cta-glow book-pulse" : "")}
                    >
                        <Link href="/book">Book</Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}
