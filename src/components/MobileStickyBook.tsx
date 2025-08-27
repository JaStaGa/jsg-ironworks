"use client"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function MobileStickyBook() {
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 200)
        onScroll()
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])
    if (!visible) return null
    return (
        <div className="fixed inset-x-0 bottom-0 z-50 sm:hidden bg-ink/90 backdrop-blur border-t border-steel px-4 py-3 flex items-center justify-between sticky-bar">
            <span className="text-sm text-zinc-300">Ready to start?</span>
            <Link href="/book" className="btn-cta tap-haptic">Book</Link>
        </div>
    )
}
