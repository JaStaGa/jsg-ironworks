"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetClose,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const links = [
    { href: "/", label: "Home" },
    { href: "/programs", label: "Programs" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/book", label: "Book" },
]

export default function Header() {
    const pathname = usePathname()
    return (
        <header className="sticky top-0 z-50 bg-ink/70 backdrop-blur border-b border-steel">
            <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
                <Link href="/" className="font-semibold tracking-tight text-zinc-100">JSG Ironworks</Link>

                {/* Desktop */}
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
                    <Button asChild className="bg-safety text-black hover:opacity-90">
                        <Link href="/book">Book</Link>
                    </Button>
                </div>

                {/* Mobile */}
                <Sheet>
                    <SheetTrigger className="md:hidden p-2 rounded hover:bg-zinc-900" aria-label="Open menu">
                        <Menu className="size-6" />
                    </SheetTrigger>
                    <SheetContent side="right" className="bg-ink border-steel">
                        <nav className="mt-6 grid gap-3 text-base">
                            {links.map((l) => (
                                <SheetClose asChild key={l.href}>
                                    <Link
                                        href={l.href}
                                        className="px-2 py-2 rounded hover:bg-zinc-900 text-zinc-200"
                                    >
                                        {l.label}
                                    </Link>
                                </SheetClose>
                            ))}
                            <SheetClose asChild>
                                <Link href="/book" className="btn-cta mt-2">Book a session</Link>
                            </SheetClose>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}
