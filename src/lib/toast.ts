// src/lib/toast.ts
export type ToastInput = {
    title: string
    description?: string
    actionHref?: string
    actionLabel?: string
}

export function toast(input: ToastInput) {
    if (typeof window === "undefined") return
    window.dispatchEvent(new CustomEvent("app:toast", { detail: input }))
}
