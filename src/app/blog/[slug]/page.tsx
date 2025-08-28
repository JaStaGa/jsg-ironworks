import posts from "../../(data)/posts.json"
import { notFound } from "next/navigation"
import ReadingProgress from "@/components/ReadingProgress"
import BreadcrumbsJsonLd from "@/components/BreadcrumbsJsonLd"

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

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = posts.find((p) => p.slug === slug)
    if (!post) notFound()

    const d = new Date(post.date)
    const prettyDate = d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })

    const articleLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        datePublished: post.date,
        mainEntityOfPage: `https://jsg-ironworks.vercel.app/blog/${post.slug}`,
        author: [{ "@type": "Person", name: "JSG Ironworks" }],
        image: ["https://jsg-ironworks.vercel.app/og.jpg"],
        publisher: { "@type": "Organization", name: "JSG Ironworks Training" },
    }

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

            {/* JSON-LD: Article */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
            {/* JSON-LD: Breadcrumbs */}
            <BreadcrumbsJsonLd
                items={[
                    { name: "Home", url: "https://jsg-ironworks.vercel.app/" },
                    { name: "Blog", url: "https://jsg-ironworks.vercel.app/blog" },
                    { name: post.title, url: `https://jsg-ironworks.vercel.app/blog/${post.slug}` },
                ]}
            />
        </>
    )
}
