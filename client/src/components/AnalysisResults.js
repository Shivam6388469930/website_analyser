// import React from 'react';

// const AnalysisResults = ({ result }) => {
//   if (!result) return null;

//   return (
//     <div className="card" style={{ maxWidth: '1200px', margin: '2rem auto' }}>
//       <h2 style={{ marginBottom: '1.5rem', color: '#4CAF50' }}>
//         ✅ Complete Website Analysis
//       </h2>

//       {/* Issues & Warnings */}
//       {result.issues && result.issues.length > 0 && (
//         <div style={{ marginBottom: '2rem', padding: '1rem', background: '#fff3cd', borderRadius: '8px', border: '1px solid #ffc107' }}>
//           <h3 style={{ marginBottom: '1rem', color: '#856404' }}>
//             ⚠️ Issues & Recommendations ({result.issues.length})
//           </h3>
//           {result.issues.map((issue, index) => (
//             <div 
//               key={index} 
//               style={{ 
//                 marginBottom: '0.5rem', 
//                 padding: '0.75rem',
//                 background: issue.type === 'critical' ? '#f8d7da' : issue.type === 'warning' ? '#fff3cd' : '#d1ecf1',
//                 borderLeft: `4px solid ${issue.type === 'critical' ? '#dc3545' : issue.type === 'warning' ? '#ffc107' : '#17a2b8'}`,
//                 borderRadius: '4px'
//               }}
//             >
//               <strong style={{ color: issue.type === 'critical' ? '#721c24' : issue.type === 'warning' ? '#856404' : '#0c5460' }}>
//                 {issue.type === 'critical' ? '🔴' : issue.type === 'warning' ? '🟡' : 'ℹ️'} {issue.category}:
//               </strong> {issue.message}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Domain & Registration Info */}
//       {result.domainInfo && Object.keys(result.domainInfo).length > 0 && (
//         <div style={{ marginBottom: '2rem' }}>
//           <h3 style={{ marginBottom: '1rem', borderBottom: '2px solid #4CAF50', paddingBottom: '0.5rem' }}>
//             🌐 Domain Registration Information
//           </h3>
//           <div style={{ display: 'grid', gap: '0.75rem', background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
//             {result.domainInfo.registrar && (
//               <div><strong>Registrar:</strong> {result.domainInfo.registrar}</div>
//             )}
//             {result.domainInfo.registrationDate && (
//               <div><strong>Registration Date:</strong> {result.domainInfo.registrationDate}</div>
//             )}
//             {result.domainInfo.expirationDate && (
//               <div><strong>Expiration Date:</strong> {result.domainInfo.expirationDate}</div>
//             )}
//             {result.domainInfo.registrantOrg && (
//               <div><strong>Organization:</strong> {result.domainInfo.registrantOrg}</div>
//             )}
//             {result.domainInfo.registrantCountry && (
//               <div><strong>Country:</strong> {result.domainInfo.registrantCountry}</div>
//             )}
//             {result.domainInfo.nameServers && result.domainInfo.nameServers.length > 0 && (
//               <div>
//                 <strong>Name Servers:</strong>
//                 <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem' }}>
//                   {result.domainInfo.nameServers.map((ns, i) => (
//                     <li key={i}>{ns}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Server & Hosting Info */}
//       {result.serverInfo && (
//         <div style={{ marginBottom: '2rem' }}>
//           <h3 style={{ marginBottom: '1rem', borderBottom: '2px solid #4CAF50', paddingBottom: '0.5rem' }}>
//             🖥️ Server & Hosting Information
//           </h3>
//           <div style={{ display: 'grid', gap: '0.75rem', background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
//             {result.serverInfo.ipAddress && (
//               <div><strong>IP Address:</strong> {result.serverInfo.ipAddress}</div>
//             )}
//             {result.serverInfo.serverType && (
//               <div><strong>Server Type:</strong> {result.serverInfo.serverType}</div>
//             )}
//             {result.serverInfo.hosting && result.serverInfo.hosting !== 'Unknown' && (
//               <div><strong>Hosting Provider:</strong> {result.serverInfo.hosting}</div>
//             )}
//             {result.serverInfo.cloudProvider && (
//               <div><strong>Cloud Provider:</strong> {result.serverInfo.cloudProvider}</div>
//             )}
//             {result.serverInfo.cdn && (
//               <div><strong>CDN:</strong> {result.serverInfo.cdn}</div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Security Analysis */}
//       {result.security && (
//         <div style={{ marginBottom: '2rem' }}>
//           <h3 style={{ marginBottom: '1rem', borderBottom: '2px solid #4CAF50', paddingBottom: '0.5rem' }}>
//             🔒 Security Analysis
//           </h3>
//           <div style={{ display: 'grid', gap: '0.75rem', background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
//             <div>
//               <strong>HTTPS/SSL:</strong> {result.security.hasSSL ? '✅ Enabled' : '❌ Not Enabled'}
//             </div>
//             {result.security.sslIssuer && (
//               <div><strong>SSL Issuer:</strong> {result.security.sslIssuer}</div>
//             )}
//             {result.security.sslValidTo && (
//               <div>
//                 <strong>SSL Valid Until:</strong> {result.security.sslValidTo}
//                 {result.security.sslDaysRemaining > 0 && (
//                   <span style={{ marginLeft: '0.5rem', color: result.security.sslDaysRemaining < 30 ? '#dc3545' : '#28a745' }}>
//                     ({result.security.sslDaysRemaining} days remaining)
//                   </span>
//                 )}
//               </div>
//             )}
//             {result.security.securityHeaders && (
//               <div>
//                 <strong>Security Headers:</strong>
//                 <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem' }}>
//                   <li>Strict-Transport-Security: {result.security.securityHeaders.strictTransportSecurity ? '✅' : '❌'}</li>
//                   <li>Content-Security-Policy: {result.security.securityHeaders.contentSecurityPolicy ? '✅' : '❌'}</li>
//                   <li>X-Frame-Options: {result.security.securityHeaders.xFrameOptions ? '✅' : '❌'}</li>
//                   <li>X-Content-Type-Options: {result.security.securityHeaders.xContentTypeOptions ? '✅' : '❌'}</li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Performance & SEO */}
//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
//         {/* Performance */}
//         {result.performance && (
//           <div>
//             <h3 style={{ marginBottom: '1rem', borderBottom: '2px solid #4CAF50', paddingBottom: '0.5rem' }}>
//               ⚡ Performance
//             </h3>
//             <div style={{ display: 'grid', gap: '0.75rem', background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
//               <div><strong>Load Time:</strong> {result.performance.loadTime}ms</div>
//               <div><strong>Page Size:</strong> {(result.performance.pageSize / 1024).toFixed(2)} KB</div>
//               <div><strong>Compression:</strong> {result.performance.compressionEnabled ? '✅ Enabled' : '❌ Disabled'}</div>
//               <div><strong>Cache:</strong> {result.performance.cacheEnabled ? '✅ Enabled' : '❌ Disabled'}</div>
//             </div>
//           </div>
//         )}

//         {/* SEO */}
//         {result.seo && (
//           <div>
//             <h3 style={{ marginBottom: '1rem', borderBottom: '2px solid #4CAF50', paddingBottom: '0.5rem' }}>
//               📊 SEO Analysis
//             </h3>
//             <div style={{ display: 'grid', gap: '0.75rem', background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
//               <div><strong>robots.txt:</strong> {result.seo.hasRobotsTxt ? '✅ Found' : '❌ Not Found'}</div>
//               <div><strong>Sitemap:</strong> {result.seo.hasSitemap ? '✅ Found' : '❌ Not Found'}</div>
//               <div><strong>Mobile Responsive:</strong> {result.seo.mobileResponsive ? '✅ Yes' : '❌ No'}</div>
//               <div><strong>Structured Data:</strong> {result.seo.structuredData ? '✅ Yes' : '❌ No'}</div>
//               <div><strong>Page Speed:</strong> {result.seo.pageSpeed}</div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Contact Information */}
//       {result.contactInfo && (result.contactInfo.email?.length > 0 || result.contactInfo.phone?.length > 0) && (
//         <div style={{ marginBottom: '2rem' }}>
//           <h3 style={{ marginBottom: '1rem', borderBottom: '2px solid #4CAF50', paddingBottom: '0.5rem' }}>
//             📞 Contact Information
//           </h3>
//           <div style={{ display: 'grid', gap: '0.75rem', background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
//             {result.contactInfo.email && result.contactInfo.email.length > 0 && (
//               <div>
//                 <strong>Email Addresses:</strong>
//                 <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem' }}>
//                   {result.contactInfo.email.map((email, i) => (
//                     <li key={i}><a href={`mailto:${email}`}>{email}</a></li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//             {result.contactInfo.phone && result.contactInfo.phone.length > 0 && (
//               <div>
//                 <strong>Phone Numbers:</strong>
//                 <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem' }}>
//                   {result.contactInfo.phone.map((phone, i) => (
//                     <li key={i}>{phone}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Social Media */}
//       {result.socialMedia && Object.values(result.socialMedia).some(v => v) && (
//         <div style={{ marginBottom: '2rem' }}>
//           <h3 style={{ marginBottom: '1rem', borderBottom: '2px solid #4CAF50', paddingBottom: '0.5rem' }}>
//             📱 Social Media Presence
//           </h3>
//           <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
//             {result.socialMedia.facebook && (
//               <a href={result.socialMedia.facebook} target="_blank" rel="noopener noreferrer" 
//                  style={{ padding: '0.5rem 1rem', background: '#1877f2', color: 'white', borderRadius: '4px', textDecoration: 'none' }}>
//                 Facebook
//               </a>
//             )}
//             {result.socialMedia.twitter && (
//               <a href={result.socialMedia.twitter} target="_blank" rel="noopener noreferrer"
//                  style={{ padding: '0.5rem 1rem', background: '#1da1f2', color: 'white', borderRadius: '4px', textDecoration: 'none' }}>
//                 Twitter/X
//               </a>
//             )}
//             {result.socialMedia.instagram && (
//               <a href={result.socialMedia.instagram} target="_blank" rel="noopener noreferrer"
//                  style={{ padding: '0.5rem 1rem', background: '#e4405f', color: 'white', borderRadius: '4px', textDecoration: 'none' }}>
//                 Instagram
//               </a>
//             )}
//             {result.socialMedia.linkedin && (
//               <a href={result.socialMedia.linkedin} target="_blank" rel="noopener noreferrer"
//                  style={{ padding: '0.5rem 1rem', background: '#0077b5', color: 'white', borderRadius: '4px', textDecoration: 'none' }}>
//                 LinkedIn
//               </a>
//             )}
//             {result.socialMedia.youtube && (
//               <a href={result.socialMedia.youtube} target="_blank" rel="noopener noreferrer"
//                  style={{ padding: '0.5rem 1rem', background: '#ff0000', color: 'white', borderRadius: '4px', textDecoration: 'none' }}>
//                 YouTube
//               </a>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Basic Info */}
//       <div style={{ marginBottom: '2rem' }}>
//         <h3 style={{ marginBottom: '1rem', borderBottom: '2px solid #4CAF50', paddingBottom: '0.5rem' }}>
//           📄 Basic Information
//         </h3>
//         <div style={{ display: 'grid', gap: '0.75rem', background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
//           <div>
//             <strong>URL:</strong>
//             <a href={result.url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '0.5rem', color: '#4CAF50' }}>
//               {result.url}
//             </a>
//           </div>
//           <div><strong>Title:</strong> {result.title || 'N/A'}</div>
//           <div><strong>Description:</strong> {result.description || 'N/A'}</div>
//           {result.keywords && <div><strong>Keywords:</strong> {result.keywords}</div>}
//           {result.author && <div><strong>Author:</strong> {result.author}</div>}
//           <div><strong>Status Code:</strong> <span style={{ color: result.statusCode === 200 ? '#28a745' : '#dc3545', fontWeight: 'bold' }}>{result.statusCode}</span></div>
//           <div><strong>Response Time:</strong> {result.responseTime || result.performance?.loadTime}ms</div>
//         </div>
//       </div>

//       {/* Content Analysis */}
//       <div style={{ marginBottom: '2rem' }}>
//         <h3 style={{ marginBottom: '1rem', borderBottom: '2px solid #4CAF50', paddingBottom: '0.5rem' }}>
//           📝 Content Analysis
//         </h3>
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
//           {result.headings && (
//             <>
//               <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
//                 <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4CAF50' }}>{result.headings.h1?.length || 0}</div>
//                 <div style={{ fontSize: '0.9rem', color: '#666' }}>H1 Headings</div>
//               </div>
//               <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
//                 <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4CAF50' }}>{result.headings.h2?.length || 0}</div>
//                 <div style={{ fontSize: '0.9rem', color: '#666' }}>H2 Headings</div>
//               </div>
//               <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
//                 <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4CAF50' }}>{result.headings.h3?.length || 0}</div>
//                 <div style={{ fontSize: '0.9rem', color: '#666' }}>H3 Headings</div>
//               </div>
//             </>
//           )}
//           <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
//             <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4CAF50' }}>{result.links?.length || 0}</div>
//             <div style={{ fontSize: '0.9rem', color: '#666' }}>External Links</div>
//           </div>
//         </div>

//         {/* Headings Details */}
//         {result.headings && (result.headings.h1?.length > 0 || result.headings.h2?.length > 0) && (
//           <div style={{ marginTop: '1rem', background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
//             {result.headings.h1?.length > 0 && (
//               <div style={{ marginBottom: '1rem' }}>
//                 <strong>H1 Tags:</strong>
//                 <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem' }}>
//                   {result.headings.h1.map((h, index) => (
//                     <li key={index}>{h}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//             {result.headings.h2?.length > 0 && (
//               <div>
//                 <strong>H2 Tags (first 5):</strong>
//                 <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem' }}>
//                   {result.headings.h2.slice(0, 5).map((h, index) => (
//                     <li key={index}>{h}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Technologies */}
//       {result.technologies && result.technologies.length > 0 && (
//         <div style={{ marginBottom: '2rem' }}>
//           <h3 style={{ marginBottom: '1rem', borderBottom: '2px solid #4CAF50', paddingBottom: '0.5rem' }}>
//             🛠️ Detected Technologies ({result.technologies.length})
//           </h3>
//           <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
//             {result.technologies.map((tech, index) => (
//               <span
//                 key={index}
//                 style={{
//                   background: '#4CAF50',
//                   color: 'white',
//                   padding: '0.5rem 1rem',
//                   borderRadius: '20px',
//                   fontSize: '0.9rem'
//                 }}
//               >
//                 {tech}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Image Analysis */}
//       {result.imageDetails && (
//         <div style={{ marginBottom: '2rem' }}>
//           <h3 style={{ marginBottom: '1rem', borderBottom: '2px solid #4CAF50', paddingBottom: '0.5rem' }}>
//             🖼️ Image Analysis
//           </h3>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
//             <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', textAlign: 'center' }}>
//               <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4CAF50' }}>{result.imageDetails.total}</div>
//               <div style={{ fontSize: '0.9rem', color: '#666' }}>Total Images</div>
//             </div>
//             <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', textAlign: 'center' }}>
//               <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>{result.imageDetails.withAlt}</div>
//               <div style={{ fontSize: '0.9rem', color: '#666' }}>With Alt Text</div>
//             </div>
//             <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', textAlign: 'center' }}>
//               <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc3545' }}>{result.imageDetails.withoutAlt}</div>
//               <div style={{ fontSize: '0.9rem', color: '#666' }}>Without Alt Text</div>
//             </div>
//             <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', textAlign: 'center' }}>
//               <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#17a2b8' }}>{result.imageDetails.internal}</div>
//               <div style={{ fontSize: '0.9rem', color: '#666' }}>Internal Images</div>
//             </div>
//             <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', textAlign: 'center' }}>
//               <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffc107' }}>{result.imageDetails.external}</div>
//               <div style={{ fontSize: '0.9rem', color: '#666' }}>External Images</div>
//             </div>
//           </div>

//           {/* Image Formats */}
//           {result.imageDetails.formats && Object.keys(result.imageDetails.formats).length > 0 && (
//             <div style={{ marginTop: '1rem', background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
//               <strong>Image Formats:</strong>
//               <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
//                 {Object.entries(result.imageDetails.formats).map(([format, count]) => (
//                   <span key={format} style={{ padding: '0.5rem 1rem', background: 'white', borderRadius: '4px', border: '1px solid #ddd' }}>
//                     <strong>{format.toUpperCase()}:</strong> {count}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Sample Images */}
//           {result.images && result.images.length > 0 && (
//             <div style={{ marginTop: '1rem' }}>
//               <strong>Sample Images (showing first 12):</strong>
//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
//                 {result.images.slice(0, 12).map((img, index) => (
//                   <div key={index} style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
//                     <img
//                       src={typeof img === 'string' ? img : img.src}
//                       alt={typeof img === 'object' ? img.alt : `Image ${index + 1}`}
//                       style={{ width: '100%', height: '120px', objectFit: 'cover' }}
//                       onError={(e) => {
//                         e.target.style.display = 'none';
//                         e.target.parentElement.innerHTML = '<div style="padding: 1rem; text-align: center; color: #999;">Failed to load</div>';
//                       }}
//                     />
//                     {typeof img === 'object' && (
//                       <div style={{ padding: '0.5rem', fontSize: '0.75rem', background: '#f8f9fa' }}>
//                         <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                           {img.alt}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AnalysisResults;



import React from 'react';

const AnalysisResults = ({ result }) => {
  if (!result) return <div style={{ textAlign: 'center', padding: '2rem' }}>No data available</div>;

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="analysis-container" style={{ maxWidth: '1400px', margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '2rem' }}>
        Website Analysis Report
      </h1>

      {/* Summary Card */}
      <div style={{ background: '#3498db', color: 'white', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', textAlign: 'center' }}>
        <h2>{result.title || 'Untitled Page'}</h2>
        <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>{result.url}</p>
        <p style={{ margin: '0.5rem 0', fontSize: '1rem' }}>
          <strong>Status:</strong> <span style={{ color: '#2ecc71' }}>{result.statusCode} OK</span> | 
          <strong> Response Time:</strong> {result.responseTime}ms
        </p>
      </div>

      {/* Issues */}
      {result.issues && result.issues.length > 0 && (
        <div style={{ marginBottom: '2rem', padding: '1.5rem', background: '#fff3cd', borderRadius: '12px', border: '1px solid #ffeaa7' }}>
          <h3 style={{ color: '#d35400', marginBottom: '1rem' }}>Issues Found ({result.issues.length})</h3>
          {result.issues.map((issue, i) => (
            <div key={i} style={{
              background: '#fdfd96', padding: '1rem', marginBottom: '0.75rem', borderRadius: '8px',
              borderLeft: `5px solid ${issue.type === 'critical' ? '#e74c3c' : '#f39c12'}`
            }}>
              <strong>{issue.type.toUpperCase()} [{issue.category}]</strong>: {issue.message}
            </div>
          ))}
        </div>
      )}

      {/* Grid Layout for Key Sections */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>

        {/* Domain Info */}
        {result.domainInfo && (
          <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '12px', border: '1px solid #dee2e6' }}>
            <h3 style={{ color: '#27ae60', borderBottom: '2px solid #27ae60', paddingBottom: '0.5rem' }}>Domain Info</h3>
            <div style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              <div><strong>Registrar:</strong> {result.domainInfo.registrar}</div>
              <div><strong>Registered:</strong> {formatDate(result.domainInfo.registrationDate)}</div>
              <div><strong>Expires:</strong> {formatDate(result.domainInfo.expirationDate)}</div>
              <div><strong>Updated:</strong> {formatDate(result.domainInfo.updatedDate)}</div>
              <div><strong>Country:</strong> {result.domainInfo.registrantCountry}</div>
              <div><strong>Org:</strong> {result.domainInfo.registrantOrg}</div>
              {result.domainInfo.nameServers && (
                <div style={{ marginTop: '0.5rem' }}>
                  <strong>Name Servers:</strong>
                  <ul style={{ margin: '0.3rem 0', paddingLeft: '1.2rem' }}>
                    {result.domainInfo.nameServers.map((ns, i) => <li key={i}>{ns}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Server Info */}
        {result.serverInfo && (
          <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '12px', border: '1px solid #dee2e6' }}>
            <h3 style={{ color: '#8e44ad', borderBottom: '2px solid #8e44ad', paddingBottom: '0.5rem' }}>Server Info</h3>
            <div style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              <div><strong>IP:</strong> {result.serverInfo.ipAddress}</div>
              <div><strong>Server:</strong> {result.serverInfo.serverType}</div>
              <div><strong>Hosting:</strong> {result.serverInfo.hosting || 'Unknown'}</div>
              <div><strong>Cloud:</strong> {result.serverInfo.cloudProvider || 'N/A'}</div>
              <div><strong>CDN:</strong> {result.serverInfo.cdn || 'None'}</div>
            </div>
          </div>
        )}

        {/* Security */}
        {result.security && (
          <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '12px', border: '1px solid #dee2e6' }}>
            <h3 style={{ color: '#c0392b', borderBottom: '2px solid #c0392b', paddingBottom: '0.5rem' }}>Security</h3>
            <div style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              <div><strong>SSL:</strong> {result.security.hasSSL ? 'Enabled' : 'Disabled'}</div>
              {result.security.sslValidTo && (
                <div>
                  <strong>Valid Until:</strong> {formatDate(result.security.sslValidTo)}
                  <span style={{ marginLeft: '0.5rem', color: result.security.sslDaysRemaining < 30 ? '#e74c3c' : '#27ae60' }}>
                    ({result.security.sslDaysRemaining} days)
                  </span>
                </div>
              )}
              <div style={{ marginTop: '0.75rem' }}>
                <strong>Headers:</strong>
                <ul style={{ margin: '0.3rem 0', paddingLeft: '1.2rem' }}>
                  <li>HSTS: {result.security.securityHeaders.strictTransportSecurity ? 'Yes' : 'No'}</li>
                  <li>CSP: {result.security.securityHeaders.contentSecurityPolicy ? 'Yes' : 'No'}</li>
                  <li>X-Frame: {result.security.securityHeaders.xFrameOptions ? 'Yes' : 'No'}</li>
                  <li>X-Content-Type: {result.security.securityHeaders.xContentTypeOptions ? 'Yes' : 'No'}</li>
                  <li>X-XSS: {result.security.securityHeaders.xXSSProtection ? 'Yes' : 'No'}</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* SEO */}
        {result.seo && (
          <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '12px', border: '1px solid #dee2e6' }}>
            <h3 style={{ color: '#2980b9', borderBottom: '2px solid #2980b9', paddingBottom: '0.5rem' }}>SEO</h3>
            <div style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              <div>robots.txt: {result.seo.hasRobotsTxt ? 'Found' : 'Missing'}</div>
              <div>Sitemap: {result.seo.hasSitemap ? 'Found' : 'Missing'}</div>
              <div>Canonical: {result.seo.canonicalUrl ? 'Yes' : 'No'}</div>
            </div>
          </div>
        )}
      </div>

      {/* Contact & Social */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Contact */}
        {(result.contactInfo?.phone?.length > 0 || result.contactInfo?.email?.length > 0) && (
          <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '12px', border: '1px solid #dee2e6' }}>
            <h3 style={{ color: '#16a085', borderBottom: '2px solid #16a085', paddingBottom: '0.5rem' }}>Contact Info</h3>
            {result.contactInfo.phone?.length > 0 && (
              <div>
                <strong>Phone:</strong>
                <ul style={{ margin: '0.5rem 0', paddingLeft: '1.2rem' }}>
                  {result.contactInfo.phone.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
            )}
            {result.contactInfo.email?.length > 0 && (
              <div>
                <strong>Email:</strong>
                <ul style={{ margin: '0.5rem 0', paddingLeft: '1.2rem' }}>
                  {result.contactInfo.email.map((e, i) => (
                    <li key={i}><a href={`mailto:${e}`} style={{ color: '#3498db' }}>{e}</a></li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Social */}
        {result.socialMedia && Object.values(result.socialMedia).some(v => v) && (
          <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '12px', border: '1px solid #dee2e6' }}>
            <h3 style={{ color: '#9b59b6', borderBottom: '2px solid #9b59b6', paddingBottom: '0.5rem' }}>Social Media</h3>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {result.socialMedia.facebook && <a href={result.socialMedia.facebook} target="_blank" rel="noopener" style={{ background: '#3b5998', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px', textDecoration: 'none' }}>Facebook</a>}
              {result.socialMedia.twitter && <a href={result.socialMedia.twitter} target="_blank" rel="noopener" style={{ background: '#1da1f2', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px', textDecoration: 'none' }}>Twitter</a>}
              {result.socialMedia.instagram && <a href={result.socialMedia.instagram} target="_blank" rel="noopener" style={{ background: '#e4405f', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px', textDecoration: 'none' }}>Instagram</a>}
              {result.socialMedia.linkedin && <a href={result.socialMedia.linkedin} target="_blank" rel="noopener" style={{ background: '#0077b5', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px', textDecoration: 'none' }}>LinkedIn</a>}
              {result.socialMedia.youtube && <a href={result.socialMedia.youtube} target="_blank" rel="noopener" style={{ background: '#ff0000', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px', textDecoration: 'none' }}>YouTube</a>}
            </div>
          </div>
        )}
      </div>

      {/* Technologies */}
      {result.technologies && result.technologies.length > 0 && (
        <div style={{ marginBottom: '2rem', padding: '1.5rem', background: '#f8f9fa', borderRadius: '12px', border: '1px solid #dee2e6' }}>
          <h3 style={{ color: '#e67e22', borderBottom: '2px solid #e67e22', paddingBottom: '0.5rem' }}>Technologies Detected</h3>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
            {result.technologies.map((tech, i) => (
              <span key={i} style={{ background: '#e67e22', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem' }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Headings */}
      {result.headings && (result.headings.h1?.length > 0 || result.headings.h2?.length > 0 || result.headings.h3?.length > 0) && (
        <div style={{ marginBottom: '2rem', padding: '1.5rem', background: '#f8f9fa', borderRadius: '12px', border: '1px solid #dee2e6' }}>
          <h3 style={{ color: '#34495e', borderBottom: '2px solid #34495e', paddingBottom: '0.5rem' }}>Page Headings</h3>
          {result.headings.h1 && result.headings.h1.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <strong>H1 ({result.headings.h1.length}):</strong>
              <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                {result.headings.h1.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </div>
          )}
          {result.headings.h2 && result.headings.h2.length > 0 && (
            <div style={{ marginTop: '0.75rem' }}>
              <strong>H2 ({result.headings.h2.length}):</strong>
              <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem', columns: 2 }}>
                {result.headings.h2.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </div>
          )}
          {result.headings.h3 && result.headings.h3.length > 0 && (
            <div style={{ marginTop: '0.75rem' }}>
              <strong>H3 ({result.headings.h3.length}):</strong>
              <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem', columns: 2 }}>
                {result.headings.h3.slice(0, 10).map((h, i) => <li key={i}>{h}</li>)}
                {result.headings.h3.length > 10 && <li>...and {result.headings.h3.length - 10} more</li>}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Image Gallery */}
      {result.images && result.images.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#8e44ad', borderBottom: '2px solid #8e44ad', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
            Images ({result.imageDetails?.total || result.images.length})
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
            {result.images.map((img, i) => {
              const src = typeof img === 'string' ? img : img.src;
              const alt = typeof img === 'object' ? img.alt : `Image ${i + 1}`;
              return (
                <div key={i} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', background: '#fff' }}>
                  <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }}
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5GYWlsZWQgdG8gbG9hZDwvdGV4dD48L3N2Zz4=';
                    }}
                  />
                  <div style={{ padding: '0.5rem', fontSize: '0.8rem', background: '#f8f9fa', color: '#555', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {alt}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Links */}
      {result.links && result.links.length > 0 && (
        <div style={{ marginBottom: '2rem', padding: '1.5rem', background: '#f8f9fa', borderRadius: '12px', border: '1px solid #dee2e6' }}>
          <h3 style={{ color: '#2980b9', borderBottom: '2px solid #2980b9', paddingBottom: '0.5rem' }}>Links ({result.links.length})</h3>
          <div style={{ columns: 3, fontSize: '0.9rem' }}>
            {result.links.slice(0, 30).map((link, i) => (
              <div key={i} style={{ marginBottom: '0.4rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: '#3498db' }}>
                  {link}
                </a>
              </div>
            ))}
            {result.links.length > 30 && <div style={{ fontStyle: 'italic', color: '#777' }}>+ {result.links.length - 30} more links</div>}
          </div>
        </div>
      )}

      {/* Meta Info */}
      <div style={{ padding: '1.5rem', background: '#2c3e50', color: 'white', borderRadius: '12px' }}>
        <h3 style={{ borderBottom: '2px solid #3498db', paddingBottom: '0.5rem' }}>Meta Information</h3>
        <div style={{ lineHeight: '1.7', fontSize: '0.95rem' }}>
          <div><strong>Description:</strong> {result.description || 'N/A'}</div>
          <div><strong>Keywords:</strong> {result.keywords || 'N/A'}</div>
          <div><strong>Analyzed At:</strong> {new Date(result.createdAt).toLocaleString()}</div>
          <div><strong>Analyzed By:</strong> {result.analyzedBy || 'Unknown'}</div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;