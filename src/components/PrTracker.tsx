"use client"
import { useEffect, useMemo, useState } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

type Row = { week: string; weight: number }
const KEY = "ironworks.pr"

export default function PrTracker() {
    const [lift, setLift] = useState("Squat")
    const [data, setData] = useState<Row[]>([])

    useEffect(() => {
        const raw = localStorage.getItem(KEY)
        if (raw) try { setData(JSON.parse(raw)) } catch { }
        else setData([{ week: "W1", weight: 225 }])
    }, [])
    useEffect(() => { localStorage.setItem(KEY, JSON.stringify(data)) }, [data])

    const add = (delta: number) => setData(d => {
        const last = d.at(-1)
        const n = (last ? parseInt(last.week.slice(1)) + 1 : d.length + 1)
        return [...d, { week: `W${n}`, weight: Math.max(0, (last?.weight ?? 0) + delta) }]
    })
    const max = useMemo(() => data.reduce((m, x) => Math.max(m, x.weight), 0), [data])

    return (
        <div className="card p-5">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Weekly PR Tracker</h3>
                <select value={lift} onChange={e => setLift(e.target.value)}
                    className="bg-ink border border-steel rounded px-2 py-1 text-sm">
                    <option>Squat</option><option>Bench</option><option>Deadlift</option>
                </select>
            </div>

            <div className="mt-4 h-48 w-full">
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
                <button onClick={() => add(5)} className="px-3 py-2 rounded bg-safety text-black text-sm">+5 lb</button>
                <button onClick={() => add(10)} className="px-3 py-2 rounded bg-safety text-black text-sm">+10 lb</button>
                <button onClick={() => add(-5)} className="px-3 py-2 rounded border border-steel text-sm">-5 lb</button>
                <button onClick={() => setData([])} className="ml-auto px-3 py-2 rounded border border-steel text-sm">Reset</button>
            </div>
        </div>
    )
}
