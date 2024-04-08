// DeepLinkHandler.tsx

import React, { useEffect } from 'react';
import { Linking, EventSubscription } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DeepLinkHandler = () => {
  const navigation = useNavigation();
  let linkEventListener: EventSubscription | null = null;

  useEffect(() => {
    const handleDeepLink = async (url: string) => {
      const route = url.replace(/.*?:\/\//g, ''); // Extract route from URL

      // Define the screen based on the route
      let screen: string | undefined;
      if (route === 'detail') {
        screen = 'Detail'; // Update screen name for 'detail' route
      }

      // Navigate to the screen if it's a valid screen name
      switch (screen) {
        case 'Detail':
          navigation.navigate('Detail' as never);
          break;
        default:
          break;
      }
    };

    linkEventListener = Linking.addEventListener('url', ({ url }) => handleDeepLink(url));

    return () => {
      if (linkEventListener) {
        linkEventListener.remove();
      }
    };
  }, [navigation]);

  return null;
};

export default DeepLinkHandler;
