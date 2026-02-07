import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | Barndominium Cost Calculator",
    description: "Review the Terms of Service for using BarndoCalc. By accessing our site, you agree to these terms regarding accuracy and liability.",
};

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl prose dark:prose-invert">
            <h1>Terms of Service</h1>
            <p>Last updated: February 7, 2026</p>

            <h2>1. Acceptance of Terms</h2>
            <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2>2. Disclaimer of Accuracy</h2>
            <p>
                The estimates provided by this calculator are for planning purposes only. They do not constitute a formal quote
                or binding contract. Actual construction costs may vary significantly based on site conditions, material availability,
                and local labor rates. We are not responsible for any financial decisions made based on these estimates.
            </p>

            <h2>3. Use License</h2>
            <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on Barndominium
                Cost Calculator's website for personal, non-commercial transitory viewing only.
            </p>

            <h2>4. Limitations</h2>
            <p>
                In no event shall Barndominium Cost Calculator or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use
                the materials on this website.
            </p>
        </div>
    );
}
