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
import { Calculator, User, CheckCircle, Target, PieChart, Compass } from "lucide-react";
import { toast } from "sonner";
import Fin1 from "@/assets/financial.jpg";
import Fin2 from "@/assets/financial2.jpg";
import Fin3 from "@/assets/financial3.jpg";
import Fin4 from "@/assets/fin4.jpg";
import Fin5 from "@/assets/fin5.jpg";



const FinancialPlanning = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    age: "",
    monthlyIncome: "",
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = ['name', 'email', 'mobile', 'gender', 'age', 'monthlyIncome'];
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
      formDataToSend.append('subject', 'Financial Planning Inquiry');
      formDataToSend.append('formType', 'Financial Planning');
      formDataToSend.append('pageForm', 'Financial Planning Page');

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
          age: "",
          monthlyIncome: "",
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
    "Comprehensive financial roadmap",
    "Life stage planning", 
    "Goal achievement strategies",
    "Regular portfolio monitoring"
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
          <div className="grid lg:grid-cols-2 gap-8 items-start px-2">
            {/* Left Content */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium">
                <Calculator className="w-4 h-4" />
                FINANCIAL PLANNING
              </div>
              
              <div className="space-y-3">
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                  Build your financial roadmap for
                  <span className="bg-gradient-primary bg-clip-text text-transparent"> life's journey</span>
                </h1>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
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
                  <div className="text-sm font-medium">Goal Oriented</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-2">
                    <PieChart className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm font-medium">Diversified</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-2">
                    <Compass className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm font-medium">Expert Guidance</div>
                </div>
              </div>

              {/* Added Image for Height Balance */}
              <div className="mt-8 hidden lg:block">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={Fin1}
                    alt="Financial Planning Success"
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Plan Your Financial Future</h3>
                    <p className="text-sm opacity-90">Achieve your dreams with smart planning</p>
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

                  {/* Age */}
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-sm font-medium text-gray-600">Age</Label>
                    <Input
                      id="age"
                      placeholder="Enter your age"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      className="border-0 border-b-2 border-gray-200 rounded-none focus:border-primary bg-transparent"
                      required
                    />
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

        {/* Comprehensive Financial Planning Content */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Why Financial Planning Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Why Financial Planning Matters</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create a roadmap to achieve your life goals with strategic financial planning
            </p>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 px-2">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">70%</div>
              <div className="text-gray-600">Indians lack financial plan</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">20%</div>
              <div className="text-gray-600">Recommended savings rate</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">6 Months</div>
              <div className="text-gray-600">Emergency fund needed</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">12-15%</div>
              <div className="text-gray-600">Expected equity returns</div>
            </div>
          </div>

          {/* Image and Content Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src={Fin2}
                alt="Financial Planning Strategy"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-6">Your Financial Success Blueprint</h3>
              <p className="text-gray-600 mb-6">
                Financial planning is not just about saving money - it's about creating a
                comprehensive strategy to achieve your life goals. From buying a home to
                securing retirement, proper planning makes every dream achievable.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Goal-based Investment Strategy</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Risk Assessment & Management</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Tax Optimization Planning</span>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Section */}
          <div className="bg-gray-50 py-16 rounded-lg">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Financial Planning Insights</h2>
              <p className="text-xl text-gray-600">Expert advice for building wealth and achieving goals</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Blog Post 1 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={Fin3}
                  alt="Financial Goals"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Setting SMART Financial Goals</h3>
                  <p className="text-gray-600 mb-4">
                    Learn how to set Specific, Measurable, Achievable, Relevant, and
                    Time-bound financial goals for better success.
                  </p>
                  
                </div>
              </div>

              {/* Blog Post 2 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={Fin4}
                  alt="Emergency Fund"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Building Your Emergency Fund</h3>
                  <p className="text-gray-600 mb-4">
                    Discover why emergency funds are crucial and how to build one
                    that covers 6-12 months of your expenses.
                  </p>
                  
                </div>
              </div>

              {/* Blog Post 3 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={Fin5}
                  alt="Investment Portfolio"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Asset Allocation Strategies</h3>
                  <p className="text-gray-600 mb-4">
                    Understand how to diversify your investment portfolio across
                    different asset classes for optimal returns.
                  </p>
                  
                </div>
              </div>
            </div>
          </div>

          {/* Financial Planning Steps */}
          <div className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Your Financial Planning Journey</h2>
              <p className="text-xl text-gray-600">Systematic approach to financial success</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Financial Assessment</h3>
                <p className="text-gray-600">
                  Analyze your current financial situation, income, expenses, assets, and liabilities.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Goal Setting</h3>
                <p className="text-gray-600">
                  Define short-term and long-term financial goals with specific timelines and amounts.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Strategy Creation</h3>
                <p className="text-gray-600">
                  Develop investment and savings strategies aligned with your risk profile and goals.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Monitor & Adjust</h3>
                <p className="text-gray-600">
                  Regularly review and adjust your financial plan based on life changes and market conditions.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white py-16 rounded-lg shadow-lg">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Financial Planning FAQs</h2>
              <p className="text-xl text-gray-600">Common questions about financial planning</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">When should I start financial planning?</h3>
                <p className="text-gray-600">
                  The best time to start financial planning is now, regardless of your age or income.
                  Starting early gives you the advantage of time and compounding. Even if you're in
                  your 40s or 50s, it's never too late to create a financial plan.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">How much should I save each month?</h3>
                <p className="text-gray-600">
                  A general rule is to save at least 20% of your income. However, the exact amount
                  depends on your goals, current financial situation, and expenses. Start with what
                  you can afford and gradually increase your savings rate.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">Do I need a financial advisor?</h3>
                <p className="text-gray-600">
                  While you can do basic financial planning yourself, a qualified financial advisor
                  can provide valuable expertise, especially for complex situations like tax planning,
                  estate planning, or managing large portfolios.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">How often should I review my financial plan?</h3>
                <p className="text-gray-600">
                  Review your financial plan at least annually or whenever you experience major life
                  changes like marriage, childbirth, job change, or inheritance. Regular reviews ensure
                  your plan stays aligned with your current situation and goals.
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

export default FinancialPlanning;
