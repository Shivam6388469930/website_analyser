import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import AnalysisResults from '../components/AnalysisResults';

const AnalyzeWebsite = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const formatUrl = (input) => {
    let formatted = input.trim();
    if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
      formatted = 'https://' + formatted;
    }
    return formatted;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in to analyze websites');
      return;
    }

    const formattedUrl = formatUrl(url);
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const { data } = await axios.post(
        '/api/websites/analyze',
        { url: formattedUrl },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setResult(data);
      setUrl('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to analyze website');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fdd', color: '#900', borderRadius: '5px', textAlign: 'center' }}>
        Please login to analyze websites
      </div>
    );
  }

  return (
    <div style={{ marginTop: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>🌐 Website Analyzer</h1>

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '1.5rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <p style={{ marginBottom: '1.5rem', color: '#666', lineHeight: '1.5' }}>
          Enter any website URL (e.g., google.com, github.com) and get detailed insights:
          SEO, hosting, SSL, tech stack, contact info & more.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Website URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              placeholder="Enter website URL (e.g., google.com)"
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '1.1rem',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              fontSize: '1.1rem',
              padding: '12px',
              backgroundColor: '#3498db',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Analyzing...' : 'Analyze Website'}
          </button>
        </form>

        {error && (
          <div style={{
            marginTop: '1rem',
            padding: '0.8rem',
            backgroundColor: '#fdd',
            color: '#900',
            borderRadius: '5px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <div style={{
            border: '4px solid #eee',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            margin: '0 auto',
            animation: 'spin 1s linear infinite'
          }} />
          <div style={{ fontSize: '1.1rem', marginTop: '1rem' }}>🔍 Analyzing website...</div>
          <div style={{ fontSize: '0.9rem', color: '#888' }}>This may take a few seconds</div>
        </div>
      )}

      {/* Spinner animation keyframes */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      {/* Analysis Result */}
      {result && (
        <>
          <AnalysisResults result={result} />

          <div style={{
            marginTop: '2rem',
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => navigate('/my-analyses')}
              style={{
                padding: '10px 16px',
                backgroundColor: '#3498db',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              View My Analyses
            </button>

            <button
              onClick={() => setResult(null)}
              style={{
                padding: '10px 16px',
                backgroundColor: '#2ecc71',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Analyze Another Website
            </button>

            {user?.role === 'admin' && (
              <>
                <button
                  onClick={() => navigate('/admin/summary')}
                  style={{
                    padding: '10px 16px',
                    backgroundColor: '#f39c12',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  View Summary
                </button>

                <button
                  onClick={() => window.open('/api/websites/export', '_blank')}
                  style={{
                    padding: '10px 16px',
                    backgroundColor: '#e74c3c',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Export CSV
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AnalyzeWebsite;
