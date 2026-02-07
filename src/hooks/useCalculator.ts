import { useState, useMemo, useEffect } from 'react';
import type { CalculatorInputs, CostBreakdown, FoundationType, ShellType, InteriorLevel, LaborType } from '@/types/calculator';
import baseCosts from '@/data/materials.json';
import regions from '@/data/regions.json';

const DEFAULT_INPUTS: CalculatorInputs = {
    sqFt: 2000,
    foundationType: 'slab',
    shellType: 'postFrame',
    interiorLevel: 'medium',
    laborType: 'pro',
    wallHeight: 14,
    state: 'TX', // Default benchmark state
    contingency: 5, // Default 5% buffer
    sustainabilityLevel: 0 // Standard
};

export function useCalculator(initialInputs?: Partial<CalculatorInputs>) {
    const [inputs, setInputs] = useState<CalculatorInputs>({ ...DEFAULT_INPUTS, ...initialInputs });

    const breakdown = useMemo<CostBreakdown>(() => {
        const { sqFt, foundationType, shellType, interiorLevel, laborType, state, contingency, sustainabilityLevel } = inputs;

        // Get Regional Multiplier
        const regionData = regions.find(r => r.code === state);
        const regionalMultiplier = regionData ? regionData.multiplier : 1.0;

        // Sustainability Multiplier (Applies to Shell & Interior MATERIALS)
        // 0: Standard (1.0)
        // 1: Eco-Friendly (1.15) - Better insulation, efficient windows
        // 2: Net Zero Ready (1.30) - Solar prep, tight envelope, premium HVAC
        const ecoMult = 1 + (sustainabilityLevel * 0.15);

        // Get Base Costs
        const foundationBase = baseCosts.foundation[foundationType];
        const shellBase = baseCosts.shell[shellType];
        const interiorBase = baseCosts.interior[interiorLevel];

        // Calculate Raw Material Cost (with Eco Multiplier on Shell/Interior)
        const matCost = (foundationBase.material + (shellBase.material * ecoMult) + (interiorBase.material * ecoMult)) * sqFt;

        // Calculate Component Logic with Regional Multiplier
        const calculateComponentCost = (base: { material: number, labor: number }, applyEco: boolean = false) => {
            // Base Material Cost
            const baseMaterial = (base.material * (applyEco ? ecoMult : 1)) * sqFt;

            // Labor Logic
            let labor = 0;
            if (laborType === 'pro') {
                // Pro Labor: Base labor * 1.25 markup
                labor = (base.labor * sqFt) * 1.25;
            } else if (laborType === 'selfManaged') {
                // Self Managed: 10% logistics fee
                labor = baseMaterial * 0.10;
            }

            // Apply Regional Multiplier to the TOTAL (Material + Labor)
            return (baseMaterial + labor) * regionalMultiplier;
        };

        const foundation = calculateComponentCost(foundationBase, false); // Foundation usually unaffected by simple eco upgrades
        const shell = calculateComponentCost(shellBase, true);
        const interior = calculateComponentCost(interiorBase, true);

        const subTotal = foundation + shell + interior;
        const contingencyValue = subTotal * (contingency / 100);
        const total = subTotal + contingencyValue;

        return {
            foundation,
            shell,
            interior,
            contingencyValue,
            total,
            materialCost: matCost * regionalMultiplier, // Approx for breakdown display
            laborCost: subTotal - (matCost * regionalMultiplier)
        };

    }, [inputs]);

    const updateInput = (key: keyof CalculatorInputs, value: any) => {
        setInputs(prev => ({ ...prev, [key]: value }));
    };

    return { inputs, breakdown, updateInput };
}
