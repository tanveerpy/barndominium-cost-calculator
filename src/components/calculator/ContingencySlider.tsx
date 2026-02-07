import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, AlertTriangle } from "lucide-react";
import { type CalculatorInputs } from "@/types/calculator";

interface ContingencySliderProps {
    value: number;
    onChange: (value: number) => void;
}

export function ContingencySlider({ value, onChange }: ContingencySliderProps) {
    // Value is a percentage, e.g., 5, 10, 20

    return (
        <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                <div className="p-2 w-fit rounded-md bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400">
                    <TrendingUp className="h-5 w-5" />
                </div>
                <div className="flex-1">
                    <CardTitle className="text-lg">Market Volatility Buffer</CardTitle>
                    <p className="text-sm text-muted-foreground">Lumber & Steel prices fluctuate. Be prepared.</p>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium">Contingency Fund: {value}%</label>
                            <span className="text-xl font-bold font-mono text-orange-600">
                                {value === 0 ? "Risky" : value + "%"}
                            </span>
                        </div>

                        <input
                            type="range"
                            min="0"
                            max="30"
                            step="5"
                            value={value}
                            onChange={(e) => onChange(Number(e.target.value))}
                            className="w-full accent-orange-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />

                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>0% (Tight)</span>
                            <span>15% (Recommended)</span>
                            <span>30% (Safe)</span>
                        </div>
                    </div>

                    {value < 10 && (
                        <div className="flex items-center gap-2 p-3 rounded-md bg-red-50 text-red-800 text-sm dark:bg-red-900/20 dark:text-red-400 border border-red-100 dark:border-red-900">
                            <AlertTriangle className="h-4 w-4" />
                            <span>Experts recommend at least 10% for barndominium builds due to supply chain variances.</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
