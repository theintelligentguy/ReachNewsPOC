import React, { createContext, useState, useContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme, ThemeProvider } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Add this import
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MainScreen from './screens/MainScreen';
import DetailScreen from './screens/DetailScreen';
import SettingsScreen from './screens/SettingsScreen';
import { TouchableOpacity, StyleSheet } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(); // Create the bottom tab navigator

// Define the context for dark mode
const DarkModeContext = createContext<{ isDarkMode: boolean; toggleDarkMode: () => void }>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

// Custom hook to use the dark mode context
const useDarkMode = () => useContext(DarkModeContext);

// Component for toggling dark mode
const ToggleDarkModeButton: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <TouchableOpacity onPress={toggleDarkMode} style={styles.buttonContainer}>
      <MaterialCommunityIcons
        name={isDarkMode ? 'weather-sunny' : 'weather-night'}
        style={[styles.icon, { color: isDarkMode ? 'white' : 'black' }]}
      />
    </TouchableOpacity>
  );
};

const App: React.FC = () => {
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle function for dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Set the theme based on dark mode state
  const theme = isDarkMode ? DarkTheme : DefaultTheme;

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <ThemeProvider value={theme}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={TabNavigator} // Use the TabNavigator component here
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="Detail" component={DetailScreen} options={{ headerTitleStyle: styles.screenTitle}} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
};

const TabNavigator: React.FC = () => {
  const { t } = useTranslation();
  const { isDarkMode, toggleDarkMode } = useDarkMode(); // Use the useDarkMode hook to access dark mode state and toggle function

  return (
    <Tab.Navigator>
      <Tab.Screen
        name={t('News')}
        component={MainScreen}
        options={({ navigation }) => ({
          tabBarLabel: t('News'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="newspaper" color={color} size={size} />
          ),
          headerRight: () => (
            <ToggleDarkModeButton /> // Add the dark mode toggle button to the header of the News tab
          ),
        })}
      />
      <Tab.Screen
        name={t('Settings')}
        component={SettingsScreen}
        options={({ navigation }) => ({
          tabBarLabel: t('Settings'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
          headerRight: () => (
            <ToggleDarkModeButton /> // Add the dark mode toggle button to the header of the Settings tab
          ),
        })}
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
  },
});

export default App;
