import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
    title: "Contact Us | Barndominium Cost Calculator",
    description: "Have questions or feedback? Get in touch with the BarndoCalc team for support or partnership inquiries.",
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-2xl">
            <h1 className="text-4xl font-bold mb-4 text-center">Get in Touch</h1>
            <p className="text-muted-foreground text-center mb-12">
                Have a question about your estimate? Found a bug? We'd love to hear from you.
            </p>

            <div className="space-y-6 border p-8 rounded-xl bg-card">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">First Name</label>
                        <Input placeholder="Jane" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Last Name</label>
                        <Input placeholder="Doe" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="jane@example.com" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <Textarea placeholder="Tell us about your project or issue..." className="min-h-[150px]" />
                </div>

                <Button className="w-full">Send Message</Button>
            </div>
        </div>
    );
}
