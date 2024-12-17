// src/routes/userRoutes.js

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/prismaClient.js';  // Import the Prisma client
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const router = express.Router();

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Set expiration to 1 hour
};

// Route to create a new user (register)
router.post('/create-user', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if all required fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are requireddddddd' });
  }

  try {
    // Check if the user already exists by email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Exclude the password from the response and send the user details
    const { password: _, ...userWithoutPassword } = user;

    // Generate JWT token for the user
    const token = generateToken(user.id);

    res.status(201).json({
      user: userWithoutPassword,  // Send back user data without the password
      token,  // Send back JWT token
    });
  } catch (error) {
    console.error('Error creating user:', error);

    // Handle unique constraint violation error (P2002)
    if (error.code === 'P2002') {
      return res.status(400).json({
        error: 'Unique constraint failed. Email might already exist.',
      });
    }

    // Handle other errors
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Route to login a user and generate JWT token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the entered password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Exclude the password from the response and send the user details
    const { password: _, ...userWithoutPassword } = user;

    // Generate JWT token
    const token = generateToken(user.id);

    res.status(200).json({
      user: userWithoutPassword,  // Send back user data without the password
      token,  // Send back JWT token
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Route to get all users (example)
router.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
});


// Route for Wallet Section
router.post("/wallet", async (req, res) => {
  const { userId, balance } = req.body;

  try {
    // Ensure the user exists in the User model
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user already has a wallet
    const existingWallet = await prisma.wallet.findUnique({
      where: { userId: userId },
    });

    if (existingWallet) {
      return res.status(400).json({ error: "Duplicate wallet not allowed for this user" });
    }

    // Create the wallet and link it to the user
    const wallet = await prisma.wallet.create({
      data: {
        userId, // Reference to the User's ID
        balance: balance || 0.0,
      },
      include: {
        user: true, // Optional: Include the user data in the response
      },
    });

    res.status(201).json(wallet);
  } catch (error) {
    console.error("Error creating wallet:", error);
    res.status(500).json({ error: "Failed to create wallet" });
  }
});


// Route for creating a transaction
router.post("/transaction", async (req, res) => {
  const { walletId, amount, type, category } = req.body;

  try {
    // Ensure that the wallet exists
    const wallet = await prisma.wallet.findUnique({
      where: { id: walletId },
    });

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    // Create the transaction
    const transaction = await prisma.transaction.create({
      data: {
        walletId,
        amount,
        type,       // "send" or "receive"
        category,   // Transaction category (e.g., "payment", "deposit", etc.)
      },
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "Failed to create transaction" });
  }
});
export default router;
