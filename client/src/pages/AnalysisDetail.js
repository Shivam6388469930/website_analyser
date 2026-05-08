// import React, { useState, useEffect, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';

// const AnalysisDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);
//   const [analysis, setAnalysis] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//   const fetchAnalysis = async () => {
//     try {
//       const { data } = await axios.get(`/api/websites/${id}`, {
//         headers: { Authorization: `Bearer ${user.token}` }
//       });
//       setAnalysis(data);
//       setLoading(false);
//     } catch (err) {
//       setError('Failed to fetch analysis details');
//       setLoading(false);
//     }
//   };

//   if (user) {
//     fetchAnalysis();
//   }
// }, [id, user]); // ✅ Warning removed

//   const formatDate = (dateStr) => {
//     return dateStr ? new Date(dateStr).toLocaleDateString('en-US', {
//       year: 'numeric', month: 'long', day: 'numeric'
//     }) : 'N/A';
//   };

//   if (!user) {
//     return (
//       <div className="container" style={{ marginTop: '2rem', textAlign: 'center' }}>
//         <div className="alert" style={{ background: '#f8d7da', color: '#721c24', padding: '1rem', borderRadius: '8px' }}>
//           Please login to view analysis details
//         </div>
//       </div>
//     );
//   }

//   if (loading) return (
//     <div className="container" style={{ textAlign: 'center', marginTop: '3rem' }}>
//       <div className="spinner" style={{
//         border: '4px solid #f3f3f3',
//         borderTop: '4px solid #4CAF50',
//         borderRadius: '50%',
//         width: '40px',
//         height: '40px',
//         animation: 'spin 1s linear infinite',
//         margin: '0 auto'
//       }}></div>
//       <p style={{ marginTop: '1rem', color: '#666' }}>Loading analysis...</p>
//       <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
//     </div>
//   );

//   if (error) return (
//     <div className="container" style={{ marginTop: '2rem', textAlign: 'center' }}>
//       <div className="alert" style={{ background: '#f8d7da', color: '#721c24', padding: '1rem', borderRadius: '8px' }}>
//         {error}
//       </div>
//     </div>
//   );

//   if (!analysis) return <div className="container">Analysis not found</div>;

//   return (
//     <div className="container" style={{ maxWidth: '1400px', margin: '2rem auto', fontFamily: 'Segoe UI, sans-serif' }}>
//       {/* Header */}
//       <div style={{ textAlign: 'center', marginBottom: '2rem', padding: '1.5rem', background: '#4CAF50', color: 'white', borderRadius: '12px' }}>
//         <h1 style={{ margin: 0, fontSize: '1.8rem' }}>{analysis.title || 'Website Analysis'}</h1>
//         <p style={{ margin: '0.5rem 0 0', fontSize: '1.1rem', opacity: 0.9 }}>
//           <a href={analysis.url} target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline' }}>
//             {analysis.url}
//           </a>
//         </p>
//         <p style={{ margin: '0.5rem 0', fontSize: '0.95rem' }}>
//           <strong>Status:</strong> <span style={{ color: '#c8f7c5' }}>{analysis.statusCode} OK</span> | 
//           <strong> Response Time:</strong> {analysis.responseTime}ms | 
//           <strong> Analyzed:</strong> {new Date(analysis.createdAt).toLocaleString()}
//         </p>
//       </div>

//       {/* Grid Layout */}
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>

//         {/* Basic Info */}
//         <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '12px', border: '1px solid #dee2e6' }}>
//           <h3 style={{ color: '#27ae60', borderBottom: '2px solid #27ae60', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Basic Info</h3>
//           <div style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>
//             <div><strong>Title:</strong> {analysis.title || 'N/A'}</div>
//             <div><strong>Description:</strong> <span style={{ color: '#555' }}>{analysis.description?.slice(0, 120)}... </span></div>
//             {analysis.keywords && <div><strong>Keywords:</strong> <em style={{ color: '#666' }}>{analysis.keywords}</em></div>}
//             {analysis.favicon && (
//               <div style={{ marginTop: '0.75rem' }}>
//                 <strong>Favicon:</strong>
//                 <img src={analysis.favicon} alt="Favicon" style={{ width: '24px', height: '24px', marginLeft: '0.5rem', verticalAlign: 'middle' }} />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Domain Info */}
//         {analysis.domainInfo && (
//           <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '12px', border: '1px solid #dee2e6' }}>
//             <h3 style={{ color: '#8e44ad', borderBottom: '2px solid #8e44ad', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Domain</h3>
//             <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
//               <div><strong>Registrar:</strong> {analysis.domainInfo.registrar}</div>
//               <div><strong>Registered:</strong> {formatDate(analysis.domainInfo.registrationDate)}</div>
//               <div><strong>Expires:</strong> {formatDate(analysis.domainInfo.expirationDate)}</div>
//               <div><strong>Country:</strong> {analysis.domainInfo.registrantCountry}</div>
//             </div>
//           </div>
//         )}

//         {/* Server Info */}
//         {analysis.serverInfo && (
//           <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '12px', border: '1px solid #dee2e6' }}>
//             <h3 style={{ color: '#2980b9', borderBottom: '2px solid #2980b9', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Server</h3>
//             <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
//               <div><strong>IP:</strong> {analysis.serverInfo.ipAddress}</div>
//               <div><strong>Type:</strong> {analysis.serverInfo.serverType}</div>
//               <div><strong>Hosting:</strong> {analysis.serverInfo.hosting || 'Unknown'}</div>
//             </div>
//           </div>
//         )}

//         {/* Security */}
//         {analysis.security && (
//           <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '12px', border: '1px solid #dee2e6' }}>
//             <h3 style={{ color: '#c0392b', borderBottom: '2px solid #c0392b', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Security</h3>
//             <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
//               <div><strong>SSL:</strong> {analysis.security.hasSSL ? 'Enabled' : 'Disabled'}</div>
//               {analysis.security.sslDaysRemaining > 0 && (
//                 <div style={{ color: analysis.security.sslDaysRemaining < 30 ? '#e74c3c' : '#27ae60' }}>
//                   <strong>Expires in:</strong> {analysis.security.sslDaysRemaining} days
//                 </div>
//               )}
//               <div style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
//                 HSTS | CSP | X-Frame | X-Content-Type
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Open Graph */}
//       {(analysis.ogTitle || analysis.ogDescription || analysis.ogImage) && (
//         <div style={{ marginBottom: '2rem', padding: '1.5rem', background: '#fff8e1', borderRadius: '12px', border: '1px solid #ffecb3' }}>
//           <h3 style={{ color: '#f39c12', borderBottom: '2px solid #f39c12', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Social Preview (Open Graph)</h3>
//           <div style={{ display: 'grid', gap: '1rem', fontSize: '0.95rem' }}>
//             {analysis.ogTitle && <div><strong>Title:</strong> {analysis.ogTitle}</div>}
//             {analysis.ogDescription && <div><strong>Description:</strong> {analysis.ogDescription}</div>}
//             {analysis.ogImage && (
//               <div>
//                 <strong>Image:</strong>
//                 <img src={analysis.ogImage} alt="OG" style={{ maxWidth: '100%', borderRadius: '8px', marginTop: '0.5rem' }} onError={e => e.target.style.display = 'none'} />
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Technologies */}
//       {analysis.technologies && analysis.technologies.length > 0 && (
//         <div style={{ marginBottom: '2rem', padding: '1.5rem', background: '#f0f8ff', borderRadius: '12px', border: '1px solid #b3e0ff' }}>
//           <h3 style={{ color: '#3498db', borderBottom: '2px solid #3498db', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Technologies</h3>
//           <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
//             {analysis.technologies.map((tech, i) => (
//               <span key={i} style={{ background: '#3498db', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem' }}>
//                 {tech}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Headings */}
//       {analysis.headings && (analysis.headings.h1?.length > 0 || analysis.headings.h2?.length > 0 || analysis.headings.h3?.length > 0) && (
//         <div style={{ marginBottom: '2rem', padding: '1.5rem', background: '#f8f9fa', borderRadius: '12px', border: '1px solid #dee2e6' }}>
//           <h3 style={{ color: '#2c3e50', borderBottom: '2px solid #2c3e50', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Headings</h3>
//           {analysis.headings.h1?.length > 0 && (
//             <div><strong>H1:</strong> {analysis.headings.h1.join(', ')}</div>
//           )}
//           {analysis.headings.h2?.length > 0 && (
//             <div style={{ marginTop: '0.5rem' }}>
//               <strong>H2 ({analysis.headings.h2.length}):</strong>
//               <ul style={{ columns: 2, margin: '0.5rem 0', paddingLeft: '1.2rem', fontSize: '0.9rem' }}>
//                 {analysis.headings.h2.slice(0, 10).map((h, i) => <li key={i}>{h}</li>)}
//                 {analysis.headings.h2.length > 10 && <li style={{ fontStyle: 'italic' }}>+{analysis.headings.h2.length - 10} more</li>}
//               </ul>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Images */}
//       {analysis.images && analysis.images.length > 0 && (
//         <div style={{ marginBottom: '2rem' }}>
//           <h3 style={{ color: '#9b59b6', borderBottom: '2px solid #9b59b6', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
//             Images ({analysis.imageDetails?.total || analysis.images.length})
//           </h3>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
//             {analysis.images.slice(0, 24).map((img, i) => {
//               const src = typeof img === 'string' ? img : img.src;
//               const alt = typeof img === 'object' ? img.alt : `Image ${i + 1}`;
//               return (
//                 <div key={i} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', background: '#fff' }}>
//                   <img
//                     src={src}
//                     alt={alt}
//                     loading="lazy"
//                     style={{ width: '100%', height: '140px', objectFit: 'cover' }}
//                     onError={e => {
//                       e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5GYWlsZWQgdG8gbG9hZDwvdGV4dD48L3N2Zz4=';
//                     }}
//                   />
//                   <div style={{ padding: '0.5rem', fontSize: '0.75rem', background: '#f8f9fa', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                     {alt}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           {analysis.images.length > 24 && (
//             <p style={{ textAlign: 'center', color: '#777', fontStyle: 'italic', marginTop: '1rem' }}>
//               +{analysis.images.length - 24} more images
//             </p>
//           )}
//         </div>
//       )}

//       {/* Contact & SEO */}
//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
//         {/* Contact */}
//         {(analysis.contactInfo?.phone?.length > 0 || analysis.contactInfo?.email?.length > 0) && (
//           <div style={{ background: '#e8f5e8', padding: '1.5rem', borderRadius: '12px', border: '1px solid #a8e6a8' }}>
//             <h3 style={{ color: '#27ae60', borderBottom: '2px solid #27ae60', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Contact</h3>
//             {analysis.contactInfo.phone?.length > 0 && (
//               <div>
//                 <strong>Phone:</strong>
//                 <ul style={{ margin: '0.5rem 0', paddingLeft: '1.2rem', fontSize: '0.9rem' }}>
//                   {analysis.contactInfo.phone.map((p, i) => <li key={i}>{p}</li>)}
//                 </ul>
//               </div>
//             )}
//           </div>
//         )}

//         {/* SEO */}
//         {analysis.seo && (
//           <div style={{ background: '#e3f2fd', padding: '1.5rem', borderRadius: '12px', border: '1px solid #90caf9' }}>
//             <h3 style={{ color: '#1976d2', borderBottom: '2px solid #1976d2', paddingBottom: '0.5rem', marginBottom: '1rem' }}>SEO</h3>
//             <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
//               <div>robots.txt: {analysis.seo.hasRobotsTxt ? 'Found' : 'Missing'}</div>
//               <div>Sitemap: {analysis.seo.hasSitemap ? 'Found' : 'Missing'}</div>
//               <div>Canonical: {analysis.seo.canonicalUrl ? 'Yes' : 'No'}</div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Links */}
//       {analysis.links && analysis.links.length > 0 && (
//         <div style={{ marginBottom: '2rem', padding: '1.5rem', background: '#f5f5f5', borderRadius: '12px', border: '1px solid #ddd' }}>
//           <h3 style={{ color: '#e67e22', borderBottom: '2px solid #e67e22', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
//             External Links ({analysis.links.length})
//           </h3>
//           <div style={{ maxHeight: '200px', overflowY: 'auto', fontSize: '0.85rem' }}>
//             {analysis.links.map((link, i) => (
//               <div key={i} style={{ marginBottom: '0.4rem' }}>
//                 <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: '#3498db', wordBreak: 'break-all' }}>
//                   {link}
//                 </a>
//               </div>
//             ))}
//             {/* {analysis.links.length > 20 && (
//               <div style={{ color: '#777', fontStyle: 'italic' }}>+{analysis.links.length - 20} more</div>
//             )} */}
//           </div>
//         </div>
//       )}


//       {analysis.links && analysis.links.length > 0 && (
//   <div
//     style={{
//       marginBottom: '2rem',
//       padding: '1.5rem',
//       background: '#f5f5f5',
//       borderRadius: '12px',
//       border: '1px solid #ddd',
//     }}
//   >
//     <h3
//       style={{
//         color: '#e67e22',
//         borderBottom: '2px solid #e67e22',
//         paddingBottom: '0.5rem',
//         marginBottom: '1rem',
//       }}
//     >
//       External Links ({analysis.links.length})
//     </h3>
//     <div
//       style={{
//         maxHeight: '200px',
//         overflowY: 'auto',
//         display: 'flex',
//         flexWrap: 'wrap',
//         gap: '0.5rem',
//       }}
//     >
//    {analysis.links.map((link, i) => {
//   const domain = link.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
//   return (
//     <a
//       key={i}
//       href={link}
//       target="_blank"
//       rel="noopener noreferrer"
//       style={{
//         textDecoration: 'none',
//         backgroundColor: '#3498db',
//         color: '#fff',
//         padding: '0.4rem 0.8rem',
//         borderRadius: '8px',
//         fontSize: '0.85rem',
//         transition: 'background 0.3s',
//         display: 'inline-block',
//         marginRight: '0.5rem',
//         marginBottom: '0.5rem',
//       }}
//       onMouseEnter={(e) => (e.target.style.backgroundColor = '#217dbb')}
//       onMouseLeave={(e) => (e.target.style.backgroundColor = '#3498db')}
//     >
//       {domain}
//     </a>
//   );
// })}

//     </div>
//   </div>
// )}


//       {/* Back Button */}
//       <div style={{ textAlign: 'center', marginTop: '3rem' }}>
//         <button
//           onClick={() => navigate('/my-analyses')}
//           style={{
//             padding: '0.75rem 2rem',
//             background: '#4CAF50',
//             color: 'white',
//             border: 'none',
//             borderRadius: '8px',
//             fontSize: '1rem',
//             cursor: 'pointer',
//             boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
//           }}
//         >
//           Back to My Analyses
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AnalysisDetail;


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

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const { data } = await axios.get(`https://website-analyser-1.onrender.com/api/websites/${id}`, {
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
  }, [id, user]);

  const formatDate = (dateStr) => {
    return dateStr ? new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    }) : 'N/A';
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-sm border border-red-200 p-6 max-w-md w-full">
          <div className="flex items-center gap-3 text-red-600 mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-3V9m0 6v2m0 0h2m-2 0H9m3-3h6m-6 0H6" />
            </svg>
            <h3 className="font-semibold">Authentication Required</h3>
          </div>
          <p className="text-gray-600">Please login to view analysis details</p>
        </div>
      </div>
    );
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        <p className="mt-4 text-gray-600">Loading analysis data...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-sm border border-red-200 p-6 max-w-md w-full">
        <div className="flex items-center gap-3 text-red-600 mb-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="font-semibold">Error</h3>
        </div>
        <p className="text-gray-600">{error}</p>
      </div>
    </div>
  );

  if (!analysis) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-gray-500">Analysis not found</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="px-6 py-8 sm:px-8">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {analysis.title || 'Website Analysis Report'}
                </h1>
                <a 
                  href={analysis.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-green-100 hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {analysis.url}
                </a>
              </div>
              <div className="bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm">
                <div className="text-sm text-green-100">Status</div>
                <div className="text-white font-semibold">
                  {analysis.statusCode === 200 ? '✓ Healthy' : `${analysis.statusCode}`}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-6 text-sm text-green-100">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Response: {analysis.responseTime}ms</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Analyzed: {new Date(analysis.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Images</p>
                <p className="text-2xl font-bold text-gray-900">{analysis.imageDetails?.total || analysis.images?.length || 0}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">External Links</p>
                <p className="text-2xl font-bold text-gray-900">{analysis.links?.length || 0}</p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m1.102-4.768a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.102" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Technologies</p>
                <p className="text-2xl font-bold text-gray-900">{analysis.technologies?.length || 0}</p>
              </div>
              <div className="bg-orange-100 rounded-full p-3">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">SSL Status</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analysis.security?.hasSSL ? (
                    <span className="text-green-600">Enabled</span>
                  ) : (
                    <span className="text-red-600">Disabled</span>
                  )}
                </p>
              </div>
              <div className={`rounded-full p-3 ${analysis.security?.hasSSL ? 'bg-green-100' : 'bg-red-100'}`}>
                <svg className={`w-6 h-6 ${analysis.security?.hasSSL ? 'text-green-600' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Basic Info Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Basic Information
              </h3>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex flex-wrap">
                <span className="w-32 text-gray-500 text-sm">Title</span>
                <span className="flex-1 text-gray-900 font-medium">{analysis.title || 'N/A'}</span>
              </div>
              <div className="flex flex-wrap">
                <span className="w-32 text-gray-500 text-sm">Description</span>
                <span className="flex-1 text-gray-600">{analysis.description?.slice(0, 150)}...</span>
              </div>
              {analysis.keywords && (
                <div className="flex flex-wrap">
                  <span className="w-32 text-gray-500 text-sm">Keywords</span>
                  <span className="flex-1 text-gray-600">{analysis.keywords}</span>
                </div>
              )}
              {analysis.favicon && (
                <div className="flex flex-wrap items-center">
                  <span className="w-32 text-gray-500 text-sm">Favicon</span>
                  <img src={analysis.favicon} alt="Favicon" className="w-6 h-6 rounded" />
                </div>
              )}
            </div>
          </div>

          {/* Domain Info Card */}
          {analysis.domainInfo && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Domain Information
                </h3>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex flex-wrap">
                  <span className="w-32 text-gray-500 text-sm">Registrar</span>
                  <span className="flex-1 text-gray-900">{analysis.domainInfo.registrar || 'N/A'}</span>
                </div>
                <div className="flex flex-wrap">
                  <span className="w-32 text-gray-500 text-sm">Registered</span>
                  <span className="flex-1 text-gray-900">{formatDate(analysis.domainInfo.registrationDate)}</span>
                </div>
                <div className="flex flex-wrap">
                  <span className="w-32 text-gray-500 text-sm">Expires</span>
                  <span className="flex-1 text-gray-900">{formatDate(analysis.domainInfo.expirationDate)}</span>
                </div>
                <div className="flex flex-wrap">
                  <span className="w-32 text-gray-500 text-sm">Country</span>
                  <span className="flex-1 text-gray-900">{analysis.domainInfo.registrantCountry || 'N/A'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Server Info Card */}
          {analysis.serverInfo && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                  Server Information
                </h3>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex flex-wrap">
                  <span className="w-32 text-gray-500 text-sm">IP Address</span>
                  <span className="flex-1 text-gray-900 font-mono text-sm">{analysis.serverInfo.ipAddress}</span>
                </div>
                <div className="flex flex-wrap">
                  <span className="w-32 text-gray-500 text-sm">Server Type</span>
                  <span className="flex-1 text-gray-900">{analysis.serverInfo.serverType || 'N/A'}</span>
                </div>
                <div className="flex flex-wrap">
                  <span className="w-32 text-gray-500 text-sm">Hosting Provider</span>
                  <span className="flex-1 text-gray-900">{analysis.serverInfo.hosting || 'Unknown'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Security Card */}
          {analysis.security && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Security
                </h3>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex flex-wrap items-center">
                  <span className="w-32 text-gray-500 text-sm">SSL Certificate</span>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${analysis.security.hasSSL ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {analysis.security.hasSSL ? '✓ Enabled' : '✗ Disabled'}
                  </span>
                </div>
                {analysis.security.sslDaysRemaining > 0 && (
                  <div className="flex flex-wrap">
                    <span className="w-32 text-gray-500 text-sm">SSL Expires In</span>
                    <span className={`font-medium ${analysis.security.sslDaysRemaining < 30 ? 'text-red-600' : 'text-green-600'}`}>
                      {analysis.security.sslDaysRemaining} days
                    </span>
                  </div>
                )}
                <div className="pt-2">
                  <div className="text-xs text-gray-400">Security Headers</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">HSTS</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">CSP</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">X-Frame-Options</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">X-Content-Type</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Technologies Section */}
        {analysis.technologies && analysis.technologies.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Technologies Detected
              </h3>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2">
                {analysis.technologies.map((tech, i) => (
                  <span key={i} className="bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SEO Section */}
        {analysis.seo && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                SEO Analysis
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Robots.txt</span>
                  <span className={`font-semibold ${analysis.seo.hasRobotsTxt ? 'text-green-600' : 'text-red-600'}`}>
                    {analysis.seo.hasRobotsTxt ? 'Found' : 'Missing'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Sitemap</span>
                  <span className={`font-semibold ${analysis.seo.hasSitemap ? 'text-green-600' : 'text-red-600'}`}>
                    {analysis.seo.hasSitemap ? 'Found' : 'Missing'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Canonical URL</span>
                  <span className={`font-semibold ${analysis.seo.canonicalUrl ? 'text-green-600' : 'text-orange-600'}`}>
                    {analysis.seo.canonicalUrl ? 'Present' : 'Not Set'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="text-center pt-6 border-t border-gray-200">
          <button
            onClick={() => navigate('/my-analyses')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to My Analyses
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDetail;