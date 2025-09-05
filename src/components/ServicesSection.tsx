import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  Smartphone,
  Shield,
  ArrowRight,
  ChevronRight,
  Users,
  Briefcase,
  BarChart3,
  FileText,
  PiggyBank,
  CreditCard
} from "lucide-react";

const ServicesSection = () => {
  const wantToServices = [
    {
      icon: <PiggyBank className="w-5 h-5" />,
      title: "Plan my Retirement",
      color: "text-gray-700"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Avail Insurance",
      color: "text-gray-700"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Invest in Mutual Funds",
      color: "text-gray-700"
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Invest in NPS",
      color: "text-gray-700"
    }
  ];

  const searchingServices = [
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "Risk Profiling for my investment needs",
      color: "text-gray-700"
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      title: "Tax Saving Solutions",
      color: "text-gray-700"
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Financial assessment of portfolio",
      color: "text-gray-700"
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: "Planning my Retirement",
      color: "text-gray-700"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* I want to... */}
          <Card className="bg-white shadow-lg border border-gray-200 rounded-lg overflow-hidden">
            <CardHeader className="bg-gray-50 border-b border-gray-200 py-4 px-6">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-3">
                <div className="w-1 h-6 bg-red-500"></div>
                I want to...
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {wantToServices.map((service, index) => (
                <div key={index} className="flex items-center justify-between px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className={`${service.color}`}>
                      {service.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{service.title}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              ))}
              <div className="flex justify-center py-3 border-t border-gray-100">
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <ChevronRight className="w-5 h-5 rotate-90" />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* I'm searching for... */}
          <Card className="bg-white shadow-lg border border-gray-200 rounded-lg overflow-hidden">
            <CardHeader className="bg-gray-50 border-b border-gray-200 py-4 px-6">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-3">
                <div className="w-1 h-6 bg-red-500"></div>
                I'm searching for...
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {searchingServices.map((service, index) => (
                <div key={index} className="flex items-center justify-between px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className={`${service.color}`}>
                      {service.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{service.title}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              ))}
              <div className="flex justify-center py-3 border-t border-gray-100">
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <ChevronRight className="w-5 h-5 rotate-90" />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Expert Advisory Section */}
        <Card className="bg-gradient-secondary p-8 lg:p-12 shadow-elegant">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-semibold text-primary">Expert Advisory</span>
              </div>
              <h3 className="text-3xl font-bold">
                What all we can do for you
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-primary text-white p-2 rounded-lg mt-1">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Smart Investment Planning</h4>
                    <p className="text-muted-foreground">
                      Our expert team analyzes market trends and your financial goals
                      to create personalized investment strategies that adapt to market changes
                      and maximize your wealth creation potential.
                    </p>
                  </div>
                </div>
                <div className="text-sm">
                  <strong>Investment Advisory Team</strong><br />
                  <span className="text-muted-foreground">Certified Financial Planners</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  "Strategic investment planning helps you build the diversified portfolio you
                  deserve. With our proven methodologies and market expertise, let us guide you
                  towards achieving your financial goals."
                </p>
                <Button variant="hero">
                  Connect Now
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-elegant">
                <h4 className="font-semibold mb-4">Featured Services</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                    <span className="text-sm">Health Insuarance</span>
                    <span className="text-primary font-semibold">Premium</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-accent/5 rounded-lg">
                    <span className="text-sm">Term Insuarance</span>
                    <span className="text-accent font-semibold">Pro</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm">Retirement Planning</span>
                    <span className="text-green-600 font-semibold">Active</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm">Financial Planning</span>
                    <span className="text-green-600 font-semibold">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ServicesSection;