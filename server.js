const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
const MONGODB_URI = `${process.env.MONGODB_URI}`.replace('/?', '/todo-app?');

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    // Start the server only after successful database connection
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Todo API is running' });
});

// Todo routes
const todoRoutes = require('./routes/todos');
app.use('/api/todos', todoRoutes); 