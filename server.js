const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected Successfully to localhost');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.error('\n⚠️  MongoDB is not running or not installed!');
    console.error('Please install MongoDB from: https://www.mongodb.com/try/download/community');
    console.error('Or start MongoDB service with: net start MongoDB\n');
    console.error('Server will continue running but database features will not work.\n');
    // Don't exit - let server run for frontend to work
  }
};

connectDB();

// Import Routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const websiteRoutes = require('./routes/websiteRoutes');

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/websites', websiteRoutes);

// Root Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to MERN Stack API' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : {} 
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}`);
});

