import { type CostBreakdown, type CalculatorInputs } from '@/types/calculator';
import { formatCurrency } from './utils';
import regions from "@/data/regions.json";

export async function generateQuotePDF(inputs: CalculatorInputs, breakdown: CostBreakdown) {
    console.log("Generating PDF with inputs:", inputs);
    try {
        const [jsPDFModule, autoTableModule] = await Promise.all([
            import('jspdf'),
            import('jspdf-autotable')
        ]);

        const jsPDF = jsPDFModule.default;
        const autoTable = autoTableModule.default;

        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;

        // Header
        doc.setFontSize(22);
        doc.setTextColor(40, 40, 40);
        doc.text("Barndominium Cost Estimate", 14, 22);

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 28);

        // Project Details
        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.text("Project Specifications", 14, 40);

        const stateName = regions.find(r => r.code === inputs.state)?.name || inputs.state;

        const specs = [
            ["Location", stateName],
            ["Dimensions", `${inputs.sqFt} sq. ft.`],
            ["Shell Type", inputs.shellType === 'postFrame' ? "Post Frame (Wood)" : "Red Iron Steel"],
            ["Sustainability", ["Standard", "High Efficiency", "Net Zero Ready"][inputs.sustainabilityLevel]],
            ["Labor Strategy", inputs.laborType === 'pro' ? "Turnkey Contractor" : inputs.laborType === 'selfManaged' ? "Self-Managed" : "DIY"]
        ];

        autoTable(doc, {
            startY: 45,
            head: [['Parameter', 'Value']],
            body: specs,
            theme: 'striped',
            headStyles: { fillColor: [41, 128, 185] },
            styles: { fontSize: 10 }
        });

        // Cost Breakdown
        doc.text("Cost Breakdown via BarndoCalc", 14, (doc as any).lastAutoTable.finalY + 15);

        const costs = [
            ["Foundation", formatCurrency(breakdown.foundation)],
            ["Shell Structure", formatCurrency(breakdown.shell)],
            ["Interior Build", formatCurrency(breakdown.interior)],
            ["Contingency Buffer", formatCurrency(breakdown.contingencyValue)],
            [{ content: 'Total Estate Value', styles: { fontStyle: 'bold' } } as any, { content: formatCurrency(breakdown.total), styles: { fontStyle: 'bold', textColor: [41, 128, 185] } } as any]
        ];

        autoTable(doc, {
            startY: (doc as any).lastAutoTable.finalY + 20,
            head: [['Component', 'Estimated Cost']],
            body: costs,
            theme: 'grid',
            headStyles: { fillColor: [46, 204, 113] },
            columnStyles: {
                0: { cellWidth: 120 },
                1: { cellWidth: 'auto', halign: 'right' }
            },
            foot: [['Total Estimate', formatCurrency(breakdown.total)]],
            footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' }
        });

        // Disclaimer
        doc.setFontSize(8);
        doc.setTextColor(150);
        const disclaimer = "This estimate is for planning purposes only. Actual costs may vary based on site conditions, specific material choices, and local labor rates. Does not constitute a binding contract.";
        const splitText = doc.splitTextToSize(disclaimer, pageWidth - 28);
        doc.text(splitText, 14, (doc as any).lastAutoTable.finalY + 20);

        // Save
        doc.save(`barndo-quote-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
        console.error("PDF Generation Error:", error);
    }
}
