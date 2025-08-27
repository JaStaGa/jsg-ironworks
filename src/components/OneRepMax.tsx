"use client"
import { useForm, type Resolver } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const S = z.object({
    weight: z.coerce.number().min(1),
    reps: z.coerce.number().min(1).max(12),
})
type Form = z.infer<typeof S>

export default function OneRepMax() {
    const { register, watch, formState: { errors } } = useForm<Form>({
        resolver: zodResolver(S) as unknown as Resolver<Form>,
        defaultValues: { weight: 185, reps: 5 },
    })

    const w = watch("weight") ?? 0
    const r = watch("reps") ?? 0
    const oneRm = w && r ? +(w * (1 + r / 30)).toFixed(1) : 0

    return (
        <div className="card p-5">
            <h3 className="text-lg font-semibold">1RM Calculator</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
                <label className="text-sm text-zinc-400">Weight (lb)
                    <input
                        {...register("weight", { valueAsNumber: true })}
                        inputMode="decimal"
                        className="mt-1 w-full rounded-md bg-ink border border-steel px-3 py-2"
                    />
                </label>
                <label className="text-sm text-zinc-400">Reps (1–12)
                    <input
                        {...register("reps", { valueAsNumber: true })}
                        inputMode="numeric"
                        className="mt-1 w-full rounded-md bg-ink border border-steel px-3 py-2"
                    />
                </label>
            </div>
            {(errors.weight || errors.reps) && <p className="mt-2 text-xs text-red-400">Enter valid numbers.</p>}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm" style={{ fontFamily: "var(--font-mono)" }}>
                <Stat label="1RM" value={`${oneRm || 0} lb`} />
                <Stat label="90%" value={`${(oneRm * 0.9).toFixed(0)} lb`} />
                <Stat label="80%" value={`${(oneRm * 0.8).toFixed(0)} lb`} />
                <Stat label="70%" value={`${(oneRm * 0.7).toFixed(0)} lb`} />
            </div>
            <p className="mt-3 text-xs text-zinc-500">Formula: Epley = weight × (1 + reps/30).</p>
        </div>
    )
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-lg bg-ink border border-steel p-3">
            <div className="text-zinc-400 text-[11px] uppercase tracking-wide">{label}</div>
            <div className="text-zinc-100 text-base">{value}</div>
        </div>
    )
}
