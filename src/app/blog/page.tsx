import posts from "../(data)/posts.json"
import PostCard from "@/components/PostCard"

export const metadata = {
    title: "Blog | JSG Ironworks Training",
    alternates: { canonical: "https://jsg-ironworks.vercel.app/blog" },
}

export default function Page() {
    return (
        <section className="mx-auto max-w-4xl py-12">
            <h1 className="text-3xl font-semibold mb-6">Blog</h1>
            <div className="grid gap-6">
                {posts.map((p) => (
                    <PostCard key={p.slug} post={p as any} />
                ))}
            </div>
        </section>
    )
}
