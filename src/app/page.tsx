import HeroMetrics from "@/components/HeroMetrics"
import ResultTile from "@/components/ResultTile"
import OneRepMax from "@/components/OneRepMax"
import PrTracker from "@/components/PrTracker"
import PlateMath from "@/components/PlateMath"
import WarmupPlanner from "@/components/WarmupPlanner"
import LeadForm from "@/components/LeadForm"
import MobileStickyBook from "@/components/MobileStickyBook"
import StrengthTimelineGrid from "@/components/StrengthTimelineGrid"
import SessionHeatmap from "@/components/SessionHeatmap"
import faq from "./(data)/faq.json"
import BreadcrumbsJsonLd from "@/components/BreadcrumbsJsonLd"

export default function Page() {
  return (
    <>
      {/* Hero (image-light) */}
      {/* page.tsx */}
      <div className="steel-hatch-svg -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <HeroMetrics />
        </div>
      </div>

      {/* Progress summary */}
      <section className="mx-auto max-w-6xl py-8 steel-divider">
        <h2 className="text-xl font-semibold mb-6">Progress at a glance</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ResultTile
            title="Squat 1RM"
            delta="+25 lb"
            data={[{ w: "W1", v: 315 }, { w: "W2", v: 320 }, { w: "W3", v: 330 }, { w: "W4", v: 340 }]}
          />
          <ResultTile
            title="Bench 1RM"
            delta="+10 lb"
            data={[{ w: "W1", v: 225 }, { w: "W2", v: 230 }, { w: "W3", v: 232 }, { w: "W4", v: 235 }]}
          />
          <ResultTile
            title="Deadlift 1RM"
            delta="+40 lb"
            data={[{ w: "W1", v: 365 }, { w: "W2", v: 385 }, { w: "W3", v: 395 }, { w: "W4", v: 405 }]}
          />
        </div>
        <h2 className="text-xl font-semibold mb-6">Strength timeline</h2>
        <StrengthTimelineGrid />
        <h2 className="text-xl font-semibold mb-6">Sessions overview</h2>
        <SessionHeatmap />
      </section>

      {/* Training tools */}
      <section className="mx-auto max-w-6xl py-12 steel-divider">
        <h2 className="text-xl font-semibold mb-6">Training tools</h2>
        <div className="grid lg:grid-cols-3 gap-8">
          <OneRepMax />
          <PrTracker />
          <PlateMath />
        </div>
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <WarmupPlanner />
          <div className="card p-5">
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

      {/* Lead + CTA */}
      <section className="mx-auto max-w-6xl py-12 steel-divider">
        <div className="grid lg:grid-cols-2 gap-8">
          <LeadForm />
          <div className="card p-5">
            <h3 className="text-lg font-semibold">Questions?</h3>
            <p className="mt-2 text-zinc-400">Book a free call to see if we’re a fit.</p>
            <a href="/book" className="inline-block mt-4 rounded-lg px-4 py-2 bg-safety text-black font-medium">Book</a>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "JSG Ironworks Training",
            url: "https://jsg-ironworks.vercel.app",
            image: "/og.jpg",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Boston",
              addressRegion: "MA",
              addressCountry: "US",
            },
          }),
        }}
      />

      {/* FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: (faq as { q: string; a: string }[]).map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
      
      {/* Breadcrumbs: Home */}
      <BreadcrumbsJsonLd
        items={[{ name: "Home", url: "https://jsg-ironworks.vercel.app/" }]}
      />
      <div className="sm:hidden"><MobileStickyBook /></div>
    </>
  )
}
