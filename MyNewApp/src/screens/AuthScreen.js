import React, { useState } from 'react';
import { View, TextInput, Alert, Text, TouchableOpacity, Image, Pressable, Platform, ScrollView } from 'react-native';
import tw from 'twrnc';
import { loginUser } from '../context/AuthApi';

const AuthScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
     const response = await loginUser(email, password);
     
      Alert.alert('Login Successful', `Welcome, ${email}!`);
      navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid credentials. Please try again.');
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
        <Text style={tw`text-3xl font-bold text-center text-blue-600 mb-8`}>Welcome Back!</Text>
        
        {/* Email Input */}
        <TextInput
          style={tw`border border-gray-300 p-4 rounded-md mb-6 text-lg`}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        
        {/* Password Input */}
        <TextInput
          style={tw`border border-gray-300 p-4 rounded-md mb-6 text-lg`}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Login Button */}
        <Pressable
          onPress={handleLogin}
          style={({ pressed }) => [
            tw`bg-blue-500 py-4 rounded-md mb-6`,
            pressed ? tw`bg-blue-400` : tw`bg-blue-500`,
          ]}
        >
          <Text style={tw`text-white text-center text-lg font-semibold`}>Log In</Text>
        </Pressable>
        
        {/* Sign Up Text */}
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={tw`text-blue-500 text-center text-lg`}>
            Don't have an account? <Text style={tw`font-semibold`}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AuthScreen;
