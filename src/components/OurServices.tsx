import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PiggyBank,
  Shield,
  TrendingUp,
  Heart,
  Car,
  Calculator,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { scrollToEnquiryForm } from "@/utils/scrollToForm";

const OurServices = () => {
  const services = [
    {
      icon: PiggyBank,
      title: "RETIREMENT PLANNING",
      description: "Build a worry-free retirement through personalized plans, investments, inflation-adjusted strategies.",
      features: ["Personalized retirement plans", "Inflation-adjusted strategies", "Tax-efficient investments"],
      color: "from-orange-500 to-orange-600",
      serviceType: "/retirement-planning"
    },
    {
      icon: Heart,
      title: "HEALTH INSURANCE ADVISORY",
      description: "Compare and recommend suitable health insurance plans.",
      features: ["Comprehensive plan comparison", "Expert recommendations", "Claims assistance"],
      color: "from-orange-400 to-orange-500",
      serviceType: "/health-insurance"
    },
    {
      icon: TrendingUp,
      title: "WEALTH & INVESTMENT PLANNING",
      description: "Creating tailored strategies of an SIP to mutual funds and goal-based investments.",
      features: ["SIP planning", "Mutual fund selection", "Goal-based investing"],
      color: "from-orange-600 to-orange-700",
      serviceType: "/sip-investment"
    },
    {
      icon: Shield,
      title: "LIFE INSURANCE PLANNING",
      description: "Ensuring your loved ones with right term insurance suited.",
      features: ["Term insurance planning", "Coverage assessment", "Premium optimization"],
      color: "from-orange-500 to-orange-600",
      serviceType: "/term-insurance"
    },
    {
      icon: Car,
      title: "MOTOR INSURANCE",
      description: "Compare and recommend suitable vehicle insurance plans.",
      features: ["Vehicle insurance comparison", "Best rate guarantees", "Quick claim processing"],
      color: "from-orange-500 to-red-500",
      serviceType: "/motor-insurance"
    },
    {
      icon: Calculator,
      title: "FINANCIAL PLANNING",
      description: "Build a financial plan and roadmap to achieve different stages of life.",
      features: ["Comprehensive financial roadmap", "Life stage planning", "Goal achievement strategies"],
      color: "from-orange-400 to-orange-600",
      serviceType: "/financial-planning"
    }
  ];

  return (
    <section className="py-20 bg-gradient-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-20 w-64 h-64 bg-gradient-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-hero rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            Our Services
          </div>
          <h2 className="heading-section mb-6">
            Comprehensive Financial Solutions
            <span className="bg-gradient-primary bg-clip-text text-transparent"> for Your Future</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From retirement planning to insurance advisory, we provide expert guidance 
            to help you achieve your financial goals with confidence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 px-4 sm:px-6 lg:px-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-white/20">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={service.serviceType}>
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300"
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-elegant border border-white/20">
          <h3 className="heading-card mb-4">Ready to Secure Your Financial Future?</h3>
          <p className="body-main mb-6 max-w-2xl mx-auto">
            Get personalized financial advice from our expert team. Start your journey towards financial freedom today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="lg" onClick={scrollToEnquiryForm}>
              Get Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg">
              Call +91 8369158069
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
