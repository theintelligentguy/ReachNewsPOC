// types.ts

export interface Source {
  id: string | null;
  name: string;
}

export interface News {
  source: Source;
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
}

export interface NewsListProps {
  news: News[];
  onPress: (newsId: string) => void;
  theme: any; // You may need to define a proper theme type
}

export interface NewsDetailProps {
  news: News;
}
export type RootStackParamList = {
  Main: undefined;
  Detail: { news: News };
};