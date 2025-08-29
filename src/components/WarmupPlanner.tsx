"use client"
import { useMemo, useState } from "react"
import { platePairs, roundToIncrement } from "@/lib/plates"

type Ramp = { pct: number; reps: number }

const TEMPLATE: Ramp[] = [
    { pct: 0.40, reps: 5 },
    { pct: 0.55, reps: 3 },
    { pct: 0.70, reps: 2 },
    { pct: 0.80, reps: 1 },
    { pct: 0.90, reps: 1 },
]

export default function WarmupPlanner() {
    const [top, setTop] = useState(225)
    const [reps, setReps] = useState(5)
    const [bar, setBar] = useState(45)
    const [targetRpe, setTargetRpe] = useState(8.5)

    // e1RM from Epley using the top set
    const e1rm = useMemo(() => +(top * (1 + reps / 30)).toFixed(1), [top, reps])

    const rows = useMemo(() => {
        const inc = 5
        const warmups = TEMPLATE.map(s => ({ ...s, weight: roundToIncrement(e1rm * s.pct, inc) }))
        return [...warmups, { pct: top / e1rm, reps, weight: roundToIncrement(top, inc) }]
    }, [e1rm, reps, top])

    function copy() {
        const lines = [
            `Top: ${top} lb x ${reps} @ RPE ${targetRpe}`,
            ...rows.slice(0, -1).map((r, i) => `WU${i + 1}: ${Math.round(r.pct * 100)}% x ${r.reps} = ${r.weight} lb`),
        ].join("\n")
        navigator.clipboard.writeText(lines)
    }

    return (
        <div className="card p-5 min-w-0 overflow-hidden">
            <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">Warm-up Planner</h3>
                <div className="text-sm text-zinc-400">Target RPE:
                    <select
                        value={targetRpe}
                        onChange={(e) => setTargetRpe(Number(e.target.value))}
                        className="ml-2 bg-ink border border-steel rounded px-2 py-1 text-sm"
                    >
                        {[6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3">
                <label className="text-sm text-zinc-400">Top set (lb)
                    <input value={top} onChange={e => setTop(Number(e.target.value) || 0)}
                        inputMode="decimal" className="mt-1 w-full rounded-md bg-ink border border-steel px-3 py-2" />
                </label>
                <label className="text-sm text-zinc-400">Reps
                    <input value={reps} onChange={e => setReps(Number(e.target.value) || 0)}
                        inputMode="numeric" className="mt-1 w-full rounded-md bg-ink border border-steel px-3 py-2" />
                </label>
                <label className="text-sm text-zinc-400">Bar (lb)
                    <input value={bar} onChange={e => setBar(Number(e.target.value) || 0)}
                        inputMode="decimal" className="mt-1 w-full rounded-md bg-ink border border-steel px-3 py-2" />
                </label>
            </div>
            <p className="mt-2 text-xs text-zinc-400">e1RM: <span className="text-zinc-100">{e1rm} lb</span></p>

            <div className="mt-4 overflow-x-auto rounded-xl border border-steel">
                <table className="min-w-[720px] w-full text-sm">
                    <thead>
                        <tr className="bg-zinc-950">
                            <th className="text-left p-3">Stage</th>
                            <th className="text-left p-3">%1RM</th>
                            <th className="text-left p-3">Reps</th>
                            <th className="text-left p-3">Weight</th>
                            <th className="text-left p-3">Per-side plates</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r, i) => {
                            const pairs = platePairs(r.weight, "lb", bar)
                            return (
                                <tr key={i} className="border-t border-steel">
                                    <td className="p-3">{i < TEMPLATE.length ? `Warm-up ${i + 1}` : "Top"}</td>
                                    <td className="p-3">{Math.round(r.pct * 100)}%</td>
                                    <td className="p-3">{r.reps}</td>
                                    <td className="p-3">{r.weight} lb</td>
                                    <td className="p-3" style={{ fontFamily: "var(--font-mono)" }}>
                                        {pairs.length ? pairs.map(([p, c]) => `${c}×${p}`).join("  |  ") : "—"}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div className="mt-3">
                <button onClick={copy} className="px-3 py-2 rounded border border-steel text-sm">Copy to clipboard</button>
            </div>
        </div>
    )
}
