import { Button } from "@/components/ui/button";
import { GitPullRequest, MessageSquare } from "lucide-react";
import Link from "next/link";

const reviewExamples = [
  {
    file: "src/api/users.ts",
    line: 42,
    comment: "Potential SQL injection vulnerability. Use parameterized queries.",
    icon: "Shield",
  },
  {
    file: "src/utils/parser.ts",
    line: 18,
    comment: "Missing null check here. Could cause runtime errors.",
    icon: "Bug",
  },
  {
    file: "src/components/Form.tsx",
    line: 67,
    comment: "Consider memoizing this callback for better performance.",
    icon: "Zap",
  },
];

export default function HeroPreview() {
  return (
    <div className="relative">

      {/* Card */}
      <div className="rounded-2xl bg-background border border-border shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-muted border-b border-border">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>

          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <GitPullRequest className="w-4 h-4" />
            <span>PR #42: Add user authentication</span>
          </div>

          <div className="w-16" />
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">

          {reviewExamples.map((r, i) => (
            <div key={i}>

              {/* Code */}
              <div className="flex gap-3 text-sm">
                <span className="text-muted-foreground w-8">{r.line}</span>

                <div className="flex-1">
                  <div className="text-muted-foreground text-xs mb-1">
                    {r.file}
                  </div>

                  <div className=" rounded-lg p-3 font-mono bg-blue-600 dark:bg-blue-800">
                    <span className="text-green-400 font-bold">const  </span> 
                    <span className="text-green-400 font-bold">
                      <span className="text-white">query</span> = SELECT * FROM users
                    </span>
                  </div>
                </div>
              </div>

              {/* Comment */}
              <div className="ml-11 mt-3 p-4 rounded-xl bg-primary/5 border-l-4 border-primary">

                <div className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-primary mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    {r.comment}
                  </p>
                </div>

              </div>

            </div>
          ))}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-sm text-muted-foreground">
              3 suggestions found
            </span>

            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href={"./dashboard/github-app"}>Apply Suggestions</Link>
            </Button>
          </div>

        </div>
      </div>

      {/* Glow */}
      <div className="absolute -inset-4 bg-linear-to-r from-primary/20 via-primary/10 to-primary/20 blur-2xl -z-10 rounded-3xl" />

      {/* Stats */}
      <div className="absolute -bottom-6 -left-6 bg-background border border-border rounded-xl px-4 py-3 shadow-xl">
        <div className="text-2xl font-bold">10x</div>
        <div className="text-xs text-muted-foreground">Faster Reviews</div>
      </div>

      <div className="absolute -top-6 -right-6 bg-background border border-border rounded-xl px-4 py-3 shadow-xl">
        <div className="text-2xl font-bold text-primary">95%</div>
        <div className="text-xs text-muted-foreground">Bug Detection</div>
      </div>

    </div>
  );
}