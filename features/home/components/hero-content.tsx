import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Zap,
  Shield,
  Bug,
  Code,
  Sparkles,
} from "lucide-react";
import { GitHubIcon } from "@/components/icons/github-icon";
import Link from "next/link";

const features = [
  { icon: Zap, text: "Instant Reviews" },
  { icon: Shield, text: "Security Analysis" },
  { icon: Bug, text: "Bug Detection" },
  { icon: Code, text: "Code Suggestions" },
];

export default function HeroContent() {
  return (
    <div>

      {/* Badge */}
      <div className="mb-8">
        <Badge className="px-4 py-2 text-sm font-medium rounded-full border border-primary/40 bg-primary/10 text-primary">
          <Sparkles className="w-4 h-4 mr-2" />
          Start building with us
        </Badge>
      </div>

      {/* Heading */}
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
        <span className="bg-linear-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent">
          AI Code Review
        </span>
        <br />
        <span className="bg-linear-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
          for GitHub
        </span>
      </h1>

      {/* Subtext */}
      <p className="text-xl sm:text-2xl text-muted-foreground mb-4 leading-relaxed font-light">
        Don't worry about bugs....{" "}
        <span className="text-primary font-medium">
          we review each line of code.
        </span>
      </p>

      <p className="text-lg text-muted-foreground mb-10">
        Intelligent code review assistant that understands context, catches bugs,
        and improves your GitHub pull requests instantly.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Button
          size="lg"
          className="group bg-linear-to-r from-primary via-primary/90 to-primary/70 text-primary-foreground px-8 py-7 text-lg font-semibold shadow-xl shadow-primary/25 hover:scale-105 transition"
        >
          <Zap className="w-5 h-5 mr-2" />
          <Link href={"./sign-up"}>Get started</Link>
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="px-8 py-7 text-lg font-semibold border border-border hover:bg-primary/5 hover:border-primary"
        >
          <GitHubIcon className="w-5 h-5 mr-2" />
          <Link href={"./dashboard/github-app"}> View on GitHub</Link>
        </Button>
      </div>

      {/* Features */}
      <div className="flex flex-wrap gap-3">
        {features.map((f, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border text-muted-foreground text-sm"
          >
            <f.icon className="w-4 h-4 text-primary" />
            <span>{f.text}</span>
          </div>
        ))}
      </div>

    </div>
  );
}