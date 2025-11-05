# Website Analyzer - MERN Stack Application

A full-stack web application that analyzes any website and provides detailed information about it. Built with MongoDB, Express.js, React, and Node.js.

## 🔍 Main Features

### Advanced Website Analysis

#### 🌐 Domain & Registration Information
- **Domain Registrar** - Who registered the domain
- **Registration Date** - When the domain was created
- **Expiration Date** - When the domain expires
- **Name Servers** - DNS servers hosting the domain
- **Registrant Details** - Organization and country information
- **Domain Status** - Current status of the domain

#### 🖥️ Server & Hosting Information
- **IP Address** - Server IP address
- **Server Type** - Web server software (Apache, Nginx, etc.)
- **Hosting Provider** - Detected hosting company (GoDaddy, Bluehost, etc.)
- **Cloud Provider** - Cloud platform (AWS, Google Cloud, Azure, etc.)
- **CDN Detection** - Content Delivery Network (Cloudflare, etc.)
- **Server Location** - Geographic location of server

#### 🔒 Security Analysis
- **SSL/HTTPS Status** - Certificate validation
- **SSL Certificate Details** - Issuer, validity period, expiration
- **Security Headers** - HSTS, CSP, X-Frame-Options, etc.
- **Security Issues** - Identified vulnerabilities and warnings
- **SSL Expiration Alert** - Days remaining before certificate expires

#### ⚡ Performance Metrics
- **Load Time** - Page response time
- **Page Size** - Total page weight
- **Compression** - Gzip/Brotli compression status
- **Caching** - Browser caching configuration
- **Page Speed Score** - Overall performance rating

#### 📊 SEO Analysis
- **robots.txt** - Search engine crawling rules
- **Sitemap** - XML sitemap availability
- **Meta Tags** - Title, description, keywords
- **Canonical URL** - Duplicate content prevention
- **Structured Data** - Schema.org markup detection
- **Mobile Responsiveness** - Viewport configuration
- **Heading Structure** - H1, H2, H3 hierarchy

#### 🛠️ Technology Detection
- **Frameworks** - React, Angular, Vue.js, etc.
- **CMS** - WordPress, Drupal, Joomla, etc.
- **Libraries** - jQuery, Bootstrap, etc.
- **Analytics** - Google Analytics, tracking tools

#### 📞 Contact & Lead Information
- **Email Addresses** - Extracted contact emails
- **Phone Numbers** - Found phone numbers
- **Social Media Links** - Facebook, Twitter, Instagram, LinkedIn, YouTube
- **Business Information** - Organization details

#### ⚠️ Issues & Recommendations
- **Critical Issues** - Security vulnerabilities
- **Warnings** - Performance and SEO improvements
- **Informational** - Best practice suggestions
- **Categorized Alerts** - Security, SEO, Performance

### Additional Features
- ✅ User Authentication (Register/Login with JWT)
- ✅ Save Analysis History
- ✅ View Past Analyses
- ✅ Product Management (CRUD Operations)
- ✅ MongoDB Database Integration (localhost)
- ✅ RESTful API
- ✅ Protected Routes
- ✅ Responsive Design

## Tech Stack

**Frontend:**
- React 18
- React Router DOM
- Axios
- Context API for state management

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Axios for HTTP requests
- Cheerio for HTML parsing and web scraping

## Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- MongoDB installed and running on localhost
- npm or yarn package manager

## Installation

1. **Clone the repository or navigate to the project directory**

2. **Install backend dependencies:**
```bash
npm install
```

3. **Install frontend dependencies:**
```bash
cd client
npm install
cd ..
```

4. **Configure environment variables:**
   - The `.env` file is already created with default settings
   - MongoDB URI: `mongodb://localhost:27017/mern_database`
   - Port: `5000`
   - Update JWT_SECRET in production

5. **Make sure MongoDB is running:**
```bash
# On Windows (if MongoDB is installed as a service)
net start MongoDB

# On Mac/Linux
mongod
```

## Running the Application

### Development Mode (Run both frontend and backend concurrently):
```bash
npm run dev
```

### Run backend only:
```bash
npm run server
```

### Run frontend only:
```bash
npm run client
```

### Production Build:
```bash
npm run build
npm start
```

## API Endpoints

### Website Analysis Routes
- `POST /api/websites/analyze` - Analyze a website (Protected)
- `GET /api/websites` - Get user's analyses (Protected)
- `GET /api/websites/all` - Get all analyses (Admin only)
- `GET /api/websites/:id` - Get analysis by ID (Protected)
- `DELETE /api/websites/:id` - Delete analysis (Protected)

### User Routes
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID (Protected)
- `PUT /api/users/:id` - Update user (Protected)
- `DELETE /api/users/:id` - Delete user (Admin only)

### Product Routes
- `GET /api/products` - Get all products (Public)
- `GET /api/products/:id` - Get product by ID (Public)
- `POST /api/products` - Create product (Protected)
- `PUT /api/products/:id` - Update product (Protected)
- `DELETE /api/products/:id` - Delete product (Admin only)

## Application URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Root:** http://localhost:5000/api

## Default User Roles

- `user` - Regular user (can create and update own products)
- `admin` - Administrator (can delete products and manage users)

## Project Structure

```
case_analysyis/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # Context API
│   │   ├── pages/         # Page components
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── controllers/           # Route controllers
├── middleware/           # Custom middleware
├── models/              # Mongoose models
├── routes/              # API routes
├── .env                 # Environment variables
├── server.js           # Express server
└── package.json        # Backend dependencies
```

## Usage

1. **Start the application** using `npm run dev`
2. **Register a new account** at http://localhost:3000/register
3. **Login** with your credentials
4. **Analyze websites:**
   - Click on "🔍 Analyze Website" in the navigation
   - Enter any website URL (e.g., google.com, facebook.com, github.com)
   - Click "Analyze Website" button
   - View comprehensive analysis results
5. **View your analysis history** at "My Analyses"
6. **Click on any analysis** to view full details

### Example URLs to Analyze:
- google.com
- facebook.com
- github.com
- amazon.com
- twitter.com
- Any website you want!

## Notes

- Make sure MongoDB is running before starting the application
- The first registered user will have 'user' role by default
- To create an admin user, manually update the role in MongoDB
- All passwords are hashed using bcryptjs
- JWT tokens expire after 30 days

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running on localhost:27017
- Check if the database name is correct in .env file

**Port Already in Use:**
- Change the PORT in .env file
- Kill the process using the port

**Dependencies Issues:**
- Delete node_modules folders and package-lock.json
- Run `npm install` again

## License

ISC

