import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | Barndominium Cost Calculator",
    description: "Learn about BarndoCalc's mission to democratize construction data. We help owner-builders plan their barndominium projects with transparency and accuracy.",
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
            <h1 className="text-4xl font-bold mb-6">Building Transparency</h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                We believe your dream build shouldn't start with a guessing game. Our mission is to democratize construction data for owner-builders.
            </p>

            <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="space-y-4">
                    <div className="h-48 bg-stone-100 rounded-lg flex items-center justify-center text-4xl">📊</div>
                    <h3 className="text-xl font-bold">Data Driven</h3>
                    <p className="text-muted-foreground">
                        We don't use "rule of thumb" numbers. Our calculator ingests thousands of data points to give you a realistic range.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="h-48 bg-stone-100 rounded-lg flex items-center justify-center text-4xl">🛠️</div>
                    <h3 className="text-xl font-bold">Builder Focused</h3>
                    <p className="text-muted-foreground">
                        Whether you're hiring a GC or swinging the hammer yourself, we provide the granularity you need to plan.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="h-48 bg-stone-100 rounded-lg flex items-center justify-center text-4xl">🔓</div>
                    <h3 className="text-xl font-bold">Open Access</h3>
                    <p className="text-muted-foreground">
                        Construction knowledge should be free. We provide high-level estimates at no cost to help you budget better.
                    </p>
                </div>
            </div>
        </div>
    );
}
