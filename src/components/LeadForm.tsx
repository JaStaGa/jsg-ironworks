"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/lib/toast"

const S = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Enter a valid email"),
    message: z.string().max(1000).optional(),
})
type Form = z.infer<typeof S>

export default function LeadForm() {
    const [announce, setAnnounce] = useState("")
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<Form>({ resolver: zodResolver(S), defaultValues: { name: "", email: "", message: "" } })

    async function onSubmit(values: Form) {
        setAnnounce("Submitting…")
        const fd = new FormData()
        fd.set("name", values.name)
        fd.set("email", values.email)
        if (values.message) fd.set("message", values.message)

        const res = await fetch("/api/lead", { method: "POST", body: fd })
        const json = await res.json().catch(() => ({ ok: false, msg: "Network error" }))

        if (json.ok) {
            setAnnounce("Submitted successfully")
            reset()
            toast({
                title: "Lead submitted (demo)",
                description: "This uses Ethereal for preview only.",
                actionHref: json.preview as string | undefined,
                actionLabel: json.preview ? "Open preview" : undefined,
            })
        } else {
            setAnnounce("Submission failed")
            toast({ title: "Error", description: json?.msg ?? "Server error" })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 card p-5" noValidate>
            <h3 className="text-lg font-semibold">Get a free consult</h3>

            <label className="text-sm text-zinc-400">
                Name
                <input
                    {...register("name")}
                    aria-invalid={!!errors.name}
                    className="mt-1 w-full rounded-md bg-ink border border-steel px-3 py-2"
                />
                {errors.name && <span className="mt-1 block text-xs text-red-400">{errors.name.message}</span>}
            </label>

            <label className="text-sm text-zinc-400">
                Email
                <input
                    type="email"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                    className="mt-1 w-full rounded-md bg-ink border border-steel px-3 py-2"
                />
                {errors.email && <span className="mt-1 block text-xs text-red-400">{errors.email.message}</span>}
            </label>

            <label className="text-sm text-zinc-400">
                Message
                <textarea
                    rows={3}
                    {...register("message")}
                    aria-invalid={!!errors.message}
                    className="mt-1 w-full rounded-md bg-ink border border-steel px-3 py-2"
                />
                {errors.message && <span className="mt-1 block text-xs text-red-400">{errors.message.message}</span>}
            </label>

            <button
                disabled={isSubmitting}
                className="rounded-lg px-4 py-2 bg-safety text-black font-medium tap-haptic"
                aria-busy={isSubmitting}
            >
                {isSubmitting ? "Sending…" : "Submit"}
            </button>

            {/* Screen reader announcements */}
            <p aria-live="polite" className="sr-only">
                {announce}
            </p>
        </form>
    )
}
