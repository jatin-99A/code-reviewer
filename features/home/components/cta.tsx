import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";
import Link from "next/link";

const benefits = [
  "Priority access when we launch",
  "Exclusive early-bird pricing",
  "Shape the product roadmap",
  "Direct access to founders",
];

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-blue-900">

      {/* Gradient bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500 rounded-full opacity-20 blur-3xl animate-pulse animation-delay-2000" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[48px_48px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left content */}
          <div className="text-center lg:text-left">

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Ship better code
              <br />
              <span className="bg-linear-to-r from-primary via-emerald-400 to-primary bg-clip-text text-transparent">
                with AI assistance
              </span>
            </h2>

            <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Join developers building faster, safer, and cleaner software.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-lg mx-auto lg:mx-0">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA button */}
            <Button
              size="lg"
              className="group bg-linear-to-r from-primary via-primary/90 to-primary/70 text-primary-foreground px-8 py-7 text-lg font-semibold shadow-xl shadow-primary/25 hover:scale-105 transition"
            >
              <Zap className="w-5 h-5 mr-2" />
              <Link href={"./sign-up"}> Get started</Link>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

          </div>

          {/* Right image */}
          <div className="relative">
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 group">
              <img
                src="./cta.avif"
                alt="Team collaboration"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-blue-900/80 via-transparent to-transparent" />

              {/* Floating stats */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex gap-4">
                  <div className="flex-1 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                    <div className="text-3xl font-bold text-white">500+</div>
                    <div className="text-sm text-slate-300">Waitlist Signups</div>
                  </div>
                  <div className="flex-1 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                    <div className="text-3xl font-bold text-white">Q3</div>
                    <div className="text-sm text-slate-300">Launch Target</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-linear-to-br from-primary to-emerald-500 rounded-2xl opacity-80 blur-sm" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-linear-to-br from-emerald-500 to-primary rounded-full opacity-60 blur-sm" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;