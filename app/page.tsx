import CTA from "@/features/home/components/cta";
import Features from "@/features/home/components/features";
import Footer from "@/features/home/components/footer";
import Hero from "@/features/home/components/hero";
import HowItWorks from "@/features/home/components/how-it-works";
import Navbar from "@/features/home/components/navbar";

const Home = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;