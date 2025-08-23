export default function Footer() {
    return (
        <footer className="mt-16 border-t border-zinc-800">
            <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-zinc-400">
                <p className="mb-2">© {new Date().getFullYear()} JSG Ironworks Training</p>
                <p className="max-w-3xl">
                    Demo site for portfolio. No affiliation. Do not submit sensitive information.
                </p>
            </div>
        </footer>
    )
}
