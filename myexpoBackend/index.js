// src/index.js

import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.js'

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON data

// Use the user routes
app.use('/api/auth', userRoutes);
app.get('/',(req,res)=>res.send("welcome"))

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
