"use client"
import Image from "next/image"
import { useState } from "react"

export type Stage = { label: string; src: string }

export default function TransformTimeline({
    base,
    stages
}: { base: string; stages: Stage[] }) {
    const [i, setI] = useState(0)
    const [diff, setDiff] = useState(false)
    const active = stages[i]

    return (
        <div className="rounded-2xl border border-zinc-800 p-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl ring-1 ring-zinc-800">
                {/* Base */}
                <Image src={base} alt="Start" fill className="object-cover" />
                {/* Active stage */}
                <Image
                    src={active.src}
                    alt={active.label}
                    fill
                    className={`object-cover transition-opacity duration-150 ${diff ? "mix-blend-difference" : ""}`}
                    style={diff ? { opacity: 1 } : { opacity: 1 }}
                />
            </div>

            <div className="mt-4 grid gap-3">
                <input
                    aria-label="Timeline"
                    type="range"
                    min={0}
                    max={stages.length - 1}
                    value={i}
                    onChange={(e) => setI(parseInt(e.target.value))}
                    className="h-1 w-full appearance-none rounded bg-zinc-700"
                />
                <div className="flex flex-wrap gap-2">
                    {stages.map((s, idx) => (
                        <button
                            key={s.label}
                            onClick={() => setI(idx)}
                            className={`rounded-md border px-2 py-1 text-xs ${idx === i ? "border-safety text-safety" : "border-zinc-700 text-zinc-300 hover:border-zinc-500"
                                }`}
                        >
                            {s.label}
                        </button>
                    ))}
                    <label className="ml-auto inline-flex items-center gap-2 text-xs text-zinc-300">
                        <input type="checkbox" checked={diff} onChange={(e) => setDiff(e.target.checked)} />
                        Diff overlay
                    </label>
                </div>
            </div>
        </div>
    )
}
