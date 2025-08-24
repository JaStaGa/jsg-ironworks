"use client"
import { JSX, useMemo, useState } from "react"
import { platePairs, roundToIncrement, type Unit } from "@/lib/plates"

export default function PlateMath() {
    const [unit, setUnit] = useState<Unit>("lb")
    const [bar, setBar] = useState(45)
    const [target, setTarget] = useState(225)

    // sync bar for unit
    const barAuto = unit === "lb" ? 45 : 20
    const barUse = bar || barAuto

    const inc = unit === "lb" ? 5 : 2.5
    const rounded = useMemo(() => roundToIncrement(target, inc), [target, inc])
    const pairs = useMemo(() => platePairs(rounded, unit, barUse), [rounded, unit, barUse])

    return (
        <div className="rounded-2xl border border-zinc-800 p-5">
            <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">Plate Visualizer</h3>
                <select value={unit} onChange={e => setUnit(e.target.value as Unit)}
                    className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-sm">
                    <option value="lb">lb</option><option value="kg">kg</option>
                </select>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3">
                <label className="text-sm text-zinc-400">Target ({unit})
                    <input value={target} onChange={e => setTarget(Number(e.target.value) || 0)}
                        inputMode="decimal" className="mt-1 w-full rounded-md bg-zinc-900 border border-zinc-800 px-3 py-2" />
                </label>
                <label className="text-sm text-zinc-400">Bar ({unit})
                    <input value={barUse} onChange={e => setBar(Number(e.target.value) || 0)}
                        inputMode="decimal" className="mt-1 w-full rounded-md bg-zinc-900 border border-zinc-800 px-3 py-2" />
                </label>
                <div className="text-sm text-zinc-400 flex items-end">Rounded: <span className="ml-2 text-zinc-100">{rounded} {unit}</span></div>
            </div>

            {/* bar svg */}
            <div className="mt-5 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                <div className="mx-auto max-w-xl">
                    <svg viewBox="0 0 600 120" className="w-full h-24">
                        {/* Bar */}
                        <rect x="20" y="55" width="560" height="10" rx="2" fill="#c4c4c4" />
                        {/* Sleeves */}
                        <rect x="20" y="45" width="70" height="30" fill="#8a8a8a" />
                        <rect x="510" y="45" width="70" height="30" fill="#8a8a8a" />
                        {/* Collars */}
                        <rect x="90" y="45" width="8" height="30" fill="#666" />
                        <rect x="502" y="45" width="8" height="30" fill="#666" />

                        {/* Left plates */}
                        {renderPlates({ xStart: 98, dir: 1, pairs })}
                        {/* Right plates */}
                        {renderPlates({ xStart: 502, dir: -1, pairs })}
                    </svg>
                </div>
                <div className="mt-3 text-sm text-zinc-300" style={{ fontFamily: "var(--font-mono)" }}>
                    {pairs.length === 0 ? "No plates." :
                        pairs.map(([p, c]) => `${c}×${p}${unit}`).join("  |  ")}
                </div>
            </div>
        </div>
    )
}

function renderPlates({ xStart, dir, pairs }: {
    xStart: number; dir: 1 | -1; pairs: [number, number][]
}) {
    // widths are symbolic by weight
    const width = (w: number) => 6 + Math.log(w + 1) * 6
    const color = (w: number) =>
        w >= 45 ? "#ff7a00" :
            w >= 25 ? "#1f2937" :
                w >= 10 ? "#374151" :
                    "#52525b"

    let x = xStart
    const els: JSX.Element[] = []
    for (const [w, count] of pairs) {
        for (let i = 0; i < count; i++) {
            const plateW = width(w)
            x += dir * plateW
            els.push(<rect key={`${w}-${i}-${dir}`} x={x} y={40} width={plateW} height={40} rx={4} fill={color(w)} />)
            x += dir * 2
        }
    }
    return els
}
