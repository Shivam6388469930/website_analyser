

// const WebsiteAnalysis = require('../models/WebsiteAnalysis');
// const axios = require('axios');
// const cheerio = require('cheerio');
// const whois = require('whois');
// const dns = require('dns').promises;
// const sslChecker = require('ssl-checker');
// const { URL } = require('url');
// const { Parser } = require('json2csv'); // for CSV export

// // ===============================
// // 🔹 WHOIS HELPERS
// // ===============================
// const getWhoisInfo = (domain) => {
//   return new Promise((resolve) => {
//     whois.lookup(domain, (err, data) => {
//       if (err || !data) return resolve(null);
//       try {
//         const domainInfo = {
//           registrar: extractWhoisField(data, ['Registrar:', 'registrar:']),
//           registrationDate: extractWhoisField(data, ['Creation Date:', 'Created Date:', 'created:']),
//           expirationDate: extractWhoisField(data, ['Expiry Date:', 'Expiration Date:', 'Registry Expiry Date:']),
//           updatedDate: extractWhoisField(data, ['Updated Date:', 'Last Updated:']),
//           nameServers: extractWhoisArray(data, ['Name Server:', 'nserver:']),
//           registrantCountry: extractWhoisField(data, ['Registrant Country:', 'country:']),
//           registrantOrg: extractWhoisField(data, ['Registrant Organization:', 'org:']),
//           status: extractWhoisArray(data, ['Domain Status:', 'status:'])
//         };
//         resolve(domainInfo);
//       } catch {
//         resolve(null);
//       }
//     });
//   });
// };

// const extractWhoisField = (data, fields) => {
//   for (const field of fields) {
//     const regex = new RegExp(`${field}\\s*(.+)`, 'i');
//     const match = data.match(regex);
//     if (match) return match[1].trim();
//   }
//   return '';
// };

// // const extractWhoisArray = (data, fields) => {
// //   const results = [];
// //   for (const field of fields) {
// //     const regex = new RegExp(`${field}\\s*(.+)`, 'gi');
// //     let match;
// //     while ((match = regex.exec(data)) !== null) results.push(match[1].trim());
// //   }
// //   return results;
// // };

// // ===============================
// // 🔹 DNS & SSL HELPERS
// // ===============================

// const extractWhoisArray = (data, fields) => {
//   const results = [];
//   for (const field of fields) {
//     const regex = new RegExp(`${field}\\s*(.+)`, 'gi');
//     let match;
//     while ((match = regex.exec(data)) !== null) {
//       results.push(match[1].trim());
//     }
//   }
//   return results;
// };

// const getDNSInfo = async (hostname) => {
//   try {
//     const ipAddresses = await dns.resolve4(hostname);
//     return { ipAddress: ipAddresses[0] || '', allIPs: ipAddresses };
//   } catch {
//     return { ipAddress: '', allIPs: [] };
//   }
// };

// const getSSLInfo = async (hostname) => {
//   try {
//     const sslInfo = await sslChecker(hostname);
//     return {
//       hasSSL: sslInfo.valid || false,
//       sslIssuer: sslInfo.issuer || '',
//       sslValidFrom: sslInfo.valid_from || '',
//       sslValidTo: sslInfo.valid_to || '',
//       sslDaysRemaining: sslInfo.daysRemaining || 0
//     };
//   } catch {
//     return { hasSSL: false, sslIssuer: '', sslValidFrom: '', sslValidTo: '', sslDaysRemaining: 0 };
//   }
// };

// // ===============================
// // 🔹 HOSTING, SECURITY, ISSUE HELPERS
// // ===============================
// const detectHosting = (ip, headers, html) => {
//   let hosting = 'Unknown', cloudProvider = '', cdn = '';
//   const headerStr = JSON.stringify(headers).toLowerCase();
//   const htmlLower = html.toLowerCase();

//   if (headerStr.includes('cloudflare')) { cloudProvider = 'Cloudflare'; cdn = 'Cloudflare CDN'; }
//   if (headerStr.includes('amazon') || headerStr.includes('aws')) cloudProvider = 'Amazon AWS';
//   if (headerStr.includes('google') || headerStr.includes('gcp')) cloudProvider = 'Google Cloud';
//   if (headerStr.includes('azure') || headerStr.includes('microsoft')) cloudProvider = 'Microsoft Azure';

//   if (htmlLower.includes('godaddy')) hosting = 'GoDaddy';
//   if (htmlLower.includes('bluehost')) hosting = 'Bluehost';
//   if (htmlLower.includes('hostgator')) hosting = 'HostGator';
//   if (htmlLower.includes('namecheap')) hosting = 'Namecheap';
//   if (htmlLower.includes('digitalocean')) hosting = 'DigitalOcean';

//   return { hosting, cloudProvider, cdn };
// };

// const checkSecurityHeaders = (headers) => ({
//   strictTransportSecurity: !!headers['strict-transport-security'],
//   contentSecurityPolicy: !!headers['content-security-policy'],
//   xFrameOptions: !!headers['x-frame-options'],
//   xContentTypeOptions: !!headers['x-content-type-options'],
//   xXSSProtection: !!headers['x-xss-protection']
// });

// const findIssues = (analysis) => {
//   const issues = [];
//   if (!analysis.security.hasSSL)
//     issues.push({ type: 'critical', category: 'Security', message: 'Website does not have SSL certificate (HTTPS)' });

//   if (analysis.security.hasSSL && analysis.security.sslDaysRemaining < 30)
//     issues.push({ type: 'warning', category: 'Security', message: `SSL expires in ${analysis.security.sslDaysRemaining} days` });

//   if (!analysis.security.securityHeaders.strictTransportSecurity)
//     issues.push({ type: 'warning', category: 'Security', message: 'Missing Strict-Transport-Security header' });

//   if (!analysis.security.securityHeaders.xFrameOptions)
//     issues.push({ type: 'warning', category: 'Security', message: 'Missing X-Frame-Options header' });

//   if (!analysis.title || analysis.title.length < 10)
//     issues.push({ type: 'warning', category: 'SEO', message: 'Page title is missing or too short' });

//   if (!analysis.description || analysis.description.length < 50)
//     issues.push({ type: 'warning', category: 'SEO', message: 'Meta description is missing or too short' });

//   if (!analysis.seo.hasRobotsTxt)
//     issues.push({ type: 'info', category: 'SEO', message: 'robots.txt file not found' });

//   return issues;
// };

// // ===============================
// // 🔹 MAIN: Analyze One Website
// // ===============================
// const analyzeWebsite = async (req, res) => {
//   try {
//     const { url } = req.body;
//     if (!url) return res.status(400).json({ message: 'Please provide a URL' });

//     let validUrl = url.startsWith('http') ? url : 'https://' + url;
//     const startTime = Date.now();

//     const response = await axios.get(validUrl, {
//       timeout: 10000,
//       headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
//     });

//     const responseTime = Date.now() - startTime;
//     const $ = cheerio.load(response.data);
//     const urlObj = new URL(validUrl);
//     const hostname = urlObj.hostname;
//     const domain = hostname.replace('www.', '');

//     const title = $('title').text() || '';
//     const description = $('meta[name="description"]').attr('content') || '';
//     const keywords = $('meta[name="keywords"]').attr('content') || '';
//     const author = $('meta[name="author"]').attr('content') || '';

//     let favicon = $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href') || '';
//     if (favicon && !favicon.startsWith('http'))
//       favicon = urlObj.origin + (favicon.startsWith('/') ? '' : '/') + favicon;

//     const links = [];
//     $('a[href]').each((_, el) => { if (links.length < 50) { const href = $(el).attr('href'); if (href?.startsWith('http')) links.push(href); } });

//     const image = [];
//     const imageDetails = { total: 0, withAlt: 0, withoutAlt: 0, external: 0, internal: 0, formats: {} };
//     $('img').each((_, el) => {
//       let src = $(el).attr('src');
//       const alt = $(el).attr('alt');
//       if (!src) return;
//       imageDetails.total++;
//       alt ? imageDetails.withAlt++ : imageDetails.withoutAlt++;
//       if (!src.startsWith('http')) src = urlObj.origin + (src.startsWith('/') ? '' : '/') + src;
//       src.includes(hostname) ? imageDetails.internal++ : imageDetails.external++;
//       const fmt = src.split('.').pop().split('?')[0].toLowerCase();
//       imageDetails.formats[fmt] = (imageDetails.formats[fmt] || 0) + 1;
//       if (images.length < 50) images.push({ src, alt: alt || 'No alt text' });
//     });

//     const headings = { h1: [], h2: [], h3: [],p:[] };
//     ['h1', 'h2', 'h3','p'].forEach(tag => $(tag).each((_, el) => headings[tag].push($(el).text().trim())));
//     const paragraphs = [];
//     $("p").each((_, el) => {
//       const text = $(el).text().replace(/\s+/g, " ").trim();
//       if (text && paragraphs.length < 50) paragraphs.push(text);
//     });


//       const images = [];
//     $("img").each((_, el) => {
//       const src = $(el).attr("src");
//       if (src) {
//         images.push({
//           src: src.startsWith('http') ? src : new URL(src, websiteUrl).href,
//           alt: $(el).attr("alt") || "No alt text",
//         });
//       }
//     });

//     const html = response.data.toLowerCase();
//     const technologies = [];
//     if (html.includes('react')) technologies.push('React');
//     if (html.includes('wordpress')) technologies.push('WordPress');
//     if (response.headers['server']?.toLowerCase().includes('nginx')) technologies.push('Nginx');
//     if (response.headers['server']?.toLowerCase().includes('apache')) technologies.push('Apache');

//     const domainInfo = await getWhoisInfo(domain);
//     const dnsInfo = await getDNSInfo(hostname);
//     const sslInfo = await getSSLInfo(hostname);
//     const hostingInfo = detectHosting(dnsInfo.ipAddress, response.headers, html);
//     const securityHeaders = checkSecurityHeaders(response.headers);

//     let hasRobotsTxt = false, hasSitemap = false;
//     try { await axios.get(`${urlObj.origin}/robots.txt`, { timeout: 5000 }); hasRobotsTxt = true; } catch {}
//     try { await axios.get(`${urlObj.origin}/sitemap.xml`, { timeout: 5000 }); hasSitemap = true; } catch {}

//     const socialMedia = {
//       facebook: $('a[href*="facebook.com"]').attr('href') || '',
//       twitter: $('a[href*="twitter.com"]').attr('href') || $('a[href*="x.com"]').attr('href') || '',
//       instagram: $('a[href*="instagram.com"]').attr('href') || '',
//       linkedin: $('a[href*="linkedin.com"]').attr('href') || '',
//       youtube: $('a[href*="youtube.com"]').attr('href') || ''
//     };

//     const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
//     const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
//     const emails = [...new Set((html.match(emailRegex) || []).slice(0, 5))];
//     const phones = [...new Set((html.match(phoneRegex) || []).slice(0, 3))];

//     const analysisData = {
//       url: validUrl,
//       title,
//       description,
//       keywords,
//       author,
//       favicon,
//       links,
//       images,
//       paragraphs,
//       image,
//       imageDetails,
//       headings,
//       technologies,
//       responseTime,
//       statusCode: response.status,
//       domainInfo: domainInfo || {},
//       serverInfo: {
//         ipAddress: dnsInfo.ipAddress,
//         serverType: response.headers['server'] || 'Unknown',
//         hosting: hostingInfo.hosting,
//         cloudProvider: hostingInfo.cloudProvider,
//         cdn: hostingInfo.cdn
//       },
//       security: {
//         hasSSL: sslInfo.hasSSL,
//         sslIssuer: sslInfo.sslIssuer,
//         sslValidFrom: sslInfo.sslValidFrom,
//         sslValidTo: sslInfo.sslValidTo,
//         sslDaysRemaining: sslInfo.sslDaysRemaining,
//         securityHeaders
//       },
//       seo: {
//         hasRobotsTxt,
//         hasSitemap,
//         canonicalUrl: $('link[rel="canonical"]').attr('href') || ''
//       },
//       socialMedia,
//       contactInfo: { email: emails, phone: phones },
//       analyzedBy: req.user._id
//     };

//     analysisData.issues = findIssues(analysisData);
//     const analysis = await WebsiteAnalysis.create(analysisData);
//     res.status(201).json(analysis);
//   } catch (error) {
//     console.error('Analysis error:', error.message);
//     res.status(500).json({ message: 'Failed to analyze website', error: error.message });
//   }
// };

// // ===============================
// // 🔹 CRUD ROUTES
// // ===============================
// const getAnalyses = async (req, res) => {
//   try {
//     const analyses = await WebsiteAnalysis.find({ analyzedBy: req.user._id })
//       .sort({ createdAt: -1 })
//       .populate('analyzedBy', 'name email');
//     res.json(analyses);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const getAllAnalyses = async (req, res) => {
//   try {
//     const analyses = await WebsiteAnalysis.find({})
//       .sort({ createdAt: -1 })
//       .populate('analyzedBy', 'name email');
//     res.json(analyses);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const getAnalysisById = async (req, res) => {
//   try {
//     const analysis = await WebsiteAnalysis.findById(req.params.id)
//       .populate('analyzedBy', 'name email');
//     analysis ? res.json(analysis) : res.status(404).json({ message: 'Not found' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const deleteAnalysis = async (req, res) => {
//   try {
//     const analysis = await WebsiteAnalysis.findById(req.params.id);
//     if (!analysis) return res.status(404).json({ message: 'Analysis not found' });
//     if (analysis.analyzedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin')
//       return res.status(403).json({ message: 'Not authorized' });

//     await analysis.deleteOne();
//     res.json({ message: 'Deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ===============================
// // 🔹 NEW: SUMMARY ROUTE
// // ===============================
// const summarizeAnalyses = async (req, res) => {
//   try {
//     const analyses = await WebsiteAnalysis.find({});
//     if (!analyses.length) return res.status(404).json({ message: 'No analyses found' });

//     const summary = {
//       totalWebsites: analyses.length,
//       totalImages: 0,
//       totalExternalImages: 0,
//       totalInternalImages: 0,
//       imageFormats: {},
//       hostingPlatforms: {},
//       cloudProviders: {},
//       cdnProviders: {},
//       emails: new Set(),
//       phones: new Set(),
//       socialMedia: { facebook: new Set(), twitter: new Set(), instagram: new Set(), linkedin: new Set(), youtube: new Set() }
//     };

//     analyses.forEach(site => {
//       const imgs = site.imageDetails || {};
//       summary.totalImages += imgs.total || 0;
//       summary.totalExternalImages += imgs.external || 0;
//       summary.totalInternalImages += imgs.internal || 0;
//       Object.entries(imgs.formats || {}).forEach(([fmt, count]) => summary.imageFormats[fmt] = (summary.imageFormats[fmt] || 0) + count);

//       const hosting = site.serverInfo?.hosting || 'Unknown';
//       summary.hostingPlatforms[hosting] = (summary.hostingPlatforms[hosting] || 0) + 1;

//       const cloud = site.serverInfo?.cloudProvider || 'Unknown';
//       summary.cloudProviders[cloud] = (summary.cloudProviders[cloud] || 0) + 1;

//       const cdn = site.serverInfo?.cdn || 'None';
//       summary.cdnProviders[cdn] = (summary.cdnProviders[cdn] || 0) + 1;

//       (site.contactInfo?.email || []).forEach(e => summary.emails.add(e));
//       (site.contactInfo?.phone || []).forEach(p => summary.phones.add(p));

//       const sm = site.socialMedia || {};
//       Object.keys(summary.socialMedia).forEach(platform => {
//         if (sm[platform]) summary.socialMedia[platform].add(sm[platform]);
//       });
//     });

//     summary.emails = [...summary.emails];
//     summary.phones = [...summary.phones];
//     Object.keys(summary.socialMedia).forEach(k => summary.socialMedia[k] = [...summary.socialMedia[k]]);

//     res.json(summary);
//   } catch (error) {
//     console.error('Summary error:', error.message);
//     res.status(500).json({ message: 'Failed to summarize analyses', error: error.message });
//   }
// };

// // ===============================
// // 🔹 NEW: EXPORT AS CSV
// // ===============================
// const exportAnalysesCSV = async (req, res) => {
//   try {
//     const analyses = await WebsiteAnalysis.find({});
//     const fields = ['url', 'title', 'serverInfo.hosting', 'serverInfo.cloudProvider', 'contactInfo.email', 'contactInfo.phone'];
//     const parser = new Parser({ fields });
//     const csv = parser.parse(analyses);
//     res.header('Content-Type', 'text/csv');
//     res.attachment('website_analyses.csv');
//     res.send(csv);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to export CSV', error: error.message });
//   }
// };

// // ===============================
// // 🔹 EXPORT MODULE
// // ===============================
// module.exports = {
//   analyzeWebsite,
//   getAnalyses,
//   getAllAnalyses,
//   getAnalysisById,
//   deleteAnalysis,
//   summarizeAnalyses,
//   exportAnalysesCSV
// };




const WebsiteAnalysis = require('../models/WebsiteAnalysis');
const axios = require('axios');
const cheerio = require('cheerio');
const whois = require('whois');
const dns = require('dns').promises;
const sslChecker = require('ssl-checker');
const { URL } = require('url');
const { Parser } = require('json2csv');

// ===============================
// 🔹 CONSTANTS
// ===============================
const MAX_ITEMS = 100;
const MAX_LINKS = 50;
const REQUEST_TIMEOUT = 10000;

// ===============================
// 🔹 COMPLETE IMAGE EXTRACTION
// ===============================
const extractAllImages = ($, urlObj, hostname) => {
  const images = [];
  const imageDetails = {
    total: 0,
    withAlt: 0,
    withoutAlt: 0,
    external: 0,
    internal: 0,
    formats: {},
    lazyLoaded: 0,
    cssBackgrounds: 0,
    pictureElements: 0
  };

  const seenUrls = new Set();

  const normalizeUrl = (src) => {
    if (!src || src.startsWith('data:')) return null;
    
    let cleanSrc = src.trim();
    if (!cleanSrc.startsWith('http')) {
      cleanSrc = urlObj.origin + (cleanSrc.startsWith('/') ? '' : '/') + cleanSrc;
    }
    return cleanSrc;
  };

  const addImage = (src, alt, type = 'standard') => {
    const normalized = normalizeUrl(src);
    if (!normalized || seenUrls.has(normalized)) return;
    
    seenUrls.add(normalized);
    imageDetails.total++;

    if (alt && alt.trim() && alt !== 'No alt text') {
      imageDetails.withAlt++;
    } else {
      imageDetails.withoutAlt++;
    }

    if (normalized.includes(hostname)) {
      imageDetails.internal++;
    } else {
      imageDetails.external++;
    }

    const format = normalized.split('?')[0].split('.').pop().toLowerCase();
    if (format && format.length <= 5) {
      imageDetails.formats[format] = (imageDetails.formats[format] || 0) + 1;
    }

    if (type === 'lazy') imageDetails.lazyLoaded++;
    if (type === 'css') imageDetails.cssBackgrounds++;
    if (type === 'picture') imageDetails.pictureElements++;

    if (images.length < MAX_ITEMS) {
      images.push({ src: normalized, alt: alt || 'No alt text', type });
    }
  };

  // 1. Standard <img> tags
  $('img').each((_, el) => {
    const src = $(el).attr('src');
    const alt = $(el).attr('alt');
    if (src) addImage(src, alt, 'standard');
  });

  // 2. Lazy-loaded images
  const lazyAttrs = ['data-src', 'data-lazy-src', 'data-original', 'data-lazy', 'data-srcset', 'data-image', 'data-img-src', 'data-bg'];
  lazyAttrs.forEach(attr => {
    $(`img[${attr}], div[${attr}], section[${attr}]`).each((_, el) => {
      const src = $(el).attr(attr);
      const alt = $(el).attr('alt') || $(el).attr('data-alt');
      if (src) {
        if (src.includes(',')) {
          src.split(',').forEach(s => {
            const url = s.trim().split(' ')[0];
            if (url) addImage(url, alt, 'lazy');
          });
        } else {
          addImage(src, alt, 'lazy');
        }
      }
    });
  });

  // 3. <picture> and <source> elements
  $('picture').each((_, el) => {
    const $picture = $(el);
    $picture.find('source').each((_, source) => {
      const srcset = $(source).attr('srcset') || $(source).attr('data-srcset');
      if (srcset) {
        srcset.split(',').forEach(s => {
          const url = s.trim().split(' ')[0];
          if (url) addImage(url, 'Picture source', 'picture');
        });
      }
    });

    const img = $picture.find('img');
    const imgSrc = img.attr('src');
    const imgAlt = img.attr('alt');
    if (imgSrc) addImage(imgSrc, imgAlt, 'picture');
  });

  // 4. CSS background images from inline styles
  $('[style*="background"]').each((_, el) => {
    const style = $(el).attr('style');
    if (style) {
      const urlMatches = style.match(/url\(['"]?([^'"()]+)['"]?\)/gi);
      if (urlMatches) {
        urlMatches.forEach(match => {
          const url = match.match(/url\(['"]?([^'"()]+)['"]?\)/i)?.[1];
          if (url) addImage(url, 'Background image', 'css');
        });
      }
    }
  });

  // 5. CSS background images from <style> tags
  $('style').each((_, el) => {
    const cssContent = $(el).html();
    if (cssContent) {
      const urlMatches = cssContent.match(/url\(['"]?([^'"()]+)['"]?\)/gi);
      if (urlMatches) {
        urlMatches.forEach(match => {
          const url = match.match(/url\(['"]?([^'"()]+)['"]?\)/i)?.[1];
          if (url && !url.startsWith('data:')) {
            addImage(url, 'CSS background', 'css');
          }
        });
      }
    }
  });

  // 6. SVG images
  $('svg image, svg use').each((_, el) => {
    const href = $(el).attr('href') || $(el).attr('xlink:href');
    if (href) addImage(href, 'SVG image', 'svg');
  });

  return { images, imageDetails };
};

// ===============================
// 🔹 COMPLETE PARAGRAPH EXTRACTION
// ===============================
const extractParagraphs = ($) => {
  const paragraphs = [];
  const paragraphDetails = {
    total: 0,
    totalWords: 0,
    totalChars: 0,
    averageWordCount: 0,
    averageCharCount: 0,
    longestParagraph: 0,
    shortestParagraph: Infinity
  };

  $('p').each((_, el) => {
    let text = $(el).text().replace(/\s+/g, ' ').trim();
    if (text.length < 20) return;

    const wordCount = text.split(' ').length;
    const charCount = text.length;

    paragraphDetails.total++;
    paragraphDetails.totalWords += wordCount;
    paragraphDetails.totalChars += charCount;
    paragraphDetails.longestParagraph = Math.max(paragraphDetails.longestParagraph, charCount);
    paragraphDetails.shortestParagraph = Math.min(paragraphDetails.shortestParagraph, charCount);

    if (paragraphs.length < MAX_ITEMS) {
      paragraphs.push({ text, wordCount, charCount });
    }
  });

  if (paragraphDetails.total > 0) {
    paragraphDetails.averageWordCount = Math.round(paragraphDetails.totalWords / paragraphDetails.total);
    paragraphDetails.averageCharCount = Math.round(paragraphDetails.totalChars / paragraphDetails.total);
  }

  if (paragraphDetails.shortestParagraph === Infinity) {
    paragraphDetails.shortestParagraph = 0;
  }

  return { paragraphs, paragraphDetails };
};

// ===============================
// 🔹 EXTERNAL RESOURCES EXTRACTION
// ===============================
const extractExternalResources = ($, hostname) => {
  const external = {
    scripts: [],
    stylesheets: [],
    fonts: [],
    videos: [],
    iframes: [],
    apis: []
  };

  const details = {
    totalExternal: 0,
    scriptCount: 0,
    stylesheetCount: 0,
    fontCount: 0,
    videoCount: 0,
    iframeCount: 0,
    cdnProviders: {}
  };

  const detectCDN = (url) => {
    const cdns = {
      'cloudflare': /cloudflare\.com|cdnjs\.cloudflare\.com/i,
      'jsdelivr': /jsdelivr\.net/i,
      'unpkg': /unpkg\.com/i,
      'googleapis': /googleapis\.com|gstatic\.com/i,
      'amazon': /cloudfront\.net|s3\.amazonaws\.com/i,
      'fastly': /fastly\.net/i,
      'akamai': /akamaihd\.net/i,
      'stackpath': /stackpath\.bootstrapcdn\.com/i,
      'maxcdn': /maxcdn\.com/i
    };

    for (const [name, pattern] of Object.entries(cdns)) {
      if (pattern.test(url)) return name;
    }
    return 'other';
  };

  // External Scripts
  $('script[src]').each((_, el) => {
    const src = $(el).attr('src');
    if (src && !src.includes(hostname)) {
      details.scriptCount++;
      details.totalExternal++;
      const cdn = detectCDN(src);
      details.cdnProviders[cdn] = (details.cdnProviders[cdn] || 0) + 1;
      
      external.scripts.push({
        url: src,
        cdn,
        async: $(el).attr('async') !== undefined,
        defer: $(el).attr('defer') !== undefined
      });
    }
  });

  // External Stylesheets
  $('link[rel="stylesheet"], link[rel="preload"][as="style"]').each((_, el) => {
    const href = $(el).attr('href');
    if (href && !href.includes(hostname)) {
      details.stylesheetCount++;
      details.totalExternal++;
      const cdn = detectCDN(href);
      details.cdnProviders[cdn] = (details.cdnProviders[cdn] || 0) + 1;
      
      external.stylesheets.push({
        url: href,
        cdn,
        media: $(el).attr('media') || 'all'
      });
    }
  });

  // External Fonts
  $('link[rel="preload"][as="font"], link[href*="fonts"]').each((_, el) => {
    const href = $(el).attr('href');
    if (href && !href.includes(hostname)) {
      details.fontCount++;
      details.totalExternal++;
      const cdn = detectCDN(href);
      external.fonts.push({ url: href, cdn });
    }
  });

  $('style').each((_, el) => {
    const css = $(el).html();
    const fontMatches = css?.match(/@font-face[^}]*}/gi);
    if (fontMatches) {
      fontMatches.forEach(match => {
        const urlMatch = match.match(/url\(['"]?([^'"()]+)['"]?\)/i);
        if (urlMatch && urlMatch[1] && !urlMatch[1].includes(hostname)) {
          details.fontCount++;
          details.totalExternal++;
          external.fonts.push({ url: urlMatch[1], cdn: detectCDN(urlMatch[1]) });
        }
      });
    }
  });

  // External Videos
  $('video source, video[src]').each((_, el) => {
    const src = $(el).attr('src');
    if (src && !src.includes(hostname)) {
      details.videoCount++;
      details.totalExternal++;
      external.videos.push({ url: src, type: $(el).attr('type') || 'unknown' });
    }
  });

  // External Iframes
  $('iframe[src]').each((_, el) => {
    const src = $(el).attr('src');
    if (src && !src.includes(hostname)) {
      details.iframeCount++;
      details.totalExternal++;
      external.iframes.push({
        url: src,
        width: $(el).attr('width') || 'auto',
        height: $(el).attr('height') || 'auto'
      });
    }
  });

  // Detect API calls
  $('script:not([src])').each((_, el) => {
    const scriptContent = $(el).html();
    if (scriptContent) {
      const apiPatterns = [
        /fetch\s*\(\s*['"`]([^'"`]+)['"`]/gi,
        /axios\.[get|post|put|delete]+\s*\(\s*['"`]([^'"`]+)['"`]/gi,
        /\$\.ajax\s*\(\s*{[^}]*url\s*:\s*['"`]([^'"`]+)['"`]/gi
      ];

      apiPatterns.forEach(pattern => {
        const matches = scriptContent.matchAll(pattern);
        for (const match of matches) {
          if (match[1] && match[1].startsWith('http') && !match[1].includes(hostname)) {
            external.apis.push(match[1]);
          }
        }
      });
    }
  });

  external.apis = [...new Set(external.apis)];
  return { external, details };
};

// ===============================
// 🔹 WHOIS HELPERS
// ===============================
const getWhoisInfo = (domain) => {
  return new Promise((resolve) => {
    whois.lookup(domain, (err, data) => {
      if (err || !data) return resolve(null);
      try {
        const domainInfo = {
          registrar: extractWhoisField(data, ['Registrar:', 'registrar:']),
          registrationDate: extractWhoisField(data, ['Creation Date:', 'Created Date:', 'created:']),
          expirationDate: extractWhoisField(data, ['Expiry Date:', 'Expiration Date:', 'Registry Expiry Date:']),
          updatedDate: extractWhoisField(data, ['Updated Date:', 'Last Updated:']),
          nameServers: extractWhoisArray(data, ['Name Server:', 'nserver:']),
          registrantCountry: extractWhoisField(data, ['Registrant Country:', 'country:']),
          registrantOrg: extractWhoisField(data, ['Registrant Organization:', 'org:']),
          status: extractWhoisArray(data, ['Domain Status:', 'status:'])
        };
        resolve(domainInfo);
      } catch {
        resolve(null);
      }
    });
  });
};

const extractWhoisField = (data, fields) => {
  for (const field of fields) {
    const regex = new RegExp(`${field}\\s*(.+)`, 'i');
    const match = data.match(regex);
    if (match) return match[1].trim();
  }
  return '';
};

const extractWhoisArray = (data, fields) => {
  const results = [];
  for (const field of fields) {
    const regex = new RegExp(`${field}\\s*(.+)`, 'gi');
    let match;
    while ((match = regex.exec(data)) !== null) results.push(match[1].trim());
  }
  return results;
};

// ===============================
// 🔹 DNS & SSL HELPERS
// ===============================
const getDNSInfo = async (hostname) => {
  try {
    const ipAddresses = await dns.resolve4(hostname);
    return { ipAddress: ipAddresses[0] || '', allIPs: ipAddresses };
  } catch {
    return { ipAddress: '', allIPs: [] };
  }
};

const getSSLInfo = async (hostname) => {
  try {
    const sslInfo = await sslChecker(hostname);
    return {
      hasSSL: sslInfo.valid || false,
      sslIssuer: sslInfo.issuer || '',
      sslValidFrom: sslInfo.valid_from || '',
      sslValidTo: sslInfo.valid_to || '',
      sslDaysRemaining: sslInfo.daysRemaining || 0
    };
  } catch {
    return { hasSSL: false, sslIssuer: '', sslValidFrom: '', sslValidTo: '', sslDaysRemaining: 0 };
  }
};

// ===============================
// 🔹 HOSTING & SECURITY HELPERS
// ===============================
const detectHosting = (ip, headers, html) => {
  let hosting = 'Unknown', cloudProvider = '', cdn = '';
  const headerStr = JSON.stringify(headers).toLowerCase();
  const htmlLower = html.toLowerCase();

  if (headerStr.includes('cloudflare') || htmlLower.includes('cloudflare')) {
    cloudProvider = 'Cloudflare';
    cdn = 'Cloudflare CDN';
  }
  if (headerStr.includes('amazon') || headerStr.includes('aws')) cloudProvider = 'Amazon AWS';
  if (headerStr.includes('google') || headerStr.includes('gcp')) cloudProvider = 'Google Cloud';
  if (headerStr.includes('azure') || headerStr.includes('microsoft')) cloudProvider = 'Microsoft Azure';

  if (htmlLower.includes('godaddy')) hosting = 'GoDaddy';
  if (htmlLower.includes('bluehost')) hosting = 'Bluehost';
  if (htmlLower.includes('hostgator')) hosting = 'HostGator';
  if (htmlLower.includes('namecheap')) hosting = 'Namecheap';
  if (htmlLower.includes('digitalocean')) hosting = 'DigitalOcean';

  return { hosting, cloudProvider, cdn };
};

const checkSecurityHeaders = (headers) => ({
  strictTransportSecurity: !!headers['strict-transport-security'],
  contentSecurityPolicy: !!headers['content-security-policy'],
  xFrameOptions: !!headers['x-frame-options'],
  xContentTypeOptions: !!headers['x-content-type-options'],
  xXSSProtection: !!headers['x-xss-protection']
});

const findIssues = (analysis) => {
  const issues = [];
  if (!analysis.security.hasSSL)
    issues.push({ type: 'critical', category: 'Security', message: 'Website does not have SSL certificate (HTTPS)' });

  if (analysis.security.hasSSL && analysis.security.sslDaysRemaining < 30)
    issues.push({ type: 'warning', category: 'Security', message: `SSL expires in ${analysis.security.sslDaysRemaining} days` });

  if (!analysis.security.securityHeaders.strictTransportSecurity)
    issues.push({ type: 'warning', category: 'Security', message: 'Missing Strict-Transport-Security header' });

  if (!analysis.security.securityHeaders.xFrameOptions)
    issues.push({ type: 'warning', category: 'Security', message: 'Missing X-Frame-Options header' });

  if (!analysis.title || analysis.title.length < 10)
    issues.push({ type: 'warning', category: 'SEO', message: 'Page title is missing or too short' });

  if (!analysis.description || analysis.description.length < 50)
    issues.push({ type: 'warning', category: 'SEO', message: 'Meta description is missing or too short' });

  if (!analysis.seo.hasRobotsTxt)
    issues.push({ type: 'info', category: 'SEO', message: 'robots.txt file not found' });

  return issues;
};

// ===============================
// 🔹 MAIN: ANALYZE WEBSITE
// ===============================
const analyzeWebsite = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ message: 'Please provide a URL' });

    let validUrl = url.trim();
    if (!validUrl.startsWith('http')) validUrl = 'https://' + validUrl;

    const startTime = Date.now();
    const response = await axios.get(validUrl, {
      timeout: REQUEST_TIMEOUT,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      maxRedirects: 5
    });

    const responseTime = Date.now() - startTime;
    const $ = cheerio.load(response.data);
    const urlObj = new URL(validUrl);
    const hostname = urlObj.hostname;
    const domain = hostname.replace('www.', '');
    const html = response.data.toLowerCase();

    // Extract HTTP Headers
    const httpHeaders = {
      server: response.headers['server'] || '',
      contentType: response.headers['content-type'] || '',
      contentLength: response.headers['content-length'] || '',
      connection: response.headers['connection'] || '',
      cacheControl: response.headers['cache-control'] || '',
      etag: response.headers['etag'] || '',
      vary: response.headers['vary'] || '',
      xPoweredBy: response.headers['x-powered-by'] || '',
      xNextjsCache: response.headers['x-nextjs-cache'] || '',
      xNextjsPrerender: response.headers['x-nextjs-prerender'] || '',
      xNextjsStaleTime: response.headers['x-nextjs-stale-time'] || '',
      date: response.headers['date'] || '',
      contentEncoding: response.headers['content-encoding'] || '',
      transferEncoding: response.headers['transfer-encoding'] || '',
      setCookie: response.headers['set-cookie'] || [],
      allHeaders: response.headers // Store all headers as backup
    };

    // Extract metadata
    const title = $('title').text() || '';
    const description = $('meta[name="description"]').attr('content') || '';
    const keywords = $('meta[name="keywords"]').attr('content') || '';
    const author = $('meta[name="author"]').attr('content') || '';
    
    let favicon = $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href') || '';
    if (favicon && !favicon.startsWith('http')) {
      favicon = urlObj.origin + (favicon.startsWith('/') ? '' : '/') + favicon;
    }

    // Extract links
    const links = [];
    $('a[href]').each((_, el) => {
      if (links.length < MAX_LINKS) {
        const href = $(el).attr('href');
        if (href?.startsWith('http')) links.push(href);
      }
    });

    // Use new extraction functions
    const { images, imageDetails } = extractAllImages($, urlObj, hostname);
    const { paragraphs, paragraphDetails } = extractParagraphs($);
    const { external, details: externalDetails } = extractExternalResources($, hostname);

    // Extract headings
    const headings = { h1: [], h2: [], h3: [] };
    ['h1', 'h2', 'h3'].forEach(tag => {
      $(tag).each((_, el) => {
        if (headings[tag].length < 10) {
          headings[tag].push($(el).text().trim());
        }
      });
    });

    // Detect technologies
    const technologies = [];
    if (html.includes('react')) technologies.push('React');
    if (html.includes('angular')) technologies.push('Angular');
    if (html.includes('vue')) technologies.push('Vue.js');
    if (html.includes('wordpress') || html.includes('wp-content')) technologies.push('WordPress');
    if (html.includes('shopify')) technologies.push('Shopify');
    if (response.headers['server']?.toLowerCase().includes('nginx')) technologies.push('Nginx');
    if (response.headers['server']?.toLowerCase().includes('apache')) technologies.push('Apache');

    // Parallel API calls for better performance
    const [domainInfo, dnsInfo, sslInfo] = await Promise.all([
      getWhoisInfo(domain),
      getDNSInfo(hostname),
      getSSLInfo(hostname)
    ]);

    const hostingInfo = detectHosting(dnsInfo.ipAddress, response.headers, html);
    const securityHeaders = checkSecurityHeaders(response.headers);

    // Check robots.txt and sitemap
    let hasRobotsTxt = false, hasSitemap = false;
    try { await axios.get(`${urlObj.origin}/robots.txt`, { timeout: 5000 }); hasRobotsTxt = true; } catch {}
    try { await axios.get(`${urlObj.origin}/sitemap.xml`, { timeout: 5000 }); hasSitemap = true; } catch {}

    // Extract social media
    const socialMedia = {
      facebook: $('a[href*="facebook.com"]').attr('href') || '',
      twitter: $('a[href*="twitter.com"]').attr('href') || $('a[href*="x.com"]').attr('href') || '',
      instagram: $('a[href*="instagram.com"]').attr('href') || '',
      linkedin: $('a[href*="linkedin.com"]').attr('href') || '',
      youtube: $('a[href*="youtube.com"]').attr('href') || ''
    };

    // Extract contact info
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    const emails = [...new Set((html.match(emailRegex) || []).slice(0, 5))];
    const phones = [...new Set((html.match(phoneRegex) || []).slice(0, 3))];

    // Build analysis data
    const analysisData = {
      url: validUrl,
      title,
      description,
      keywords,
      author,
      favicon,
      links,
      images,
      imageDetails,
      paragraphs,
      paragraphDetails,
      externalResources: external,
      externalResourceDetails: externalDetails,
      headings,
      technologies,
      responseTime,
      statusCode: response.status,
      httpHeaders, // NEW: HTTP Response Headers
      domainInfo: domainInfo || {},
      serverInfo: {
        ipAddress: dnsInfo.ipAddress,
        serverType: response.headers['server'] || 'Unknown',
        hosting: hostingInfo.hosting,
        cloudProvider: hostingInfo.cloudProvider,
        cdn: hostingInfo.cdn
      },
      security: {
        hasSSL: sslInfo.hasSSL,
        sslIssuer: sslInfo.sslIssuer,
        sslValidFrom: sslInfo.sslValidFrom,
        sslValidTo: sslInfo.sslValidTo,
        sslDaysRemaining: sslInfo.sslDaysRemaining,
        securityHeaders
      },
      seo: {
        hasRobotsTxt,
        hasSitemap,
        canonicalUrl: $('link[rel="canonical"]').attr('href') || ''
      },
      socialMedia,
      contactInfo: { email: emails, phone: phones },
      analyzedBy: req.user._id
    };

    analysisData.issues = findIssues(analysisData);
    const analysis = await WebsiteAnalysis.create(analysisData);
    res.status(201).json(analysis);

  } catch (error) {
    console.error('Analysis error:', error.message);
    res.status(500).json({ message: 'Failed to analyze website', error: error.message });
  }
};

// ===============================
// 🔹 CRUD ROUTES
// ===============================
const getAnalyses = async (req, res) => {
  try {
    const analyses = await WebsiteAnalysis.find({ analyzedBy: req.user._id })
      .sort({ createdAt: -1 })
      .populate('analyzedBy', 'name email');
    res.json(analyses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllAnalyses = async (req, res) => {
  try {
    const analyses = await WebsiteAnalysis.find({})
      .sort({ createdAt: -1 })
      .populate('analyzedBy', 'name email');
    res.json(analyses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAnalysisById = async (req, res) => {
  try {
    const analysis = await WebsiteAnalysis.findById(req.params.id)
      .populate('analyzedBy', 'name email');
    analysis ? res.json(analysis) : res.status(404).json({ message: 'Not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAnalysis = async (req, res) => {
  try {
    const analysis = await WebsiteAnalysis.findById(req.params.id);
    if (!analysis) return res.status(404).json({ message: 'Analysis not found' });
    if (analysis.analyzedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Not authorized' });

    await analysis.deleteOne();
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// 🔹 SUMMARY & EXPORT
// ===============================
const summarizeAnalyses = async (req, res) => {
  try {
    const analyses = await WebsiteAnalysis.find({});
    if (!analyses.length) return res.status(404).json({ message: 'No analyses found' });

    const summary = {
      totalWebsites: analyses.length,
      totalImages: 0,
      totalExternalImages: 0,
      totalInternalImages: 0,
      imageFormats: {},
      hostingPlatforms: {},
      cloudProviders: {},
      cdnProviders: {},
      emails: new Set(),
      phones: new Set(),
      socialMedia: { facebook: new Set(), twitter: new Set(), instagram: new Set(), linkedin: new Set(), youtube: new Set() }
    };

    analyses.forEach(site => {
      const imgs = site.imageDetails || {};
      summary.totalImages += imgs.total || 0;
      summary.totalExternalImages += imgs.external || 0;
      summary.totalInternalImages += imgs.internal || 0;
      Object.entries(imgs.formats || {}).forEach(([fmt, count]) => summary.imageFormats[fmt] = (summary.imageFormats[fmt] || 0) + count);

      const hosting = site.serverInfo?.hosting || 'Unknown';
      summary.hostingPlatforms[hosting] = (summary.hostingPlatforms[hosting] || 0) + 1;

      const cloud = site.serverInfo?.cloudProvider || 'Unknown';
      summary.cloudProviders[cloud] = (summary.cloudProviders[cloud] || 0) + 1;

      const cdn = site.serverInfo?.cdn || 'None';
      summary.cdnProviders[cdn] = (summary.cdnProviders[cdn] || 0) + 1;

      (site.contactInfo?.email || []).forEach(e => summary.emails.add(e));
      (site.contactInfo?.phone || []).forEach(p => summary.phones.add(p));

      const sm = site.socialMedia || {};
      Object.keys(summary.socialMedia).forEach(platform => {
        if (sm[platform]) summary.socialMedia[platform].add(sm[platform]);
      });
    });

    summary.emails = [...summary.emails];
    summary.phones = [...summary.phones];
    Object.keys(summary.socialMedia).forEach(k => summary.socialMedia[k] = [...summary.socialMedia[k]]);

    res.json(summary);
  } catch (error) {
    console.error('Summary error:', error.message);
    res.status(500).json({ message: 'Failed to summarize analyses', error: error.message });
  }
};

const exportAnalysesCSV = async (req, res) => {
  try {
    const analyses = await WebsiteAnalysis.find({});
    const fields = ['url', 'title', 'serverInfo.hosting', 'serverInfo.cloudProvider', 'contactInfo.email', 'contactInfo.phone'];
    const parser = new Parser({ fields });
    const csv = parser.parse(analyses);
    res.header('Content-Type', 'text/csv');
    res.attachment('website_analyses.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: 'Failed to export CSV', error: error.message });
  }
};

// ===============================
// 🔹 EXPORT MODULE
// ===============================
module.exports = {
  analyzeWebsite,
  getAnalyses,
  getAllAnalyses,
  getAnalysisById,
  deleteAnalysis,
  summarizeAnalyses,
  exportAnalysesCSV
};