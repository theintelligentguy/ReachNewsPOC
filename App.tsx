import React, { createContext, useState, useContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme, ThemeProvider } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MainScreen from './screens/MainScreen';
import DetailScreen from './screens/DetailScreen';
import SettingsScreen from './screens/SettingsScreen';
import { TouchableOpacity, StyleSheet } from 'react-native';
<<<<<<< HEAD
import DeepLinkHandler from './components/DeepLinkHandler';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './interface/types';
=======
>>>>>>> 5bcb51179daa9d155432ae72830ecb5b72c6bac2

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const DarkModeContext = createContext<{ isDarkMode: boolean; toggleDarkMode: () => void }>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

const useDarkMode = () => useContext(DarkModeContext);

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
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  const theme = isDarkMode ? DarkTheme : DefaultTheme;
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <ThemeProvider value={theme}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Detail"
              component={DetailScreen}
              options={{ headerTitleStyle: styles.screenTitle }}
            />
            <Stack.Screen
              name="DeepLink"
              component={DeepLinkHandler}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
};

// Define your TabNavigator component
const TabNavigator: React.FC = () => {
  const { t } = useTranslation();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
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
          headerRight: () => <ToggleDarkModeButton />,
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
          headerRight: () => <ToggleDarkModeButton />,
        })}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  buttonContainer: { marginRight: 10 },
  icon: { fontSize: 24 },
  screenTitle: { fontSize: 20 },
});

export default App;