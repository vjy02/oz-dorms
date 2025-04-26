import Hero from "@/components/home/Hero";
import HighlightedDorms from "@/components/home/HighlightedDorms";
import HowItWorks from "@/components/home/HowItWorks";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <HighlightedDorms />
        <HowItWorks />
        <CallToAction />
      </main>
    </div>
  );
}
