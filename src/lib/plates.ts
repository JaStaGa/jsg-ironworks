export type Unit = "lb" | "kg"
export type Pair = [number, number] // [plateWeight, perSideCount]

export function roundToIncrement(x: number, inc: number) {
    return Math.round(x / inc) * inc
}

/** Compute per-side plate pairs. opts.fractions=false removes 2.5 lb (or 1.25 kg). */
export function platePairs(
    total: number,
    unit: Unit,
    barWeight = unit === "lb" ? 45 : 20,
    opts?: { fractions?: boolean }
): Pair[] {
    const useFrac = opts?.fractions !== false
    const avail = unit === "lb"
        ? [55, 45, 35, 25, 10, 5, ...(useFrac ? [2.5] as number[] : [])]
        : [25, 20, 15, 10, 5, 2.5, ...(useFrac ? [1.25] as number[] : [])]
    let perSide = (total - barWeight) / 2
    const out: Pair[] = []
    for (const p of avail) {
        const cnt = Math.floor(perSide / p)
        if (cnt > 0) { out.push([p, cnt]); perSide -= cnt * p }
    }
    return out
}
