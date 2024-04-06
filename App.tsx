import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme, ThemeProvider, useTheme } from '@react-navigation/native';
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
  const { t } = useTranslation(); // Translation hook

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };


  return (
    <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
      <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={TabNavigator}
            options={{
              headerRight: () => (
                <TouchableOpacity onPress={toggleDarkMode} style={styles.buttonContainer}>
                  {isDarkMode ? (
                    <MaterialCommunityIcons name="weather-sunny" style={styles.icon} />
                  ) : (
                    <MaterialCommunityIcons name="weather-night" style={styles.icon} />
                  )}
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen name="Detail" component={DetailScreen} options={{ headerTitleStyle: styles.screenTitle }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="News"
        component={MainScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="newspaper" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
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
    color: 'black', // Default font color
  },
});

export default App;
