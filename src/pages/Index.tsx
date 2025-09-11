import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import AppDownloadSection from "@/components/AppDownloadSection";
import Footer from "@/components/Footer";
import OurServices from "@/components/OurServices";
import AboutUs from "@/components/AboutUs";
import MarketNewsSection from "@/components/MarketNewsSection";
import SEO from "@/components/SEO";
import "@/utils/seoAudit";

const Index = () => {
  const homePageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Aadhaar Capital - Home",
    "description": "India's leading digital investment and insurance platform offering SIP investments, mutual funds, health insurance, term insurance, motor insurance, and comprehensive financial planning services.",
    "url": "https://Aadhaarcapital.com/",
    "mainEntity": {
      "@type": "FinancialService",
      "name": "Aadhaar Capital",
      "serviceType": ["Investment Services", "Insurance Services", "Financial Planning"]
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://Aadhaarcapital.com/"
        }
      ]
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Aadhaar Capital - India's Leading Digital Investment & Insurance Platform | SIP, Mutual Funds, Health Insurance"
        description="Transform your financial future with Aadhaar Capital. Expert SIP investments, comprehensive insurance solutions, and personalized financial planning. Start your wealth creation journey today!"
        keywords="Aadhaar Capital, SIP investment, mutual funds India, health insurance, term insurance, motor insurance, financial planning, retirement planning, wealth management, digital investment platform, portfolio management, insurance comparison, investment advisory, financial services India"
        url="https://Aadhaarcapital.com/"
        schemaData={homePageSchema}
      />
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <OurServices />
        <MarketNewsSection />
        <AboutUs />
        <AppDownloadSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;