export type Unit = "lb" | "kg"
export type Pair = [number, number] // [plateWeight, perSideCount]

export function roundToIncrement(x: number, inc: number) {
    return Math.round(x / inc) * inc
}

export function platePairs(total: number, unit: Unit, barWeight = unit === "lb" ? 45 : 20): Pair[] {
    const avail = unit === "lb" ? [55, 45, 35, 25, 10, 5, 2.5] : [25, 20, 15, 10, 5, 2.5, 1.25]
    let perSide = (total - barWeight) / 2
    const out: Pair[] = []
    for (const p of avail) {
        const cnt = Math.floor(perSide / p)
        if (cnt > 0) { out.push([p, cnt]); perSide -= cnt * p }
    }
    // ignore tiny residue under smallest plate
    return out
}
