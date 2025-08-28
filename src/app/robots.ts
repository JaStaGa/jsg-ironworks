// app/robots.ts
export default function robots() {
    return {
        rules: { userAgent: "*", allow: "/" },
        sitemap: "https://jsg-ironworks.vercel.app/sitemap.xml",
    }
}
