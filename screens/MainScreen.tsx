import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, RefreshControl, Image, TouchableOpacity, TextStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native'; // Import useTheme hook

const MainScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useTranslation(); // Translation hook
  const { colors } = useTheme(); // Access the current theme colors

  const [news, setNews] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&language=en&apiKey=29120241a6c74483b9810245c2818dd2`);
      const data = await response.json();
      setNews(data.articles);
    } catch (error) {
      console.error(error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchNews();
    setRefreshing(false);
  };

  const renderNewsItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Detail', { newsItem: item })}>
      <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        {item.urlToImage ? (
          <Image source={{ uri: item.urlToImage }} style={{ width: 150, height: 150, borderRadius:5 }} />
        ) : (
          <Image source={require('../assets/NotFound.png')} style={{ width: 150, height: 150 , borderRadius:5}} />
        )}
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text }}>{item.title}</Text>
        <Text style={{ color: colors.text }}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
  

  return (
    <View>
      <TextInput
        placeholder={t('Search news...')} // Translate the placeholder text
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={{
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          color: colors.text,
          opacity: 0.6
        }}
        placeholderTextColor={`rgba(${colors.text}, 0.2)`} // Set placeholder text color with opacity
      />

      <FlatList
        data={news.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))}
        renderItem={renderNewsItem}
        keyExtractor={item => item.url}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

export default MainScreen;
