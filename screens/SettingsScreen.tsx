import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import { changeLanguage } from '../src/i18n'; // Import the changeLanguage function

const SettingsScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'ar' : 'en'; 
    changeLanguage(newLanguage); // Call the changeLanguage function
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
