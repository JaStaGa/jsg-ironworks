export const metadata = {
    title: "Book | JSG Ironworks Training",
    alternates: { canonical: "https://jsg-ironworks.vercel.app/book" },
}

export default function Page() {
    return (
        <section className="mx-auto max-w-4xl py-12">
            <h1 className="text-3xl font-semibold mb-4">Book a session</h1>
            <div className="aspect-[4/3] w-full rounded-xl overflow-hidden ring-1 ring-zinc-800">
                {/* Replace with your Cal.com link */}
                <iframe
                    title="Cal booking"
                    src="https://cal.com/"
                    className="w-full h-full"
                />
            </div>
        </section>
    )
}
