import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner"; // Import Toaster

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  metadataBase: new URL('https://barndocalc.com'), // Replace with actual domain when live
  title: {
    default: 'Barndominium Cost Calculator | Real-Time Estimator',
    template: '%s | BarndoCalc',
  },
  alternates: {
    canonical: './',
  },
  description: "Calculate the cost to build your dream barndominium with regional accuracy, material breakdown, and DIY options. Get a free estimate updated for 2026.",
  keywords: ["barndominium cost", "barndo calculator", "metal building prices", "post frame cost", "construction estimator"],
  authors: [{ name: "BarndoCalc Team" }],
  creator: "BarndoCalc",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://barndocalc.com',
    title: 'Barndominium Cost Calculator | Real-Time Estimator',
    description: "Stop guessing. Get granular, location-adjusted estimates for your barndominium build. Accounts for DIY vs. Pro labor and material trends.",
    siteName: 'BarndoCalc',
    images: [
      {
        url: '/og-image.jpg', // We should ensure this image exists or is a placeholder
        width: 1200,
        height: 630,
        alt: 'Barndominium Cost Calculator Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barndominium Cost Calculator 2026',
    description: "Real-time cost estimates for your barndominium. Filter by state, size, and finish quality.",
    images: ['/twitter-image.jpg'], // We should ensure this image exists or is a placeholder
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.variable, jetbrainsMono.variable, "min-h-screen bg-background text-foreground antialiased font-sans")}>
        <div className="relative flex min-h-screen flex-col">
          {/* Background Decoration */}
          <div className="fixed inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] opacity-20 dark:bg-black dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] pointer-events-none" />

          <Header />
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
          <Toaster position="top-center" richColors /> {/* Add Toaster */}
        </div>
      </body>
    </html>
  );
}
