// App.tsx

import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme, ThemeProvider } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './screens/MainScreen';
import DetailScreen from './screens/DetailScreen';
import SettingsScreen from './screens/SettingsScreen';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import './src/i18n';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { t } = useTranslation();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = isDarkMode ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider value={theme}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={TabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Detail" component={DetailScreen} options={{ headerTitleStyle: styles.screenTitle }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

const TabNavigator: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name={t('News')}
        component={MainScreen}
        options={{
          tabBarLabel: t('News'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="newspaper" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={t('Settings')}
        component={SettingsScreen}
        options={{
          tabBarLabel: t('Settings'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginRight: 10,
  },
  icon: {
    fontSize: 24,
  },
  screenTitle: {
    fontSize: 20,
    color: 'black',
  },
});

export default App;
