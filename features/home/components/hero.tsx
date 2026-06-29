import HeroContent from "./hero-content";
import HeroPreview from "./hero-preview";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* background bubble effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-20 animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <HeroContent />
          <HeroPreview />

        </div>
      </div>
    </section>
  );
}

export default Hero;