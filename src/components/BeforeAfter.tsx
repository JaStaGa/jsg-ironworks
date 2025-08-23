"use client"
import Image from "next/image"
import { useState } from "react"

export default function BeforeAfter({ before, after, alt = "Result" }: {
    before: string; after: string; alt?: string
}) {
    const [v, setV] = useState(50)
    return (
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl ring-1 ring-zinc-800">
            <Image src={after} alt={`${alt} after`} fill className="object-cover" />
            <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - v}% 0 0)` }}>
                <Image src={before} alt={`${alt} before`} fill className="object-cover" />
            </div>
            <input
                aria-label="Before after slider"
                type="range" min={0} max={100} value={v} onChange={(e) => setV(parseInt(e.target.value))}
                className="absolute inset-x-4 bottom-4 appearance-none h-1 bg-zinc-700 rounded outline-none"
            />
        </div>
    )
}
