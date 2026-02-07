export type FoundationType = 'slab' | 'crawlspace' | 'pier';
export type ShellType = 'postFrame' | 'steel';
export type InteriorLevel = 'basic' | 'medium' | 'luxury';
export type LaborType = 'diy' | 'selfManaged' | 'pro';

export interface CalculatorInputs {
    sqFt: number;
    foundationType: FoundationType;
    shellType: ShellType;
    interiorLevel: InteriorLevel;
    laborType: LaborType;
    wallHeight: number;
    state: string; // For future regional logic
    contingency: number; // Percentage 0-30
    sustainabilityLevel: number; // 0 (Standard), 1 (Eco), 2 (Net Zero)
}

export interface SavedScenario {
    id: string;
    name: string;
    date: string;
    inputs: CalculatorInputs;
    breakdown: CostBreakdown;
}

export interface CostBreakdown {
    foundation: number;
    shell: number;
    interior: number;
    contingencyValue: number;
    total: number;
    materialCost: number;
    laborCost: number;
}

export interface CalculatorState extends CalculatorInputs {
    breakdown: CostBreakdown;
    updateInput: (key: keyof CalculatorInputs, value: any) => void;
}
