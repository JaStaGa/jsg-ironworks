"use client"
import Link from "next/link"
import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"

function Counter({ to, suffix = "", active }: { to: number; suffix?: string; active: boolean }) {
    const spring = useSpring(0, { stiffness: 120, damping: 20 })
    const text = useTransform(spring, (v) => Math.round(v).toString())
    useEffect(() => { if (active) spring.set(to) }, [active, to, spring])
    return (
        <span className="num text-3xl sm:text-4xl font-semibold">
            <motion.span>{text}</motion.span>{suffix}
        </span>
    )
}

function MetricCard({
    label, value, delay = 0, active,
}: { label: string; value: React.ReactNode; delay?: number; active: boolean }) {
    return (
        <motion.div
            className="card p-4"
            initial={{ opacity: 0, y: 12 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay }}
        >
            <div className="text-[11px] uppercase tracking-wide text-zinc-400">{label}</div>
            <div className="mt-1">{value}</div>
        </motion.div>
    )
}

export default function HeroMetrics() {
    const stackRef = useRef<HTMLDivElement>(null)
    const inView = useInView(stackRef, { once: true, margin: "-20% 0px" })

    return (
        <section className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-10 items-center py-16 lg:py-24">
            {/* Left: headline + CTA */}
            <div>
                <h1 className="heading text-4xl sm:text-5xl font-semibold tracking-tight">JSG Ironworks Training</h1>
                <p className="mt-4 text-zinc-400 max-w-xl">Build measurable strength. Track PRs. See results.</p>
                <div className="mt-8 flex gap-3">
                    <Link href="/book" className="rounded-lg px-4 py-2 bg-safety text-black font-medium hover:opacity-90">Book a session</Link>
                    <Link href="/programs" className="rounded-lg px-4 py-2 border border-steel">View programs</Link>
                </div>
                <ul className="mt-10 flex flex-wrap items-center gap-6 opacity-80">
                    <li className="text-xs uppercase tracking-wider text-zinc-500">As seen on</li>
                    <li className="h-6 w-20 bg-steel/60 rounded" />
                    <li className="h-6 w-20 bg-steel/60 rounded" />
                    <li className="h-6 w-20 bg-steel/60 rounded" />
                </ul>
            </div>

            {/* Right: metric stack */}
            <div ref={stackRef} className="grid gap-4">
                <MetricCard
                    label="Sessions this month"
                    value={<Counter to={24} active={inView} />}
                    delay={0.00}
                    active={inView}
                />
                <MetricCard
                    label="Total volume"
                    value={<Counter to={32} suffix="k" active={inView} />}
                    delay={0.08}
                    active={inView}
                />
                <MetricCard
                    label="Top PR (lb)"
                    value={<Counter to={405} active={inView} />}
                    delay={0.16}
                    active={inView}
                />
            </div>
        </section>
    )
}
