import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle2 } from "lucide-react";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Barndominium Cost Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Calculate the cost to build a barndominium with regional accuracy.',
    featureList: [
      'Real-time cost estimation',
      'State-specific labor rates',
      'Material cost breakdown',
      'PDF quote generation'
    ]
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-12 text-center md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-4 max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-600">
          Determine the True Cost of Your Barndominium Build
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Stop guessing. Get granular, location-adjusted estimates that account for DIY vs. Pro labor, permits, and finishing costs.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Placeholder for CTA buttons */}
        <Link href="#calculator" className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          Start Calculating <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
        <Link href="/about" className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          Learn How It Works
        </Link>
      </div>

      <div className="grid gap-8 sm:grid-cols-3 text-left max-w-5xl w-full pt-12">
        <div className="flex flex-col gap-2 p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-2 w-fit rounded-full bg-primary/10 text-primary">
            <Calculator className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold">Granular Breakdown</h3>
          <p className="text-sm text-muted-foreground">Separate costs for Foundation, Shell, and Interiors. No generic "$150/sqft" estimates.</p>
        </div>
        <div className="flex flex-col gap-2 p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-2 w-fit rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold">DIY vs Pro Labor</h3>
          <p className="text-sm text-muted-foreground">Toggle between Self-Managed, DIY, or Full Contractor for every stage of the build.</p>
        </div>
        <div className="flex flex-col gap-2 p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-2 w-fit rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold">Regional Accuracy</h3>
          <p className="text-sm text-muted-foreground">Adjusts for local labor rates and material availability based on your state.</p>
        </div>
      </div>

      <div className="w-full text-left max-w-6xl mx-auto pt-16">
        <CalculatorContainer />
      </div>

      {/* FAQ Section */}
      <section className="w-full max-w-4xl mx-auto pt-24 pb-12 text-left">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="grid gap-6">
          <div className="border rounded-lg p-6 bg-card">
            <h3 className="font-semibold text-lg mb-2">How accurate is this calculator?</h3>
            <p className="text-muted-foreground">Our data is updated quarterly using regional labor rates and material indices. However, site-specific conditions (slope, soil) can vary costs by +/- 15%.</p>
          </div>
          <div className="border rounded-lg p-6 bg-card">
            <h3 className="font-semibold text-lg mb-2">Does this include land cost?</h3>
            <p className="text-muted-foreground">No. This estimate covers the structure, foundation, and interior build-out. Land acquisition, septic, and well systems are separate costs.</p>
          </div>
          <div className="border rounded-lg p-6 bg-card">
            <h3 className="font-semibold text-lg mb-2">Can I finance a barndominium?</h3>
            <p className="text-muted-foreground">Yes, but it can be harder than traditional homes. Look for lenders who offer "construction-to-permanent" loans specifically for post-frame buildings.</p>
          </div>
          <div className="border rounded-lg p-6 bg-card">
            <h3 className="font-semibold text-lg mb-2">Is a barndominium cheaper than a stick-built home?</h3>
            <p className="text-muted-foreground">Generally, yes. You can save 10-20% on the shell structure. However, high-end interior finishes can close that gap quickly.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
