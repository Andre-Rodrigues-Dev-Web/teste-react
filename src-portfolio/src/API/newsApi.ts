import axios from "axios";
import type { News } from "../Entities/News";
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
export const addNews = async (newsBody: {
  author: string;
  title: string;
  content: string;
}) => {
  return (await newsInstance.post("/", newsBody)).data as News;
};
export const deleteNews = async (id: string) => {
  await newsInstance.delete(`/${id}`);
};
