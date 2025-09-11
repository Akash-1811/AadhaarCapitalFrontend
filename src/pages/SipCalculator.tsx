import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calculator, TrendingUp, PieChart, ArrowLeft, BookOpen, Target, BarChart3 } from "lucide-react";

interface SipData {
  monthlyAmount: number;
  duration: number;
  expectedReturn: number;
}

const SipCalculator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get data from form submission or use defaults
  const formData = location.state?.formData;
  
  const [sipData, setSipData] = useState<SipData>({
    monthlyAmount: formData?.investmentAmount ? parseInt(formData.investmentAmount) : 5000,
    duration: formData?.investmentDuration === "1-3" ? 2 : 
              formData?.investmentDuration === "3-5" ? 4 :
              formData?.investmentDuration === "5-10" ? 7 :
              formData?.investmentDuration === "10+" ? 15 : 5,
    expectedReturn: 12
  });

  // Calculate SIP returns
  const calculateSIP = () => {
    const monthlyRate = sipData.expectedReturn / 100 / 12;
    const totalMonths = sipData.duration * 12;
    const futureValue = sipData.monthlyAmount * 
      (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));
    
    const totalInvested = sipData.monthlyAmount * totalMonths;
    const estimatedReturns = futureValue - totalInvested;
    
    return {
      futureValue: Math.round(futureValue),
      totalInvested: Math.round(totalInvested),
      estimatedReturns: Math.round(estimatedReturns)
    };
  };

  const results = calculateSIP();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`;
    if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-gradient-hero rounded-full blur-3xl"></div>
      </div>

      <Header />

      <main className="pt-2 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          {/* Header */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Calculator className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h6 className="text-xl font-bold">SIP Calculator</h6>
                    <p className="text-sm text-muted-foreground">Plan your systematic investment journey</p>
                  </div>
                </div>
                <div className="ml-16">
                  <Button
                    onClick={() => navigate('/sip-investment')}
                    className="bg-gradient-primary hover:bg-gradient-primary/90 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Start SIP Enquiry
                  </Button>
                </div>
              </div>
              
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 px-2">
            {/* Left Side - Calculator Controls */}
            <Card className="bg-white/90 backdrop-blur-sm shadow-glow border-white/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Returns Estimator
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Estimation is based on the past performance
                </p>
              </CardHeader>

              <CardContent className="space-y-6 pt-0">
                {/* Monthly Amount */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">ENTER AMOUNT</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg font-semibold">₹</span>
                    <Input
                      type="number"
                      value={sipData.monthlyAmount}
                      onChange={(e) => setSipData(prev => ({ ...prev, monthlyAmount: parseInt(e.target.value) || 0 }))}
                      className="pl-8 text-lg font-semibold border-2 border-primary rounded-lg h-12"
                    />
                  </div>
                </div>

                {/* Duration Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium">Select Duration</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">{sipData.duration}</span>
                      <span className="text-sm">Yrs</span>
                    </div>
                  </div>
                  <Slider
                    value={[sipData.duration]}
                    onValueChange={(value) => setSipData(prev => ({ ...prev, duration: value[0] }))}
                    max={30}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 Yr</span>
                    <span>30 Yrs</span>
                  </div>
                </div>

                {/* Expected Return Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium">Expected Rate of Return</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">{sipData.expectedReturn.toFixed(2)}</span>
                      <span className="text-sm">%</span>
                    </div>
                  </div>
                  <Slider
                    value={[sipData.expectedReturn]}
                    onValueChange={(value) => setSipData(prev => ({ ...prev, expectedReturn: value[0] }))}
                    max={30}
                    min={8}
                    step={0.01}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>8%</span>
                    <span>30%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Side - Results */}
            <div className="space-y-4">
              {/* Results Summary */}
              <Card className="bg-white/90 backdrop-blur-sm shadow-glow border-white/20">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    The total value of your investment after <span className="font-semibold text-primary">{sipData.duration} Years</span> will be
                  </p>
                  <div className="text-3xl font-bold text-primary mb-4">
                    {formatCurrency(results.futureValue)}
                  </div>

                  {/* Donut Chart Representation */}
                  <div className="relative w-40 h-40 mx-auto mb-4">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="10"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="10"
                        strokeDasharray={`${(results.totalInvested / results.futureValue) * 220} 220`}
                        strokeLinecap="round"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="10"
                        strokeDasharray={`${(results.estimatedReturns / results.futureValue) * 220} 220`}
                        strokeDashoffset={`-${(results.totalInvested / results.futureValue) * 220}`}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  {/* Legend */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-orange-500 rounded"></div>
                        <span className="text-sm">Invested Amount</span>
                      </div>
                      <span className="text-sm font-semibold">{formatCurrency(results.totalInvested)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-indigo-500 rounded"></div>
                        <span className="text-sm">Est. Returns</span>
                      </div>
                      <span className="text-sm font-semibold">{formatCurrency(results.estimatedReturns)}</span>
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-3 text-lg font-semibold">
                    INVEST NOW
                  </Button>
                </CardContent>
              </Card>

              {/* Additional Info */}
              <Card className="bg-gradient-primary text-white">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <PieChart className="w-5 h-5" />
                    <h3 className="text-lg font-semibold">Investment Summary</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="opacity-80">Monthly Investment</p>
                      <p className="text-lg font-bold">{formatCurrency(sipData.monthlyAmount)}</p>
                    </div>
                    <div>
                      <p className="opacity-80">Investment Period</p>
                      <p className="text-lg font-bold">{sipData.duration} Years</p>
                    </div>
                    <div>
                      <p className="opacity-80">Expected Return</p>
                      <p className="text-lg font-bold">{sipData.expectedReturn.toFixed(2)}% p.a.</p>
                    </div>
                    <div>
                      <p className="opacity-80">Wealth Gained</p>
                      <p className="text-lg font-bold">{formatNumber(results.estimatedReturns)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* SIP Information Section */}
          <div className="mt-12 space-y-8">
            {/* What is SIP Section */}
            <Card className="bg-white/90 backdrop-blur-sm shadow-glow border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <BookOpen className="w-6 h-6 text-primary" />
                  Understanding Systematic Investment Plans (SIP)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  A Systematic Investment Plan (SIP) is a smart and convenient method to invest in mutual funds.
                  It enables you to invest a fixed amount regularly at predetermined intervals (monthly or quarterly)
                  into your chosen mutual fund scheme. This disciplined investment approach helps you build wealth
                  systematically over time, irrespective of market volatility.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  SIP provides a structured way to invest by spreading your investments across different market cycles.
                  This strategy helps you accumulate wealth gradually while benefiting from the power of compounding.
                  Key advantages include rupee cost averaging, automated investing, and significant wealth creation potential over the long term.
                </p>
              </CardContent>
            </Card>

            {/* How SIP Calculator Works */}
            <Card className="bg-white/90 backdrop-blur-sm shadow-glow border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Target className="w-6 h-6 text-primary" />
                  How Our SIP Calculator Functions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Our SIP calculator is designed to help you estimate potential returns and growth from your systematic investments.
                  The tool requires three key inputs: your monthly investment amount, expected annual return rate, and investment duration.
                </p>

                <div className="bg-gradient-secondary/30 p-6 rounded-lg">
                  <h4 className="font-semibold mb-3 text-lg">SIP Calculation Formula:</h4>
                  <div className="bg-white/80 p-4 rounded-lg font-mono text-center text-lg">
                    M = P × ({`{[1 + i]^n – 1} / i`}) × (1 + i)
                  </div>
                  <div className="mt-4 space-y-2 text-sm">
                    <p><strong>M</strong> = Maturity amount you receive</p>
                    <p><strong>P</strong> = Regular investment amount</p>
                    <p><strong>n</strong> = Total number of payments during investment period</p>
                    <p><strong>i</strong> = Periodic interest rate between successive investments</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Example Calculation */}
            <Card className="bg-gradient-primary text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <BarChart3 className="w-6 h-6" />
                  SIP Investment Example
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/90 leading-relaxed">
                  Let's understand with a practical example: Consider investing ₹5,000 monthly in a mutual fund SIP for 10 years
                  with an expected annual return of 12%.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">Investment Details:</h4>
                    <div className="space-y-2 text-white/90">
                      <p>• Monthly Investment: ₹5,000</p>
                      <p>• Investment Duration: 10 years</p>
                      <p>• Expected Annual Return: 12%</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">Projected Results:</h4>
                    <div className="space-y-2 text-white/90">
                      <p>• Total Investment: ₹6,00,000</p>
                      <p>• Estimated Maturity Value: ₹11,61,695</p>
                      <p>• Wealth Gained: ₹5,61,695</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg mt-4">
                  <p className="text-sm text-white/80">
                    <strong>Note:</strong> This example demonstrates how consistent SIP investments can potentially
                    help you build substantial wealth over time through the power of compounding and disciplined investing.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SipCalculator;
