import { Alert } from 'react-native';

const BASE_URL = 'https://yourapiurl.com/api';

// Function to add a new transaction
export const addTransaction = async (transactionData) => {
  try {
    const response = await fetch(`${BASE_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization":''
      },
      body: JSON.stringify(transactionData),
    });

    if (!response.ok) {
      throw new Error('Failed to add transaction');
    }

    const data = await response.json();
    return data; // Returns the newly added transaction
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw new Error('Failed to add transaction');
  }
};

// Other API functions can be added here, such as for login, fetching balance, etc.
