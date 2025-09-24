require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mount routes
app.use('/', require('./routes'));  // index.js mounts /contacts

// Optional test route to verify server is running
app.get('/test', (req, res) => {
  res.send('Server is working!');
});

// Start server
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
