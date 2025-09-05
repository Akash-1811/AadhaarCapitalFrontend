import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { X, User, Mail, Phone, MapPin, Calendar, Heart, Shield, TrendingUp, Car, Calculator } from "lucide-react";

interface ServiceFormsProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: string;
}

const ServiceForms = ({ isOpen, onClose, serviceType }: ServiceFormsProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    pincode: "",
    age: "",
    gender: "",
    retirementYear: "",
    monthlyIncome: "",
    existingInsurance: "",
    medicalHistory: "",
    vehicleType: "",
    vehicleAge: "",
    investmentGoal: "",
    riskTolerance: "",
    investmentAmount: ""
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { serviceType, ...formData });
    // Handle form submission here
    onClose();
  };

  const getFormTitle = () => {
    const titles: { [key: string]: string } = {
      "retirement": "Retirement Planning",
      "health": "Health Insurance",
      "term": "Term Insurance", 
      "sip": "Start Your SIP",
      "financial": "Financial Planning",
      "motor": "Motor Insurance"
    };
    return titles[serviceType] || "Get Started";
  };

  const getFormIcon = () => {
    const icons: { [key: string]: any } = {
      "retirement": Calculator,
      "health": Heart,
      "term": Shield,
      "sip": TrendingUp,
      "financial": Calculator,
      "motor": Car
    };
    const IconComponent = icons[serviceType] || User;
    return <IconComponent className="w-6 h-6" />;
  };

  const renderCommonFields = () => (
    <>
      {/* Gender Selection */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Gender</Label>
        <RadioGroup 
          value={formData.gender} 
          onValueChange={(value) => handleInputChange("gender", value)}
          className="flex gap-6"
        >
          <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-lg border-2 border-transparent data-[state=checked]:border-blue-500">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male" className="flex items-center gap-2 cursor-pointer">
              <User className="w-4 h-4 text-blue-600" />
              Male
            </Label>
          </div>
          <div className="flex items-center space-x-2 bg-pink-50 p-3 rounded-lg border-2 border-transparent data-[state=checked]:border-pink-500">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female" className="flex items-center gap-2 cursor-pointer">
              <User className="w-4 h-4 text-pink-600" />
              Female
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Name and Mobile in same row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
          <Input
            id="name"
            placeholder="Please enter your full name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="border-b-2 border-t-0 border-l-0 border-r-0 rounded-none focus:border-primary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mobile" className="text-sm font-medium">Mobile No.</Label>
          <Input
            id="mobile"
            placeholder="Enter Your mobile number"
            value={formData.mobile}
            onChange={(e) => handleInputChange("mobile", e.target.value)}
            className="border-b-2 border-t-0 border-l-0 border-r-0 rounded-none focus:border-primary"
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">Email Id</Label>
        <Input
          id="email"
          type="email"
          placeholder="Your email id"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="border-b-2 border-t-0 border-l-0 border-r-0 rounded-none focus:border-primary"
        />
      </div>
    </>
  );

  const renderServiceSpecificFields = () => {
    switch (serviceType) {
      case "retirement":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pincode" className="text-sm font-medium">Pincode</Label>
                <Input
                  id="pincode"
                  placeholder="Your pincode"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                  className="border-b-2 border-t-0 border-l-0 border-r-0 rounded-none focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-medium">Current Age</Label>
                <Input
                  id="age"
                  placeholder="Enter in years"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="border-b-2 border-t-0 border-l-0 border-r-0 rounded-none focus:border-primary"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Year of Retirement</Label>
              <Select value={formData.retirementYear} onValueChange={(value) => handleInputChange("retirementYear", value)}>
                <SelectTrigger className="border-b-2 border-t-0 border-l-0 border-r-0 rounded-none">
                  <SelectValue placeholder="Select year of retirement" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 40 }, (_, i) => 2025 + i).map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyIncome" className="text-sm font-medium">Monthly Income</Label>
              <Input
                id="monthlyIncome"
                placeholder="Enter your monthly income"
                value={formData.monthlyIncome}
                onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                className="border-b-2 border-t-0 border-l-0 border-r-0 rounded-none focus:border-primary"
              />
            </div>
          </>
        );

      case "health":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="age" className="text-sm font-medium">Age</Label>
              <Input
                id="age"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                className="border-b-2 border-t-0 border-l-0 border-r-0 rounded-none focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Existing Health Insurance</Label>
              <Select value={formData.existingInsurance} onValueChange={(value) => handleInputChange("existingInsurance", value)}>
                <SelectTrigger className="border-b-2 border-t-0 border-l-0 border-r-0 rounded-none">
                  <SelectValue placeholder="Do you have existing health insurance?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Medical History</Label>
              <Select value={formData.medicalHistory} onValueChange={(value) => handleInputChange("medicalHistory", value)}>
                <SelectTrigger className="border-b-2 border-t-0 border-l-0 border-r-0 rounded-none">
                  <SelectValue placeholder="Any pre-existing medical conditions?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="diabetes">Diabetes</SelectItem>
                  <SelectItem value="hypertension">Hypertension</SelectItem>
                  <SelectItem value="heart">Heart Disease</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case "motor":
        return (
          <>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Vehicle Type</Label>
              <Select value={formData.vehicleType} onValueChange={(value) => handleInputChange("vehicleType", value)}>
                <SelectTrigger className="border-b-2 border-t-0 border-l-0 border-r-0 rounded-none">
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="car">Car</SelectItem>
                  <SelectItem value="bike">Motorcycle</SelectItem>
                  <SelectItem value="commercial">Commercial Vehicle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleAge" className="text-sm font-medium">Vehicle Age</Label>
              <Input
                id="vehicleAge"
                placeholder="Enter vehicle age in years"
                value={formData.vehicleAge}
                onChange={(e) => handleInputChange("vehicleAge", e.target.value)}
                className="border-b-2 border-t-0 border-l-0 border-r-0 rounded-none focus:border-primary"
              />
            </div>
          </>
        );

      case "sip":
        return (
          <>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Investment Goal</Label>
              <Select value={formData.investmentGoal} onValueChange={(value) => handleInputChange("investmentGoal", value)}>
                <SelectTrigger className="border-b-2 border-t-0 border-l-0 border-r-0 rounded-none">
                  <SelectValue placeholder="Select your investment goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retirement">Retirement</SelectItem>
                  <SelectItem value="child-education">Child Education</SelectItem>
                  <SelectItem value="home">Home Purchase</SelectItem>
                  <SelectItem value="wealth">Wealth Creation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Risk Tolerance</Label>
              <Select value={formData.riskTolerance} onValueChange={(value) => handleInputChange("riskTolerance", value)}>
                <SelectTrigger className="border-b-2 border-t-0 border-l-0 border-r-0 rounded-none">
                  <SelectValue placeholder="Select your risk tolerance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="moderate">Moderate Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="investmentAmount" className="text-sm font-medium">Monthly Investment Amount</Label>
              <Input
                id="investmentAmount"
                placeholder="Enter monthly SIP amount"
                value={formData.investmentAmount}
                onChange={(e) => handleInputChange("investmentAmount", e.target.value)}
                className="border-b-2 border-t-0 border-l-0 border-r-0 rounded-none focus:border-primary"
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white">
              {getFormIcon()}
            </div>
            {getFormTitle()}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="bg-gradient-secondary/30 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Tell us about yourself
            </h3>
            
            {renderCommonFields()}
          </div>

          {renderServiceSpecificFields() && (
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-4">Additional Information</h3>
              {renderServiceSpecificFields()}
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={agreedToTerms}
              onCheckedChange={setAgreedToTerms}
            />
            <Label htmlFor="terms" className="text-sm">
              By clicking on Get Started, I agree to the{" "}
              <span className="text-primary underline cursor-pointer">Terms and Conditions</span>
            </Label>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:bg-gradient-hero text-white py-3 text-lg font-semibold"
            disabled={!agreedToTerms}
          >
            Get Started
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceForms;
