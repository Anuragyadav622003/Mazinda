import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import tw from 'twrnc';

// Import your screens
import SignInScreen from '../screens/AuthScreen'; // Import your SignIn screen
import SignUpScreen from '../screens/SignupScreen'; // Import your SignUp screen
import DashboardScreen from '../screens/DashboardScreen'; // Import Dashboard screen
import TransactionScreen from '../screens/AddTransactionScreen'; // Import Transaction screen

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Transaction"
      screenOptions={{
        tabBarActiveTintColor: tw.color('red-500'),
        tabBarInactiveTintColor: tw.color('blue-500'),
        tabBarStyle: tw`bg-white border-t border-gray-300`,
      }}
    >
      
      
      {/* Transaction Tab */}
      <Tab.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name="add-card"
              size={size}
              color={color}
              style={{ fontWeight: focused ? 'bold' : 'normal' }} // Bold when active
            />
          ),
          headerShown: false
        }}
      />
      {/* Dashboard Tab */}
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name="dashboard-customize"
              size={size}
              color={color}
              style={{ fontWeight: focused ? 'bold' : 'normal' }} // Bold when active
            />
          ),
          headerShown: false
        
        }}
      />
    </Tab.Navigator>
  );
};

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
