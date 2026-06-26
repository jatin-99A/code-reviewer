export const dynamic = "force-static";

import { GitHubIcon } from "@/components/icons/github-icon";
import HeadingAnimation from "./heading-animation.client";
import { Button } from "@/components/ui/button";
import { ArrowRight,  } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-28 px-6 text-center bg-primary/30 dark:bg-background">
      <div className="mx-auto max-w-4xl">

        <HeadingAnimation />

        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          AI-powered code review assistant that understands context,
          catches bugs, and improves your GitHub pull requests instantly.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <Button size="lg" className="gap-2">
            Get Started
            <ArrowRight size={18} />
          </Button>

          <Button variant="outline" size="lg" className="gap-2">
            <GitHubIcon />
            View GitHub
          </Button>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="rounded-xl border p-4 bg-muted/30">
            ⚡ 10x faster PR reviews
          </div>
          <div className="rounded-xl border p-4 bg-muted/30">
            🔒 Secure by design
          </div>
          <div className="rounded-xl border p-4 bg-muted/30">
            🤖 AI-powered insights
          </div>
        </div>

      </div>
    </section>
  );
}