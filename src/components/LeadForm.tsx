"use client"
import { useState } from "react"

export default function LeadForm() {
    const [state, setState] = useState<{ ok: boolean; msg: string; preview?: string } | null>(null)
    const [loading, setLoading] = useState(false)

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        const form = new FormData(e.currentTarget)
        const res = await fetch("/api/lead", { method: "POST", body: form })
        const json = await res.json()
        setState(json)
        setLoading(false)
    }

    return (
        <form onSubmit={onSubmit} className="grid gap-3 card p-5">
            <h3 className="text-lg font-semibold">Get a free consult</h3>
            <label className="text-sm text-zinc-400">Name
                <input name="name" required className="mt-1 w-full rounded-md bg-ink border border-steel px-3 py-2" />
            </label>
            <label className="text-sm text-zinc-400">Email
                <input name="email" type="email" required className="mt-1 w-full rounded-md bg-ink border border-steel px-3 py-2" />
            </label>
            <label className="text-sm text-zinc-400">Message
                <textarea name="message" rows={3} className="mt-1 w-full rounded-md bg-ink border border-steel px-3 py-2" />
            </label>
            <button disabled={loading} className="rounded-lg px-4 py-2 bg-safety text-black font-medium">
                {loading ? "Sending..." : "Submit"}
            </button>
            {state && (
                <p className={state.ok ? "text-green-400 text-sm" : "text-red-400 text-sm"}>
                    {state.msg} {state.preview ? <a className="underline ml-2" href={state.preview} target="_blank">Preview</a> : null}
                </p>
            )}
        </form>
    )
}
