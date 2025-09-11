import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { TrendingUp, User, CheckCircle, Target, BarChart3, Zap } from "lucide-react";
import { toast } from "sonner";
import sipImage from "@/assets/SIP.jpg";
import sipImage2 from "@/assets/SIP2.jpg";
import sipImag3 from "@/assets/SIP3.jpg";
import sipImag4 from "@/assets/sipvslump.png";





const SipInvestment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    riskTolerance: "",
    investmentAmount: "",
    investmentDuration: ""
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = ['name', 'email', 'mobile', 'gender', 'riskTolerance', 'investmentAmount', 'investmentDuration'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!agreedToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      formDataToSend.append('subject', 'SIP Investment Inquiry');
      formDataToSend.append('formType', 'SIP Investment');
      formDataToSend.append('pageForm', 'SIP Investment Page');

      const response = await fetch('https://aadhar-capital-backend.vercel.app/submit-form/', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        // Show success toast
        toast.success("Thank You for Enquiring! Our Team Representative will get back to you soon.", {
          duration: 5000,
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          mobile: "",
          gender: "",
          riskTolerance: "",
          investmentAmount: "",
          investmentDuration: ""
        });
        setAgreedToTerms(false);

        // Navigate to SIP Calculator after successful submission
        setTimeout(() => {
          navigate('/sip-calculator', {
            state: { formData }
          });
        }, 2000);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    "SIP planning & optimization",
    "Mutual fund selection", 
    "Goal-based investing",
    "Regular portfolio review"
  ];

  const sipPageSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "SIP Investment Services",
    "description": "Systematic Investment Plan (SIP) services for mutual fund investments with expert guidance and portfolio management.",
    "provider": {
      "@type": "FinancialService",
      "name": "Aadhaar Capital"
    },
    "serviceType": "Investment Advisory",
    "areaServed": "India",
    "offers": {
      "@type": "Offer",
      "description": "Professional SIP investment planning and management services"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-gradient-hero rounded-full blur-3xl"></div>
      </div>

      <SEO
        title="SIP Investment - Systematic Investment Plan Services"
        description="Start your SIP investment journey with Aadhaar Capital. Expert guidance on systematic investment plans, mutual fund selection, and goal-based investing. Build wealth systematically with professional portfolio management."
        keywords="SIP investment, systematic investment plan, mutual funds SIP, SIP calculator, investment planning, wealth creation, portfolio management, mutual fund investment, SIP benefits, goal based investing"
        url="https://Aadhaarcapital.com/sip-investment"
        schemaData={sipPageSchema}
      />
      <Header />

      <main className="pt-4 relative">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Content */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                SIP INVESTMENT
              </div>
              
              <div className="space-y-3">
                <h1 className="page-title">
                  Start your SIP journey with
                  <span className="bg-gradient-primary bg-clip-text text-transparent"> smart investing</span>
                </h1>
                <p className="page-subtitle">
                  Build wealth systematically with our expert-guided SIP investment plans.
                  Start with as little as ₹500/month and watch your money grow through the power of compounding.
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-2">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm font-medium">Goal Focused</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-2">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm font-medium">Data Driven</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-2">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm font-medium">Quick Start</div>
                </div>
              </div>

              {/* Added Image for Height Balance */}
              <div className="mt-8 hidden lg:block">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={sipImage}
                    alt="SIP Investment Growth"
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Grow Your Wealth Systematically</h3>
                    <p className="text-sm opacity-90">Start your SIP journey today</p>
                  </div>
                </div>
              </div>
            </div>



            {/* Right Content - Form */}
            <Card className="bg-white/90 backdrop-blur-sm shadow-glow border-white/20">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                  <User className="w-6 h-6 text-primary" />
                  Tell us about yourself
                </CardTitle>
                <div className="w-12 h-1 bg-gradient-primary rounded-full"></div>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Gender Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Gender</Label>
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(value) => handleInputChange("gender", value)}
                      className="flex gap-4"
                    >
                      <div className="flex-1">
                        <Label
                          htmlFor="male"
                          className={`flex items-center justify-center gap-2 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-all ${
                            formData.gender === 'male'
                              ? 'border-blue-500 bg-blue-50 shadow-md'
                              : 'border-gray-200'
                          }`}
                        >
                          <RadioGroupItem value="male" id="male" className="sr-only" />
                          <User className={`w-5 h-5 ${formData.gender === 'male' ? 'text-blue-600' : 'text-gray-400'}`} />
                          <span className={`font-medium ${formData.gender === 'male' ? 'text-blue-600' : 'text-gray-600'}`}>Male</span>
                        </Label>
                      </div>
                      <div className="flex-1">
                        <Label
                          htmlFor="female"
                          className={`flex items-center justify-center gap-2 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-all ${
                            formData.gender === 'female'
                              ? 'border-pink-500 bg-pink-50 shadow-md'
                              : 'border-gray-200'
                          }`}
                        >
                          <RadioGroupItem value="female" id="female" className="sr-only" />
                          <User className={`w-5 h-5 ${formData.gender === 'female' ? 'text-pink-600' : 'text-gray-400'}`} />
                          <span className={`font-medium ${formData.gender === 'female' ? 'text-pink-600' : 'text-gray-600'}`}>Female</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Name and Mobile in same row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-gray-600">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="border-0 border-b-2 border-gray-200 rounded-none focus:border-primary bg-transparent"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobile" className="text-sm font-medium text-gray-600">Mobile No.</Label>
                      <Input
                        id="mobile"
                        placeholder="Enter mobile number"
                        value={formData.mobile}
                        onChange={(e) => handleInputChange("mobile", e.target.value)}
                        className="border-0 border-b-2 border-gray-200 rounded-none focus:border-primary bg-transparent"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-600">Email Id</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="border-0 border-b-2 border-gray-200 rounded-none focus:border-primary bg-transparent"
                      required
                    />
                  </div>


                  {/* Risk Tolerance */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">Risk Tolerance</Label>
                    <Select value={formData.riskTolerance} onValueChange={(value) => handleInputChange("riskTolerance", value)}>
                      <SelectTrigger className="border-0 border-b-2 border-gray-200 rounded-none focus:border-primary bg-transparent">
                        <SelectValue placeholder="Select your risk tolerance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Risk (Conservative)</SelectItem>
                        <SelectItem value="moderate">Moderate Risk (Balanced)</SelectItem>
                        <SelectItem value="high">High Risk (Aggressive)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Investment Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="investmentAmount" className="text-sm font-medium text-gray-600">Monthly Investment Amount</Label>
                    <Input
                      id="investmentAmount"
                      placeholder="Enter monthly SIP amount"
                      value={formData.investmentAmount}
                      onChange={(e) => handleInputChange("investmentAmount", e.target.value)}
                      className="border-0 border-b-2 border-gray-200 rounded-none focus:border-primary bg-transparent"
                    />
                  </div>

                  {/* Investment Duration */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">Investment Duration</Label>
                    <Select value={formData.investmentDuration} onValueChange={(value) => handleInputChange("investmentDuration", value)}>
                      <SelectTrigger className="border-0 border-b-2 border-gray-200 rounded-none focus:border-primary bg-transparent">
                        <SelectValue placeholder="Select investment duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-3">1-3 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start space-x-2 pt-4">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                      className="mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                      By Clicking on Get Started, I agree to the{" "}
                      <span className="text-primary underline cursor-pointer">Terms and Conditions</span>
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold rounded-lg"
                    disabled={!agreedToTerms || isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Get Started"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Comprehensive SIP Investment Content */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Why SIP Investment Section */}
          <div className="text-center mb-16">
            <h2 className="heading-section mb-6">Why SIP is the Smart Way to Invest</h2>
            <p className="body-lead max-w-3xl mx-auto">
              Start small, dream big. SIP helps you build wealth systematically with the power of compounding
            </p>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">₹500</div>
              <div className="text-gray-600">Minimum SIP amount</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">12-15%</div>
              <div className="text-gray-600">Average annual returns</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">₹1 Cr+</div>
              <div className="text-gray-600">Wealth created in 20 years</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">5000+</div>
              <div className="text-gray-600">Mutual fund schemes</div>
            </div>
          </div>

          {/* Image and Content Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src={sipImage2}
                alt="SIP Investment Growth"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-6">The Power of Systematic Investing</h3>
              <p className="text-gray-600 mb-6">
                SIP (Systematic Investment Plan) is a disciplined approach to investing that helps you
                build wealth over time. By investing a fixed amount regularly, you benefit from rupee
                cost averaging and the magic of compounding returns.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Rupee Cost Averaging Benefits</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Disciplined Investment Approach</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Power of Compounding</span>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Section */}
          <div className="bg-gray-50 py-16 px-8 rounded-lg">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">SIP Investment Insights</h2>
              <p className="text-xl text-gray-600">Expert guidance for successful SIP investing</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Blog Post 1 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={sipImag4}
                  alt="SIP vs Lump Sum"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">SIP vs Lump Sum: Which is Better?</h3>
                  <p className="text-gray-600 mb-4">
                    Understand the key differences between SIP and lump sum investments
                    and choose the right strategy for your financial goals.
                  </p>
                  
                </div>
              </div>

              {/* Blog Post 2 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={sipImag3}
                  alt="Best SIP Funds"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Top 10 SIP Mutual Funds in 2024</h3>
                  <p className="text-gray-600 mb-4">
                    Discover the best performing SIP mutual funds across different
                    categories and risk profiles for optimal returns.
                  </p>
                  
                </div>
              </div>

              {/* Blog Post 3 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={sipImage}
                  alt="SIP Calculator"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">How to Calculate SIP Returns</h3>
                  <p className="text-gray-600 mb-4">
                    Learn to use SIP calculators effectively and understand
                    how your investments can grow over different time periods.
                  </p>
                  
                </div>
              </div>
            </div>
          </div>

          {/* SIP Investment Steps */}
          <div className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Your SIP Investment Journey</h2>
              <p className="text-xl text-gray-600">Simple steps to start your wealth creation journey</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Choose Your Goal</h3>
                <p className="text-gray-600">
                  Define your financial objectives - whether it's buying a home, child's education, or retirement planning.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Select Right Funds</h3>
                <p className="text-gray-600">
                  Choose mutual funds based on your risk appetite, investment horizon, and financial goals.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Start Your SIP</h3>
                <p className="text-gray-600">
                  Begin with a comfortable amount and set up automatic monthly investments for consistency.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Monitor & Grow</h3>
                <p className="text-gray-600">
                  Track your investments regularly and increase SIP amounts as your income grows.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white py-16 rounded-lg shadow-lg">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">SIP Investment FAQs</h2>
              <p className="text-xl text-gray-600">Get answers to common SIP investment questions</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">What is the minimum amount to start SIP?</h3>
                <p className="text-gray-600">
                  You can start SIP with as low as ₹500 per month in most mutual fund schemes. However,
                  some funds may have higher minimum amounts. It's better to start with what you can
                  afford consistently rather than a large amount you can't sustain.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">Can I stop or pause my SIP anytime?</h3>
                <p className="text-gray-600">
                  Yes, SIPs offer complete flexibility. You can pause, stop, or modify your SIP amount
                  anytime without any penalty. However, it's recommended to continue SIPs for long-term
                  wealth creation to benefit from compounding.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">Which type of mutual fund is best for SIP?</h3>
                <p className="text-gray-600">
                  The best mutual fund depends on your risk tolerance and investment horizon. For long-term
                  goals (5+ years), equity funds offer higher returns. For shorter goals, debt funds provide
                  stability. Balanced funds offer a mix of both.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">How does rupee cost averaging work in SIP?</h3>
                <p className="text-gray-600">
                  Rupee cost averaging means you buy more units when prices are low and fewer units when
                  prices are high. This averages out your purchase cost over time, reducing the impact
                  of market volatility on your investments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SipInvestment;
