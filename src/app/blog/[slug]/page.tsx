import posts from "../../(data)/posts.json"
import { notFound } from "next/navigation"
import ReadingProgress from "@/components/ReadingProgress"

export async function generateStaticParams() {
    return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = posts.find((p) => p.slug === slug)
    if (!post) return {}
    return {
        title: `${post.title} | JSG Ironworks Training`,
        alternates: { canonical: `https://jsg-ironworks.vercel.app/blog/${post.slug}` },
    }
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = posts.find((p) => p.slug === slug)
    if (!post) notFound()

    const d = new Date(post.date)
    const prettyDate = d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })

    return (
        <>
            <ReadingProgress />
            <article className="article mx-auto max-w-3xl py-12">
                <header className="mb-6">
                    <h1 className="text-3xl font-semibold leading-tight hanging">{post.title}</h1>
                    <p className="text-zinc-400 text-sm mt-2">{prettyDate}</p>
                </header>
                <div className="article-body" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
            </article>
        </>
    )
}
