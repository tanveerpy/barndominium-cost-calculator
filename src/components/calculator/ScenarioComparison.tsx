'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type SavedScenario } from "@/types/calculator";
import { formatCurrency } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ScenarioComparisonProps {
    savedScenarios: SavedScenario[];
    currentBreakdown: any; // Type accurately
    children: React.ReactNode;
}

export function ScenarioComparison({ savedScenarios, currentBreakdown, children }: ScenarioComparisonProps) {
    if (savedScenarios.length === 0) return <>{children}</>;

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-6xl w-full max-h-[85vh] flex flex-col p-6">
                <DialogHeader>
                    <DialogTitle>Compare Estimates</DialogTitle>
                    <DialogDescription>
                        Analyze the cost difference between your saved configurations.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4 flex-1 overflow-auto border rounded-md relative" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <Table>
                        <TableHeader className="sticky top-0 bg-secondary z-10">
                            <TableRow>
                                <TableHead className="w-[200px]">Component</TableHead>
                                {savedScenarios.map((scenario) => (
                                    <TableHead key={scenario.id} className="text-right whitespace-nowrap">
                                        <div>{scenario.name}</div>
                                        <div className="text-xs font-normal text-muted-foreground">{scenario.date}</div>
                                    </TableHead>
                                ))}
                                <TableHead className="text-right font-bold text-primary bg-primary/5">Current Live Quote</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Square Footage</TableCell>
                                {savedScenarios.map((s) => (
                                    <TableCell key={s.id} className="text-right">{s.inputs.sqFt} sqft</TableCell>
                                ))}
                                <TableCell className="text-right font-bold bg-primary/5">{currentBreakdown.sqFt || '-'} sqft</TableCell> {/* Need to pass inputs for this */}
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Structure</TableCell>
                                {savedScenarios.map((s) => (
                                    <TableCell key={s.id} className="text-right capitalize">{s.inputs.shellType}</TableCell>
                                ))}
                                {/* Snapshot logic needed for current */}
                                <TableCell className="text-right font-bold bg-primary/5">-</TableCell>
                            </TableRow>

                            {/* Costs */}
                            <TableRow className="bg-muted/50">
                                <TableCell colSpan={savedScenarios.length + 2} className="py-2 text-xs font-semibold uppercase text-muted-foreground">Cost Breakdown</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Foundation</TableCell>
                                {savedScenarios.map((s) => (
                                    <TableCell key={s.id} className="text-right">{formatCurrency(s.breakdown.foundation)}</TableCell>
                                ))}
                                <TableCell className="text-right font-bold bg-primary/5">{formatCurrency(currentBreakdown.foundation)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Shell</TableCell>
                                {savedScenarios.map((s) => (
                                    <TableCell key={s.id} className="text-right">{formatCurrency(s.breakdown.shell)}</TableCell>
                                ))}
                                <TableCell className="text-right font-bold bg-primary/5">{formatCurrency(currentBreakdown.shell)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Interior</TableCell>
                                {savedScenarios.map((s) => (
                                    <TableCell key={s.id} className="text-right">{formatCurrency(s.breakdown.interior)}</TableCell>
                                ))}
                                <TableCell className="text-right font-bold bg-primary/5">{formatCurrency(currentBreakdown.interior)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Contingency</TableCell>
                                {savedScenarios.map((s) => (
                                    <TableCell key={s.id} className="text-right text-orange-600">{formatCurrency(s.breakdown.contingencyValue)}</TableCell>
                                ))}
                                <TableCell className="text-right font-bold text-orange-600 bg-primary/5">{formatCurrency(currentBreakdown.contingencyValue)}</TableCell>
                            </TableRow>

                            {/* Total */}
                            <TableRow className="border-t-2 border-foreground/10">
                                <TableCell className="font-bold text-lg">Total Estimate</TableCell>
                                {savedScenarios.map((s) => (
                                    <TableCell key={s.id} className="text-right font-bold text-lg">{formatCurrency(s.breakdown.total)}</TableCell>
                                ))}
                                <TableCell className="text-right font-bold text-lg text-primary bg-primary/5">{formatCurrency(currentBreakdown.total)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </DialogContent>
        </Dialog>
    );
}
