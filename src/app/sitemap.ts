import posts from "./(data)/posts.json"

export default function sitemap() {
    const base = "https://jsg-ironworks.vercel.app"
    const routes = ["", "/programs", "/pricing", "/blog", "/book"].map((r) => ({
        url: `${base}${r || "/"}`,
        lastModified: new Date(),
    }))
    const blog = (posts as { slug: string }[]).map((p) => ({
        url: `${base}/blog/${p.slug}`,
        lastModified: new Date(),
    }))
    return [...routes, ...blog]
}
