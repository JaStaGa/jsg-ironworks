"use client"
import { useMemo, useState } from "react"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

type Pt = { w: string; v: number }
type Lift = { name: string; unit: "lb" | "kg"; data: Pt[] }

const LIFTS: Lift[] = [
    {
        name: "Squat", unit: "lb", data: [
            { w: "W1", v: 315 }, { w: "W2", v: 320 }, { w: "W3", v: 330 }, { w: "W4", v: 340 },
            { w: "W5", v: 345 }, { w: "W6", v: 350 }, { w: "W7", v: 355 }, { w: "W8", v: 365 }
        ]
    },
    {
        name: "Bench", unit: "lb", data: [
            { w: "W1", v: 225 }, { w: "W2", v: 230 }, { w: "W3", v: 232 }, { w: "W4", v: 235 },
            { w: "W5", v: 237 }, { w: "W6", v: 240 }, { w: "W7", v: 242 }, { w: "W8", v: 245 }
        ]
    },
    {
        name: "Deadlift", unit: "lb", data: [
            { w: "W1", v: 365 }, { w: "W2", v: 385 }, { w: "W3", v: 395 }, { w: "W4", v: 405 },
            { w: "W5", v: 415 }, { w: "W6", v: 425 }, { w: "W7", v: 430 }, { w: "W8", v: 445 }
        ]
    },
]

export default function StrengthTimelineGrid() {
    const [i, setI] = useState(LIFTS[0].data.length - 1)

    return (
        <div className="rounded-2xl">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {LIFTS.map((lift) => (
                    <LiftTile key={lift.name} lift={lift} i={i} />
                ))}
            </div>

            <div className="mt-6 card p-4">
                <label className="text-xs text-zinc-400" htmlFor="timeline">Week</label>
                <input
                    id="timeline"
                    aria-label="Strength timeline scrubber"
                    type="range"
                    min={0}
                    max={LIFTS[0].data.length - 1}
                    value={i}
                    onChange={(e) => setI(parseInt(e.target.value))}
                    className="mt-2 h-1 w-full appearance-none rounded bg-steel"
                />
                <div className="mt-2 text-xs text-zinc-400" style={{ fontFamily: "var(--font-mono)" }}>
                    {LIFTS[0].data[i].w}
                </div>
            </div>
        </div>
    )
}

function LiftTile({ lift, i }: { lift: Lift; i: number }) {
    const prSet = useMemo(() => {
        const s = new Set<number>()
        let m = -Infinity
        lift.data.forEach((p, idx) => { if (p.v > m) { m = p.v; s.add(idx) } })
        return s
    }, [lift.data])

    const curr = lift.data[i]

    type DotPropsLite = { cx?: number; cy?: number; index?: number }
    const Dot = (props: DotPropsLite) => {
        if (props.cx == null || props.cy == null) return null
        const idx = typeof props.index === "number" ? props.index : -1
        const isCurr = idx === i
        const isPR = prSet.has(idx)
        const r = isCurr ? 5 : 3
        const fill = isCurr ? "#ff7a00" : "#a1a1aa"
        return (
            <g>
                <circle cx={props.cx} cy={props.cy} r={r} fill={fill} className={isPR ? "pr-dot" : ""} />
                {isCurr && <circle cx={props.cx} cy={props.cy} r={r + 6} fill="transparent" stroke="#ff7a00" strokeOpacity="0.25" />}
            </g>
        )
    }

    return (
        <div className="card p-4">
            <div className="flex items-baseline justify-between">
                <h3 className="text-sm font-medium">{lift.name}</h3>
                <div className="num text-safety text-sm">{curr.v} {lift.unit}</div>
            </div>
            <div className="h-28 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={lift.data} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
                        <defs>
                            <linearGradient id={`g-${lift.name}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#ff7a00" stopOpacity={0.8} />
                                <stop offset="100%" stopColor="#ff7a00" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="w" hide />
                        <YAxis hide />
                        <Tooltip
                            contentStyle={{ background: "#18181b", border: "1px solid #27272a" }}
                            labelStyle={{ color: "#a1a1aa" }}
                            formatter={(v: number) => [`${v} ${lift.unit}`, ""] as [string, string]}
                        />
                        <Area
                            type="monotone"
                            dataKey="v"
                            stroke="#ff7a00"
                            fill={`url(#g-${lift.name})`}
                            strokeWidth={2}
                            dot={<Dot />}
                            activeDot={{ r: 6 }}
                            isAnimationActive={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-2 text-xs text-zinc-500">{lift.data[i].w}</div>
        </div>
    )
}
