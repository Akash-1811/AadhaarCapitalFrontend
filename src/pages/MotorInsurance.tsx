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
import { Car, User, CheckCircle, Shield, Clock, Award } from "lucide-react";
import { toast } from "sonner";
import Mot1 from "@/assets/motorIns.png";
import Mot2 from "@/assets/motor2.jpg";
import Mot3 from "@/assets/mot3.webp";
import Mot4 from "@/assets/mot4.png";
import Mot5 from "@/assets/mot5.jpg";



const MotorInsurance = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    vehicleType: "",
    vehicleAge: "",
    vehicleBrand: "",
    cityTier: ""
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = ['name', 'email', 'mobile', 'gender', 'vehicleType', 'vehicleAge', 'vehicleBrand'];
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
      formDataToSend.append('subject', 'Motor Insurance Inquiry');
      formDataToSend.append('formType', 'Motor Insurance');
      formDataToSend.append('pageForm', 'Motor Insurance Page');

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
          vehicleType: "",
          vehicleAge: "",
          vehicleBrand: "",
          cityTier: "",
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
    "Vehicle insurance comparison",
    "Best rate guarantees", 
    "Quick claim processing",
    "24/7 roadside assistance"
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
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Content */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium">
                <Car className="w-4 h-4" />
                MOTOR INSURANCE
              </div>
              
              <div className="space-y-3">
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                  Protect your vehicle with
                  <span className="bg-gradient-primary bg-clip-text text-transparent"> comprehensive coverage</span>
                </h1>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
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
                  <div className="text-sm font-medium">Full Protection</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-2">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm font-medium">Quick Claims</div>
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
                    src={Mot1}
                    alt="Motor Insurance Protection"
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Drive with Confidence</h3>
                    <p className="text-sm opacity-90">Complete protection for your vehicle</p>
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

                  {/* Vehicle Type */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">Vehicle Type</Label>
                    <Select value={formData.vehicleType} onValueChange={(value) => handleInputChange("vehicleType", value)}>
                      <SelectTrigger className="border-0 border-b-2 border-gray-200 rounded-none focus:border-primary bg-transparent">
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="car">Car</SelectItem>
                        <SelectItem value="bike">Motorcycle</SelectItem>
                        <SelectItem value="commercial">Commercial Vehicle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Vehicle Age */}
                  <div className="space-y-2">
                    <Label htmlFor="vehicleAge" className="text-sm font-medium text-gray-600">Vehicle Age</Label>
                    <Input
                      id="vehicleAge"
                      placeholder="Enter vehicle age in years"
                      value={formData.vehicleAge}
                      onChange={(e) => handleInputChange("vehicleAge", e.target.value)}
                      className="border-0 border-b-2 border-gray-200 rounded-none focus:border-primary bg-transparent"
                      required
                    />
                  </div>

                  {/* Vehicle Brand */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">Vehicle Brand</Label>
                    <Select value={formData.vehicleBrand} onValueChange={(value) => handleInputChange("vehicleBrand", value)}>
                      <SelectTrigger className="border-0 border-b-2 border-gray-200 rounded-none focus:border-primary bg-transparent">
                        <SelectValue placeholder="Select vehicle brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maruti">Maruti Suzuki</SelectItem>
                        <SelectItem value="hyundai">Hyundai</SelectItem>
                        <SelectItem value="tata">Tata</SelectItem>
                        <SelectItem value="mahindra">Mahindra</SelectItem>
                        <SelectItem value="honda">Honda</SelectItem>
                        <SelectItem value="toyota">Toyota</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
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

        {/* Comprehensive Motor Insurance Content */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Why Motor Insurance Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Why Motor Insurance is Mandatory</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Protect your vehicle and finances with comprehensive motor insurance coverage
            </p>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">₹2000</div>
              <div className="text-gray-600">Fine for no insurance</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">5 Lakh</div>
              <div className="text-gray-600">Third party coverage</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-600">Roadside assistance</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-gray-600">Claim settlement ratio</div>
            </div>
          </div>

          {/* Image and Content Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src={Mot2}
                alt="Motor Insurance Protection"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-6">Complete Vehicle Protection</h3>
              <p className="text-gray-600 mb-6">
                Motor insurance is not just legally mandatory - it's your financial safety net
                against accidents, theft, and natural disasters. Comprehensive coverage ensures
                you're protected against both own damage and third-party liabilities.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Own Damage & Third Party Coverage</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Cashless Garage Network</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Zero Depreciation Add-on</span>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Section */}
          <div className="bg-gray-50 py-16 rounded-lg">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Motor Insurance Insights</h2>
              <p className="text-xl text-gray-600">Expert advice for choosing the right vehicle insurance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Blog Post 1 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={Mot3}
                  alt="Motor Insurance Types"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Third Party vs Comprehensive Insurance</h3>
                  <p className="text-gray-600 mb-4">
                    Understand the difference between third party and comprehensive
                    motor insurance to choose the right coverage for your vehicle.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">7 min read</span>
                    <Button variant="outline" size="sm">Read More</Button>
                  </div>
                </div>
              </div>

              {/* Blog Post 2 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={Mot4}
                  alt="Motor Insurance Claims"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">How to File Motor Insurance Claims</h3>
                  <p className="text-gray-600 mb-4">
                    Step-by-step guide to filing motor insurance claims, required
                    documents, and tips for faster claim settlement.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">6 min read</span>
                    <Button variant="outline" size="sm">Read More</Button>
                  </div>
                </div>
              </div>

              {/* Blog Post 3 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={Mot5}
                  alt="Motor Insurance Add-ons"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Best Motor Insurance Add-ons</h3>
                  <p className="text-gray-600 mb-4">
                    Explore essential add-ons like zero depreciation, engine protection,
                    and roadside assistance for complete vehicle protection.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">5 min read</span>
                    <Button variant="outline" size="sm">Read More</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Motor Insurance Steps */}
          <div className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Getting Motor Insurance Made Easy</h2>
              <p className="text-xl text-gray-600">Simple steps to insure your vehicle</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Vehicle Details</h3>
                <p className="text-gray-600">
                  Provide your vehicle registration number, make, model, and variant details.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Compare Quotes</h3>
                <p className="text-gray-600">
                  Compare motor insurance quotes from multiple insurers to find the best deal.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Choose Coverage</h3>
                <p className="text-gray-600">
                  Select comprehensive coverage with necessary add-ons for complete protection.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Get Instant Policy</h3>
                <p className="text-gray-600">
                  Complete payment and receive your motor insurance policy instantly online.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white py-16 rounded-lg shadow-lg">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Motor Insurance FAQs</h2>
              <p className="text-xl text-gray-600">Common questions about vehicle insurance</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">Is motor insurance mandatory in India?</h3>
                <p className="text-gray-600">
                  Yes, at least third-party motor insurance is mandatory by law in India. Driving
                  without insurance can result in fines up to ₹2,000 and/or imprisonment.
                  Comprehensive insurance is recommended for complete protection.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">What is No Claim Bonus (NCB)?</h3>
                <p className="text-gray-600">
                  NCB is a discount on your motor insurance premium for not making any claims
                  during the policy period. It can go up to 50% and is transferable when you
                  change insurers or buy a new vehicle.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">What is Zero Depreciation cover?</h3>
                <p className="text-gray-600">
                  Zero Depreciation cover ensures you get the full claim amount without any
                  depreciation deduction on parts. It's especially valuable for new cars and
                  covers plastic, metal, and fiber parts at their original value.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">Can I transfer my motor insurance to a new owner?</h3>
                <p className="text-gray-600">
                  Yes, motor insurance can be transferred to a new owner when you sell your vehicle.
                  The new owner needs to inform the insurance company within 14 days of purchase
                  and complete the transfer formalities.
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

export default MotorInsurance;
