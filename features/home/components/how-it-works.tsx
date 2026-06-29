import { GitHubIcon } from "@/components/icons/github-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Zap, Settings, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const steps = [
    {
        step: "01",
        title: "Install the GitHub App",
        description: "Connect CodeMortal AI to your repository with one click. No complex configuration needed.",
        icon: GitHubIcon,
        color: "from-blue-500 to-cyan-500",
    },
    {
        step: "02",
        title: "Open a Pull Request",
        description: "Create a pull request as usual. Our AI automatically starts analyzing your code changes.",
        icon: Settings,
        color: "from-cyan-500 to-emerald-500",
    },
    {
        step: "03",
        title: "Get Instant AI Review",
        description: "Receive detailed feedback: bugs, security issues, performance tips, and best practices.",
        icon: Zap,
        color: "from-emerald-500 to-teal-500",
    },
    {
        step: "04",
        title: "Ship with Confidence",
        description: "Apply improvements, resolve issues, and merge knowing your code is thoroughly reviewed.",
        icon: Rocket,
        color: "from-teal-500 to-blue-500",
    },
];

export function HowItWorks() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section header */}
                <div className="text-center mb-20">
                    <Badge variant="outline" className="mb-6 px-4 py-2 text-sm border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                        How It Works
                    </Badge>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                        <span className="bg-linear-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
                            Start Reviewing in
                        </span>
                        <br />
                        <span className="bg-linear-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
                            Under 30 Seconds
                        </span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400">
                        Install, connect, and get instant AI reviews. It&apos;s that simple.
                    </p>
                </div>

                {/* Steps ---- Vertical Timeline */}
                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-blue-500 via-emerald-500 to-blue-500 md:-translate-x-1/2" />

                        {steps.map((step, index) => (
                            <div key={index} className={`relative flex items-center gap-8 mb-12 last:mb-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                {/* Step card */}
                                <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700">
                                        <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                                            <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${step.color} flex items-center justify-center shadow-md`}>
                                                <step.icon className="w-5 h-5 text-white" />
                                            </div>
                                            <span className="text-sm font-bold text-slate-400">{step.step}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Center circle */}
                                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-white dark:bg-slate-800 border-4 border-blue-500 rounded-full -translate-x-1/2 z-10" />

                                {/* Spacer for alternating layout */}
                                <div className="hidden md:block flex-1" />
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-16 text-center">
                        <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-linear-to-r from-blue-600 to-emerald-500 shadow-xl">
                            <div className="flex items-center gap-3 text-white">
                                <CheckCircle2 className="w-6 h-6" />
                                <span className="text-lg font-semibold">Ready to get started?</span>
                            </div>
                            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 font-semibold px-8 shadow-lg">
                                <GitHubIcon className="w-5 h-5 mr-2" />
                                <Link href={"./dashboard/github-app"}>Install GitHub App</Link>
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
