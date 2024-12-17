import axios from "axios";

export const fetchBalance = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user/balance', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
      Alert.alert('Error', 'Failed to fetch balance');
    }
  };

  export const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/transactions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      Alert.alert('Error', 'Failed to fetch transactions');
    }
  };