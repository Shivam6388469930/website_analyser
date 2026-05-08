// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';
// import AnalysisResults from '../components/AnalysisResults';

// const AnalyzeWebsite = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [url, setUrl] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [result, setResult] = useState(null);

//   const formatUrl = (input) => {
//     let formatted = input.trim();
//     if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
//       formatted = 'https://' + formatted;
//     }
//     return formatted;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user) {
//       setError('You must be logged in to analyze websites');
//       return;
//     }

//     const formattedUrl = formatUrl(url);
//     setError('');
//     setLoading(true);
//     setResult(null);

//     try {
//       const { data } = await axios.post(
//         '/api/websites/analyze',
//         { url: formattedUrl },
//         { headers: { Authorization: `Bearer ${user.token}` } }
//       );
//       setResult(data);
//       setUrl('');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to analyze website');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!user) {
//     return (
//       <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fdd', color: '#900', borderRadius: '5px', textAlign: 'center' }}>
//         Please login to analyze websites
//       </div>
//     );
//   }

//   return (
//     <div style={{ marginTop: '2rem', fontFamily: 'Arial, sans-serif' }}>
//       <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>🌐 Website Analyzer</h1>

//       <div style={{
//         maxWidth: '800px',
//         margin: '0 auto',
//         padding: '1.5rem',
//         border: '1px solid #ddd',
//         borderRadius: '8px',
//         boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
//       }}>
//         <p style={{ marginBottom: '1.5rem', color: '#666', lineHeight: '1.5' }}>
//           Enter any website URL (e.g., google.com, github.com) and get detailed insights:
//           SEO, hosting, SSL, tech stack, contact info & more.
//         </p>

//         <form onSubmit={handleSubmit}>
//           <div style={{ marginBottom: '1rem' }}>
//             <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Website URL</label>
//             <input
//               type="text"
//               value={url}
//               onChange={(e) => setUrl(e.target.value)}
//               required
//               placeholder="Enter website URL (e.g., google.com)"
//               style={{
//                 width: '100%',
//                 padding: '10px 12px',
//                 fontSize: '1.1rem',
//                 borderRadius: '4px',
//                 border: '1px solid #ccc'
//               }}
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             style={{
//               width: '100%',
//               fontSize: '1.1rem',
//               padding: '12px',
//               backgroundColor: '#3498db',
//               color: '#fff',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: loading ? 'not-allowed' : 'pointer'
//             }}
//           >
//             {loading ? 'Analyzing...' : 'Analyze Website'}
//           </button>
//         </form>

//         {error && (
//           <div style={{
//             marginTop: '1rem',
//             padding: '0.8rem',
//             backgroundColor: '#fdd',
//             color: '#900',
//             borderRadius: '5px',
//             textAlign: 'center'
//           }}>
//             {error}
//           </div>
//         )}
//       </div>

//       {/* Loading Spinner */}
//       {loading && (
//         <div style={{ marginTop: '2rem', textAlign: 'center' }}>
//           <div style={{
//             border: '4px solid #eee',
//             borderTop: '4px solid #3498db',
//             borderRadius: '50%',
//             width: '40px',
//             height: '40px',
//             margin: '0 auto',
//             animation: 'spin 1s linear infinite'
//           }} />
//           <div style={{ fontSize: '1.1rem', marginTop: '1rem' }}>🔍 Analyzing website...</div>
//           <div style={{ fontSize: '0.9rem', color: '#888' }}>This may take a few seconds</div>
//         </div>
//       )}

//       {/* Spinner animation keyframes */}
//       <style>
//         {`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}
//       </style>

//       {/* Analysis Result */}
//       {result && (
//         <>
//           <AnalysisResults result={result} />

//           <div style={{
//             marginTop: '2rem',
//             display: 'flex',
//             gap: '1rem',
//             justifyContent: 'center',
//             flexWrap: 'wrap'
//           }}>
//             <button
//               onClick={() => navigate('/my-analyses')}
//               style={{
//                 padding: '10px 16px',
//                 backgroundColor: '#3498db',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '5px',
//                 cursor: 'pointer'
//               }}
//             >
//               View My Analyses
//             </button>

//             <button
//               onClick={() => setResult(null)}
//               style={{
//                 padding: '10px 16px',
//                 backgroundColor: '#2ecc71',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '5px',
//                 cursor: 'pointer'
//               }}
//             >
//               Analyze Another Website
//             </button>

//             {user?.role === 'admin' && (
//               <>
//                 <button
//                   onClick={() => navigate('/admin/summary')}
//                   style={{
//                     padding: '10px 16px',
//                     backgroundColor: '#f39c12',
//                     color: '#fff',
//                     border: 'none',
//                     borderRadius: '5px',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   View Summary
//                 </button>

//                 <button
//                   onClick={() => window.open('/api/websites/export', '_blank')}
//                   style={{
//                     padding: '10px 16px',
//                     backgroundColor: '#e74c3c',
//                     color: '#fff',
//                     border: 'none',
//                     borderRadius: '5px',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   Export CSV
//                 </button>
//               </>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default AnalyzeWebsite;

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import AnalysisResults from '../components/AnalysisResults';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Fade,
  Grow,
  Card,
  CardContent,

  Chip,
  Divider,


} from '@mui/material';
import {
  Analytics as AnalyticsIcon,
  History as HistoryIcon,
  Refresh as RefreshIcon,
  AdminPanelSettings as AdminIcon,
  FileDownload as ExportIcon,

  Error as ErrorIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';

const StyledPaper = styled(Paper)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
`;

const InnerContent = styled(Box)`
  background: white;
  border-radius: 18px;
  padding: 2rem;
`;

const FloatingButton = styled(Button)`
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;

const GradientText = styled(Typography)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const AnalyzeWebsite = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();


  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [urlError, setUrlError] = useState('');

  const validateUrl = (input) => {
    if (!input.trim()) return 'URL is required';
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!urlPattern.test(input.trim())) {
      return 'Please enter a valid URL';
    }
    return '';
  };

  const formatUrl = (input) => {
    let formatted = input.trim();
    if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
      formatted = 'https://' + formatted;
    }
    return formatted;
  };

  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    if (newUrl && !validateUrl(newUrl)) {
      setUrlError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateUrl(url);
    if (validationError) {
      setUrlError(validationError);
      return;
    }

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
        'https://website-analyser-1.onrender.com/api/websites/analyze',
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
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Fade in timeout={800}>
          <Card 
            elevation={0}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 4
            }}
          >
            <CardContent sx={{ textAlign: 'center', py: 6 }}>
              <ErrorIcon sx={{ fontSize: 64, color: 'white', mb: 2 }} />
              <Typography variant="h5" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
                Authentication Required
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.9)', mb: 3 }}>
                Please login to access the website analyzer
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/login')}
                sx={{
                  bgcolor: 'white',
                  color: '#667eea',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                }}
              >
                Login Now
              </Button>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in timeout={600}>
        <Box>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <AnalyticsIcon sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
            </motion.div>
            <GradientText variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
              Website Analyzer
            </GradientText>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              Get comprehensive insights about any website in seconds
            </Typography>
          </Box>

          {/* Input Form */}
          <Grow in timeout={800}>
            <StyledPaper elevation={0}>
              <InnerContent>
                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Website URL"
                    variant="outlined"
                    value={url}
                    onChange={handleUrlChange}
                    error={!!urlError}
                    helperText={urlError || "Enter URL without http:// (e.g., example.com)"}
                    placeholder="https://example.com"
                    disabled={loading}
                    sx={{ mb: 3 }}
                    InputProps={{
                      sx: { fontSize: '1.1rem' }
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading || !url.trim()}
                    sx={{
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a67d8 0%, #6b46a0 100%)',
                      }
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: 'white' }} />
                    ) : (
                      'Analyze Website'
                    )}
                  </Button>
                </Box>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <Alert 
                        severity="error" 
                        sx={{ mt: 2 }}
                        onClose={() => setError('')}
                      >
                        {error}
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>
              </InnerContent>
            </StyledPaper>
          </Grow>

          {/* Loading State */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <CircularProgress size={60} sx={{ color: '#667eea' }} />
                  <Typography variant="h6" sx={{ mt: 2, color: 'text.primary' }}>
                    Analyzing website...
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    This may take a few moments
                  </Typography>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Section */}
          <AnimatePresence>
            {result && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <AnalysisResults result={result} />

                {/* Action Buttons */}
                <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <FloatingButton
                    variant="contained"
                    startIcon={<HistoryIcon />}
                    onClick={() => navigate('/my-analyses')}
                    sx={{ bgcolor: '#3498db' }}
                  >
                    My Analyses
                  </FloatingButton>

                  <FloatingButton
                    variant="contained"
                    startIcon={<RefreshIcon />}
                    onClick={() => setResult(null)}
                    sx={{ bgcolor: '#2ecc71' }}
                  >
                    New Analysis
                  </FloatingButton>

                  {user?.role === 'admin' && (
                    <>
                      <FloatingButton
                        variant="contained"
                        startIcon={<AdminIcon />}
                        onClick={() => navigate('/admin/summary')}
                        sx={{ bgcolor: '#f39c12' }}
                      >
                        Admin Summary
                      </FloatingButton>

                      <FloatingButton
                        variant="outlined"
                        startIcon={<ExportIcon />}
                        onClick={() => window.open('/api/websites/export', '_blank')}
                        sx={{ borderColor: '#e74c3c', color: '#e74c3c' }}
                      >
                        Export CSV
                      </FloatingButton>
                    </>
                  )}
                </Box>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Features Section */}
          {!result && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Box sx={{ mt: 6 }}>
                <Divider sx={{ mb: 4 }}>
                  <Chip label="Features" size="large" />
                </Divider>
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                  gap: 3
                }}>
                  {[
                    { icon: '🔍', title: 'SEO Analysis', desc: 'Meta tags, keywords, and SEO recommendations' },
                    { icon: '🔒', title: 'Security Check', desc: 'SSL certificate, security headers, and vulnerabilities' },
                    { icon: '⚡', title: 'Performance', desc: 'Load time, caching, and optimization tips' },
                    { icon: '📱', title: 'Mobile Friendly', desc: 'Responsive design and mobile compatibility' },
                    { icon: '💻', title: 'Tech Stack', desc: 'Frameworks, libraries, and hosting provider' },
                    { icon: '📧', title: 'Contact Info', desc: 'Email addresses, social links, and location' }
                  ].map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Card 
                        elevation={0}
                        sx={{ 
                          textAlign: 'center',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: 3
                          }
                        }}
                      >
                        <CardContent>
                          <Typography variant="h2" sx={{ fontSize: '3rem', mb: 1 }}>
                            {feature.icon}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {feature.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {feature.desc}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </Box>
              </Box>
            </motion.div>
          )}
        </Box>
      </Fade>
    </Container>
  );
};

export default AnalyzeWebsite;
