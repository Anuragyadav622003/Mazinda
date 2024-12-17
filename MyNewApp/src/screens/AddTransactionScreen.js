import React, { useState } from 'react';
import { View, TextInput, Alert, Text, ScrollView, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import tw from 'twrnc';

// Get screen width to determine tablet or phone
const { width } = Dimensions.get('window');
const isTablet = width > 600;

const AddTransactionScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('send');
  const [category, setCategory] = useState('Food');
  const categories = ['Savings', 'Food', 'Salary', 'Shopping'];

  const handleAddTransaction = () => {
    // Call backend API to add the transaction
    Alert.alert('Success', 'Transaction added!');
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={tw`flex-1 justify-center  p-6`}>
      {/* Header */}
      <Text style={tw`text-3xl font-bold text-center text-blue-600 mb-6`}>Add Transaction</Text>

      {/* Card-like Container */}
      <View style={[
        tw`bg-white rounded-lg shadow-lg p-6`,
        isTablet ? tw`w-3/4 mx-auto` : tw`w-full`
      ]}>
        {/* Amount Input */}
        <TextInput
          style={[
            tw`border border-gray-300 p-4 rounded-lg mb-6 text-xl`,
            isTablet ? tw`w-full` : tw`w-full`
          ]}
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        {/* Transaction Type Picker */}
        <View style={tw`mb-6`}>
          <Text style={tw`font-semibold text-lg text-gray-800 mb-2`}>Transaction Type</Text>
          <Picker
            selectedValue={type}
            onValueChange={(val) => setType(val)}
            style={tw`border border-gray-300 p-3 rounded-lg`}
          >
            <Picker.Item label="Send" value="send" />
            <Picker.Item label="Receive" value="receive" />
          </Picker>
        </View>

        {/* Category Picker */}
        <View style={tw`mb-6`}>
          <Text style={tw`font-semibold text-lg text-gray-800 mb-2`}>Category</Text>
          <Picker
            selectedValue={category}
            onValueChange={(val) => setCategory(val)}
            style={tw`border border-gray-300 p-3 rounded-lg`}
          >
            {categories.map((cat) => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>
        </View>

        {/* Add Transaction Button */}
        <TouchableOpacity
          style={[
            tw`bg-blue-500 py-4 rounded-lg mb-4`,
            isTablet ? tw`w-full` : tw`w-full`
          ]}
          onPress={handleAddTransaction}
        >
          <Text style={tw`text-white text-center text-lg font-semibold`}>Add Transaction</Text>
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity
          style={[
            tw`bg-red-500 py-4 rounded-lg`,
            isTablet ? tw`w-full` : tw`w-full`
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text style={tw`text-white text-center text-lg font-semibold`}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddTransactionScreen;
