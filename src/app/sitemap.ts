export default function sitemap() {
    const base = "https://jsg-ironworks.vercel.app"
    const routes = ["", "/programs", "/pricing", "/blog", "/book"].map((r) => ({
        url: `${base}${r || "/"}`,
        lastModified: new Date(),
    }))
    return routes
}
