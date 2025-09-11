import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PiggyBank, User, CheckCircle, Shield, TrendingUp, Calculator } from "lucide-react";
import { toast } from "sonner";
import RetirementImage from "@/assets/RetirementPlanning.jpg";
import RetirementImage2 from "@/assets/Retirement2.jpg";
import RetirementImage3 from "@/assets/Retirement3.jpg";
import RetirementImage4 from "@/assets/Retirement4.jpg";
import RetirementImage5 from "@/assets/Retirement5.jpg";




const RetirementPlanning = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    pincode: "",
    age: "",
    retirementYear: "",
    monthlyIncome: ""
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = ['name', 'email', 'mobile', 'gender', 'age', 'retirementYear', 'monthlyIncome'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
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
      formDataToSend.append('subject', 'Retirement Planning Inquiry');
      formDataToSend.append('formType', 'Retirement Planning');
      formDataToSend.append('pageForm', 'Retirement Planning Page');

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
          pincode: "",
          age: "",
          retirementYear: "",
          monthlyIncome: ""
        });
        setAgreedToTerms(false);
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
    "Personalized retirement plans",
    "Inflation-adjusted strategies", 
    "Tax-efficient investments",
    "Expert financial guidance"
  ];

  return (
    <div className="min-h-screen bg-gradient-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-gradient-hero rounded-full blur-3xl"></div>
      </div>

      <Header />

      <main className="pt-4 relative">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid lg:grid-cols-2 gap-8 items-start px-4 sm:px-6 lg:px-8">
            {/* Left Content */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
                <PiggyBank className="w-4 h-4" />
                RETIREMENT PLANNING
              </div>
              
              <div className="space-y-3">
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                  Build a worry-free retirement with
                  <span className="bg-gradient-primary bg-clip-text text-transparent"> smart planning</span>
                </h1>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
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
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm font-medium">Secure Planning</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm font-medium">Growth Focused</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-2">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm font-medium">Custom Strategy</div>
                </div>
              </div>

              {/* Added Image for Height Balance */}
              <div className="mt-8 hidden lg:block">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={RetirementImage}
                    alt="Retirement Planning Success"
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Plan Your Golden Years</h3>
                    <p className="text-sm opacity-90">Build wealth for a comfortable retirement</p>
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
                        placeholder="Please enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="border-0 border-b-2 border-gray-200 rounded-none focus:border-primary bg-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobile" className="text-sm font-medium text-gray-600">Mobile No.</Label>
                      <Input
                        id="mobile"
                        placeholder="Enter Your mobile number"
                        value={formData.mobile}
                        onChange={(e) => handleInputChange("mobile", e.target.value)}
                        className="border-0 border-b-2 border-gray-200 rounded-none focus:border-primary bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-600">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email id"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="border-0 border-b-2 border-gray-200 rounded-none focus:border-primary bg-transparent"
                    />
                  </div>

                  {/* Pincode and Age */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pincode" className="text-sm font-medium text-gray-600">Pincode</Label>
                      <Input
                        id="pincode"
                        placeholder="Your pincode"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange("pincode", e.target.value)}
                        className="border-0 border-b-2 border-gray-200 rounded-none focus:border-primary bg-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age" className="text-sm font-medium text-gray-600">Current Age</Label>
                      <Input
                        id="age"
                        placeholder="Enter in years"
                        value={formData.age}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                        className="border-0 border-b-2 border-gray-200 rounded-none focus:border-primary bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Year of Retirement */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">Year of Retirement</Label>
                    <Select value={formData.retirementYear} onValueChange={(value) => handleInputChange("retirementYear", value)}>
                      <SelectTrigger className="border-0 border-b-2 border-gray-200 rounded-none focus:border-primary bg-transparent">
                        <SelectValue placeholder="Select year of retirement" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 40 }, (_, i) => 2025 + i).map(year => (
                          <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Monthly Income */}
                  <div className="space-y-2">
                    <Label htmlFor="monthlyIncome" className="text-sm font-medium text-gray-600">Monthly Income</Label>
                    <Input
                      id="monthlyIncome"
                      placeholder="Enter your monthly income"
                      value={formData.monthlyIncome}
                      onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                      className="border-0 border-b-2 border-gray-200 rounded-none focus:border-primary bg-transparent"
                    />
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start space-x-2 pt-4">
                    <Checkbox 
                      id="terms" 
                      checked={agreedToTerms}
                      onCheckedChange={setAgreedToTerms}
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

        {/* Comprehensive Retirement Planning Content */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Why Retirement Planning Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Why Retirement Planning is Crucial</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start planning today to secure your financial future and maintain your lifestyle after retirement
            </p>
          </div>

          {/* Statistics Section */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">₹2.5 Cr</div>
              <div className="text-gray-600">Average retirement corpus needed</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">25 Years</div>
              <div className="text-gray-600">Average retirement duration</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">6-7%</div>
              <div className="text-gray-600">Annual inflation rate</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">12%</div>
              <div className="text-gray-600">Expected returns from equity</div>
            </div>
          </div>

          {/* Image and Content Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                    src={RetirementImage}
                    alt="Retirement Planning Strategy"
                    className="w-full h-80 object-cover rounded-lg shadow-lg"
                />

            </div>
            <div>
              <h3 className="text-3xl font-bold mb-6">Start Early, Retire Wealthy</h3>
              <p className="text-gray-600 mb-6">
                The power of compounding works best when you start early. Even small amounts invested
                regularly can grow into substantial wealth over time. Our retirement planning strategies
                help you build a corpus that can sustain your lifestyle post-retirement.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Systematic Investment Planning</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Tax-efficient Investment Options</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Regular Portfolio Review</span>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Section */}
          <div className="bg-gray-50 py-16 rounded-lg">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Retirement Planning Insights</h2>
              <p className="text-xl text-gray-600">Expert advice and strategies for a secure retirement</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Blog Post 1 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={RetirementImage2}
                  alt="Retirement Planning Tips"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">5 Essential Retirement Planning Tips</h3>
                  <p className="text-gray-600 mb-4">
                    Discover the key strategies that can help you build a substantial retirement corpus
                    and secure your financial future.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">5 min read</span>
                    <Button variant="outline" size="sm">Read More</Button>
                  </div>
                </div>
              </div>

              {/* Blog Post 2 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={RetirementImage4}
                  alt="Investment Options"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Best Investment Options for Retirement</h3>
                  <p className="text-gray-600 mb-4">
                    Compare different investment vehicles like PPF, EPF, NPS, and mutual funds
                    for retirement planning.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">7 min read</span>
                    <Button variant="outline" size="sm">Read More</Button>
                  </div>
                </div>
              </div>

              {/* Blog Post 3 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={RetirementImage5}
                  alt="Retirement Calculator"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">How Much Do You Need for Retirement?</h3>
                  <p className="text-gray-600 mb-4">
                    Use our retirement calculator to determine the exact amount you need
                    to maintain your current lifestyle.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">4 min read</span>
                    <Button variant="outline" size="sm">Read More</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Retirement Planning Steps */}
          <div className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Your Retirement Planning Journey</h2>
              <p className="text-xl text-gray-600">Follow these steps to create a comprehensive retirement plan</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Assess Current Situation</h3>
                <p className="text-gray-600">
                  Evaluate your current income, expenses, and existing investments to understand your starting point.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Set Retirement Goals</h3>
                <p className="text-gray-600">
                  Define your retirement lifestyle, expected expenses, and the age at which you want to retire.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Create Investment Strategy</h3>
                <p className="text-gray-600">
                  Develop a diversified investment portfolio that aligns with your risk tolerance and time horizon.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Monitor & Adjust</h3>
                <p className="text-gray-600">
                  Regularly review your progress and make adjustments to stay on track with your retirement goals.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white py-16 rounded-lg shadow-lg">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600">Get answers to common retirement planning questions</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">When should I start retirement planning?</h3>
                <p className="text-gray-600">
                  The best time to start retirement planning is as early as possible, ideally in your 20s or 30s.
                  Starting early gives you the advantage of compounding returns and allows you to build a larger corpus
                  with smaller monthly investments.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">How much should I save for retirement?</h3>
                <p className="text-gray-600">
                  A general rule is to save 10-15% of your income for retirement. However, the exact amount depends on
                  your lifestyle goals, expected retirement age, and current financial situation. Our retirement calculator
                  can help you determine the right amount for your specific needs.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">What are the best investment options for retirement?</h3>
                <p className="text-gray-600">
                  Popular retirement investment options include PPF, EPF, NPS, ELSS mutual funds, and equity mutual funds.
                  The best mix depends on your age, risk tolerance, and retirement timeline. Younger investors can take
                  more equity exposure, while those closer to retirement should focus on debt instruments.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">How does inflation affect retirement planning?</h3>
                <p className="text-gray-600">
                  Inflation significantly impacts retirement planning as it reduces the purchasing power of money over time.
                  With an average inflation rate of 6-7% in India, what costs ₹1 lakh today might cost ₹3-4 lakhs after
                  20 years. This is why it's crucial to invest in assets that can beat inflation.
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

export default RetirementPlanning;
