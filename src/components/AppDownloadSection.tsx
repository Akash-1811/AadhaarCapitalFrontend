import { Button } from "@/components/ui/button";
import { Smartphone, Download, Star } from "lucide-react";
import { scrollToEnquiryForm } from "@/utils/scrollToForm";
import OptimizedImage from "@/components/ui/optimized-image";
import appMockup from "@/assets/app-mockup.jpg";

const AppDownloadSection = () => {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-20 w-32 h-32 border border-white/30 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 border border-white/20 rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 border border-white/40 rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Smartphone className="w-5 h-5" />
                  <span className="font-semibold">Expert Services</span>
                </div>

                <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                  GROW YOUR WEALTH WITH CONFIDENCE
                </h2>

                <p className="text-xl opacity-90">
                  #StayAhead with Aadhaar Capital
                </p>

                <p className="text-lg opacity-80">
                  Experience personalized financial planning with our expert advisory team.
                  Get comprehensive investment strategies, portfolio management, and wealth
                  creation solutions tailored to your goals.
                </p>
              </div>

              {/* Service Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                  <div className="text-2xl font-bold">2K+</div>
                  <div className="text-sm opacity-80">Happy Clients</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                  <div className="text-2xl font-bold">₹100Cr+</div>
                  <div className="text-sm opacity-80">Assets Managed</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm opacity-80">Digital Branches</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                  <div className="text-2xl font-bold">99.8%</div>
                  <div className="text-sm opacity-80">Client Satisfaction</div>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-black text-white hover:bg-black/80 min-w-48"
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-6 h-6" />
                    <div className="text-left">
                      <div className="text-xs">Call us at</div>
                      <div className="font-semibold">+91 8369158069</div>
                    </div>
                  </div>
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-black text-white hover:bg-black/80 min-w-48"
                  onClick={scrollToEnquiryForm}
                >
                  <div className="flex items-center gap-3">
                    <Download className="w-6 h-6" />
                    <div className="text-left">
                      <div className="text-xs">Get Free</div>
                      <div className="font-semibold">Consultation</div>
                    </div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Right Content - App Mockup */}
            <div className="relative flex justify-center">
              <div className="relative">
                <OptimizedImage
                  src={appMockup}
                  alt="Aadhaar Capital mobile app interface showing portfolio dashboard and trading features"
                  className="w-80 h-auto drop-shadow-2xl"
                  lazy={true}
                />
                
                {/* Floating elements */}
                <div className="absolute -top-4 -left-6 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg animate-bounce">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">Trusted Advisor</span>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-6 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg animate-pulse">
                  <div className="text-xs text-gray-600">Expert Support</div>
                  <div className="text-lg font-bold text-green-600">Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadSection;