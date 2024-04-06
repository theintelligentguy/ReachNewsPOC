// App.tsx

import React, { useState, useEffect } from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './screens/MainScreen';
import DetailScreen from './screens/DetailScreen';
import SettingsScreen from './screens/SettingsScreen'; // Add Settings screen
import { useTranslation } from 'react-i18next'; // Import translation hook
import './src/i18n';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  const { t } = useTranslation(); // Translation hook

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="News" component={MainScreen} options={{ tabBarLabel: t('News') }} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: t('Settings') }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
