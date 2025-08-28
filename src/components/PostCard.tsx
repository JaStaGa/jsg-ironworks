import Link from "next/link"

type Post = {
    slug: string
    title: string
    date: string
    excerpt: string
    contentHtml?: string
}

function readingTime(html?: string) {
    if (!html) return 1
    const text = html.replace(/<[^>]+>/g, " ")
    const words = text.trim().split(/\s+/).filter(Boolean).length
    return Math.max(1, Math.round(words / 220)) // ~220 wpm
}

export default function PostCard({ post }: { post: Post }) {
    const d = new Date(post.date)
    const day = String(d.getDate()).padStart(2, "0")
    const mon = d.toLocaleString("en-US", { month: "short" })
    const year = d.getFullYear()
    const mins = readingTime(post.contentHtml)

    return (
        <article className="card p-5 tilt-hover">
            <Link
                href={`/blog/${post.slug}`}
                className="grid grid-cols-[72px,1fr] gap-4 items-start"
            >
                {/* Large date numerals (mono) */}
                <div className="text-center select-none">
                    <div className="num text-3xl font-semibold leading-none">{day}</div>
                    <div className="text-[11px] text-zinc-400 mt-1">{mon} {year}</div>
                </div>

                <div>
                    <h2 className="text-lg font-semibold leading-tight">{post.title}</h2>
                    {/* Steel rule divider */}
                    <div className="h-px my-3 bg-[var(--color-steel)]" />
                    <p className="text-sm text-zinc-400">{post.excerpt}</p>
                    <div className="mt-3 text-[11px] uppercase tracking-wide text-zinc-500">
                        ~{mins} min read
                    </div>
                </div>
            </Link>
        </article>
    )
}
