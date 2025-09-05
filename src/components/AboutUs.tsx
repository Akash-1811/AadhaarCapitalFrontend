import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Globe, 
  Users, 
  Award, 
  TrendingUp,
  Shield,
  Heart,
  CheckCircle,
  ArrowRight,
  Target,
  Lightbulb
} from "lucide-react";

const AboutUs = () => {
  const features = [
    {
      icon: Globe,
      title: "India-first approach with global financial tools",
      description: "Combining local expertise with international best practices"
    },
    {
      icon: Users,
      title: "Digital convenience. Human advice.",
      description: "Technology-powered solutions with personalized human touch"
    },
    {
      icon: Award,
      title: "Transparent, unbiased recommendations",
      description: "Honest advice focused on your financial well-being"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Clients", icon: Users },
    { number: "₹500Cr+", label: "Assets Under Management", icon: TrendingUp },
    { number: "15+", label: "Years Experience", icon: Award },
    { number: "99.8%", label: "Client Satisfaction", icon: Heart }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-gradient-hero rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Lightbulb className="w-4 h-4" />
                About Us
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                <span className="bg-gradient-primary bg-clip-text text-transparent">Simplifying Wealth.</span>
                <br />
                Securing Futures
              </h2>
              
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Aadhaar Capital is a modern Indian financial solutions platform dedicated to helping individuals 
                  and families plan, grow, and protect their wealth.
                </p>
                <p>
                  We offer goal-based financial services that make smart money decisions accessible to everyone, 
                  from working professionals to growing families.
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Why Choose Aadhaar Capital?</h3>
              <div className="space-y-4">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-gradient-secondary/50 hover:bg-gradient-secondary transition-colors">
                      <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                        <p className="text-muted-foreground text-sm">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="gradient" size="lg">
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More About Us
              </Button>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            {/* Mission Card */}
            <Card className="bg-gradient-primary text-white shadow-glow border-0">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-8 h-8" />
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                </div>
                <p className="text-white/90 leading-relaxed">
                  To democratize financial planning and make wealth creation accessible to every Indian family 
                  through innovative technology and expert guidance.
                </p>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card key={index} className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-secondary flex items-center justify-center mx-auto mb-3">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-2xl font-bold text-foreground mb-1">{stat.number}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Values Card */}
            <Card className="bg-white/90 backdrop-blur-sm border-white/20 shadow-elegant">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-primary" />
                  Our Values
                </h3>
                <div className="space-y-3">
                  {[
                    "Transparency in all our recommendations",
                    "Client-first approach in every decision",
                    "Continuous innovation in financial solutions",
                    "Building long-term relationships"
                  ].map((value, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-20 text-center bg-gradient-secondary/50 rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Financial Future?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied clients who trust Aadhaar Capital for their financial planning needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 text-sm">
              <span>📞 +91 8369158069</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span>✉️ Support@aadhaarcapital.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
