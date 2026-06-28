import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Shield, Gauge, Lightbulb, GitPullRequest, Brain } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: Zap,
    title: "Instant PR Analysis",
    description:
      "AI reviews your pull requests in seconds with deep context understanding. Get actionable feedback without the wait.",
    image: "",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Security First",
    description:
      "Detect vulnerabilities before they hit production. AI-powered security scanning integrated into your workflow.",
    image: "",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Gauge,
    title: "Blazing Fast",
    description:
      "Optimized AI pipeline for near real-time feedback. Get reviews faster than any human could provide.",
    image: "",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Lightbulb,
    title: "Code Insights",
    description:
      "Performance and structure suggestions powered by AI. Learn and improve with every pull request.",
    image: "",
    gradient: "from-violet-500 to-purple-500",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <Badge variant="outline" className="mb-6 px-4 py-2 text-sm border-blue-500/30 text-blue-600 dark:text-blue-400">
            Features
          </Badge>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
              Built for Modern
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
              Engineering Teams
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400">
            Everything you need to ship better code, faster.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white dark:bg-slate-800 rounded-3xl"
            >
              {/* Image background */}
              <div className="absolute inset-0 opacity-10 dark:opacity-5">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              <CardContent className="relative z-10 p-8 md:p-10">
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional features row */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: GitPullRequest, title: "GitHub Native", desc: "Seamlessly integrates with your existing GitHub workflow" },
            { icon: Brain, title: "Context Aware", desc: "Understands your codebase and coding patterns" },
            { icon: Zap, title: "Real-time", desc: "Get feedback as soon as you open a pull request" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">{item.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
