export const seoConfig = {
  defaultTitle: "Aadhar Capital - India's Leading Digital Investment & Insurance Platform",
  defaultDescription: "Transform your financial future with Aadhar Capital. Expert SIP investments, comprehensive insurance solutions, and personalized financial planning. Start your wealth creation journey today!",
  defaultKeywords: "Aadhar Capital, SIP investment, mutual funds India, health insurance, term insurance, motor insurance, financial planning, retirement planning, wealth management, digital investment platform",
  siteUrl: "https://aadharcapital.com",
  siteName: "Aadhar Capital",
  twitterHandle: "@AadharCapital",
  
  pages: {
    home: {
      title: "Aadhar Capital - India's Leading Digital Investment & Insurance Platform | SIP, Mutual Funds, Health Insurance",
      description: "Transform your financial future with Aadhar Capital. Expert SIP investments, comprehensive insurance solutions, and personalized financial planning. Start your wealth creation journey today!",
      keywords: "Aadhar Capital, SIP investment, mutual funds India, health insurance, term insurance, motor insurance, financial planning, retirement planning, wealth management, digital investment platform, portfolio management, insurance comparison, investment advisory, financial services India",
      url: "https://aadharcapital.com/"
    },
    
    sipInvestment: {
      title: "SIP Investment - Systematic Investment Plan Services | Aadhar Capital",
      description: "Start your SIP investment journey with Aadhar Capital. Expert guidance on systematic investment plans, mutual fund selection, and goal-based investing. Build wealth systematically with professional portfolio management.",
      keywords: "SIP investment, systematic investment plan, mutual funds SIP, SIP calculator, investment planning, wealth creation, portfolio management, mutual fund investment, SIP benefits, goal based investing, Aadhar Capital SIP",
      url: "https://aadharcapital.com/sip-investment"
    },
    
    sipCalculator: {
      title: "SIP Calculator - Calculate Your SIP Returns | Aadhar Capital",
      description: "Use our advanced SIP calculator to estimate your systematic investment plan returns. Plan your investments with accurate projections and start building wealth with Aadhar Capital.",
      keywords: "SIP calculator, SIP return calculator, mutual fund calculator, investment calculator, SIP planning tool, wealth calculator, systematic investment plan calculator, Aadhar Capital calculator",
      url: "https://aadharcapital.com/sip-calculator"
    },
    
    healthInsurance: {
      title: "Health Insurance Plans - Comprehensive Medical Coverage | Aadhar Capital",
      description: "Protect your family with comprehensive health insurance plans from Aadhar Capital. Compare policies, get expert advice, and secure the best medical coverage for your needs.",
      keywords: "health insurance, medical insurance, family health insurance, health insurance plans, medical coverage, health insurance comparison, health insurance India, Aadhar Capital health insurance",
      url: "https://aadharcapital.com/health-insurance"
    },
    
    termInsurance: {
      title: "Term Insurance Plans - Life Insurance Coverage | Aadhar Capital",
      description: "Secure your family's future with term insurance plans from Aadhar Capital. Get comprehensive life insurance coverage at affordable premiums with expert guidance.",
      keywords: "term insurance, life insurance, term life insurance, life insurance plans, term insurance calculator, life insurance coverage, term insurance India, Aadhar Capital term insurance",
      url: "https://aadharcapital.com/term-insurance"
    },
    
    motorInsurance: {
      title: "Motor Insurance - Car & Bike Insurance Plans | Aadhar Capital",
      description: "Get comprehensive motor insurance for your car and bike with Aadhar Capital. Compare policies, get instant quotes, and secure the best vehicle insurance coverage.",
      keywords: "motor insurance, car insurance, bike insurance, vehicle insurance, auto insurance, motor insurance plans, car insurance India, bike insurance India, Aadhar Capital motor insurance",
      url: "https://aadharcapital.com/motor-insurance"
    },
    
    financialPlanning: {
      title: "Financial Planning Services - Wealth Management | Aadhar Capital",
      description: "Achieve your financial goals with personalized financial planning services from Aadhar Capital. Expert wealth management, investment planning, and financial advisory services.",
      keywords: "financial planning, wealth management, investment planning, financial advisor, financial planning services, wealth creation, financial goals, retirement planning, Aadhar Capital financial planning",
      url: "https://aadharcapital.com/financial-planning"
    },
    
    retirementPlanning: {
      title: "Retirement Planning - Secure Your Future | Aadhar Capital",
      description: "Plan for a comfortable retirement with Aadhar Capital's retirement planning services. Expert guidance on pension plans, retirement investments, and wealth preservation strategies.",
      keywords: "retirement planning, pension plans, retirement investment, retirement savings, retirement planning India, pension planning, retirement wealth, Aadhar Capital retirement planning",
      url: "https://aadharcapital.com/retirement-planning"
    },
    
    marketNews: {
      title: "Market News - Latest Financial Market Updates | Aadhar Capital",
      description: "Stay updated with the latest market news, financial insights, and investment opportunities. Get real-time market data, expert analysis, and trading insights from Aadhar Capital.",
      keywords: "market news, financial news, stock market news, investment news, market analysis, financial market updates, trading news, market insights, Aadhar Capital market news",
      url: "https://aadharcapital.com/market-news"
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
