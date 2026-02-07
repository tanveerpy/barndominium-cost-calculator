import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
    return (
        <footer className="border-t bg-stone-50 dark:bg-stone-900/10">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Logo className="h-6 w-6 text-primary" />
                            <span className="font-bold">BarndoCalc</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            The most accurate barndominium cost estimator on the web.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/#calculator" className="hover:text-primary">Calculator</Link></li>
                            <li><Link href="/methodology" className="hover:text-primary">Methodology</Link></li>
                            <li><Link href="/cost-to-build/texas" className="hover:text-primary">Texas Estimates</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
                    <p>
                        © {new Date().getFullYear()} BarndoCalc. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
