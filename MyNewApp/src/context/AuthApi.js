// services/AuthService.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_URL = 'http://localhost:5000/api'; // Update with your backend URL

export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/create-user`, {
      username,
      email,
      password,
    });
    return response.data.token;
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error('Registration failed');
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    const token = response.data.token; // Assume the response contains a JWT token
  await AsyncStorage.setItem('authToken', token); // Store token securely
  return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Login failed');
  }
};
