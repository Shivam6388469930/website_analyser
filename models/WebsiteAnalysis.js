// // const mongoose = require('mongoose');

// // const websiteAnalysisSchema = new mongoose.Schema({
// //   // Basic Info
// //   url: {
// //     type: String,
// //     required: [true, 'Please provide a URL'],
// //     trim: true
// //   },
// //   title: { type: String, default: '' },
// //   description: { type: String, default: '' },
// //   keywords: { type: String, default: '' },
// //   author: { type: String, default: '' },

// //   // Open Graph Meta
// //   ogTitle: { type: String, default: '' },
// //   ogDescription: { type: String, default: '' },
// //   ogImage: { type: String, default: '' },

// //   // Favicon
// //   favicon: { type: String, default: '' },

// //   // Links & Images
// //   links: [String],
// //   images: [
// //     {
// //       src: String,
// //       alt: String,
// //       width: String,
// //       height: String
// //     }
// //   ],

// //   imageDetails: {
// //     total: { type: Number, default: 0 },
// //     withAlt: { type: Number, default: 0 },
// //     withoutAlt: { type: Number, default: 0 },
// //     external: { type: Number, default: 0 },
// //     internal: { type: Number, default: 0 },
// //     formats: {
// //       type: Map,
// //       of: Number,
// //       default: {}
// //     }
// //   },

// //   // Headings
// //   headings: {
// //     h1: [String],
// //     h2: [String],
// //     h3: [String],
    
// //   },
// //   paragrphs:{    
// //     p:[String]
// //   },

// //   technologies: [String],

// //   // Server & Response Info
// //   responseTime: { type: Number, default: 0 },
// //   statusCode: { type: Number, default: 0 },

// //   // Domain & Registration Info
// //   domainInfo: {
// //     registrar: String,
// //     registrationDate: String,
// //     expirationDate: String,
// //     updatedDate: String,
// //     nameServers: [String],
// //     registrantCountry: String,
// //     registrantOrg: String,
// //     status: [String]
// //   },

// //   // Hosting & Server Info
// //   serverInfo: {
// //     ipAddress: String,
// //     serverType: String,
// //     hosting: String,
// //     location: String,
// //     cloudProvider: String,
// //     cdn: String
// //   },

// //   // Security Info
// //   security: {
// //     hasSSL: Boolean,
// //     sslIssuer: String,
// //     sslValidFrom: String,
// //     sslValidTo: String,
// //     sslDaysRemaining: Number,
// //     hasHTTPS: Boolean,
// //     securityHeaders: {
// //       strictTransportSecurity: Boolean,
// //       contentSecurityPolicy: Boolean,
// //       xFrameOptions: Boolean,
// //       xContentTypeOptions: Boolean,
// //       xXSSProtection: Boolean
// //     },
// //     mixedContent: Boolean,
// //     insecureForms: Boolean
// //   },

// //   // Performance & SEO
// //   performance: {
// //     loadTime: Number,
// //     pageSize: Number,
// //     numberOfRequests: Number,
// //     compressionEnabled: Boolean,
// //     cacheEnabled: Boolean
// //   },

// //   seo: {
// //     hasRobotsTxt: Boolean,
// //     hasSitemap: Boolean,
// //     metaRobotsIndex: Boolean,
// //     canonicalUrl: String,
// //     structuredData: Boolean,
// //     mobileResponsive: Boolean,
// //     pageSpeed: String
// //   },

// //   // Issues
// //   issues: [
// //     {
// //       type: {
// //         type: String,
// //         enum: ['critical', 'warning', 'info']
// //       },
// //       category: String,
// //       message: String
// //     }
// //   ],

// //   // Social Media
// //   socialMedia: {
// //     facebook: String,
// //     twitter: String,
// //     instagram: String,
// //     linkedin: String,
// //     youtube: String
// //   },

// //   // Contact Info
// //   contactInfo: {
// //     email: [String],
// //     phone: [String],
// //     address: String
// //   },

// //   analyzedBy: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'User',
// //     required: true
// //   },

// //   createdAt: {
// //     type: Date,
// //     default: Date.now
// //   }
// // });

// // // Optional: Add index for faster searching by URL
// // websiteAnalysisSchema.index({ url: 1 });

// // // Optional: Automatically remove empty fields on save
// // websiteAnalysisSchema.set('toJSON', {
// //   transform: (_, ret) => {
// //     Object.keys(ret).forEach(key => {
// //       if (ret[key] === null || ret[key] === undefined || ret[key] === '') {
// //         delete ret[key];
// //       }
// //     });
// //     return ret;
// //   }
// // });

// // module.exports = mongoose.model('WebsiteAnalysis', websiteAnalysisSchema);


// // models/WebsiteAnalysis.js
// const mongoose = require('mongoose');

// const websiteAnalysisSchema = new mongoose.Schema({
//   url: { type: String, required: true },
//   title: String,
//   description: String,
//   keywords: String,
//   author: String,
//   favicon: String,
  
//   // Links
//   links: [String],
  
//   // UPDATED: Complete image data
//   images: [{
//     src: String,
//     alt: String,
//     type: String // 'standard', 'lazy', 'css', 'picture', 'svg'
//   }],
//   imageDetails: {
//     total: Number,
//     withAlt: Number,
//     withoutAlt: Number,
//     external: Number,
//     internal: Number,
//     formats: mongoose.Schema.Types.Mixed,
//     lazyLoaded: Number,
//     cssBackgrounds: Number,
//     pictureElements: Number
//   },
  
//   // NEW: Complete paragraph data
//   paragraphs: [{
//     text: String,
//     wordCount: Number,
//     charCount: Number
//   }],
//   paragraphDetails: {
//     total: Number,
//     totalWords: Number,
//     totalChars: Number,
//     averageWordCount: Number,
//     averageCharCount: Number,
//     longestParagraph: Number,
//     shortestParagraph: Number
//   },
  
//   // NEW: External resources
//   externalResources: {
//     scripts: [{
//       url: String,
//       cdn: String,
//       async: Boolean,
//       defer: Boolean
//     }],
//     stylesheets: [{
//       url: String,
//       cdn: String,
//       media: String
//     }],
//     fonts: [{
//       url: String,
//       cdn: String
//     }],
//     videos: [{
//       url: String,
//       type: String
//     }],
//     iframes: [{
//       url: String,
//       width: String,
//       height: String
//     }],
//     apis: [String]
//   },
//   externalResourceDetails: {
//     totalExternal: Number,
//     scriptCount: Number,
//     stylesheetCount: Number,
//     fontCount: Number,
//     videoCount: Number,
//     iframeCount: Number,
//     cdnProviders: mongoose.Schema.Types.Mixed
//   },
  
//   // Headings
//   headings: {
//     h1: [String],
//     h2: [String],
//     h3: [String]
//   },
  
//   // Technologies
//   technologies: [String],
  
//   // Performance
//   responseTime: Number,
//   statusCode: Number,
  
//   // NEW: HTTP Response Headers
//   httpHeaders: {
//     server: String,
//     contentType: String,
//     contentLength: String,
//     connection: String,
//     cacheControl: String,
//     etag: String,
//     vary: String,
//     xPoweredBy: String,
//     xNextjsCache: String,
//     xNextjsPrerender: String,
//     xNextjsStaleTime: String,
//     date: String,
//     contentEncoding: String,
//     transferEncoding: String,
//     setCookie: [String],
//     allHeaders: mongoose.Schema.Types.Mixed // Stores all headers
//   },
  
//   // Domain Info
//   domainInfo: {
//     registrar: String,
//     registrationDate: String,
//     expirationDate: String,
//     updatedDate: String,
//     nameServers: [String],
//     registrantCountry: String,
//     registrantOrg: String,
//     status: [String]
//   },
  
//   // Server Info
//   serverInfo: {
//     ipAddress: String,
//     serverType: String,
//     hosting: String,
//     cloudProvider: String,
//     cdn: String
//   },
  
//   // Security
//   security: {
//     hasSSL: Boolean,
//     sslIssuer: String,
//     sslValidFrom: String,
//     sslValidTo: String,
//     sslDaysRemaining: Number,
//     securityHeaders: {
//       strictTransportSecurity: Boolean,
//       contentSecurityPolicy: Boolean,
//       xFrameOptions: Boolean,
//       xContentTypeOptions: Boolean,
//       xXSSProtection: Boolean
//     }
//   },
  
//   // SEO
//   seo: {
//     hasRobotsTxt: Boolean,
//     hasSitemap: Boolean,
//     canonicalUrl: String
//   },
  
//   // Social Media
//   socialMedia: {
//     facebook: String,
//     twitter: String,
//     instagram: String,
//     linkedin: String,
//     youtube: String
//   },
  
//   // Contact Info
//   contactInfo: {
//     email: [String],
//     phone: [String]
//   },
  
//   // Issues
//   issues: [{
//     type: String, // 'critical', 'warning', 'info'
//     category: String,
//     message: String
//   }],
  
//   // Meta
//   analyzedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   }
// }, {
//   timestamps: true
// });

// // Index for faster queries
// websiteAnalysisSchema.index({ url: 1 });
// websiteAnalysisSchema.index({ analyzedBy: 1 });
// websiteAnalysisSchema.index({ createdAt: -1 });

// module.exports = mongoose.model('WebsiteAnalysis', websiteAnalysisSchema);


// models/WebsiteAnalysis.js

const mongoose = require('mongoose');

const websiteAnalysisSchema = new mongoose.Schema({
  // Basic Info
  url: { type: String, required: true, trim: true, lowercase: true },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  keywords: { type: String, default: '' },
  author: { type: String, default: '' },
  favicon: { type: String, default: '' },

  // Links
  links: [{ type: String }],

  // Images (Complete Details)
  images: [{
    src: { type: String, required: true },
    alt: { type: String, default: '' },
    type: { type: String, enum: ['standard', 'lazy', 'css', 'picture', 'svg'], default: 'standard' }
  }],
  imageDetails: {
    total: { type: Number, default: 0 },
    withAlt: { type: Number, default: 0 },
    withoutAlt: { type: Number, default: 0 },
    external: { type: Number, default: 0 },
    internal: { type: Number, default: 0 },
    formats: { type: Map, of: Number, default: {} },
    lazyLoaded: { type: Number, default: 0 },
    cssBackgrounds: { type: Number, default: 0 },
    pictureElements: { type: Number, default: 0 }
  },

  // Paragraphs
  paragraphs: [{
    text: String,
    wordCount: Number,
    charCount: Number
  }],
  paragraphDetails: {
    total: { type: Number, default: 0 },
    totalWords: { type: Number, default: 0 },
    totalChars: { type: Number, default: 0 },
    averageWordCount: { type: Number, default: 0 },
    averageCharCount: { type: Number, default: 0 },
    longestParagraph: { type: Number, default: 0 },
    shortestParagraph: { type: Number, default: 0 }
  },

  // External Resources
  externalResources: {
    scripts: [{
      url: String,
      cdn: String,
      async: Boolean,
      defer: Boolean
    }],
    stylesheets: [{
      url: String,
      cdn: String,
      media: String
    }],
    fonts: [{
      url: String,
      cdn: String
    }],
    videos: [{
      url: String,
      type: String
    }],
    iframes: [{
      url: String,
      width: String,
      height: String
    }],
    apis: [String]
  },
  externalResourceDetails: {
    totalExternal: { type: Number, default: 0 },
    scriptCount: { type: Number, default: 0 },
    stylesheetCount: { type: Number, default: 0 },
    fontCount: { type: Number, default: 0 },
    videoCount: { type: Number, default: 0 },
    iframeCount: { type: Number, default: 0 },
    cdnProviders: { type: Map, of: Number, default: {} }
  },

  // Headings
  headings: {
    h1: [String],
    h2: [String],
    h3: [String]
  },

  // Technologies
  technologies: [String],

  // Performance
  responseTime: { type: Number, default: 0 },
  statusCode: { type: Number, default: 0 },

  // HTTP Headers
  httpHeaders: {
    server: String,
    contentType: String,
    contentLength: String,
    connection: String,
    cacheControl: String,
    etag: String,
    vary: String,
    xPoweredBy: String,
    date: String,
    contentEncoding: String,
    transferEncoding: String,
    setCookie: [String],
    allHeaders: mongoose.Schema.Types.Mixed
  },

  // Domain Info
  domainInfo: {
    registrar: String,
    registrationDate: String,
    expirationDate: String,
    updatedDate: String,
    nameServers: [String],
    registrantCountry: String,
    registrantOrg: String,
    status: [String]
  },

  // Server Info
  serverInfo: {
    ipAddress: String,
    serverType: String,
    hosting: String,
    cloudProvider: String,
    cdn: String
  },

  // Security
  security: {
    hasSSL: { type: Boolean, default: false },
    sslIssuer: String,
    sslValidFrom: String,
    sslValidTo: String,
    sslDaysRemaining: Number,
    securityHeaders: {
      strictTransportSecurity: Boolean,
      contentSecurityPolicy: Boolean,
      xFrameOptions: Boolean,
      xContentTypeOptions: Boolean,
      xXSSProtection: Boolean
    }
  },

  // SEO
  seo: {
    hasRobotsTxt: Boolean,
    hasSitemap: Boolean,
    canonicalUrl: String
  },

  // Social Media
  socialMedia: {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String,
    youtube: String
  },

  // Contact Info
  contactInfo: {
    email: [String],
    phone: [String]
  },

  // Issues
  issues: [{
    type: { type: String, enum: ['critical', 'warning', 'info'] },
    category: String,
    message: String
  }],

  // Analyzer
  analyzedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

}, { timestamps: true });

// Indexes
websiteAnalysisSchema.index({ url: 1 });
websiteAnalysisSchema.index({ analyzedBy: 1 });
websiteAnalysisSchema.index({ createdAt: -1 });

// Remove empty fields before sending JSON
websiteAnalysisSchema.set('toJSON', {
  transform: (_, ret) => {
    Object.keys(ret).forEach(key => {
      if (ret[key] === null || ret[key] === undefined || ret[key] === '') {
        delete ret[key];
      }
    });
    return ret;
  }
});

module.exports = mongoose.model('WebsiteAnalysis', websiteAnalysisSchema);
