const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const { connectDB, sequelize } = require('./config/db');

// Load environment variables
dotenv.config({ path: './.env' }); // Correct path for .env in server.js

// Import Models for Sequelize to recognize them and sync them
const User = require('./models/User');
const Product = require('./models/Product');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Connect Database
connectDB();

// Sync all models (create tables if they don't exist)
// Use { force: true } ONLY FOR DEVELOPMENT if you want to drop and re-create tables on every server start
// For production, use `sequelize.sync()` or migrations.
sequelize.sync({ alter: true }) // 'alter: true' tries to make minimal changes to existing tables
  .then(() => console.log('Database synced successfully'))
  .catch(err => console.error('Error syncing database:', err));


// Middleware
app.use(express.json()); // Body parser for JSON
app.use(cors()); // Enable CORS for all origins (adjust for production)

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Simple root route
app.get('/', (req, res) => {
  res.send('E-commerce API is running...');
});

// Error handling middleware (basic example)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));