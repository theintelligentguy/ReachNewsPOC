import React, { createContext, useContext, useState } from 'react';
import { Text } from 'react-native'; 

type DarkModeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

type DarkModeProviderProps = {
  children: React.ReactNode;
};

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const value = {
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <DarkModeContext.Provider value={value}>
      <Text>{children}</Text>
    </DarkModeContext.Provider>
  );
};
