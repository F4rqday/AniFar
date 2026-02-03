const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status:'ok'})
});

module.exports = app;