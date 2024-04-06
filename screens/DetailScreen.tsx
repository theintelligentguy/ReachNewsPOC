// DetailScreen.tsx

import React from 'react';
import { View, Text, Image } from 'react-native';

const DetailScreen: React.FC<{ route: any }> = ({ route }) => {
  const { newsItem } = route.params;

  return (
    <View style={{ padding: 10 }}>
      <Image source={{ uri: newsItem.urlToImage }} style={{ width: '100%', height: 200 }} />
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>{newsItem.title}</Text>
      <Text style={{ marginTop: 5 }}>{newsItem.description}</Text>
      <Text style={{ marginTop: 10 }}>Author: {newsItem.author}</Text>
      <Text>Date: {newsItem.publishedAt}</Text>
    </View>
  );
};

export default DetailScreen;
