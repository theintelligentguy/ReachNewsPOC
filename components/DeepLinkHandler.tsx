import React, { useEffect } from 'react';
import { Linking } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../interface/types';

type DeepLinkHandlerProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const DeepLinkHandler: React.FC<DeepLinkHandlerProps> = ({ navigation }) => {
  useEffect(() => {
    const handleDeepLink = (url: string) => {
      const route = url.split('/').pop();
      if (route === 'deeplink') {
        const params = new URLSearchParams(url.split('?')[1]);
        const newsItem = {
          source: { id: null, name: params.get('sourceName') || '' },
          author: params.get('author') || '',
          title: params.get('title') || '',
          description: params.get('description') || '',
          url: params.get('url') || '',
          urlToImage: params.get('urlToImage') || '',
          publishedAt: params.get('publishedAt') || '',
          content: params.get('content') || '',
        };
        navigation.navigate('Detail', { news: newsItem });
      }
    };

    const handleInitialDeepLink = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        handleDeepLink(initialUrl);
      }
    };

    const urlEventHandler = (event: { url: string }) => {
      handleDeepLink(event.url);
    };

    Linking.addEventListener('url', urlEventHandler);

    handleInitialDeepLink();

    // No need to remove event listener

  }, [navigation]); // Ensure navigation is added as a dependency

  return null;
};

export default DeepLinkHandler;
