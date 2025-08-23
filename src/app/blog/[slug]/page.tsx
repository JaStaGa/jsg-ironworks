import posts from "../../(data)/posts.json"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
    return posts.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
    const post = posts.find((p) => p.slug === params.slug)
    if (!post) return {}
    return {
        title: `${post.title} | JSG Ironworks Training`,
        alternates: { canonical: `https://jsg-ironworks.vercel.app/blog/${post.slug}` },
    }
}

export default function Page({ params }: { params: { slug: string } }) {
    const post = posts.find((p) => p.slug === params.slug)
    if (!post) notFound()
    return (
        <article className="mx-auto max-w-3xl py-12 prose prose-invert">
            <h1>{post.title}</h1>
            <p className="text-zinc-400">{post.date}</p>
            <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
            <script type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        headline: post.title,
                        datePublished: post.date,
                        author: [{ "@type": "Person", name: "JSG Ironworks" }],
                    })
                }}
            />
        </article>
    )
}
