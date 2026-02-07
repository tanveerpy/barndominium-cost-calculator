import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Methodology | Barndominium Cost Calculator",
    description: "Understand how we calculate barndominium costs using real-time market trends, RSMeans data, and regional labor rates.",
};

export default function MethodologyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Our Calculation Methodology</h1>

            <div className="prose dark:prose-invert max-w-none space-y-8">
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Data Sources</h2>
                    <p>
                        Our estimates are derived from a combination of real-time market data, construction industry standards (RSMeans), and user-submitted project costs.
                        We update our database quarterly to reflect fluctuations in steel, lumber, and concrete prices.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Regional Cost Factors</h2>
                    <p>
                        Construction costs vary significantly by location. We apply a <strong>Regional Cost Index (RCI)</strong> to every estimate based on your state.
                        This index accounts for:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Labor Rates:</strong> Union vs. non-union wages and local labor availability.</li>
                        <li><strong>Material Transport:</strong> Proximity to major supply hubs and steel manufacturers.</li>
                        <li><strong>Regulation:</strong> Permitting fees, snow load requirements (North), and wind load standards (South/Coastal).</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Cost Breakdown Logic</h2>
                    <div className="grid md:grid-cols-2 gap-6 mt-4">
                        <div className="p-4 border rounded-lg bg-card">
                            <h3 className="font-bold mb-2">Foundation</h3>
                            <p className="text-sm text-muted-foreground">
                                Calculated based on a 4" reinforced concrete slab with perimeter footings.
                                We assume level grade; strictly sloped land will incur additional site work costs not included here.
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg bg-card">
                            <h3 className="font-bold mb-2">Shell (Kit)</h3>
                            <p className="text-sm text-muted-foreground">
                                Includes the primary framing (wood post-frame or red iron steel), metal siding, roofing, trim, and doors/windows.
                                Shell costs are heavily influenced by the chosen material quality.
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg bg-card">
                            <h3 className="font-bold mb-2">Interior Finishing</h3>
                            <p className="text-sm text-muted-foreground">
                                The most variable cost. Our "Standard" tier assumes drywall, LVP flooring, and laminate countertops.
                                "Luxury" upgrades to hardwoods, stone, and custom cabinetry.
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg bg-card">
                            <h3 className="font-bold mb-2">Labor Strategy</h3>
                            <p className="text-sm text-muted-foreground">
                                We discount labor costs by ~15-20% for "Self-Managed" projects and up to 40% for "DIY" (materials only),
                                assuming you perform the work correctly without rework.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
