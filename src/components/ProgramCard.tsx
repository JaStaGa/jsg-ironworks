"use client"

type Program = { slug: string; title: string; level: "Beginner" | "Intermediate" | "Advanced" | (string & {}); weeks: number; description: string }

export default function ProgramCard({ p }: { p: Program }) {
    const levelClass =
        p.level === "Beginner" ? "bg-zinc-700/70" :
            p.level === "Intermediate" ? "bg-zinc-600/70" :
                "bg-zinc-500/70"

    return (
        <article className="program-card card p-5 tilt-hover">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{p.title}</h2>
                <span className={`badge-diag ${levelClass}`}>{p.level}</span>
            </div>
            <p className="mt-2 text-sm text-zinc-400">{p.description}</p>
            <p className="mt-3 text-sm"><span className="text-zinc-400">Duration:</span> {p.weeks} weeks</p>
        </article>
    )
}
