import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import BeforeAfter from "@/components/BeforeAfter"
import OneRepMax from "@/components/OneRepMax"
import PrTracker from "@/components/PrTracker"
import LeadForm from "@/components/LeadForm"
import MobileStickyBook from "@/components/MobileStickyBook"
import results from "./(data)/results.json"

export default function Page() {
  return (
    <>
      <section className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-10 items-center py-16 lg:py-24">
        <div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">JSG Ironworks Training</h1>
          <p className="mt-4 text-zinc-400 max-w-xl">Build measurable strength. Track PRs. See results.</p>
          <div className="mt-8 flex gap-3">
            <Button asChild className="bg-safety text-black hover:opacity-90"><Link href="/book">Book a session</Link></Button>
            <Button asChild variant="outline" className="border-zinc-700 text-zinc-200 hover:bg-zinc-900"><Link href="/programs">View programs</Link></Button>
          </div>
          <ul className="mt-10 flex flex-wrap items-center gap-6 opacity-80">
            <li className="text-xs uppercase tracking-wider text-zinc-500">As seen on</li>
            <li className="h-6 w-20 bg-zinc-800 rounded" />
            <li className="h-6 w-20 bg-zinc-800 rounded" />
            <li className="h-6 w-20 bg-zinc-800 rounded" />
          </ul>
        </div>
        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden ring-1 ring-zinc-800">
          <Image src="/demo/after1.jpg" alt="Training" fill priority className="object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl py-12 border-t border-zinc-800">
        <h2 className="text-xl font-semibold mb-6">Transformations</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.slice(0, 6).map((r) => (
            <div key={r.id} className="rounded-xl border border-zinc-800 p-2">
              <BeforeAfter before={r.before} after={r.after} alt={r.title} />
              <div className="px-1 py-2 text-sm">
                <div className="font-medium">{r.title}</div>
                <div className="text-zinc-400">{r.notes}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl py-12 border-t border-zinc-800">
        <h2 className="text-xl font-semibold mb-6">Progress tools</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <OneRepMax />
          <PrTracker />
        </div>
      </section>

      <section className="mx-auto max-w-6xl py-12 border-t border-zinc-800">
        <div className="grid lg:grid-cols-2 gap-8">
          <LeadForm />
          <div className="rounded-2xl border border-zinc-800 p-5">
            <h3 className="text-lg font-semibold">Why Ironworks</h3>
            <p className="mt-2 text-zinc-400">Evidence-based programming. Consistent tracking. Clear results.</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300 list-disc ml-5">
              <li>Personalized meso-cycles</li>
              <li>PR tracking with weekly progression</li>
              <li>Technique feedback</li>
            </ul>
          </div>
        </div>
      </section>

      <script type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "JSG Ironworks Training",
            url: "https://jsg-ironworks.vercel.app",
            image: "/og.jpg",
            address: { "@type": "PostalAddress", addressLocality: "Boston", addressRegion: "MA", addressCountry: "US" }
          })
        }}
      />
      <div className="sm:hidden"><MobileStickyBook /></div>
    </>
  )
}
