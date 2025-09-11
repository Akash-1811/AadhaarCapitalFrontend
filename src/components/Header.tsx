import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Menu, Phone, MapPin, X, Clock, Navigation } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logoImage from "@/assets/logo_real.png";


const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBranchDialogOpen, setIsBranchDialogOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="w-full bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-primary text-white py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs sm:text-sm">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-6">
            <Dialog open={isBranchDialogOpen} onOpenChange={setIsBranchDialogOpen}>
              <DialogTrigger asChild>
                <button className="flex items-center gap-1 sm:gap-2 hover:text-white/80 transition-colors cursor-pointer">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Branch Locator</span>
                  <span className="sm:hidden text-xs">Branches</span>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Our Branch Location
                  </DialogTitle>
                  <DialogDescription>
                    Visit us at our convenient location in Thane
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {/* Address Section */}
                  <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-lg border border-primary/10">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Main Branch</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          603, Shriji Ashish Complex,<br />
                          Lohar Ali Marg,<br />
                          Near Thane Station,<br />
                          Thane (W) - 400 601
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Phone className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Phone</p>
                        <p className="text-sm text-gray-600">+91 8369158069</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Business Hours</p>
                        <p className="text-sm text-gray-600">Mon - Sun: 9:00 AM - 7:00 PM</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        const address = "603, Shriji Ashish Complex, Lohar Ali Marg, Near Thane Station, Thane (W) - 400 601";
                        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
                        window.open(mapsUrl, '_blank');
                      }}
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        window.open('tel:+918369158069', '_self');
                      }}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <div className="flex items-center gap-1 sm:gap-2">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">+91 8369158069</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 sm:py-2">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity mr-4 lg:mr-6">
            <div className="flex-shrink-0">
                <img
                  src={logoImage}
                  alt="Aadhaar Capital Logo"
                  className="h-8 w-auto sm:h-10 md:h-12 lg:h-14"
                />
            </div>
            <span className="heading-card !text-orange-600">
              Aadhaar Capital
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            <Link
              to="/sip-calculator"
              className="text-foreground hover:text-primary transition-colors whitespace-nowrap text-sm xl:text-base"
            >
              Start your SIP
            </Link>
            <Link
              to="/health-insurance"
              className="text-foreground hover:text-primary transition-colors whitespace-nowrap text-sm xl:text-base"
            >
              Get Health Insurance
            </Link>
            <Link
              to="/term-insurance"
              className="text-foreground hover:text-primary transition-colors whitespace-nowrap text-sm xl:text-base"
            >
              Get Term Insurance
            </Link>
            <Link
              to="/retirement-planning"
              className="text-foreground hover:text-primary transition-colors whitespace-nowrap text-sm xl:text-base"
            >
              Retirement Planning
            </Link>
            <Link
              to="/financial-planning"
              className="text-foreground hover:text-primary transition-colors whitespace-nowrap text-sm xl:text-base"
            >
              Financial Planning
            </Link>
            <Link
              to="/market-news"
              className="text-foreground hover:text-primary transition-colors whitespace-nowrap text-sm xl:text-base"
            >
              Market News
            </Link>
          </div>

          <div className="flex items-center gap-4">
            
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4">
              <Link
                to="/sip-calculator"
                className="block body-text text-foreground hover:text-primary transition-colors py-3 border-b border-gray-100"
                onClick={closeMobileMenu}
              >
                Start your SIP
              </Link>
              <Link
                to="/health-insurance"
                className="block body-text text-foreground hover:text-primary transition-colors py-3 border-b border-gray-100"
                onClick={closeMobileMenu}
              >
                Get Health Insurance
              </Link>
              <Link
                to="/term-insurance"
                className="block body-text text-foreground hover:text-primary transition-colors py-3 border-b border-gray-100"
                onClick={closeMobileMenu}
              >
                Get Term Insurance
              </Link>
              <Link
                to="/retirement-planning"
                className="block body-text text-foreground hover:text-primary transition-colors py-3 border-b border-gray-100"
                onClick={closeMobileMenu}
              >
                Retirement Planning
              </Link>
              <Link
                to="/financial-planning"
                className="block body-text text-foreground hover:text-primary transition-colors py-3 border-b border-gray-100"
                onClick={closeMobileMenu}
              >
                Financial Planning
              </Link>
              <Link
                to="/motor-insurance"
                className="block body-text text-foreground hover:text-primary transition-colors py-3 border-b border-gray-100"
                onClick={closeMobileMenu}
              >
                Motor Insurance
              </Link>
              <Link
                to="/market-news"
                className="block body-text text-foreground hover:text-primary transition-colors py-3"
                onClick={closeMobileMenu}
              >
                Market News
              </Link>
              
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;