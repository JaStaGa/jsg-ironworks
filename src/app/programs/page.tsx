import programs from "../(data)/programs.json"
import ProgramCard from "@/components/ProgramCard"
import BlockBuilder from "@/components/BlockBuilder"

export const metadata = {
    title: "Programs | JSG Ironworks Training",
    alternates: { canonical: "https://jsg-ironworks.vercel.app/programs" },
}

type Program = { slug: string; title: string; level: "Beginner" | "Intermediate" | "Advanced" | (string & {}); weeks: number; description: string }
const list = programs as Program[]

export default function Page() {
    return (
        <section className="mx-auto max-w-6xl py-12">
            <h1 className="text-3xl font-semibold mb-6">Programs</h1>

            {/* Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {list.map((p) => <ProgramCard key={p.slug} p={p} />)}
            </div>

            {/* Builder */}
            <h2 className="text-xl font-semibold mt-12 mb-4">Design your block</h2>
            <BlockBuilder />
        </section>
    )
}
