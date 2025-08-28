export const metadata = {
    title: "Book | JSG Ironworks Training",
    alternates: { canonical: "https://jsg-ironworks.vercel.app/book" },
}

const CAL_URL = "https://cal.com/" // put your username or event link, e.g. "https://cal.com/jsg/consult"

export default function Page() {
    return (
        <section className="mx-auto max-w-4xl py-12">
            <h1 className="text-3xl font-semibold mb-4">Book a session</h1>

            {/* Theme-matched shell */}
            <div className="card p-0 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-steel">
                    <span className="text-sm text-zinc-300">Scheduling via Cal.com</span>
                    <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-safety hover:opacity-90">
                        Open in new tab
                    </a>
                </div>

                <div className="aspect-[4/3] w-full">
                    <iframe
                        title="Cal booking"
                        src={CAL_URL}
                        className="w-full h-full"
                        allow="clipboard-read; clipboard-write; geolocation"
                        loading="lazy"
                    />
                </div>

                {/* Fallback */}
                <div className="px-4 py-3 border-t border-steel text-sm text-zinc-400">
                    Having trouble loading?{" "}
                    <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="text-safety">
                        Book on Cal.com
                    </a>
                    .
                </div>
            </div>
        </section>
    )
}
