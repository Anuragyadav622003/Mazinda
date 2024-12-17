import React,{useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './src/navigations/BottomNavigationScreen';
import { TabNavigator } from './src/navigations/BottomNavigationScreen';


export default function App() {
  // Simulate authentication state (replace with real authentication logic)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Replace the isAuthenticated value with the actual check from your auth logic
  useEffect(() => {
    // You can check authentication status here
    // For now, we assume the user is authenticated after 3 seconds
    setTimeout(() => setIsAuthenticated(true), 3000);
  }, []);

  return (
    <NavigationContainer>
      {!isAuthenticated ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}

