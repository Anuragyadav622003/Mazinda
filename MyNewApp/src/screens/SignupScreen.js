import React, { useState } from 'react';
import { View, TextInput, Alert, Text, TouchableOpacity, Pressable, Image, ScrollView } from 'react-native';
import tw from 'twrnc';
import { registerUser } from '../context/AuthApi';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Form validation function
  const validateForm = () => {
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required!');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Invalid email address!');
      return false;
    }
    return true;
  };

  // Handle sign up
  const handleSignUp = async() => {
    if (validateForm()) {
     const response = await registerUser(username, email, password);
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('SignIn');
    }
  };

  return (
    <ScrollView contentContainerStyle={tw`flex-1 justify-center  p-6`}>
      <View style={[tw`w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg`]}>
        {/* Logo Image */}
        <Image
          source={{ uri: 'https://th.bing.com/th/id/OIP.L98tjruc5zICAOjKbGekUgHaHa?rs=1&pid=ImgDetMain' }}
          style={tw`w-40 h-40 mb-6 mx-auto`}
        />
        
        {/* Header Text */}
        <Text style={tw`text-3xl font-bold text-center text-blue-600 mb-8`}>Create new account</Text>
        
        {/* Email Input */}
        <TextInput
          style={tw`border border-gray-300 p-4 rounded-md mb-6 text-lg`}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        
        {/* Username Input */}
        <TextInput
          style={tw`border border-gray-300 p-4 rounded-md mb-6 text-lg`}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        
        {/* Password Input */}
        <TextInput
          style={tw`border border-gray-300 p-4 rounded-md mb-6 text-lg`}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Confirm Password Input */}
        <TextInput
          style={tw`border border-gray-300 p-4 rounded-md mb-6 text-lg`}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        {/* Sign Up Button */}
        <Pressable
          onPress={handleSignUp}
          style={({ pressed }) => [
            tw`bg-blue-500 py-4 rounded-md mb-6`,
            pressed ? tw`bg-blue-400` : tw`bg-blue-500`,
          ]}
        >
          <Text style={tw`text-white text-center text-lg font-semibold`}>Sign Up</Text>
        </Pressable>
        
        {/* Login Text */}
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={tw`text-blue-500 text-center text-lg`}>
            Already have an account? <Text style={tw`font-semibold`}>Log in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;
