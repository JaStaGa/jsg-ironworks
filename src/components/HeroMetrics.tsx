"use client"
import { motion, useSpring, useTransform } from "framer-motion"
import { useEffect } from "react"

function Counter({ from = 0, to, suffix = "" }: { from?: number; to: number; suffix?: string }) {
    const spring = useSpring(from, { stiffness: 120, damping: 20 })
    const text = useTransform(spring, v => Math.round(v).toString())

    useEffect(() => { spring.set(to) }, [to, spring])

    return (
        <span className="num text-3xl sm:text-4xl font-semibold">
            <motion.span>{text}</motion.span>{suffix}
        </span>
    )
}

export default function HeroMetrics() {
    return (
        <section className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-10 items-center py-16 lg:py-24">
            <div>
                <h1 className="heading text-4xl sm:text-5xl font-semibold tracking-tight">JSG Ironworks Training</h1>
                <p className="mt-4 text-zinc-400 max-w-xl">Build measurable strength. Track PRs. See results.</p>
                <div className="mt-8 flex gap-3">
                    <a href="/book" className="rounded-lg px-4 py-2 bg-safety text-black font-medium">Book a session</a>
                    <a href="/programs" className="rounded-lg px-4 py-2 border border-steel">View programs</a>
                </div>
                <ul className="mt-10 flex flex-wrap items-center gap-6 opacity-80">
                    <li className="text-xs uppercase tracking-wider text-zinc-500">As seen on</li>
                    <li className="h-6 w-20 bg-steel/60 rounded" />
                    <li className="h-6 w-20 bg-steel/60 rounded" />
                    <li className="h-6 w-20 bg-steel/60 rounded" />
                </ul>
            </div>

            <div className="steel-hatch rounded-2xl p-5 ring-1 ring-steel">
                <div className="grid grid-cols-3 gap-4">
                    <Metric label="Sessions" value={<Counter to={24} />} />
                    <Metric label="Top PR (lb)" value={<Counter to={405} />} />
                    <Metric label="Weekly volume (k)" value={<Counter to={32} suffix="k" />} />
                </div>
                <div className="mt-6 text-xs text-zinc-500">Demo data. Auto-animated counters.</div>
            </div>
        </section>
    )
}

function Metric({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="card p-4">
            <div className="text-[11px] uppercase tracking-wide text-zinc-400">{label}</div>
            <div className="mt-1">{value}</div>
        </div>
    )
}
