import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center mx-auto px-4">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Logo className="h-6 w-6 text-primary" />
                    <span className="hidden font-bold sm:inline-block">BarndoCalc</span>
                </Link>
                <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
                    <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        About
                    </Link>
                    <Link href="/methodology" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        Methodology
                    </Link>
                    <Link href="/contact" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        Contact
                    </Link>
                </nav>
                <div className="flex items-center justify-end space-x-4">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/#calculator">Start Calculating</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
