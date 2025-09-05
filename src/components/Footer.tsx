import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin,
  Phone,
  Mail 
} from "lucide-react";

const Footer = () => {
  const services = [
    "Mutual Funds", "SIP Investment", "Health Insurance", "Term Insurance",
    "Retirement Planning", "Financial Planning", "Motor Insurance", "Tax Saving Solutions",
    "National Pension System", "Investment Advisory", "Portfolio Management", "Risk Assessment"
  ];

  return (
    <footer className="bg-muted/30 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Aadhar Capital Logo"
                className="w-10 h-10 rounded-lg"
              />
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Aadhar Capital
              </span>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Aadhar Capital is India's premier financial advisory platform,
              providing expert wealth management and comprehensive financial
              planning solutions for the modern investor.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-semibold">+91 8369158069</div>
                  <div className="text-sm text-muted-foreground">Mon - Sat (10 AM - 6 PM)</div>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                In case of any queries, feel free to call or write to us.
                We will be very happy to assist you.
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm">Support@aadhaarcapital.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { Icon: Facebook, url: "https://www.facebook.com/profile.php?id=61580197765604" },
                { Icon: Linkedin, url: "" },
                { Icon: Instagram, url: "https://www.instagram.com/aadhaar_capital/" },
              ].map(({ Icon, url }, index) => (
                <a key={index} href={url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Icon className="w-4 h-4" />
                  </Button>
                </a>
              ))}
            </div>

          </div>

          {/* Services We Offer */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services We Offer</h3>
            <div className="grid grid-cols-2 gap-2">
              {services.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2024 Aadhar Capital. All rights reserved. | Privacy Policy | Terms of Service
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>SEBI Registered</span>
            <span>•</span>
            <span>ISO 27001 Certified</span>
            <span>•</span>
            <span>Bank Grade Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;