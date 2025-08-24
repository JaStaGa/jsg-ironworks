import posts from "../(data)/posts.json"
import Link from "next/link"

export const metadata = {
    title: "Blog | JSG Ironworks Training",
    alternates: { canonical: "https://jsg-ironworks.vercel.app/blog" },
}

export default function Page() {
    return (
        <section className="mx-auto max-w-4xl py-12">
            <h1 className="text-3xl font-semibold mb-6">Blog</h1>
            <ul className="space-y-6">
                {posts.map((p) => (
                    <li key={p.slug} className="border-b border-steel pb-6">
                        <Link href={`/blog/${p.slug}`} className="text-xl font-semibold hover:text-safety">{p.title}</Link>
                        <p className="text-zinc-400 text-sm mt-1">{p.excerpt}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}
