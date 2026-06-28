import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-28 px-6 text-center">
      <div className="mx-auto max-w-3xl border rounded-2xl p-10 bg-muted/30">

        <div className="flex justify-center mb-4 text-primary">
          <Sparkles size={28} />
        </div>

        <h2 className="text-3xl font-bold">
          Ship better code with AI assistance
        </h2>

        <p className="mt-4 text-muted-foreground">
          Join developers building faster, safer, and cleaner software.
        </p>

        <div className="mt-8">
          <Link href={"/sign-in"}>
            <Button size="lg">
              Start Free Today
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}