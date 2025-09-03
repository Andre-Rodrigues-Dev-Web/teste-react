import { readFile, writeFile } from "fs/promises";
import { newsFileLocation } from "../util";
import sampleNews from "../sampleNews.json";
import { News } from "../Model/News";
import { v4 as uuid } from "uuid";
const newsPath = newsFileLocation();

interface NewsBody {
  title: string;
  author: string;
  content: string;
}
const saveNews = async (news: News[]) => {
  news.sort((a, b) => a.createdAt - b.createdAt);
  let newsJsonString = JSON.stringify(news);
  await writeFile(newsPath, newsJsonString, {
    encoding: "utf8",
  });
};
export const createSampleNews = async () => {
  await saveNews(sampleNews as News[]);
};
export const getNews = async () => {
  let news: News[];
  try {
    const newsFile = await readFile(newsPath, { encoding: "utf-8" });
    news = JSON.parse(newsFile) as News[];
  } catch (e) {
    const readError = e as NodeJS.ErrnoException;
    if (readError.code && readError.code === "ENOENT") {
      news = [];
    } else {
      throw e;
    }
  }
  return news;
};

export const addNews = async (news: NewsBody) => {
  const id = uuid();
  const createdAt = Math.floor(new Date().getTime() / 1000);
  const savedNews: News = {
    id,
    createdAt,
    content: news.content,
    title: news.title,
    author: news.author,
  };
  const newsList = [...(await getNews()), savedNews];
  await saveNews(newsList);
  return savedNews;
};
