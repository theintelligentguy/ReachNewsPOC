export interface NewsItem {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export type RootStackParamList = {
  Home: undefined; // No additional parameters expected for the Home screen
  Detail: { news: NewsItem }; // Detail screen expects a news object as a parameter
};
