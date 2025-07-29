import { Footer } from '@/components/footer/footer';
import { FeaturesSection } from '@/components/home/features-section';
import { HeroSection } from '@/components/home/hero-section';
import { HowItWorksSection } from '@/components/home/how-it-works-section';
import { PopularServicesSection } from '@/components/home/popular-services-section';
import { StatsSection } from '@/components/home/stats-section';

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <HeroSection />

      <PopularServicesSection />

      <FeaturesSection />

      <HowItWorksSection />

      <StatsSection />

      <Footer />
    </main>
  );
}
