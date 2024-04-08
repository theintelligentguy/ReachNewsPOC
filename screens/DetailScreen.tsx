import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native'; // Import useTheme hook

const DetailScreen: React.FC<{ route: any }> = ({ route }) => {
  const { newsItem } = route.params;
  const { colors } = useTheme(); // Access theme colors

  return (
    <View style={styles.container}>
      <Image source={{ uri: newsItem.urlToImage }} style={styles.image} />
      
      <Text style={[styles.title, { color: colors.text }]}>{newsItem.title}</Text>
      <Text style={[styles.description, { color: colors.text }]}>{newsItem.description}</Text>
      <Text style={[styles.text, { color: colors.text }]}><Text style={styles.boldText}>Author:</Text> {newsItem.author}</Text>
            <Text style={[styles.text, { color: colors.text }]}><Text style={styles.boldText}>Date:</Text> {newsItem.publishedAt}</Text>
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
