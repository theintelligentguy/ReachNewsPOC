import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next'; // Import translation hook
import { useTheme } from '@react-navigation/native'; // Import useTheme hook

const SettingsScreen: React.FC = () => {
  const { t, i18n } = useTranslation(); // Translation hook
  const { colors } = useTheme(); // Access theme colors
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en'; 
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage); // Change language in real-time
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.settingsText, { color: colors.text }]}>{t('Settings')}</Text>
      <Button title={t('Toggle Language')} onPress={toggleLanguage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsText: {
    fontSize: 18,
  },
});

export default SettingsScreen;
