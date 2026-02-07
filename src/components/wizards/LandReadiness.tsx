import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type CalculatorInputs } from "@/types/calculator";

interface LandReadinessProps {
    updateInput: (key: keyof CalculatorInputs, value: any) => void;
    // Note: We might need to extend CalculatorInputs/State to include these new fields
    // For now, I'll create a local interface unless I update the global types
}

export function LandReadiness() {
    // Placeholder architecture
    // This needs to:
    // 1. Ask about Permits ($2k-$15k)
    // 2. Ask about Utilities (Well/Septic vs City)
    // 3. Ask about Clearing

    return (
        <Card className="border-l-4 border-l-yellow-500">
            <CardHeader>
                <CardTitle className="text-lg">Land Readiness & Soft Costs</CardTitle>
                <p className="text-sm text-muted-foreground">Often overlooked expenses that break budgets.</p>
            </CardHeader>
            <CardContent>
                <div className="text-sm text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md">
                    🚧 This module is under construction. It will calculate permit fees, septic installation ($5k-$15k), and well drilling costs based on your location.
                </div>
            </CardContent>
        </Card>
    )
}
