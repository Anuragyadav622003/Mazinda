import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { Card } from 'react-native-paper';
import tw from 'twrnc';
import { fetchBalance, fetchTransactions } from '../context/DashboardApi';

const DashboardScreen = ({ navigation }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch wallet balance and transactions from API
    setBalance(5000); // Example balance
    setTransactions([
      { id: '1', type: 'receive', category: 'Salary', amount: 1000, date: '2024-12-01' },
      { id: '2', type: 'send', category: 'Food', amount: -200, date: '2024-12-02' },
      { id: '3', type: 'receive', category: 'Salary', amount: 1000, date: '2024-12-01' },
      { id: '4', type: 'send', category: 'Food', amount: -200, date: '2024-12-02' },
      { id: '5', type: 'receive', category: 'Salary', amount: 1000, date: '2024-12-03' },
      { id: '6', type: 'send', category: 'Food', amount: -200, date: '2024-12-04' },
      { id: '7', type: 'receive', category: 'Salary', amount: 1000, date: '2024-12-05' },
      { id: '8', type: 'send', category: 'Food', amount: -200, date: '2024-12-06' },
    ]);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch balance and transactions
        const fetchbalanceData = await fetchBalance();
        setBalance(fetchbalanceData);

        const fetchTransData = await fetchTransactions();
        setTransactions(fetchTransData);
      } catch (error) {
        // Handle any error that occurs during fetching
        console.error('Error fetching data:', error);
        // Optionally, set an error state or show a user-friendly message
      }
    };

    // Call fetchData when the component mounts
    fetchData();
  }, []);


  // Function to format currency
  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString()}`;
  };

  const renderTransaction = ({ item }) => (
    <Card style={tw`mb-4 p-4 shadow-md`}>
      <Text style={tw`text-xl font-semibold`}>{item.category}</Text>
      <Text style={tw`text-lg ${item.type === 'receive' ? 'text-green-600' : 'text-red-600'}`}>
        {item.type === 'receive' ? `+ ${formatCurrency(item.amount)}` : `- ${formatCurrency(Math.abs(item.amount))}`}
      </Text>
      <Text style={tw`text-sm text-gray-600`}>{item.date}</Text>
    </Card>
  );

  return (
    <View style={tw`flex-1 p-6`}>
      {/* Logo Image (Optional) */}
      <Image
        source={{ uri: 'https://th.bing.com/th/id/OIP.L98tjruc5zICAOjKbGekUgHaHa?rs=1&pid=ImgDetMain' }}
        style={tw`w-40 h-40 mb-4 mx-auto`}
      />
      
      {/* Wallet Balance */}
      <Text style={tw`text-3xl font-bold text-center mb-6`}>Wallet Balance</Text>
      <Text style={tw`text-4xl font-bold text-center text-blue-600 mb-8`}>
        {formatCurrency(balance)}
      </Text>
      
      {/* Add Transaction Button */}
      <TouchableOpacity
        style={tw`bg-blue-500 py-3 rounded-md mb-6`}
        onPress={() => navigation.navigate('AddTransaction')}
      >
        <Text style={tw`text-white text-center text-lg font-semibold`}>Add Transaction</Text>
      </TouchableOpacity>

      {/* Transaction List */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={renderTransaction}
        contentContainerStyle={tw`pb-12`} // Optional padding at the bottom
        showsVerticalScrollIndicator={false} // Ensure vertical scroll indicator is visible
      />
    </View>
  );
};

export default DashboardScreen;
