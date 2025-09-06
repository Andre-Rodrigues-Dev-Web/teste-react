export interface News {
  id: string;
  title: string;
  author: { id: string; name: string };
  createdAt: number;
  updatedAt?: number;
  content: string;
}
