import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppFloat from "./components/WhatsAppFloat";
import NotificationPopup from "./components/NotificationPopup";
import PerformanceMonitor from "./components/PerformanceMonitor";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HealthInsurance from "./pages/HealthInsurance";
import RetirementPlanning from "./pages/RetirementPlanning";
import TermInsurance from "./pages/TermInsurance";
import SipInvestment from "./pages/SipInvestment";
import SipCalculator from "./pages/SipCalculator";
import FinancialPlanning from "./pages/FinancialPlanning";
import MotorInsurance from "./pages/MotorInsurance";
import MarketNews from "./pages/MarketNews";
import FontTest from "./pages/FontTest";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {import.meta.env.DEV && <PerformanceMonitor />}
        <Toaster />
        <Sonner />
        <ScrollToTop />
        <WhatsAppFloat />
        <NotificationPopup />
        <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/health-insurance" element={<HealthInsurance />} />
        <Route path="/retirement-planning" element={<RetirementPlanning />} />
        <Route path="/term-insurance" element={<TermInsurance />} />
        <Route path="/sip-investment" element={<SipInvestment />} />
        <Route path="/sip-calculator" element={<SipCalculator />} />
        <Route path="/financial-planning" element={<FinancialPlanning />} />
        <Route path="/motor-insurance" element={<MotorInsurance />} />
        <Route path="/market-news" element={<MarketNews />} />
        <Route path="/font-test" element={<FontTest />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
