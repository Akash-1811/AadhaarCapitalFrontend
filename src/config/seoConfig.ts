export const seoConfig = {
  defaultTitle: "Aadhaar Capital - India's Leading Digital Investment & Insurance Platform",
  defaultDescription: "Transform your financial future with Aadhaar Capital. Expert SIP investments, comprehensive insurance solutions, and personalized financial planning. Start your wealth creation journey today!",
  defaultKeywords: "Aadhaar Capital, SIP investment, mutual funds India, health insurance, term insurance, motor insurance, financial planning, retirement planning, wealth management, digital investment platform",
  siteUrl: "https://AadhaarCapital.com",
  siteName: "Aadhaar Capital",
  twitterHandle: "@AadhaarCapital",
  
  pages: {
    home: {
      title: "Aadhaar Capital - India's Leading Digital Investment & Insurance Platform | SIP, Mutual Funds, Health Insurance",
      description: "Transform your financial future with Aadhaar Capital. Expert SIP investments, comprehensive insurance solutions, and personalized financial planning. Start your wealth creation journey today!",
      keywords: "Aadhaar Capital, SIP investment, mutual funds India, health insurance, term insurance, motor insurance, financial planning, retirement planning, wealth management, digital investment platform, portfolio management, insurance comparison, investment advisory, financial services India",
      url: "https://Aadhaarcapital.com/"
    },
    
    sipInvestment: {
      title: "SIP Investment - Systematic Investment Plan Services | Aadhaar Capital",
      description: "Start your SIP investment journey with Aadhaar Capital. Expert guidance on systematic investment plans, mutual fund selection, and goal-based investing. Build wealth systematically with professional portfolio management.",
      keywords: "SIP investment, systematic investment plan, mutual funds SIP, SIP calculator, investment planning, wealth creation, portfolio management, mutual fund investment, SIP benefits, goal based investing, Aadhaar Capital SIP",
      url: "https://Aadhaarcapital.com/sip-investment"
    },
    
    sipCalculator: {
      title: "SIP Calculator - Calculate Your SIP Returns | Aadhaar Capital",
      description: "Use our advanced SIP calculator to estimate your systematic investment plan returns. Plan your investments with accurate projections and start building wealth with Aadhaar Capital.",
      keywords: "SIP calculator, SIP return calculator, mutual fund calculator, investment calculator, SIP planning tool, wealth calculator, systematic investment plan calculator, Aadhaar Capital calculator",
      url: "https://Aadhaarcapital.com/sip-calculator"
    },
    
    healthInsurance: {
      title: "Health Insurance Plans - Comprehensive Medical Coverage | Aadhaar Capital",
      description: "Protect your family with comprehensive health insurance plans from Aadhaar Capital. Compare policies, get expert advice, and secure the best medical coverage for your needs.",
      keywords: "health insurance, medical insurance, family health insurance, health insurance plans, medical coverage, health insurance comparison, health insurance India, Aadhaar Capital health insurance",
      url: "https://Aadhaarcapital.com/health-insurance"
    },
    
    termInsurance: {
      title: "Term Insurance Plans - Life Insurance Coverage | Aadhaar Capital",
      description: "Secure your family's future with term insurance plans from Aadhaar Capital. Get comprehensive life insurance coverage at affordable premiums with expert guidance.",
      keywords: "term insurance, life insurance, term life insurance, life insurance plans, term insurance calculator, life insurance coverage, term insurance India, Aadhaar Capital term insurance",
      url: "https://Aadhaarcapital.com/term-insurance"
    },
    
    motorInsurance: {
      title: "Motor Insurance - Car & Bike Insurance Plans | Aadhaar Capital",
      description: "Get comprehensive motor insurance for your car and bike with Aadhaar Capital. Compare policies, get instant quotes, and secure the best vehicle insurance coverage.",
      keywords: "motor insurance, car insurance, bike insurance, vehicle insurance, auto insurance, motor insurance plans, car insurance India, bike insurance India, Aadhaar Capital motor insurance",
      url: "https://Aadhaarcapital.com/motor-insurance"
    },
    
    financialPlanning: {
      title: "Financial Planning Services - Wealth Management | Aadhaar Capital",
      description: "Achieve your financial goals with personalized financial planning services from Aadhaar Capital. Expert wealth management, investment planning, and financial advisory services.",
      keywords: "financial planning, wealth management, investment planning, financial advisor, financial planning services, wealth creation, financial goals, retirement planning, Aadhaar Capital financial planning",
      url: "https://Aadhaarcapital.com/financial-planning"
    },
    
    retirementPlanning: {
      title: "Retirement Planning - Secure Your Future | Aadhaar Capital",
      description: "Plan for a comfortable retirement with Aadhaar Capital's retirement planning services. Expert guidance on pension plans, retirement investments, and wealth preservation strategies.",
      keywords: "retirement planning, pension plans, retirement investment, retirement savings, retirement planning India, pension planning, retirement wealth, Aadhaar Capital retirement planning",
      url: "https://Aadhaarcapital.com/retirement-planning"
    },
    
    marketNews: {
      title: "Market News - Latest Financial Market Updates | Aadhaar Capital",
      description: "Stay updated with the latest market news, financial insights, and investment opportunities. Get real-time market data, expert analysis, and trading insights from Aadhaar Capital.",
      keywords: "market news, financial news, stock market news, investment news, market analysis, financial market updates, trading news, market insights, Aadhaar Capital market news",
      url: "https://Aadhaarcapital.com/market-news"
    }
  }
};

export const getPageSEO = (pageName: keyof typeof seoConfig.pages) => {
  const pageConfig = seoConfig.pages[pageName];
  if (!pageConfig) {
    return {
      title: seoConfig.defaultTitle,
      description: seoConfig.defaultDescription,
      keywords: seoConfig.defaultKeywords,
      url: seoConfig.siteUrl
    };
  }
  return pageConfig;
};
