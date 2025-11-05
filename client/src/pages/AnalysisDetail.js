import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AnalysisDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // useEffect(() => {
  //   if (user) {
  //     fetchAnalysis();
  //   }
  // }, [id, user]);

  // const fetchAnalysis = async () => {
  //   try {
  //     const { data } = await axios.get(`/api/websites/${id}`, {
  //       headers: { Authorization: `Bearer ${user.token}` }
  //     });
  //     setAnalysis(data);
  //     setLoading(false);
  //   } catch (err) {
  //     setError('Failed to fetch analysis details');
  //     setLoading(false);
  //   }
  // };


  useEffect(() => {
  const fetchAnalysis = async () => {
    try {
      const { data } = await axios.get(`/api/websites/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setAnalysis(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch analysis details');
      setLoading(false);
    }
  };

  if (user) {
    fetchAnalysis();
  }
}, [id, user]); // ✅ Warning removed

  const formatDate = (dateStr) => {
    return dateStr ? new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    }) : 'N/A';
  };

  if (!user) {
    return (
      <div className="container" style={{ marginTop: '2rem', textAlign: 'center' }}>
        <div className="alert" style={{ background: '#f8d7da', color: '#721c24', padding: '1rem', borderRadius: '8px' }}>
          Please login to view analysis details
        </div>
      </div>
    );
  }

  if (loading) return (
    <div className="container" style={{ textAlign: 'center', marginTop: '3rem' }}>
      <div className="spinner" style={{
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #4CAF50',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        animation: 'spin 1s linear infinite',
        margin: '0 auto'
      }}></div>
      <p style={{ marginTop: '1rem', color: '#666' }}>Loading analysis...</p>
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (error) return (
    <div className="container" style={{ marginTop: '2rem', textAlign: 'center' }}>
      <div className="alert" style={{ background: '#f8d7da', color: '#721c24', padding: '1rem', borderRadius: '8px' }}>
        {error}
      </div>
    </div>
  );

  if (!analysis) return <div className="container">Analysis not found</div>;

  return (
    <div className="container" style={{ maxWidth: '1400px', margin: '2rem auto', fontFamily: 'Segoe UI, sans-serif' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem', padding: '1.5rem', background: '#4CAF50', color: 'white', borderRadius: '12px' }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem' }}>{analysis.title || 'Website Analysis'}</h1>
        <p style={{ margin: '0.5rem 0 0', fontSize: '1.1rem', opacity: 0.9 }}>
          <a href={analysis.url} target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline' }}>
            {analysis.url}
          </a>
        </p>
        <p style={{ margin: '0.5rem 0', fontSize: '0.95rem' }}>
          <strong>Status:</strong> <span style={{ color: '#c8f7c5' }}>{analysis.statusCode} OK</span> | 
          <strong> Response Time:</strong> {analysis.responseTime}ms | 
          <strong> Analyzed:</strong> {new Date(analysis.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>

        {/* Basic Info */}
        <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '12px', border: '1px solid #dee2e6' }}>
          <h3 style={{ color: '#27ae60', borderBottom: '2px solid #27ae60', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Basic Info</h3>
          <div style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>
            <div><strong>Title:</strong> {analysis.title || 'N/A'}</div>
            <div><strong>Description:</strong> <span style={{ color: '#555' }}>{analysis.description?.slice(0, 120)}... </span></div>
            {analysis.keywords && <div><strong>Keywords:</strong> <em style={{ color: '#666' }}>{analysis.keywords}</em></div>}
            {analysis.favicon && (
              <div style={{ marginTop: '0.75rem' }}>
                <strong>Favicon:</strong>
                <img src={analysis.favicon} alt="Favicon" style={{ width: '24px', height: '24px', marginLeft: '0.5rem', verticalAlign: 'middle' }} />
              </div>
            )}
          </div>
        </div>

        {/* Domain Info */}
        {analysis.domainInfo && (
          <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '12px', border: '1px solid #dee2e6' }}>
            <h3 style={{ color: '#8e44ad', borderBottom: '2px solid #8e44ad', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Domain</h3>
            <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
              <div><strong>Registrar:</strong> {analysis.domainInfo.registrar}</div>
              <div><strong>Registered:</strong> {formatDate(analysis.domainInfo.registrationDate)}</div>
              <div><strong>Expires:</strong> {formatDate(analysis.domainInfo.expirationDate)}</div>
              <div><strong>Country:</strong> {analysis.domainInfo.registrantCountry}</div>
            </div>
          </div>
        )}

        {/* Server Info */}
        {analysis.serverInfo && (
          <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '12px', border: '1px solid #dee2e6' }}>
            <h3 style={{ color: '#2980b9', borderBottom: '2px solid #2980b9', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Server</h3>
            <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
              <div><strong>IP:</strong> {analysis.serverInfo.ipAddress}</div>
              <div><strong>Type:</strong> {analysis.serverInfo.serverType}</div>
              <div><strong>Hosting:</strong> {analysis.serverInfo.hosting || 'Unknown'}</div>
            </div>
          </div>
        )}

        {/* Security */}
        {analysis.security && (
          <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '12px', border: '1px solid #dee2e6' }}>
            <h3 style={{ color: '#c0392b', borderBottom: '2px solid #c0392b', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Security</h3>
            <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
              <div><strong>SSL:</strong> {analysis.security.hasSSL ? 'Enabled' : 'Disabled'}</div>
              {analysis.security.sslDaysRemaining > 0 && (
                <div style={{ color: analysis.security.sslDaysRemaining < 30 ? '#e74c3c' : '#27ae60' }}>
                  <strong>Expires in:</strong> {analysis.security.sslDaysRemaining} days
                </div>
              )}
              <div style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                HSTS | CSP | X-Frame | X-Content-Type
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Open Graph */}
      {(analysis.ogTitle || analysis.ogDescription || analysis.ogImage) && (
        <div style={{ marginBottom: '2rem', padding: '1.5rem', background: '#fff8e1', borderRadius: '12px', border: '1px solid #ffecb3' }}>
          <h3 style={{ color: '#f39c12', borderBottom: '2px solid #f39c12', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Social Preview (Open Graph)</h3>
          <div style={{ display: 'grid', gap: '1rem', fontSize: '0.95rem' }}>
            {analysis.ogTitle && <div><strong>Title:</strong> {analysis.ogTitle}</div>}
            {analysis.ogDescription && <div><strong>Description:</strong> {analysis.ogDescription}</div>}
            {analysis.ogImage && (
              <div>
                <strong>Image:</strong>
                <img src={analysis.ogImage} alt="OG" style={{ maxWidth: '100%', borderRadius: '8px', marginTop: '0.5rem' }} onError={e => e.target.style.display = 'none'} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Technologies */}
      {analysis.technologies && analysis.technologies.length > 0 && (
        <div style={{ marginBottom: '2rem', padding: '1.5rem', background: '#f0f8ff', borderRadius: '12px', border: '1px solid #b3e0ff' }}>
          <h3 style={{ color: '#3498db', borderBottom: '2px solid #3498db', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Technologies</h3>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {analysis.technologies.map((tech, i) => (
              <span key={i} style={{ background: '#3498db', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem' }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Headings */}
      {analysis.headings && (analysis.headings.h1?.length > 0 || analysis.headings.h2?.length > 0 || analysis.headings.h3?.length > 0) && (
        <div style={{ marginBottom: '2rem', padding: '1.5rem', background: '#f8f9fa', borderRadius: '12px', border: '1px solid #dee2e6' }}>
          <h3 style={{ color: '#2c3e50', borderBottom: '2px solid #2c3e50', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Headings</h3>
          {analysis.headings.h1?.length > 0 && (
            <div><strong>H1:</strong> {analysis.headings.h1.join(', ')}</div>
          )}
          {analysis.headings.h2?.length > 0 && (
            <div style={{ marginTop: '0.5rem' }}>
              <strong>H2 ({analysis.headings.h2.length}):</strong>
              <ul style={{ columns: 2, margin: '0.5rem 0', paddingLeft: '1.2rem', fontSize: '0.9rem' }}>
                {analysis.headings.h2.slice(0, 10).map((h, i) => <li key={i}>{h}</li>)}
                {analysis.headings.h2.length > 10 && <li style={{ fontStyle: 'italic' }}>+{analysis.headings.h2.length - 10} more</li>}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Images */}
      {analysis.images && analysis.images.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#9b59b6', borderBottom: '2px solid #9b59b6', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
            Images ({analysis.imageDetails?.total || analysis.images.length})
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
            {analysis.images.slice(0, 24).map((img, i) => {
              const src = typeof img === 'string' ? img : img.src;
              const alt = typeof img === 'object' ? img.alt : `Image ${i + 1}`;
              return (
                <div key={i} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', background: '#fff' }}>
                  <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    style={{ width: '100%', height: '140px', objectFit: 'cover' }}
                    onError={e => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5GYWlsZWQgdG8gbG9hZDwvdGV4dD48L3N2Zz4=';
                    }}
                  />
                  <div style={{ padding: '0.5rem', fontSize: '0.75rem', background: '#f8f9fa', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {alt}
                  </div>
                </div>
              );
            })}
          </div>
          {analysis.images.length > 24 && (
            <p style={{ textAlign: 'center', color: '#777', fontStyle: 'italic', marginTop: '1rem' }}>
              +{analysis.images.length - 24} more images
            </p>
          )}
        </div>
      )}

      {/* Contact & SEO */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Contact */}
        {(analysis.contactInfo?.phone?.length > 0 || analysis.contactInfo?.email?.length > 0) && (
          <div style={{ background: '#e8f5e8', padding: '1.5rem', borderRadius: '12px', border: '1px solid #a8e6a8' }}>
            <h3 style={{ color: '#27ae60', borderBottom: '2px solid #27ae60', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Contact</h3>
            {analysis.contactInfo.phone?.length > 0 && (
              <div>
                <strong>Phone:</strong>
                <ul style={{ margin: '0.5rem 0', paddingLeft: '1.2rem', fontSize: '0.9rem' }}>
                  {analysis.contactInfo.phone.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* SEO */}
        {analysis.seo && (
          <div style={{ background: '#e3f2fd', padding: '1.5rem', borderRadius: '12px', border: '1px solid #90caf9' }}>
            <h3 style={{ color: '#1976d2', borderBottom: '2px solid #1976d2', paddingBottom: '0.5rem', marginBottom: '1rem' }}>SEO</h3>
            <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
              <div>robots.txt: {analysis.seo.hasRobotsTxt ? 'Found' : 'Missing'}</div>
              <div>Sitemap: {analysis.seo.hasSitemap ? 'Found' : 'Missing'}</div>
              <div>Canonical: {analysis.seo.canonicalUrl ? 'Yes' : 'No'}</div>
            </div>
          </div>
        )}
      </div>

      {/* Links */}
      {analysis.links && analysis.links.length > 0 && (
        <div style={{ marginBottom: '2rem', padding: '1.5rem', background: '#f5f5f5', borderRadius: '12px', border: '1px solid #ddd' }}>
          <h3 style={{ color: '#e67e22', borderBottom: '2px solid #e67e22', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
            External Links ({analysis.links.length})
          </h3>
          <div style={{ maxHeight: '200px', overflowY: 'auto', fontSize: '0.85rem' }}>
            {analysis.links.map((link, i) => (
              <div key={i} style={{ marginBottom: '0.4rem' }}>
                <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: '#3498db', wordBreak: 'break-all' }}>
                  {link}
                </a>
              </div>
            ))}
            {/* {analysis.links.length > 20 && (
              <div style={{ color: '#777', fontStyle: 'italic' }}>+{analysis.links.length - 20} more</div>
            )} */}
          </div>
        </div>
      )}


      {analysis.links && analysis.links.length > 0 && (
  <div
    style={{
      marginBottom: '2rem',
      padding: '1.5rem',
      background: '#f5f5f5',
      borderRadius: '12px',
      border: '1px solid #ddd',
    }}
  >
    <h3
      style={{
        color: '#e67e22',
        borderBottom: '2px solid #e67e22',
        paddingBottom: '0.5rem',
        marginBottom: '1rem',
      }}
    >
      External Links ({analysis.links.length})
    </h3>
    <div
      style={{
        maxHeight: '200px',
        overflowY: 'auto',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}
    >
   {analysis.links.map((link, i) => {
  const domain = link.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  return (
    <a
      key={i}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        textDecoration: 'none',
        backgroundColor: '#3498db',
        color: '#fff',
        padding: '0.4rem 0.8rem',
        borderRadius: '8px',
        fontSize: '0.85rem',
        transition: 'background 0.3s',
        display: 'inline-block',
        marginRight: '0.5rem',
        marginBottom: '0.5rem',
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = '#217dbb')}
      onMouseLeave={(e) => (e.target.style.backgroundColor = '#3498db')}
    >
      {domain}
    </a>
  );
})}

    </div>
  </div>
)}


      {/* Back Button */}
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <button
          onClick={() => navigate('/my-analyses')}
          style={{
            padding: '0.75rem 2rem',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}
        >
          Back to My Analyses
        </button>
      </div>
    </div>
  );
};

export default AnalysisDetail;