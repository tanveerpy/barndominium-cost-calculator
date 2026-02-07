'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type CostBreakdown } from "@/types/calculator";

interface CostBreakdownChartProps {
    breakdown: CostBreakdown;
}

export function CostBreakdownChart({ breakdown }: CostBreakdownChartProps) {
    const data = [
        { name: 'Foundation', value: breakdown.foundation, color: '#0ea5e9' }, // sky-500
        { name: 'Shell', value: breakdown.shell, color: '#f59e0b' },      // amber-500
        { name: 'Interior', value: breakdown.interior, color: '#10b981' },   // emerald-500
        ...(breakdown.contingencyValue > 0 ? [{ name: 'Contingency', value: breakdown.contingencyValue, color: '#f97316' }] : []) // orange-500
    ];

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cost Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: any) => [formatCurrency(Number(value)), 'Cost']}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
