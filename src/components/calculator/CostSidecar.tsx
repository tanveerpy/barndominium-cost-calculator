import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type CostBreakdown, type SavedScenario, type CalculatorInputs } from "@/types/calculator";
import { cn, formatCurrency } from "@/lib/utils";
import { ScenarioComparison } from "./ScenarioComparison";
import { generateQuotePDF } from "@/lib/pdfGenerator";
import { Download } from "lucide-react";

interface CostSidecarProps {
    breakdown: CostBreakdown;
    inputs: CalculatorInputs;
    onSave?: () => void;
    savedCount?: number;
    savedScenarios?: SavedScenario[];
}

export function CostSidecar({ breakdown, inputs, onSave, savedCount = 0, savedScenarios = [] }: CostSidecarProps) {
    return (
        <Card className="sticky top-24 w-full h-fit border-l-4 border-l-primary shadow-md bg-stone-50 dark:bg-slate-900/50 backdrop-blur">
            <CardHeader className="bg-muted/50 pb-4">
                <CardTitle className="text-xl">Estimated Cost</CardTitle>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Live Quote</p>

                <button
                    onClick={() => generateQuotePDF(inputs, breakdown)}
                    className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-primary transition-colors"
                    title="Download PDF Quote"
                >
                    <Download className="h-5 w-5" />
                </button>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                    <Row label="Foundation" value={breakdown.foundation} />
                    <Row label="Shell Structure" value={breakdown.shell} />
                    <Row label="Interior Build" value={breakdown.interior} />
                    {breakdown.contingencyValue > 0 && (
                        <Row label="Contingency Buffer" value={breakdown.contingencyValue} className="text-orange-600 font-semibold" />
                    )}
                </div>

                <div className="h-px bg-border my-4" />

                <div className="flex justify-between items-end">
                    <span className="font-bold text-lg">Total Estimate</span>
                    <span className="font-mono text-2xl font-bold text-primary">
                        {formatCurrency(breakdown.total)}
                    </span>
                </div>

                <div className="mt-4 rounded-md bg-emerald-100/50 p-3 text-xs text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400">
                    <span className="font-bold">Pro Tip:</span> DIY Management saves approx. <b>{formatCurrency(breakdown.laborCost * 0.15)}</b> on this build.
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                    <button
                        onClick={() => {
                            console.log("Save Comparison clicked");
                            generateQuotePDF(inputs, breakdown);
                            if (onSave) onSave();
                        }}
                        className="bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 px-4 py-2 rounded-md text-sm font-medium transition-colors border border-input shadow-sm"
                    >
                        Save Comparison
                    </button>

                    <ScenarioComparison savedScenarios={savedScenarios} currentBreakdown={breakdown}>
                        <button
                            disabled={savedCount === 0}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full shadow-sm"
                        >
                            Compare ({savedCount})
                        </button>
                    </ScenarioComparison>
                </div>
            </CardContent>
        </Card>
    );
}

function Row({ label, value, className }: { label: string, value: number, className?: string }) {
    return (
        <div className={cn("flex justify-between text-sm", className)}>
            <span className={cn("text-muted-foreground", className ? "text-orange-700/80" : "")}>{label}</span>
            <span className="font-mono font-medium">{formatCurrency(value)}</span>
        </div>
    )
}
