// SEO Audit Utility for Aadhar Capital
export interface SEOAuditResult {
  score: number;
  issues: string[];
  recommendations: string[];
  passed: string[];
}

export const performSEOAudit = (): SEOAuditResult => {
  const issues: string[] = [];
  const recommendations: string[] = [];
  const passed: string[] = [];
  let score = 100;

  // Check title tag
  const title = document.title;
  if (!title) {
    issues.push("Missing title tag");
    score -= 15;
  } else if (title.length < 30 || title.length > 60) {
    issues.push(`Title length (${title.length}) should be 30-60 characters`);
    score -= 5;
  } else {
    passed.push("Title tag optimized");
  }

  // Check meta description
  const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
  if (!metaDescription) {
    issues.push("Missing meta description");
    score -= 10;
  } else if (metaDescription.length < 120 || metaDescription.length > 160) {
    issues.push(`Meta description length (${metaDescription.length}) should be 120-160 characters`);
    score -= 5;
  } else {
    passed.push("Meta description optimized");
  }

  // Check meta keywords
  const metaKeywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content');
  if (!metaKeywords) {
    issues.push("Missing meta keywords");
    score -= 5;
  } else {
    passed.push("Meta keywords present");
  }

  // Check canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    issues.push("Missing canonical URL");
    score -= 8;
  } else {
    passed.push("Canonical URL present");
  }

  // Check Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogImage = document.querySelector('meta[property="og:image"]');
  
  if (!ogTitle || !ogDescription || !ogImage) {
    issues.push("Missing Open Graph tags");
    score -= 10;
  } else {
    passed.push("Open Graph tags present");
  }

  // Check Twitter Card tags
  const twitterCard = document.querySelector('meta[name="twitter:card"]');
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  
  if (!twitterCard || !twitterTitle) {
    issues.push("Missing Twitter Card tags");
    score -= 5;
  } else {
    passed.push("Twitter Card tags present");
  }

  // Check structured data
  const structuredData = document.querySelector('script[type="application/ld+json"]');
  if (!structuredData) {
    issues.push("Missing structured data (JSON-LD)");
    score -= 10;
  } else {
    passed.push("Structured data present");
  }

  // Check heading structure
  const h1Tags = document.querySelectorAll('h1');
  if (h1Tags.length === 0) {
    issues.push("Missing H1 tag");
    score -= 10;
  } else if (h1Tags.length > 1) {
    issues.push("Multiple H1 tags found");
    score -= 5;
  } else {
    passed.push("H1 tag structure correct");
  }

  // Check images alt text
  const images = document.querySelectorAll('img');
  let imagesWithoutAlt = 0;
  images.forEach(img => {
    if (!img.getAttribute('alt')) {
      imagesWithoutAlt++;
    }
  });
  
  if (imagesWithoutAlt > 0) {
    issues.push(`${imagesWithoutAlt} images missing alt text`);
    score -= Math.min(imagesWithoutAlt * 2, 10);
  } else if (images.length > 0) {
    passed.push("All images have alt text");
  }

  // Check page loading speed (basic check)
  const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
  if (loadTime > 3000) {
    issues.push("Page load time exceeds 3 seconds");
    score -= 8;
    recommendations.push("Optimize images and enable compression");
  } else {
    passed.push("Page load time acceptable");
  }

  // Check mobile viewport
  const viewport = document.querySelector('meta[name="viewport"]');
  if (!viewport) {
    issues.push("Missing viewport meta tag");
    score -= 8;
  } else {
    passed.push("Viewport meta tag present");
  }

  // Check HTTPS
  if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
    issues.push("Site not using HTTPS");
    score -= 15;
    recommendations.push("Enable SSL certificate");
  } else {
    passed.push("HTTPS enabled");
  }

  // Generate recommendations
  if (issues.length > 0) {
    recommendations.push("Fix identified SEO issues to improve search rankings");
  }
  
  if (score >= 90) {
    recommendations.push("Excellent SEO! Consider creating more content and building backlinks");
  } else if (score >= 70) {
    recommendations.push("Good SEO foundation. Focus on content optimization and technical improvements");
  } else {
    recommendations.push("SEO needs significant improvement. Address critical issues first");
  }

  return {
    score: Math.max(0, score),
    issues,
    recommendations,
    passed
  };
};

// SEO Monitoring utility
export const monitorSEO = () => {
  const audit = performSEOAudit();
  
  console.group('🔍 Aadhar Capital SEO Audit');
  console.log(`📊 SEO Score: ${audit.score}/100`);
  
  if (audit.passed.length > 0) {
    console.group('✅ Passed Checks');
    audit.passed.forEach(item => console.log(`✓ ${item}`));
    console.groupEnd();
  }
  
  if (audit.issues.length > 0) {
    console.group('⚠️ Issues Found');
    audit.issues.forEach(issue => console.warn(`⚠️ ${issue}`));
    console.groupEnd();
  }
  
  if (audit.recommendations.length > 0) {
    console.group('💡 Recommendations');
    audit.recommendations.forEach(rec => console.log(`💡 ${rec}`));
    console.groupEnd();
  }
  
  console.groupEnd();
  
  return audit;
};

// Auto-run SEO audit in development
if (process.env.NODE_ENV === 'development') {
  setTimeout(() => {
    monitorSEO();
  }, 2000);
}
