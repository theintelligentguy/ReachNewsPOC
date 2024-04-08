import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { NewsItem } from '../interface/types';

const DetailScreen: React.FC<{ route: any }> = ({ route }) => {
  const { news }: { news: NewsItem } = route.params;
  const { colors } = useTheme();

  const typedNewsItem = news as NewsItem;

  return (
    <View style={styles.container}>
      <Image source={{ uri: typedNewsItem.urlToImage || '' }} style={styles.image} />
      <Text style={[styles.title, { color: colors.text }]}>{typedNewsItem.title}</Text>
      <Text style={[styles.description, { color: colors.text }]}>{typedNewsItem.description}</Text>
      <Text style={[styles.text, { color: colors.text }]}><Text style={styles.boldText}>Author:</Text> {typedNewsItem.author}</Text>
      <Text style={[styles.text, { color: colors.text }]}><Text style={styles.boldText}>Date:</Text> {typedNewsItem.publishedAt}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    marginTop: 5,
  },
  text: {
    marginTop: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default DetailScreen;
