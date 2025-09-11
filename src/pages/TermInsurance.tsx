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
import { Shield, User, CheckCircle, Heart, Umbrella, Award } from "lucide-react";
import { toast } from "sonner";
import TermIns from "@/assets/healthins.jpg";
import TermIns2 from "@/assets/family.jpg";
import TermIns3 from "@/assets/termvswhole.svg";
import TermIns4 from "@/assets/term_insuarance.avif";
import TermIns5 from "@/assets/term.avif";



const TermInsurance = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    age: "",
    annualIncome: "",
    coverageAmount: ""
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = ['name', 'email', 'mobile', 'gender', 'age', 'annualIncome', 'coverageAmount'];
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
      formDataToSend.append('subject', 'Term Insurance Inquiry');
      formDataToSend.append('formType', 'Term Insurance');
      formDataToSend.append('pageForm', 'Term Insurance Page');

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
          annualIncome: "",
          coverageAmount: ""
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
    "Term insurance planning",
    "Coverage assessment", 
    "Premium optimization",
    "Family protection guarantee"
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
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium">
                <Shield className="w-4 h-4" />
                TERM INSURANCE
              </div>
              
              <div className="space-y-3">
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                  Secure your family's future with
                  <span className="bg-gradient-primary bg-clip-text text-transparent"> comprehensive coverage</span>
                </h1>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
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
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm font-medium">Family First</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-2">
                    <Umbrella className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm font-medium">Full Protection</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-2">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm font-medium">Best Rates</div>
                </div>
              </div>

              {/* Added Image for Height Balance */}
              <div className="mt-8 hidden lg:block">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={TermIns}
                    alt="Family Protection with Term Insurance"
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Protect What Matters Most</h3>
                    <p className="text-sm opacity-90">Secure your family's financial future today</p>
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

                  {/* Annual Income */}
                  <div className="space-y-2">
                    <Label htmlFor="annualIncome" className="text-sm font-medium text-gray-600">Annual Income</Label>
                    <Input
                      id="annualIncome"
                      placeholder="Enter your annual income"
                      value={formData.annualIncome}
                      onChange={(e) => handleInputChange("annualIncome", e.target.value)}
                      className="border-0 border-b-2 border-gray-200 rounded-none focus:border-primary bg-transparent"
                    />
                  </div>

                  {/* Coverage Amount */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">Desired Coverage Amount</Label>
                    <Select value={formData.coverageAmount} onValueChange={(value) => handleInputChange("coverageAmount", value)}>
                      <SelectTrigger className="border-0 border-b-2 border-gray-200 rounded-none focus:border-primary bg-transparent">
                        <SelectValue placeholder="Select coverage amount" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10lakh">₹10 Lakh</SelectItem>
                        <SelectItem value="25lakh">₹25 Lakh</SelectItem>
                        <SelectItem value="50lakh">₹50 Lakh</SelectItem>
                        <SelectItem value="1crore">₹1 Crore</SelectItem>
                        <SelectItem value="2crore">₹2 Crore</SelectItem>
                        <SelectItem value="5crore">₹5 Crore</SelectItem>
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

        {/* Comprehensive Term Insurance Content */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Why Term Insurance Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Why Term Insurance is Crucial</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Secure your family's financial future with affordable term life insurance coverage
            </p>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">₹1 Cr</div>
              <div className="text-gray-600">Coverage for ₹500/month</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">10-12x</div>
              <div className="text-gray-600">Annual income coverage</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">₹1.5L</div>
              <div className="text-gray-600">Tax deduction under 80C</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">99.04%</div>
              <div className="text-gray-600">Claim settlement ratio</div>
            </div>
          </div>

          {/* Image and Content Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src={TermIns2}
                alt="Term Insurance Family Protection"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-6">Your Family's Financial Shield</h3>
              <p className="text-gray-600 mb-6">
                Term insurance provides maximum life coverage at minimum premium. It ensures
                your family can maintain their lifestyle and achieve their dreams even in
                your absence. Pure protection at its most affordable.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>High Coverage at Low Premium</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Tax Benefits under Section 80C & 10(10D)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Additional Riders Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Section */}
          <div className="bg-gray-50 py-16 rounded-lg">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Term Insurance Insights</h2>
              <p className="text-xl text-gray-600">Expert guidance for choosing the right life coverage</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Blog Post 1 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={TermIns3}
                  alt="Term vs Whole Life"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Term vs Whole Life Insurance</h3>
                  <p className="text-gray-600 mb-4">
                    Understand the key differences between term and whole life insurance
                    to make the right choice for your family's protection.
                  </p>
                  
                </div>
              </div>

              {/* Blog Post 2 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={TermIns4}
                  alt="Term Insurance Coverage"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">How Much Term Insurance Do You Need?</h3>
                  <p className="text-gray-600 mb-4">
                    Calculate the right term insurance coverage based on your income,
                    liabilities, and family's future financial needs.
                  </p>
                  
                </div>
              </div>

              {/* Blog Post 3 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={TermIns5}
                  alt="Term Insurance Riders"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Best Term Insurance Riders to Consider</h3>
                  <p className="text-gray-600 mb-4">
                    Explore additional riders like accidental death, critical illness,
                    and waiver of premium for comprehensive protection.
                  </p>
                  
                </div>
              </div>
            </div>
          </div>

          {/* Term Insurance Steps */}
          <div className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Getting Term Insurance Made Simple</h2>
              <p className="text-xl text-gray-600">Easy steps to secure your family's future</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Calculate Coverage</h3>
                <p className="text-gray-600">
                  Determine the right coverage amount based on your income, expenses, and family's needs.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Compare Plans</h3>
                <p className="text-gray-600">
                  Compare different term insurance plans based on premium, claim ratio, and features.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Apply Online</h3>
                <p className="text-gray-600">
                  Complete your application online with medical tests and document verification.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Stay Protected</h3>
                <p className="text-gray-600">
                  Enjoy peace of mind knowing your family's financial future is secure.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white py-16 rounded-lg shadow-lg">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Term Insurance FAQs</h2>
              <p className="text-xl text-gray-600">Get answers to common term insurance questions</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">What happens if I outlive my term insurance policy?</h3>
                <p className="text-gray-600">
                  Term insurance is pure protection - if you outlive the policy term, there's no maturity
                  benefit. However, you can renew the policy or convert it to a permanent life insurance
                  plan, depending on the terms and conditions.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">Can I increase my term insurance coverage later?</h3>
                <p className="text-gray-600">
                  Most insurers allow you to increase coverage during specific life events like marriage,
                  childbirth, or income increase. However, this may require additional medical tests and
                  premium adjustments based on your current age and health.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">Is medical test mandatory for term insurance?</h3>
                <p className="text-gray-600">
                  Medical tests depend on your age, coverage amount, and health history. For younger
                  applicants with lower coverage, basic health questions may suffice. Higher coverage
                  amounts typically require comprehensive medical examinations.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">Can I buy multiple term insurance policies?</h3>
                <p className="text-gray-600">
                  Yes, you can buy multiple term insurance policies from different insurers. There's no
                  legal limit, but the total coverage should be reasonable compared to your income.
                  All policies will pay out independently in case of a claim.
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

export default TermInsurance;
