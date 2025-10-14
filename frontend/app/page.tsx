import HeroBanner from '@/components/home/HeroBanner';
import GameLobbyPreview from '@/components/home/GameLobbyPreview';
import PromotionsSection from '@/components/home/PromotionsSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import JackpotTicker from '@/components/home/JackpotTicker';

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <GameLobbyPreview />
      <JackpotTicker />
      <PromotionsSection />
      <WhyChooseUs />
    </main>
  );
}
