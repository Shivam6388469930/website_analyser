// import React from 'react';
// import { Link } from 'react-router-dom';

// const Home = () => {
//   return (
//     <div style={{ textAlign: 'center', padding: '3rem' }}>
//       <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#333' }}>
//         🔍 Website Analyzer
//       </h1>
//       <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
//         Analyze any website and get detailed information instantly
//       </p>
//       <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
//         <Link to="/analyze">
//           <button className="btn-primary" style={{ fontSize: '1.1rem', padding: '12px 30px' }}>
//             🔍 Analyze Website
//           </button>
//         </Link>
//         <Link to="/register">
//           <button className="btn-primary" style={{ fontSize: '1.1rem', padding: '12px 30px' }}>
//             Get Started Free
//           </button>
//         </Link>
//       </div>

//       <div style={{ marginTop: '3rem', textAlign: 'left', maxWidth: '800px', margin: '3rem auto' }}>
//         <h2 style={{ marginBottom: '1rem' }}>What You Can Analyze:</h2>
//         <ul style={{ fontSize: '1.1rem', lineHeight: '2' }}>
//           <li>🌐 <strong>Website Metadata</strong> - Title, description, keywords, author</li>
//           <li>🖼️ <strong>Images & Media</strong> - All images, favicon, Open Graph images</li>
//           <li>🔗 <strong>Links</strong> - External and internal links</li>
//           <li>📊 <strong>SEO Information</strong> - Headings structure (H1, H2, H3)</li>
//           <li>⚡ <strong>Performance</strong> - Response time and status codes</li>
//           <li>🛠️ <strong>Technologies</strong> - Detect frameworks and libraries used</li>
//           <li>📱 <strong>Social Media Preview</strong> - Open Graph tags for social sharing</li>
//         </ul>
//       </div>

//       <div style={{ marginTop: '3rem', background: '#f9f9f9', padding: '2rem', borderRadius: '8px', maxWidth: '800px', margin: '3rem auto' }}>
//         <h2 style={{ marginBottom: '1rem' }}>How It Works:</h2>
//         <ol style={{ fontSize: '1.1rem', lineHeight: '2', textAlign: 'left' }}>
//           <li>📝 Enter any website URL (e.g., google.com, facebook.com)</li>
//           <li>🚀 Click "Analyze Website"</li>
//           <li>📊 Get comprehensive details about the website</li>
//           <li>💾 Save and view your analysis history</li>
//         </ol>
//       </div>

//       <div style={{ marginTop: '3rem' }}>
//         <h2 style={{ marginBottom: '1rem' }}>Additional Features:</h2>
//         <ul style={{ fontSize: '1.1rem', lineHeight: '2' }}>
//           <li>✅ User Authentication (Register/Login)</li>
//           <li>✅ JWT Token-based Authorization</li>
//           <li>✅ Save Analysis History</li>
//           <li>✅ MongoDB Database Integration</li>
//           <li>✅ RESTful API</li>
//           <li>✅ Responsive Design</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Home;




import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  const features = [
    {
      icon: "🌐",
      title: "Website Metadata",
      description: "Extract title, description, keywords, author, and more",
      color: "#3B82F6"
    },
    {
      icon: "🖼️",
      title: "Images & Media",
      description: "Discover all images, favicon, and Open Graph images",
      color: "#10B981"
    },
    {
      icon: "🔗",
      title: "Link Analysis",
      description: "Analyze external and internal linking structure",
      color: "#8B5CF6"
    },
    {
      icon: "📊",
      title: "SEO Information",
      description: "Check headings structure (H1, H2, H3) and SEO health",
      color: "#F59E0B"
    },
    {
      icon: "⚡",
      title: "Performance Metrics",
      description: "Monitor response time and status codes",
      color: "#EF4444"
    },
    {
      icon: "🛠️",
      title: "Technology Stack",
      description: "Detect frameworks, libraries, and CMS platforms",
      color: "#EC4899"
    },
    {
      icon: "📱",
      title: "Social Media Preview",
      description: "Preview Open Graph tags for social sharing",
      color: "#06B6D4"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Enter URL",
      description: "Input any website URL you want to analyze",
      icon: "📝"
    },
    {
      number: "02",
      title: "Analyze",
      description: "Click analyze and let our AI-powered engine work",
      icon: "🚀"
    },
    {
      number: "03",
      title: "Get Results",
      description: "Receive comprehensive website insights instantly",
      icon: "📊"
    },
    {
      number: "04",
      title: "Save History",
      description: "Keep track of all your analyses securely",
      icon: "💾"
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-pulse"></span>
            AI-Powered Analysis
          </div>
          <h1 className="hero-title">
            Website Analyzer
            <span className="hero-icon">🔍</span>
          </h1>
          <p className="hero-subtitle">
            Get comprehensive website insights in seconds. 
            Analyze metadata, SEO, performance, and more with our advanced tool.
          </p>
          <div className="hero-buttons">
            <Link to="/analyze" className="btn-primary">
              <span>🔍</span>
              Analyze Website
            </Link>
            <Link to="/register" className="btn-secondary">
              <span>✨</span>
              Get Started Free
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="trust-indicators">
            <div className="trust-item">
              <span>✅</span>
              <span>Free to use</span>
            </div>
            <div className="trust-item">
              <span>⚡</span>
              <span>Instant results</span>
            </div>
            <div className="trust-item">
              <span>🔒</span>
              <span>Secure & Private</span>
            </div>
          </div>
        </div>
        
        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Websites Analyzed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Uptime</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">&lt;2s</div>
            <div className="stat-label">Analysis Time</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <span className="section-tag">What You Get</span>
          <h2 className="section-title">Comprehensive Website Analysis</h2>
          <p className="section-subtitle">
            Everything you need to understand any website's structure, performance, and SEO
          </p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card" style={{ borderTopColor: feature.color }}>
              <div className="feature-icon" style={{ backgroundColor: `${feature.color}15`, color: feature.color }}>
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="section-header">
          <span className="section-tag">Simple Process</span>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Four simple steps to get detailed website insights
          </p>
        </div>
        
        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{step.number}</div>
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
              {index < steps.length - 1 && <div className="step-connector">→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Features List Section */}
      <section className="features-list-section">
        <div className="features-list-container">
          <div className="features-list-content">
            <span className="section-tag">Premium Features</span>
            <h2 className="section-title">Powerful Features for Professionals</h2>
            <p className="section-subtitle">
              Built with modern tech stack to provide reliable and accurate analysis
            </p>
            
            <div className="features-list-grid">
              <div className="feature-list-item">
                <div className="feature-list-icon">✓</div>
                <div className="feature-list-text">
                  <strong>User Authentication</strong>
                  <span>Secure Register/Login with JWT tokens</span>
                </div>
              </div>
              <div className="feature-list-item">
                <div className="feature-list-icon">✓</div>
                <div className="feature-list-text">
                  <strong>Analysis History</strong>
                  <span>Save and access all your previous analyses</span>
                </div>
              </div>
              <div className="feature-list-item">
                <div className="feature-list-icon">✓</div>
                <div className="feature-list-text">
                  <strong>MongoDB Database</strong>
                  <span>Scalable and reliable data storage</span>
                </div>
              </div>
              <div className="feature-list-item">
                <div className="feature-list-icon">✓</div>
                <div className="feature-list-text">
                  <strong>RESTful API</strong>
                  <span>Well-documented API for integrations</span>
                </div>
              </div>
              <div className="feature-list-item">
                <div className="feature-list-icon">✓</div>
                <div className="feature-list-text">
                  <strong>Responsive Design</strong>
                  <span>Works perfectly on all devices</span>
                </div>
              </div>
              <div className="feature-list-item">
                <div className="feature-list-icon">✓</div>
                <div className="feature-list-text">
                  <strong>Real-time Analysis</strong>
                  <span>Get results in milliseconds</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="features-list-cta">
            <h3>Ready to analyze your first website?</h3>
            <Link to="/register" className="btn-primary btn-large">
              Start Free Analysis
              <span>→</span>
            </Link>
            <p className="cta-note">No credit card required • Free forever plan</p>
          </div>
        </div>
      </section>

      {/* CSS Styles */}
      <style jsx>{`
        .home-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* Hero Section */
        .hero-section {
          text-align: center;
          padding: 4rem 0 6rem 0;
          position: relative;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.5rem 1.2rem;
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 2rem;
          position: relative;
        }

        .badge-pulse {
          width: 8px;
          height: 8px;
          background-color: #10b981;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          color: #1a1a2e;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .hero-icon {
          font-size: 3.5rem;
          display: inline-block;
          animation: bounce 3s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto 2rem auto;
          line-height: 1.6;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .btn-primary, .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 14px 32px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          text-decoration: none;
          cursor: pointer;
          border: none;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
        }

        .btn-secondary {
          background: white;
          color: #667eea;
          border: 2px solid #667eea;
        }

        .btn-secondary:hover {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
        }

        .btn-large {
          padding: 16px 40px;
          font-size: 1.125rem;
        }

        .trust-indicators {
          display: flex;
          gap: 2rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #666;
          font-size: 0.875rem;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-top: 4rem;
          flex-wrap: wrap;
        }

        .stat-card {
          text-align: center;
          padding: 1.5rem 2rem;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          border-radius: 16px;
          min-width: 150px;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 800;
          color: #667eea;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: #666;
          font-size: 0.875rem;
        }

        /* Section Styles */
        .features-section, .how-it-works, .features-list-section {
          padding: 5rem 0;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-tag {
          display: inline-block;
          background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
          color: #667eea;
          padding: 0.25rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 1rem;
        }

        .section-subtitle {
          font-size: 1.125rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Features Grid */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .feature-card {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          border-top: 4px solid;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          text-align: center;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          font-size: 2rem;
          margin: 0 auto 1.5rem auto;
        }

        .feature-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: #1a1a2e;
        }

        .feature-description {
          color: #666;
          line-height: 1.5;
        }

        /* Steps */
        .steps-container {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 2rem;
          position: relative;
        }

        .step-card {
          flex: 1;
          text-align: center;
          position: relative;
          padding: 2rem;
          background: white;
          border-radius: 16px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .step-number {
          font-size: 3rem;
          font-weight: 800;
          color: #667eea;
          opacity: 0.3;
          line-height: 1;
          margin-bottom: 1rem;
        }

        .step-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .step-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #1a1a2e;
        }

        .step-description {
          color: #666;
          font-size: 0.875rem;
        }

        .step-connector {
          display: none;
        }

        /* Features List */
        .features-list-container {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 24px;
          padding: 3rem;
          color: white;
        }

        .features-list-content {
          margin-bottom: 3rem;
        }

        .features-list-container .section-tag {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .features-list-container .section-title,
        .features-list-container .section-subtitle {
          color: white;
        }

        .section-subtitle {
          color: rgba(255, 255, 255, 0.9);
        }

        .features-list-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .feature-list-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }

        .feature-list-icon {
          width: 30px;
          height: 30px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          flex-shrink: 0;
        }

        .feature-list-text {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .feature-list-text strong {
          font-size: 1rem;
        }

        .feature-list-text span {
          font-size: 0.875rem;
          opacity: 0.9;
        }

        .features-list-cta {
          text-align: center;
          margin-top: 3rem;
          padding-top: 3rem;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        .features-list-cta h3 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .cta-note {
          margin-top: 1rem;
          font-size: 0.875rem;
          opacity: 0.8;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .home-container {
            padding: 0 1rem;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
          }
          
          .steps-container {
            flex-direction: column;
          }
          
          .step-connector {
            display: none;
          }
          
          .features-list-container {
            padding: 2rem;
          }
          
          .hero-stats {
            gap: 1rem;
          }
          
          .stat-card {
            padding: 1rem;
            min-width: 100px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;