// src/index.js

import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.js';

import dotenv from 'dotenv';
const app = express();

dotenv.config(); // Load environment variables from .env file
// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON data

// Use the user routes
app.use('/api/user', userRoutes);

app.get('/',(req,res)=>res.send("welcome"))

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
