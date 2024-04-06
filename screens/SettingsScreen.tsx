import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useTranslation } from 'react-i18next'; // Import translation hook

const SettingsScreen: React.FC = () => {
  const { t, i18n } = useTranslation(); // Translation hook
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en'; 
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage); // Change language in real-time
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{t('Settings')}</Text>
      <Button title={t('Toggle Language')} onPress={toggleLanguage} />
    </View>
  );
};

export default SettingsScreen;
