'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Sun, Wind } from "lucide-react";
import { cn } from "@/lib/utils";
import { type CalculatorInputs } from "@/types/calculator";

interface SustainabilityScoreProps {
    inputs: CalculatorInputs;
    updateInput: (key: keyof CalculatorInputs, value: any) => void;
}

export function SustainabilityScore({ inputs, updateInput }: SustainabilityScoreProps) {
    const { sustainabilityLevel, sqFt, shellType } = inputs;

    // Calculate Score (0-10)
    // Base: 2
    // Level: +2.5 per level (up to +5) -> Max 7
    // Small footprint bonus: < 2000 sqft (+2)
    // Wood frame bonus: (+1) (Carbon sequestration) vs Steel
    let score = 2;
    score += sustainabilityLevel * 3;
    if (sqFt <= 2000) score += 2;
    if (sqFt <= 1200) score += 1;
    if (shellType === 'postFrame') score += 1;

    // Cap at 10
    score = Math.min(10, score);

    const getLevelInfo = (level: number) => {
        switch (level) {
            case 0: return { label: "Standard Code", desc: "Basic insulation & HVAC.", savings: "0%" };
            case 1: return { label: "High Efficiency", desc: "Spray foam, Low-E windows.", savings: "~20%" };
            case 2: return { label: "Net Zero Ready", desc: "Solar prep, geo-thermal, airtight.", savings: "~50%+" };
            default: return { label: "Standard", desc: "", savings: "0%" };
        }
    };

    const currentInfo = getLevelInfo(sustainabilityLevel);

    return (
        <Card className="border-green-100 dark:border-green-900 bg-gradient-to-br from-white to-green-50/50 dark:from-slate-950 dark:to-green-900/10">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                <div className="p-2 w-fit rounded-md bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400">
                    <Leaf className="h-5 w-5" />
                </div>
                <div className="flex-1">
                    <CardTitle className="text-lg">Energy & Sustainability</CardTitle>
                    <p className="text-sm text-muted-foreground">Invest in efficiency to lower long-term costs.</p>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-2xl font-bold font-mono text-green-700 dark:text-green-400">{score}/10</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">Eco Score</span>
                </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">

                {/* Level Selector */}
                <div className="grid grid-cols-3 gap-2">
                    {[0, 1, 2].map((level) => (
                        <button
                            key={level}
                            onClick={() => updateInput('sustainabilityLevel', level)}
                            className={cn(
                                "flex flex-col items-center justify-center p-3 rounded-lg border transition-all text-sm",
                                sustainabilityLevel === level
                                    ? "border-green-600 bg-green-50 text-green-800 ring-1 ring-green-600 dark:bg-green-900/30 dark:text-green-300"
                                    : "border-gray-200 hover:border-green-300 hover:bg-green-50/50 dark:border-gray-800 dark:hover:bg-green-900/20"
                            )}
                        >
                            <span className="font-semibold">{getLevelInfo(level).label}</span>
                        </button>
                    ))}
                </div>

                {/* Score Visuals */}
                <div className="bg-background/80 rounded-lg p-4 border border-green-100 dark:border-green-800/50 flex justify-between items-center">
                    <div className="space-y-1">
                        <div className="text-sm font-medium text-green-800 dark:text-green-300 flex items-center gap-2">
                            {sustainabilityLevel === 2 ? <Sun className="h-4 w-4" /> : <Wind className="h-4 w-4" />}
                            Predicted Energy Savings
                        </div>
                        <div className="text-xs text-muted-foreground">Based on {getLevelInfo(sustainabilityLevel).label} specs</div>
                    </div>
                    <div className="text-xl font-bold text-green-700 dark:text-green-400">
                        {currentInfo.savings}
                    </div>
                </div>

                {/* Progress Bar for Score */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-muted-foreground">
                        <span>Standard</span>
                        <span>High Performance</span>
                        <span>Passive House</span>
                    </div>
                    <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden dark:bg-gray-800">
                        <div
                            className="h-full bg-gradient-to-r from-emerald-400 to-green-600 transition-all duration-500 ease-out"
                            style={{ width: `${score * 10}%` }}
                        />
                    </div>
                </div>

            </CardContent>
        </Card>
    );
}
