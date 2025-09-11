import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  schemaData?: object;
}

const SEO = ({
  title = "Aadhaar Capital - India's Leading Digital Investment & Insurance Platform",
  description = "Transform your financial future with Aadhaar Capital. Expert SIP investments, comprehensive insurance solutions, and personalized financial planning. Start your wealth creation journey today!",
  keywords = "Aadhaar Capital, SIP investment, mutual funds India, health insurance, term insurance, motor insurance, financial planning, retirement planning, wealth management, digital investment platform",
  image = "https://Aadhaarcapital.com/logo.png",
  url = "https://Aadhaarcapital.com/",
  type = "website",
  schemaData
}: SEOProps) => {
  const fullTitle = title.includes('Aadhaar Capital') ? title : `${title} | Aadhaar Capital`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Aadhaar Capital" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Schema.org structured data */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
