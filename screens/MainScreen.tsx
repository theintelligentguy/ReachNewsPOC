// MainScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, RefreshControl, Image, TouchableOpacity } from 'react-native';

const MainScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [news, setNews] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=29120241a6c74483b9810245c2818dd2`);
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
        <Image source={{ uri: item.urlToImage }} style={{ width: 100, height: 100 }} />
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <TextInput
        placeholder="Search news..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
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
