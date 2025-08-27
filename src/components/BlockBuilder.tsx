"use client"
import { useEffect, useMemo, useState } from "react"

type Block = {
    id: string
    name: "Base" | "Build" | "Peak" | (string & {})
    weeks: number
    sets: number
    reps: number
    rpe: number
}

const DEFAULTS: Block[] = [
    { id: "base", name: "Base", weeks: 4, sets: 4, reps: 8, rpe: 6.5 },
    { id: "build", name: "Build", weeks: 4, sets: 5, reps: 5, rpe: 7.5 },
    { id: "peak", name: "Peak", weeks: 2, sets: 3, reps: 2, rpe: 8.5 },
]

function encodePlan(b: Block[]) { return btoa(unescape(encodeURIComponent(JSON.stringify(b)))) }
function decodePlan(s: string): Block[] | null {
    try { return JSON.parse(decodeURIComponent(escape(atob(s)))) as Block[] } catch { return null }
}

export default function BlockBuilder() {
    const [blocks, setBlocks] = useState<Block[]>(DEFAULTS)

    // import from ?plan=
    useEffect(() => {
        if (typeof window === "undefined") return
        const url = new URL(window.location.href)
        const plan = url.searchParams.get("plan")
        if (plan) {
            const parsed = decodePlan(plan)
            if (parsed?.length) setBlocks(parsed.map(b => ({ ...b, id: b.id || crypto.randomUUID() })))
        }
    }, [])

    const totalWeeks = useMemo(() => blocks.reduce((a, b) => a + (b.weeks || 0), 0), [blocks])

    function update(idx: number, patch: Partial<Block>) {
        setBlocks(prev => prev.map((b, i) => i === idx ? { ...b, ...patch } : b))
    }

    // DnD (HTML5)
    function onDragStart(e: React.DragEvent, from: number) { e.dataTransfer.setData("text/plain", String(from)) }
    function onDrop(e: React.DragEvent, to: number) {
        e.preventDefault()
        const from = Number(e.dataTransfer.getData("text/plain"))
        if (Number.isNaN(from) || from === to) return
        setBlocks(prev => {
            const next = [...prev]
            const [mv] = next.splice(from, 1)
            next.splice(to, 0, mv)
            return next
        })
    }

    function copyJSON() {
        navigator.clipboard.writeText(JSON.stringify(blocks, null, 2))
    }
    function copyLink() {
        const url = new URL(window.location.href)
        url.searchParams.set("plan", encodePlan(blocks))
        navigator.clipboard.writeText(url.toString())
    }

    return (
        <div className="card p-5">
            <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">Block builder</h2>
                <div className="text-xs text-zinc-500">Total: <span className="num text-zinc-300">{totalWeeks}</span> weeks</div>
            </div>

            <div className="mt-4 grid gap-3">
                {blocks.map((b, i) => (
                    <div
                        key={b.id}
                        className="block-row"
                        draggable
                        onDragStart={(e) => onDragStart(e, i)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => onDrop(e, i)}
                        aria-grabbed="false"
                    >
                        <div className={`block-chip ${b.name.toLowerCase()}`}>{b.name}</div>

                        <label className="ci">
                            <span>Weeks</span>
                            <input
                                type="number" min={1} max={12}
                                value={b.weeks}
                                onChange={(e) => update(i, { weeks: Number(e.target.value) || 0 })}
                            />
                        </label>

                        <label className="ci">
                            <span>Sets</span>
                            <input
                                type="number" min={1} max={8}
                                value={b.sets}
                                onChange={(e) => update(i, { sets: Number(e.target.value) || 0 })}
                            />
                        </label>

                        <label className="ci">
                            <span>Reps</span>
                            <input
                                type="number" min={1} max={15}
                                value={b.reps}
                                onChange={(e) => update(i, { reps: Number(e.target.value) || 0 })}
                            />
                        </label>

                        <label className="ci">
                            <span>RPE</span>
                            <input
                                type="number" step="0.5" min={5} max={10}
                                value={b.rpe}
                                onChange={(e) => update(i, { rpe: Number(e.target.value) || 0 })}
                            />
                        </label>

                        <div className="drag-handle" aria-label="Drag to reorder">↕</div>
                    </div>
                ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                <button className="rounded-md border border-steel px-3 py-1 text-sm" onClick={() => setBlocks(DEFAULTS)}>Reset</button>
                <button className="rounded-md border border-steel px-3 py-1 text-sm" onClick={copyJSON}>Export JSON</button>
                <button className="btn-cta text-sm" onClick={copyLink}>Copy share link</button>
            </div>
        </div>
    )
}
