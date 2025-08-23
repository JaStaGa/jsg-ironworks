export function GET() {
    return new Response(
        `User-agent: *
Allow: /
Sitemap: https://jsg-ironworks.vercel.app/sitemap.xml
`, { headers: { "Content-Type": "text/plain" } })
}
