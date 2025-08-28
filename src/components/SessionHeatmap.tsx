"use client"
import { useMemo } from "react"

type Week = { label: string; days: number[] }

export default function SessionHeatmap() {
    const weeks = useMemo<Week[]>(() => {
        const out: Week[] = []
        for (let w = 11; w >= 0; w--) {
            const label = `W${12 - w}`
            const days: number[] = []
            for (let d = 0; d < 7; d++) {
                const seed = (w * 7 + d) * 137 + 91
                const val = ((seed % 9) + (d % 3)) % 5 // 0..4
                days.push(val)
            }
            out.push({ label, days })
        }
        return out
    }, [])

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return (
        <div className="card p-5 heat-fade">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Session heatmap</h3>
                <div className="text-xs text-zinc-500">Last 12 weeks</div>
            </div>

            <div className="mt-3 grid grid-cols-[auto_1fr] gap-3">
                <div className="grid grid-rows-7 gap-1 text-[11px] text-zinc-500">
                    {dayNames.map((d) => (
                        <div key={d} className="h-[14px] leading-[14px]">{d}</div>
                    ))}
                </div>

                <div className="grid grid-cols-12 gap-1" role="grid" aria-label="Training sessions by day">
                    {weeks.map((w) => (
                        <div key={w.label} className="grid grid-rows-7 gap-1" role="row">
                            {w.days.map((v, di) => (
                                <div
                                    key={di}
                                    className={`heat-cell heat-${v}`}
                                    role="gridcell"
                                    aria-label={`${w.label} ${dayNames[di]}: ${v} session${v === 1 ? "" : "s"}`}
                                    title={`${w.label} ${dayNames[di]}: ${v} session${v === 1 ? "" : "s"}`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
                <span>Load</span>
                <span className="heat-cell heat-0" />
                <span className="heat-cell heat-1" />
                <span className="heat-cell heat-2" />
                <span className="heat-cell heat-3" />
                <span className="heat-cell heat-4" />
            </div>
        </div>
    )
}
