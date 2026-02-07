import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Barndominium Cost Calculator",
    description: "Read our Privacy Policy to understand how we collect, use, and protect your data when using the Barndominium Cost Calculator.",
};

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl prose dark:prose-invert">
            <h1>Privacy Policy</h1>
            <p>Last updated: February 7, 2026</p>

            <h2>1. Information We Collect</h2>
            <p>
                When you use our Calculator, we may collect data you input (such as square footage, location, and finish quality)
                to generate cost estimates. We do not store this data in a way that is personally identifiable unless you explicitly
                save a quote or create an account.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>
                We use the information we collect to:
            </p>
            <ul>
                <li>Provide, maintain, and improve our services.</li>
                <li>Generate aggregate, anonymous construction cost trends.</li>
                <li>Respond to your comments and questions.</li>
            </ul>

            <h2>3. Cookies</h2>
            <p>
                We use cookies to enhance your experience, such as remembering your calculator inputs between sessions.
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>

            <h2>4. Changes to This Policy</h2>
            <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page.
            </p>

            <h2>5. Contact Us</h2>
            <p>
                If you have any questions about this Privacy Policy, please contact us at support@barndocalc.com.
            </p>
        </div>
    );
}
