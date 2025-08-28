"use client"
import { useEffect, useRef, useState } from "react"
import type { ToastInput } from "@/lib/toast"

type ToastItem = ToastInput & { id: number }

export default function Toaster() {
    const [items, setItems] = useState<ToastItem[]>([])
    const idRef = useRef(1)

    useEffect(() => {
        const onToast = (e: Event) => {
            const detail = (e as CustomEvent<ToastInput>).detail
            const id = idRef.current++
            const item: ToastItem = { id, ...detail }
            setItems((s) => [...s, item])
            // auto-dismiss
            const t = setTimeout(() => {
                setItems((s) => s.filter((x) => x.id !== id))
            }, 5200)
            return () => clearTimeout(t)
        }
        window.addEventListener("app:toast", onToast as EventListener)
        return () => window.removeEventListener("app:toast", onToast as EventListener)
    }, [])

    return (
        <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex max-w-[92vw] flex-col gap-3">
            {items.map((t) => (
                <div
                    key={t.id}
                    className="pointer-events-auto rounded-xl border border-steel bg-ink/95 shadow-2xl backdrop-blur p-4 min-w-[280px] max-w-[420px]"
                    role="status"
                    aria-live="polite"
                >
                    <div className="text-sm font-semibold text-zinc-100">{t.title}</div>
                    {t.description ? <div className="mt-1 text-sm text-zinc-300">{t.description}</div> : null}
                    {t.actionHref ? (
                        <a
                            href={t.actionHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-block rounded-md bg-safety px-3 py-1.5 text-xs font-medium text-black"
                        >
                            {t.actionLabel ?? "Open"}
                        </a>
                    ) : null}
                </div>
            ))}
        </div>
    )
}
