import axios from "axios";
import type { News } from "../Entities/News";
interface NewsBody {
  title: string;
  content: string;
}
const newsInstance = axios.create({
  baseURL: "http://localhost:8000/news",
  responseType: "json",
});
export const getAllNews = async (): Promise<News[]> => {
  const response = await newsInstance.get("/");
  return response.data as News[];
};
export const getNews = async (id: string): Promise<News> => {
  const response = await newsInstance.get(`/${id}`);
  return response.data as News;
};
export const addNews = async (newsBody: NewsBody, token: string) => {
  return (
    await newsInstance.post("/", newsBody, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data as News;
};
export const deleteNews = async (id: string, token: string) => {
  await newsInstance.delete(`/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const updateNews = async (
  id: string,
  newsBody: NewsBody,
  token: string,
) => {
  await newsInstance.put(`/${id}`, newsBody, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
