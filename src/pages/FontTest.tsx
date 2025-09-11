import React from 'react';

const FontTest = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="heading-hero mb-4">Font Typography Test</h1>
          <p className="body-lead">Testing the distinction between Playfair Display (headings) and Open Sans (body text)</p>
        </div>

        {/* Heading Examples */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="heading-section mb-6">Heading Examples (Playfair Display - Serif)</h2>
          
          <div className="space-y-4">
            <div>
              <h1 className="heading-display">Display Heading - 4rem, 900 weight</h1>
              <p className="body-secondary">This is the largest heading style</p>
            </div>
            
            <div>
              <h2 className="heading-hero">Hero Heading - 3rem, 800 weight</h2>
              <p className="body-secondary">Used for main page titles</p>
            </div>
            
            <div>
              <h3 className="heading-section">Section Heading - 2.5rem, 700 weight</h3>
              <p className="body-secondary">Used for major section titles</p>
            </div>
            
            <div>
              <h4 className="heading-card">Card Heading - 1.5rem, 600 weight</h4>
              <p className="body-secondary">Used for card titles and smaller headings</p>
            </div>
            
            <div>
              <h5 className="heading-sub">Sub Heading - 1.25rem, 600 weight</h5>
              <p className="body-secondary">Used for subheadings</p>
            </div>
            
            <div>
              <h6 className="heading-small">Small Heading - 1rem, 500 weight</h6>
              <p className="body-secondary">Used for small headings</p>
            </div>
          </div>
        </div>

        {/* Body Text Examples */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="heading-section mb-6">Body Text Examples (Open Sans - Sans-Serif)</h2>
          
          <div className="space-y-4">
            <div>
              <p className="body-lead">Lead Paragraph - 1.25rem, 400 weight</p>
              <p className="body-secondary">This is used for introductory paragraphs and important content</p>
            </div>
            
            <div>
              <p className="body-main">Main Body Text - 1rem, 400 weight</p>
              <p className="body-secondary">This is the standard body text used throughout the application</p>
            </div>
            
            <div>
              <p className="body-secondary">Secondary Text - 0.875rem, 400 weight</p>
              <p className="body-caption">Used for less important information and descriptions</p>
            </div>
            
            <div>
              <p className="body-caption">Caption Text - 0.75rem, 400 weight</p>
              <p className="body-caption">Used for captions, labels, and very small text</p>
            </div>
          </div>
        </div>

        {/* Side by Side Comparison */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="heading-section mb-6">Side by Side Comparison</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="heading-card mb-4">Playfair Display (Serif)</h3>
              <div className="space-y-2">
                <p className="heading-card">This is a heading in Playfair Display</p>
                <p className="heading-sub">This is a subheading in Playfair Display</p>
                <p className="heading-small">This is small heading text in Playfair Display</p>
              </div>
            </div>
            
            <div>
              <h3 className="heading-card mb-4">Open Sans (Sans-Serif)</h3>
              <div className="space-y-2">
                <p className="body-lead">This is lead text in Open Sans</p>
                <p className="body-main">This is main body text in Open Sans</p>
                <p className="body-secondary">This is secondary text in Open Sans</p>
              </div>
            </div>
          </div>
        </div>

        {/* Real World Example */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="heading-section mb-6">Real World Example</h2>
          
          <article className="space-y-4">
            <h3 className="heading-card">Investment Planning Made Simple</h3>
            <p className="body-lead">
              Start your investment journey with confidence using our expert-guided platform designed for modern investors.
            </p>
            <p className="body-main">
              Our comprehensive suite of investment tools helps you make informed decisions about your financial future. 
              Whether you're planning for retirement, saving for a home, or building wealth for your family, we provide 
              the resources and guidance you need.
            </p>
            <h4 className="heading-sub">Key Benefits</h4>
            <p className="body-main">
              With over 10,000 satisfied clients and ₹50+ crores in assets under management, we've proven our commitment 
              to helping Indians achieve their financial goals.
            </p>
            <p className="body-secondary">
              *Terms and conditions apply. Past performance does not guarantee future results.
            </p>
          </article>
        </div>

      </div>
    </div>
  );
};

export default FontTest;
