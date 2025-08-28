"use client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo, useState } from "react"

const S = z.object({
    weight: z.number().min(1),
    reps: z.number().min(1).max(12),
})
type Form = z.infer<typeof S>
type Formula = "epley" | "brzycki"
type Unit = "lb" | "kg"

function calc1RM(w: number, r: number, f: Formula) {
    if (!w || !r) return 0
    return f === "epley" ? w * (1 + r / 30) : (w * 36) / (37 - r)
}

export default function OneRepMax() {
    const [unit, setUnit] = useState<Unit>("lb")
    const [formula, setFormula] = useState<Formula>("epley")

    const { register, watch, formState: { errors } } = useForm<Form>({
        resolver: zodResolver(S),
        defaultValues: { weight: 185, reps: 5 },
    })

    const w = watch("weight") ?? 0
    const r = watch("reps") ?? 0

    const oneRm = useMemo(() => +calc1RM(w, r, formula).toFixed(1), [w, r, formula])
    const z90 = Math.round(oneRm * 0.9)
    const z80 = Math.round(oneRm * 0.8)
    const z70 = Math.round(oneRm * 0.7)

    return (
        <div className="card p-5">
            <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">1RM Calculator</h3>
                <div className="flex items-center gap-2 text-sm">
                    <select
                        value={formula}
                        onChange={(e) => setFormula(e.target.value as Formula)}
                        className="bg-ink border border-steel rounded px-2 py-1"
                        aria-label="Formula"
                        title="Formula"
                    >
                        <option value="epley">Epley</option>
                        <option value="brzycki">Brzycki</option>
                    </select>
                    <select
                        value={unit}
                        onChange={(e) => setUnit(e.target.value as Unit)}
                        className="bg-ink border border-steel rounded px-2 py-1"
                        aria-label="Units"
                        title="Units"
                    >
                        <option value="lb">lb</option>
                        <option value="kg">kg</option>
                    </select>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
                <label className="text-sm text-zinc-400">
                    Weight ({unit})
                    <input
                        {...register("weight", { valueAsNumber: true })}
                        type="number"
                        inputMode="decimal"
                        className="mt-1 w-full rounded-md bg-ink border border-steel px-3 py-2"
                    />
                </label>
                <label className="text-sm text-zinc-400">
                    Reps (1–12)
                    <input
                        {...register("reps", { valueAsNumber: true })}
                        type="number"
                        inputMode="numeric"
                        className="mt-1 w-full rounded-md bg-ink border border-steel px-3 py-2"
                    />
                </label>
            </div>

            {(errors.weight || errors.reps) && (
                <p className="mt-2 text-xs text-red-400">Enter valid numbers.</p>
            )}

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm" style={{ fontFamily: "var(--font-mono)" }}>
                <Stat label="1RM" value={`${isFinite(oneRm) ? oneRm : 0} ${unit}`} />
                <Stat label="90%" value={`${isFinite(z90) ? z90 : 0} ${unit}`} />
                <Stat label="80%" value={`${isFinite(z80) ? z80 : 0} ${unit}`} />
                <Stat label="70%" value={`${isFinite(z70) ? z70 : 0} ${unit}`} />
            </div>

            <p className="mt-3 text-xs text-zinc-500">
                {formula === "epley"
                    ? "Epley: 1RM = weight × (1 + reps/30)."
                    : "Brzycki: 1RM = weight × 36 / (37 − reps)."}
            </p>
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
