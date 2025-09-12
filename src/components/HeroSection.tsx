import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, TrendingUp, Shield, Heart, PiggyBank, Calculator, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import OptimizedImage from "@/components/ui/optimized-image";
import heroImage from "@/assets/financial3.jpg";


// Unified product options for all carousel slides
const productOptions = [
  // Health Insurance
  { value: "individual-health", label: "Individual Health Plan" },
  { value: "family-health", label: "Family Health Plan" },
  { value: "senior-health", label: "Senior Citizen Plan" },
  { value: "critical-illness", label: "Critical Illness Plan" },

  // SIP Investment
  { value: "equity-sip", label: "Equity SIP" },
  { value: "debt-sip", label: "Debt SIP" },
  { value: "hybrid-sip", label: "Hybrid SIP" },
  { value: "elss-sip", label: "Tax Saving SIP" },

  // Retirement Planning
  { value: "nps", label: "National Pension Scheme" },
  { value: "ppf", label: "Public Provident Fund" },
  { value: "retirement-annuity", label: "Retirement Annuity" },
  { value: "retirement-mutual-fund", label: "Retirement Mutual Funds" },

  // Financial Planning
  { value: "goal-planning", label: "Goal-based Planning" },
  { value: "tax-planning", label: "Tax Planning" },
  { value: "wealth-management", label: "Wealth Management" },
  { value: "estate-planning", label: "Estate Planning" },

  // Additional Services
  { value: "mutual-funds", label: "Mutual Funds" },
  { value: "life-insurance", label: "Life Insurance" },
  { value: "term-insurance", label: "Term Insurance" },
  { value: "investment-advisory", label: "Investment Advisory" }
];

// Carousel data for different financial services
const carouselData = [
  {
    id: 1,
    title: "Secure your family with the rising cost of medical expences with our",
    highlight: "Health Insurance",
    subtitle: "planning",
    description: "Secure your family's future with comprehensive health coverage. Get personalized insurance plans, instant claim processing, and 24/7 medical support all in one place.",
    icon: Heart,
    color: "text-red-500",
    bgGradient: "from-red-100 to-pink-100",
    image: heroImage
  },
  {
    id: 2,
    title: "Build wealth with",
    highlight: "SIP Investment",
    subtitle: "planning",
    description: "Start your systematic investment journey with our smart SIP solutions. Get automated investing, portfolio diversification, and wealth creation strategies tailored for you.",
    icon: PiggyBank,
    color: "text-green-500",
    bgGradient: "from-green-100 to-emerald-100",
    image: heroImage
  },
  {
    id: 3,
    title: "Build worry-free golden years with",
    highlight: "Retirement Planning",
    subtitle: "strategies",
    description: "Plan your golden years with confidence. Get personalized retirement solutions, pension planning, and long-term wealth accumulation strategies for a secure future.",
    icon: Calculator,
    color: "text-blue-500",
    bgGradient: "from-blue-100 to-indigo-100",
    image: heroImage
  },
  {
    id: 4,
    title: "Build your financial road map for life with our comprehensive",
    highlight: "Financial Planning",
    subtitle: "expertise",
    description: "Achieve your financial goals with comprehensive planning services. Get expert advice on investments, tax planning, and wealth management strategies.",
    icon: TrendingUp,
    color: "text-purple-500",
    bgGradient: "from-purple-100 to-violet-100",
    image: heroImage
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [formData, setFormData] = useState({
    product: "",
    name: "",
    email: "",
    mobile: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 4000); // Changed to 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Handle mouse enter/leave for hover functionality
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.product || !formData.name || !formData.email || !formData.mobile) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Basic mobile number validation (10 digits)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobile.replace(/\D/g, ''))) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsSubmitting(true);

    try {
      // Debug: Log the data being sent
      console.log('Form data being sent:', formData);

      // Try sending as JSON first (like Postman might be doing)
      const dataToSend = {
        ...formData,
        subject: 'Homepage Hero Form Inquiry',
        formType: 'Homepage Hero Form',
        pageForm: 'Homepage Hero Section'
      };

      console.log('JSON data being sent:', dataToSend);

      let response = await fetch('https://aadhar-capital-backend.vercel.app/submit-form/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      // If JSON fails, try FormData
      if (!response.ok) {
        console.log('JSON request failed, trying FormData...');

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataToSend.append(key, value);
        });
        formDataToSend.append('subject', 'Homepage Hero Form Inquiry');
        formDataToSend.append('formType', 'Homepage Hero Form');
        formDataToSend.append('pageForm', 'Homepage Hero Section');

        // Debug: Log FormData contents
        console.log('FormData contents:');
        for (let [key, value] of formDataToSend.entries()) {
          console.log(key, value);
        }

        response = await fetch('https://aadhar-capital-backend.vercel.app/submit-form/', {
          method: 'POST',
          body: formDataToSend,
        });
      }

      // Debug: Log response details
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      const responseText = await response.text();
      console.log('Response body:', responseText);

      if (response.ok) {
        const responseData = JSON.parse(responseText);
        console.log('Success response:', responseData);

        toast.success("Thank You for Enquiring! Our Team Representative will get back to you soon.", {
          duration: 5000,
        });

        // Reset form
        setFormData({
          product: "",
          name: "",
          email: "",
          mobile: ""
        });
      } else {
        console.error('Error response:', responseText);
        throw new Error(`Failed to submit form: ${response.status} - ${responseText}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentData = carouselData[currentSlide];
  const IconComponent = currentData.icon;

  return (
    <section
      className="relative min-h-screen bg-gradient-secondary overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-hero rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Left Content - Text and Trust Indicators */}
          <div className="space-y-6">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-4">
                <div className={`p-3 rounded-full bg-gradient-to-r ${currentData.bgGradient}`}>
                  <IconComponent className={`w-8 h-8 ${currentData.color}`} />
                </div>
                <div className="flex gap-2">
                  {carouselData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide ? 'bg-primary w-8' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <h1 className="heading-section">
                {currentData.title}{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  {currentData.highlight}
                </span>{" "}
                {currentData.subtitle}
              </h1>
              <p className="body-lead max-w-2xl">
                {currentData.description}
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-elegant border border-white/20">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-primary" />
                  <div>
                    <h4 className="font-semibold">Bank-grade Security</h4>
                    <p className="text-sm text-muted-foreground">Your data is protected with industry-leading encryption</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <div>
                    <h4 className="font-semibold">Expert Guidance</h4>
                    <p className="text-sm text-muted-foreground">Get personalized advice from certified professionals</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <IconComponent className={`w-6 h-6 ${currentData.color}`} />
                  <div>
                    <h4 className="font-semibold">Personalized Solutions</h4>
                    <p className="text-sm text-muted-foreground">Tailored plans that fit your unique needs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Features */}
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-elegant border border-white/20">
              <h4 className="heading-sub mb-4 text-center">Why Choose Aadhaar Capital?</h4>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="text-center">
                  <div className="heading-card text-primary">2K+</div>
                  <div className="body-secondary">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="heading-card text-primary">₹100Cr+</div>
                  <div className="body-secondary">Assets Managed</div>
                </div>
              </div>
            </div>

            {/* Carousel Navigation */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex gap-2">
                {carouselData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-primary scale-125' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Right Content - Image and Form */}
          <div className="space-y-6 mt-8 lg:mt-12">
            {/* Hero Image - Optimized */}
            <div className="relative">
              <div className="relative z-10 transition-all duration-500">
                <OptimizedImage
                  src={currentData.image}
                  alt={`${currentData.highlight} - Professional financial services`}
                  className="w-full h-48 sm:h-56 md:h-64 lg:h-72 rounded-2xl sm:rounded-3xl shadow-glow"
                  priority={currentSlide === 0} // Only prioritize first slide
                  lazy={currentSlide !== 0}
                  fetchpriority={currentSlide === 0 ? "high" : "auto"}
                />
              </div>
            </div>

            {/* CTA Form - Below the image */}
            <div id="enquiry-form" className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-elegant border border-white/20">
              <h3 className="heading-card mb-4">
                Start your Wealth Creation Journey with
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Select value={formData.product} onValueChange={(value) => handleInputChange("product", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Product" />
                  </SelectTrigger>
                  <SelectContent>
                    {productOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
                <Input
                  type="tel"
                  placeholder="Mobile number"
                  value={formData.mobile}
                  onChange={(e) => {
                    // Only allow numbers and limit to 10 digits
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    handleInputChange("mobile", value);
                  }}
                  required
                />

                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Get Started Now"}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </form>

              <p className="text-xs text-muted-foreground mt-3">
                By continuing, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;