export const dynamic = "force-static";

import {
  ShieldCheck,
  Zap,
  GitPullRequest,
  LineChart,
} from "lucide-react";

const features = [
  {
    title: "Instant PR Analysis",
    desc: "AI reviews your pull requests in seconds with deep context understanding.",
    icon: GitPullRequest,
  },
  {
    title: "Security First",
    desc: "Detect vulnerabilities before they hit production.",
    icon: ShieldCheck,
  },
  {
    title: "Blazing Fast",
    desc: "Optimized AI pipeline for near real-time feedback.",
    icon: Zap,
  },
  {
    title: "Code Insights",
    desc: "Performance and structure suggestions powered by AI.",
    icon: LineChart,
  },
];

export default function Features() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Built for Modern Engineering Teams
        </h2>

        <p className="text-center text-muted-foreground mt-3">
          Everything you need to ship better code, faster.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => {
            const Icon = f.icon;

            return (
              <div
                key={f.title}
                className="group rounded-2xl border bg-primary/10 p-6 hover:border-primary/50 hover:shadow-md transition"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition">
                  <Icon size={22} />
                </div>

                <h3 className="font-semibold text-lg">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}