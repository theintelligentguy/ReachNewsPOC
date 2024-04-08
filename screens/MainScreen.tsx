import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, RefreshControl, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import { NewsItem } from '../interface/types';

const MainScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [news, setNews] = useState<NewsItem[]>([]);
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

  const renderNewsItem = ({ item }: { item: NewsItem }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Detail', { news: item })}>
      <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        {item.urlToImage ? (
          <Image source={{ uri: item.urlToImage }} style={{ width: 150, height: 150, borderRadius: 5 }} />
        ) : (
          <Image source={require('../assets/NotFound.png')} style={{ width: 150, height: 150, borderRadius: 5 }} />
        )}
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text }}>{item.title}</Text>
        <Text style={{ color: colors.text }}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <TextInput
        placeholder={t('Search news...')}
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={{
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          color: colors.text,
          opacity: 0.6
        }}
        placeholderTextColor={`rgba(${colors.text}, 0.2)`}
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
