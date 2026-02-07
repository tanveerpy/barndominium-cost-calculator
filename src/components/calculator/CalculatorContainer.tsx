'use client';

import { useCalculator } from "@/hooks/useCalculator";
import { CostSidecar } from "./CostSidecar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Hammer, Home, Ruler, MapPin } from "lucide-react";
import { type CalculatorInputs, type CostBreakdown } from "@/types/calculator";
import { LandReadiness } from "@/components/wizards/LandReadiness";
import { ContingencySlider } from "./ContingencySlider";
import { CostBreakdownChart } from "./CostBreakdownChart";
import { SustainabilityScore } from "./SustainabilityScore";
import regions from "@/data/regions.json";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import { type SavedScenario } from "@/types/calculator";

export function CalculatorContainer({ initialInputs }: { initialInputs?: Partial<CalculatorInputs> }) {
    const { inputs, breakdown, updateInput } = useCalculator(initialInputs);

    // Scenario State
    const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);

    const saveScenario = () => {
        const newScenario: SavedScenario = {
            id: crypto.randomUUID(),
            name: `Quote #${savedScenarios.length + 1}`,
            date: new Date().toLocaleDateString(),
            inputs: { ...inputs }, // Snapshot
            breakdown: { ...breakdown } // Snapshot
        };
        setSavedScenarios([...savedScenarios, newScenario]);
        toast.success("Quote saved to comparison list");
    };

    return (
        <section id="calculator" className="container py-12">
            <div className="grid gap-8 lg:grid-cols-3">
                {/* Main Input Area (Wizard-like) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="mb-4">
                        <h2 className="text-3xl font-bold tracking-tight">Build Configuration</h2>
                        <p className="text-muted-foreground">Adjust the specifications to match your project.</p>
                    </div>

                    {/* 0. Location (Critical for Phase 3) */}
                    <Card className="border-l-4 border-l-primary">
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                            <div className="p-2 w-fit rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400">
                                <MapPin className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <CardTitle className="text-lg">Project Location</CardTitle>
                                <p className="text-sm text-muted-foreground">Labor rates and regulation data.</p>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <select
                                value={inputs.state}
                                onChange={(e) => updateInput('state', e.target.value)}
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            >
                                {regions.map((region) => (
                                    <option key={region.code} value={region.code}>
                                        {region.name} ({region.code}) {region.multiplier !== 1 ? ` - Cost Index: ${region.multiplier}x` : ''}
                                    </option>
                                ))}
                            </select>
                        </CardContent>
                    </Card>

                    {/* 1. Dimensions */}
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                            <div className="p-2 w-fit rounded-md bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400">
                                <Ruler className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <CardTitle className="text-lg">Dimensions</CardTitle>
                                <p className="text-sm text-muted-foreground">Size matters. Impact on foundation is exponential.</p>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium">Square Footage: {inputs.sqFt} sq. ft.</label>
                                    <input
                                        type="range"
                                        min="800"
                                        max="5000"
                                        step="100"
                                        value={inputs.sqFt}
                                        onChange={(e) => updateInput('sqFt', Number(e.target.value))}
                                        className="w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                    />
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>800</span>
                                        <span>5000</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 2. Construction Type */}
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                            <div className="p-2 w-fit rounded-md bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400">
                                <Home className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <CardTitle className="text-lg">Shell & Structure</CardTitle>
                                <p className="text-sm text-muted-foreground">Wood vs Steel impacts longevity and cost.</p>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6 grid gap-4 sm:grid-cols-2">
                            <SelectCard
                                selected={inputs.shellType === 'postFrame'}
                                onClick={() => updateInput('shellType', 'postFrame')}
                                title="Post Frame (Wood)"
                                desc="Traditional pole barn. Lower upfront cost."
                            />
                            <SelectCard
                                selected={inputs.shellType === 'steel'}
                                onClick={() => updateInput('shellType', 'steel')}
                                title="Red Iron Steel"
                                desc="Industrial grade strength. Higher resistance."
                            />
                        </CardContent>
                    </Card>

                    {/* 3. Labor Strategy */}
                    <Card className="border-primary/20 bg-blue-50/50 dark:bg-blue-950/10">
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                            <div className="p-2 w-fit rounded-md bg-primary text-primary-foreground">
                                <Hammer className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <CardTitle className="text-lg">Labor Strategy</CardTitle>
                                <p className="text-sm text-muted-foreground">Who is building this?</p>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6 grid gap-2">
                            <LaborOption
                                active={inputs.laborType === 'pro'}
                                onClick={() => updateInput('laborType', 'pro')}
                                title="Turnkey Contractor"
                                cost="$$$"
                            />
                            <LaborOption
                                active={inputs.laborType === 'selfManaged'}
                                onClick={() => updateInput('laborType', 'selfManaged')}
                                title="Self-Managed (GC Yourself)"
                                cost="$$"
                            />
                            <LaborOption
                                active={inputs.laborType === 'diy'}
                                onClick={() => updateInput('laborType', 'diy')}
                                title="100% DIY (Materials Only)"
                                cost="$"
                            />
                        </CardContent>
                    </Card>

                    {/* 3b. Contingency Slider (Phase 3) */}
                    <ContingencySlider
                        value={inputs.contingency}
                        onChange={(val) => updateInput('contingency', val)}
                    />

                    {/* 4. Land Readiness (Phase 3) */}
                    <LandReadiness />

                    {/* 5. Sustainability (Phase 4) */}
                    <SustainabilityScore inputs={inputs} updateInput={updateInput} />

                    {/* 6. Visual Breakdown (Phase 4) */}
                    <CostBreakdownChart breakdown={breakdown} />

                </div>

                {/* Sidecar */}
                <div className="lg:col-span-1">
                    <CostSidecar
                        breakdown={breakdown}
                        inputs={inputs}
                        onSave={saveScenario}
                        savedCount={savedScenarios.length}
                        savedScenarios={savedScenarios}
                    />
                </div>
            </div>
        </section>
    );
}

function SelectCard({ selected, onClick, title, desc }: { selected: boolean, onClick: () => void, title: string, desc: string }) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "cursor-pointer rounded-lg border p-4 transition-all hover:border-primary",
                selected ? "border-primary bg-primary/5 ring-1 ring-primary" : "bg-card"
            )}
        >
            <div className="font-semibold">{title}</div>
            <div className="text-xs text-muted-foreground mt-1">{desc}</div>
        </div>
    )
}

function LaborOption({ active, onClick, title, cost }: { active: boolean, onClick: () => void, title: string, cost: string }) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "flex items-center justify-between cursor-pointer rounded-md border p-3 transition-all",
                active ? "border-primary bg-background ring-1 ring-primary shadow-sm" : "bg-transparent border-transparent hover:bg-background/50"
            )}
        >
            <span className="font-medium text-sm">{title}</span>
            <span className="font-mono text-xs font-bold text-muted-foreground">{cost}</span>
        </div>
    )
}
