import pricing from "../(data)/pricing.json"

export const metadata = {
    title: "Pricing | JSG Ironworks Training",
    alternates: { canonical: "https://jsg-ironworks.vercel.app/pricing" },
}

export default function Page() {
    return (
        <section className="mx-auto max-w-6xl py-12">
            <h1 className="text-3xl font-semibold mb-6">Pricing</h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pricing.tiers.map((t: any) => (
                    <article key={t.id} className="rounded-2xl border border-zinc-800 p-5">
                        <h2 className="text-lg font-semibold">{t.name}</h2>
                        <div className="mt-2 text-3xl font-bold text-safety">${t.price}<span className="text-sm text-zinc-400">/{t.period}</span></div>
                        <ul className="mt-4 space-y-2 text-sm text-zinc-300 list-disc ml-5">
                            {t.features.map((f: string, i: number) => <li key={i}>{f}</li>)}
                        </ul>
                    </article>
                ))}
            </div>

            <h2 className="text-xl font-semibold mt-12 mb-4">Compare</h2>
            <div className="overflow-x-auto rounded-xl border border-zinc-800">
                <table className="min-w-[700px] w-full text-sm">
                    <thead>
                        <tr className="bg-zinc-950">
                            <th className="text-left p-3">Feature</th>
                            {pricing.tiers.map((t: any) => <th key={t.id} className="p-3">{t.name}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {pricing.compare.map((row: any, i: number) => (
                            <tr key={i} className="border-t border-zinc-800">
                                <td className="p-3 text-zinc-300">{row.feature}</td>
                                {pricing.tiers.map((t: any) => <td key={t.id} className="p-3">{row[t.id] ? "✔︎" : "—"}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
