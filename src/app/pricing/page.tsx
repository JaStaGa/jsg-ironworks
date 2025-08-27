import data from "../(data)/pricing.json"
import PricingPlans, { type Pricing } from "@/components/PricingPlans"

export const metadata = {
    title: "Pricing | JSG Ironworks Training",
    alternates: { canonical: "https://jsg-ironworks.vercel.app/pricing" },
}

const pricing = data as Pricing

export default function Page() {
    return (
        <section className="mx-auto max-w-6xl py-12">
            <h1 className="text-3xl font-semibold mb-6">Pricing</h1>
            <PricingPlans pricing={pricing} />
        </section>
    )
}