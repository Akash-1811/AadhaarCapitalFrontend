import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MarketNewsSection from "@/components/MarketNewsSection";

const MarketNews = () => {
  return (
    <div className="min-h-screen bg-gradient-secondary">
      <Header />
      <main className="pt-4">
        <MarketNewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default MarketNews;
