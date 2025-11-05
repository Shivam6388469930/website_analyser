import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const MyAnalyses = () => {
  const { user } = useContext(AuthContext);
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
  const fetchAnalyses = async () => {
    try {
      const { data } = await axios.get('/api/websites', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setAnalyses(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch analyses');
      setLoading(false);
    }
  };

  if (user) {
    fetchAnalyses();
  }
}, [user]);


  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this analysis?')) {
      try {
        await axios.delete(`/api/websites/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setAnalyses(analyses.filter(a => a._id !== id));
      } catch (err) {
        alert('Failed to delete analysis');
      }
    }
  };

  if (!user) {
    return (
      <div className="alert alert-error" style={{ marginTop: '2rem' }}>
        Please login to view your analyses
      </div>
    );
  }

  if (loading) return <div className="loading">Loading your analyses...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div style={{ marginTop: '2rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>My Website Analyses</h1>
      
      {analyses.length === 0 ? (
        <div className="card">
          <p>You haven't analyzed any websites yet.</p>
          <Link to="/analyze">
            <button className="btn-primary">Analyze Your First Website</button>
          </Link>
        </div>
      ) : (
        <div className="grid">
          {analyses.map((analysis) => (
            <div key={analysis._id} className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                {analysis.favicon && (
                  <img 
                    src={analysis.favicon} 
                    alt="favicon" 
                    style={{ width: '24px', height: '24px' }}
                    onError={(e) => e.target.style.display = 'none'}
                  />
                )}
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>
                  {analysis.title || 'Untitled'}
                </h3>
              </div>
              
              <a 
                href={analysis.url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#4CAF50', fontSize: '0.9rem', wordBreak: 'break-all' }}
              >
                {analysis.url}
              </a>
              
              <p style={{ margin: '1rem 0', color: '#666', fontSize: '0.9rem' }}>
                {analysis.description?.substring(0, 100) || 'No description'}
                {analysis.description?.length > 100 && '...'}
              </p>

              <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '1rem' }}>
                <div>Response Time: {analysis.responseTime}ms</div>
                <div>Status: {analysis.statusCode}</div>
                <div>Analyzed: {new Date(analysis.createdAt).toLocaleDateString()}</div>
              </div>

              {analysis.technologies && analysis.technologies.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {analysis.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        style={{ 
                          background: '#e8f5e9', 
                          color: '#2e7d32', 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: '12px',
                          fontSize: '0.75rem'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link to={`/analysis/${analysis._id}`} style={{ flex: 1 }}>
                  <button className="btn-primary" style={{ width: '100%' }}>
                    View Details
                  </button>
                </Link>
                <button 
                  onClick={() => handleDelete(analysis._id)} 
                  className="btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAnalyses;

