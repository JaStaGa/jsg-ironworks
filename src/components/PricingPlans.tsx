"use client"
import Link from "next/link"
import { motion, useSpring, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

type TierId = "basic" | "plus" | "pro"
type Tier = { id: TierId; name: string; price: number; period: string; features: string[] }
type CompareRow = { feature: string } & Partial<Record<TierId, boolean>>
export type Pricing = { tiers: Tier[]; compare: CompareRow[] }

function PriceCounter({ amount }: { amount: number }) {
    const spring = useSpring(0, { stiffness: 120, damping: 20 })
    const text = useTransform(spring, (v) => Math.round(v).toString())
    useEffect(() => { spring.set(amount) }, [amount, spring])
    return <motion.span className="num">{text}</motion.span>
}

export default function PricingPlans({ pricing }: { pricing: Pricing }) {
    const [billing, setBilling] = useState<"mo" | "qr">("mo")
    const mostPopular: TierId = "plus"

    const priceFor = (t: Tier) => billing === "mo" ? t.price : Math.round(t.price * 3 * 0.9) // 10% off quarterly
    const unit = billing === "mo" ? "/mo" : "/quarter"

    return (
        <>
            {/* Billing toggle */}
            <div className="mb-6">
                <div role="tablist" aria-label="Billing period" className="seg">
                    <button role="tab" aria-selected={billing === "mo"} onClick={() => setBilling("mo")}>Monthly</button>
                    <button role="tab" aria-selected={billing === "qr"} onClick={() => setBilling("qr")}>
                        Quarterly <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-steel/60">Save 10%</span>
                    </button>
                </div>
            </div>

            {/* Tiers */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pricing.tiers.map((t) => {
                    const popular = t.id === mostPopular
                    return (
                        <article key={t.id} className={`card p-5 ${popular ? "ring-1 ring-safety/30" : ""}`}>
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">{t.name}</h2>
                                {popular && <span className="text-[11px] px-2 py-1 rounded-full border border-steel/80 text-zinc-200">Most popular</span>}
                            </div>

                            <div className="mt-2 price text-3xl font-bold text-safety">
                                ${" "}
                                {/* key forces morph on toggle */}
                                <PriceCounter key={`${t.id}-${billing}`} amount={priceFor(t)} />
                                <span className="unit">{unit}</span>
                            </div>

                            <ul className="mt-4 space-y-2 text-sm text-zinc-300 list-disc ml-5">
                                {t.features.map((f, i) => <li key={i}>{f}</li>)}
                            </ul>

                            <div className="mt-5">
                                <Link href="/book" className={`btn-cta ${popular ? "cta-glow" : ""}`}>Start</Link>
                            </div>
                        </article>
                    )
                })}
            </div>

            {/* Compare */}
            <h2 className="text-xl font-semibold mt-12 mb-4">Compare</h2>
            <div className="overflow-x-auto rounded-xl border border-steel">
                <table className="min-w-[700px] w-full text-sm">
                    <thead>
                        <tr className="bg-zinc-950">
                            <th className="text-left p-3">Feature</th>
                            {pricing.tiers.map((t) => <th key={t.id} className="p-3">{t.name}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {pricing.compare.map((row, i) => (
                            <tr key={i} className="border-t border-steel">
                                <td className="p-3 text-zinc-300">{row.feature}</td>
                                {pricing.tiers.map((t) => {
                                    const v = row[t.id] ?? false
                                    return (
                                        <td key={`${billing}-${t.id}-${i}`} className="p-3">
                                            {v ? <span className="tick">✔︎</span> : <span className="text-zinc-600">—</span>}
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
