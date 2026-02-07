'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, CheckCircle, Send } from "lucide-react";

export function SubmitBuild() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulating submission delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setSubmitted(true);
        toast.success("Project details submitted successfully!");
    };

    if (submitted) {
        return (
            <Card className="w-full max-w-lg mx-auto border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/10">
                <CardContent className="pt-6 text-center space-y-4">
                    <div className="mx-auto w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center dark:bg-emerald-900/50 dark:text-emerald-400">
                        <CheckCircle className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400">Received!</h3>
                        <p className="text-muted-foreground">
                            Thank you for sharing your project details. A barndominium specialist will review your specs and reach out shortly.
                        </p>
                    </div>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="text-sm text-muted-foreground underline hover:text-primary"
                    >
                        Submit another project
                    </button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-lg mx-auto shadow-lg border-t-4 border-t-primary">
            <CardHeader>
                <CardTitle>Get a Professional Quote</CardTitle>
                <CardDescription>
                    Ready to move forward? Submit your details to connect with vetted builders in your area.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                            <input
                                id="firstName"
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Jane"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                            <input
                                id="lastName"
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Doe"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="jane@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="timeline" className="text-sm font-medium">Build Timeline</label>
                        <select
                            id="timeline"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <option>Immediately</option>
                            <option>1-3 Months</option>
                            <option>3-6 Months</option>
                            <option>6-12 Months</option>
                            <option>Just exploring</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="projectDetails" className="text-sm font-medium">Additional Details</label>
                        <textarea
                            id="projectDetails"
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="I have land in..."
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    Submit Request <Send className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
