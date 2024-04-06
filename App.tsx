import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import DetailScreen from './screens/DetailScreen';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
     
      </Stack.Navigator>
      <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
         <Button title={isDarkMode ? 'Light Mode' : 'Dark Mode'} onPress={toggleDarkMode} />
       </View>
      </NavigationContainer>
     
  );
}

export default App;
