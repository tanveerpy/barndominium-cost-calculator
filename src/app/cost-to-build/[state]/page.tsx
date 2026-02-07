import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import regions from "@/data/regions.json";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubmitBuild } from "@/components/forms/SubmitBuild";

// Helper to slugify state names (e.g., "New York" -> "new-york")
const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

// 1. Generate Static Params for all 50 states
export async function generateStaticParams() {
    return regions.map((region) => ({
        state: toSlug(region.name),
    }));
}

// 2. Dynamic Metadata
export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
    const { state } = await params;
    const region = regions.find(r => toSlug(r.name) === state);

    if (!region) return { title: "Barndominium Cost Calculator" };

    return {
        title: `Cost to Build a Barndominium in ${region.name} | 2025 Calculator`,
        description: `Calculate the cost to build a barndominium in ${region.name}. Get accurate estimates for ${region.name} labor rates, materials, and floor plans.`,
        keywords: [`barndominium cost ${region.name}`, `build barndominium ${region.name}`, `metal building prices ${region.name}`]
    };
}

// 3. Page Component
export default async function StateCostPage({ params }: { params: Promise<{ state: string }> }) {
    const { state } = await params;
    const region = regions.find(r => toSlug(r.name) === state);

    if (!region) {
        notFound();
    }

    return (
        <div className="space-y-8">
            <section className="text-center space-y-4 py-8">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Barndominium Cost in <span className="text-primary">{region.name}</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Accurate 2025 estimates for {region.name}, adjusted for local labor rates (Index: {region.multiplier}x) and regulation factors.
                </p>
            </section>

            <CalculatorContainer initialInputs={{ state: region.code }} />

            <section className="container max-w-4xl mx-auto prose dark:prose-invert py-12">
                <h3>Why Build a Barndominium in {region.name}?</h3>
                <p>
                    Building a barndominium in {region.name} offers a unique blend of affordability and durability.
                    With a regional cost index of <strong>{region.multiplier}x</strong> the national average,
                    {region.multiplier < 1 ? "you can expect to save significantly on labor and foundation costs compared to other states." : "costs are slightly higher due to local demand and labor rates, but the longevity of steel structures pays off."}
                </p>
                <ul>
                    <li><strong>Foundation:</strong> {region.name} soil conditions may require specific slab reinforcements.</li>
                    <li><strong>Insulation:</strong> {region.multiplier > 1.1 ? "Higher insulation specs recommended for local climate." : "Standard insulation is typically sufficient."}</li>
                    <li><strong>Permitting:</strong> Check with your specific county in {region.name} as rural vs city limits vary.</li>
                </ul>
            </section>

            <section id="submit-build" className="max-w-4xl mx-auto pb-12">
                <SubmitBuild />
            </section>
        </div>
    );
}
