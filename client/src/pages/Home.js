import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', padding: '3rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#333' }}>
        🔍 Website Analyzer
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
        Analyze any website and get detailed information instantly
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/analyze">
          <button className="btn-primary" style={{ fontSize: '1.1rem', padding: '12px 30px' }}>
            🔍 Analyze Website
          </button>
        </Link>
        <Link to="/register">
          <button className="btn-primary" style={{ fontSize: '1.1rem', padding: '12px 30px' }}>
            Get Started Free
          </button>
        </Link>
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'left', maxWidth: '800px', margin: '3rem auto' }}>
        <h2 style={{ marginBottom: '1rem' }}>What You Can Analyze:</h2>
        <ul style={{ fontSize: '1.1rem', lineHeight: '2' }}>
          <li>🌐 <strong>Website Metadata</strong> - Title, description, keywords, author</li>
          <li>🖼️ <strong>Images & Media</strong> - All images, favicon, Open Graph images</li>
          <li>🔗 <strong>Links</strong> - External and internal links</li>
          <li>📊 <strong>SEO Information</strong> - Headings structure (H1, H2, H3)</li>
          <li>⚡ <strong>Performance</strong> - Response time and status codes</li>
          <li>🛠️ <strong>Technologies</strong> - Detect frameworks and libraries used</li>
          <li>📱 <strong>Social Media Preview</strong> - Open Graph tags for social sharing</li>
        </ul>
      </div>

      <div style={{ marginTop: '3rem', background: '#f9f9f9', padding: '2rem', borderRadius: '8px', maxWidth: '800px', margin: '3rem auto' }}>
        <h2 style={{ marginBottom: '1rem' }}>How It Works:</h2>
        <ol style={{ fontSize: '1.1rem', lineHeight: '2', textAlign: 'left' }}>
          <li>📝 Enter any website URL (e.g., google.com, facebook.com)</li>
          <li>🚀 Click "Analyze Website"</li>
          <li>📊 Get comprehensive details about the website</li>
          <li>💾 Save and view your analysis history</li>
        </ol>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Additional Features:</h2>
        <ul style={{ fontSize: '1.1rem', lineHeight: '2' }}>
          <li>✅ User Authentication (Register/Login)</li>
          <li>✅ JWT Token-based Authorization</li>
          <li>✅ Save Analysis History</li>
          <li>✅ MongoDB Database Integration</li>
          <li>✅ RESTful API</li>
          <li>✅ Responsive Design</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;

