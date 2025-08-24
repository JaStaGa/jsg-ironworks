import data from "../(data)/pricing.json"

export const metadata = {
    title: "Pricing | JSG Ironworks Training",
    alternates: { canonical: "https://jsg-ironworks.vercel.app/pricing" },
}

type TierId = "basic" | "plus" | "pro"
type Tier = { id: TierId; name: string; price: number; period: string; features: string[] }
type CompareRow = { feature: string } & Partial<Record<TierId, boolean>>
type Pricing = { tiers: Tier[]; compare: CompareRow[] }

const pricing = data as Pricing

export default function Page() {
    return (
        <section className="mx-auto max-w-6xl py-12">
            <h1 className="text-3xl font-semibold mb-6">Pricing</h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pricing.tiers.map((t) => (
                    <article key={t.id} className="rounded-2xl border border-steel p-5">
                        <h2 className="text-lg font-semibold">{t.name}</h2>
                        <div className="mt-2 text-3xl font-bold text-safety">
                            ${t.price}<span className="text-sm text-zinc-400">/{t.period}</span>
                        </div>
                        <ul className="mt-4 space-y-2 text-sm text-zinc-300 list-disc ml-5">
                            {t.features.map((f, i) => <li key={i}>{f}</li>)}
                        </ul>
                    </article>
                ))}
            </div>

            <h2 className="text-xl font-semibold mt-12 mb-4">Compare</h2>
            <div className="overflow-x-auto rounded-xl border border-steel">
                <table className="min-w-[700px] w-full text-sm">
                    <thead>
                        <tr className="bg-zinc-950">
                            <th className="text-left p-3">Feature</th>
                            {pricing.tiers.map((t) => <th key={t.id} className="p-3">{t.name}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {pricing.compare.map((row, i) => (
                            <tr key={i} className="border-t border-steel">
                                <td className="p-3 text-zinc-300">{row.feature}</td>
                                {pricing.tiers.map((t) => {
                                    const v = row[t.id] ?? false
                                    return <td key={t.id} className="p-3">{v ? "✔︎" : "—"}</td>
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
