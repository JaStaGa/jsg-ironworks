"use client"
import { useEffect, useMemo, useState } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

type Row = { week: string; weight: number }
type Lift = "Squat" | "Bench" | "Deadlift"
type Store = Record<Lift, Row[]>
const LIFTS: Lift[] = ["Squat", "Bench", "Deadlift"]
const KEY = "ironworks.pr.v2"

function emptyData(): Store {
    return { Squat: [{ week: "W1", weight: 225 }], Bench: [{ week: "W1", weight: 135 }], Deadlift: [{ week: "W1", weight: 275 }] }
}

export default function PrTracker() {
    const [lift, setLift] = useState<Lift>("Squat")
    const [all, setAll] = useState<Store>(emptyData())

    // init
    useEffect(() => {
        const raw = localStorage.getItem(KEY)
        if (raw) try { setAll({ ...emptyData(), ...JSON.parse(raw) as Store }) } catch { }
    }, [])
    useEffect(() => { localStorage.setItem(KEY, JSON.stringify(all)) }, [all])

    const data = all[lift]
    const max = useMemo(() => data.reduce((m, x) => Math.max(m, x.weight), 0), [data])

    const add = (delta: number) => {
        setAll(prev => {
            const series = prev[lift]
            const last = series.at(-1)
            const n = last ? parseInt(last.week.slice(1)) + 1 : series.length + 1
            const next: Row[] = [...series, { week: `W${n}`, weight: Math.max(0, (last?.weight ?? 0) + delta) }]
            return { ...prev, [lift]: next }
        })
    }

    function exportJson() {
        const blob = new Blob([JSON.stringify(all, null, 2)], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "ironworks-pr.json"
        a.click()
        URL.revokeObjectURL(url)
    }
    function importJson() {
        const text = prompt("Paste PR JSON")
        if (!text) return
        try {
            const obj = JSON.parse(text) as Store
            // shallow validate
            if (!obj || typeof obj !== "object") throw new Error("invalid")
            setAll(prev => ({ ...prev, ...obj }))
        } catch {
            alert("Invalid JSON")
        }
    }

    return (
        <div className="card p-5 min-w-0 overflow-hidden">
            <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">PR Tracker</h3>
                <div className="flex items-center gap-2">
                    {LIFTS.map(l => (
                        <button
                            key={l}
                            onClick={() => setLift(l)}
                            className={`px-2.5 py-1 rounded border text-sm ${lift === l ? "border-safety text-zinc-100" : "border-steel text-zinc-400"}`}
                        >
                            {l}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sparkline header */}
            <div className="mt-3 h-10">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <Line type="monotone" dataKey="weight" stroke="#ff7a00" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-3 h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <XAxis dataKey="week" tick={{ fill: "#a1a1aa", fontSize: 12 }} />
                        <YAxis domain={[0, Math.max(10, Math.ceil(max / 10) * 10)]} tick={{ fill: "#a1a1aa", fontSize: 12 }} />
                        <Tooltip contentStyle={{ background: "#18181b", border: "1px solid #27272a" }} />
                        <Line type="monotone" dataKey="weight" stroke="#ff7a00" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 flex gap-2">
                <button onClick={() => add(5)} className="px-3 py-2 rounded bg-safety text-black text-sm">+5</button>
                <button onClick={() => add(10)} className="px-3 py-2 rounded bg-safety text-black text-sm">+10</button>
                <button onClick={() => add(-5)} className="px-3 py-2 rounded border border-steel text-sm">-5</button>
                <button onClick={() => setAll(prev => ({ ...prev, [lift]: [] }))} className="ml-auto px-3 py-2 rounded border border-steel text-sm">Reset</button>
                <button onClick={exportJson} className="px-3 py-2 rounded border border-steel text-sm">Export</button>
                <button onClick={importJson} className="px-3 py-2 rounded border border-steel text-sm">Import</button>
            </div>
        </div>
    )
}
