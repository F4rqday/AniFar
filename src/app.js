const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Importing route 
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const anilistRoutes = require('./routes/anilistRoutes')

// Using routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/resource', resourceRoutes);   
app.use('/api/anilist', anilistRoutes)

// Health check endpoint
app.get('/health', (req, res) => {res.json({ status:'ok'})});

module.exports = app;