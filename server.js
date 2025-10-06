require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const setupSwagger = require('./swagger');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mount routes
app.use('/contact', require('./routes/contact'));  // directly mount contacts

// Swagger setup
setupSwagger(app);

// Root route for Render
app.get('/', (req, res) => {
  res.send('API is running! Use /contact to see contacts.');
});

// Optional test route
app.get('/test', (req, res) => {
  res.send('Server is working!');
});

// Start server
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
