import programs from "../(data)/programs.json"

export const metadata = {
    title: "Programs | JSG Ironworks Training",
    alternates: { canonical: "https://jsg-ironworks.vercel.app/programs" },
}

export default function Page() {
    return (
        <section className="mx-auto max-w-6xl py-12">
            <h1 className="text-3xl font-semibold mb-6">Programs</h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {programs.map((p) => (
                    <article key={p.slug} className="rounded-2xl border border-zinc-800 p-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">{p.title}</h2>
                            <span className="text-[11px] px-2 py-1 rounded-full border border-zinc-700 text-zinc-300">{p.level}</span>
                        </div>
                        <p className="mt-2 text-sm text-zinc-400">{p.description}</p>
                        <p className="mt-3 text-sm"><span className="text-zinc-400">Duration:</span> {p.weeks} weeks</p>
                    </article>
                ))}
            </div>
        </section>
    )
}
