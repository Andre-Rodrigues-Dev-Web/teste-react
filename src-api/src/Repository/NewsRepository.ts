import { readFile, writeFile } from "fs/promises";
import { newsFileLocation, unixTimestamp } from "../util";
import sampleNews from "../sampleNews.json";
import { News } from "../Model/News";
import { v4 as uuid } from "uuid";
import { RepositoryError, RepositoryErrorType } from "./RepositoryError";
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
const searchNewsForID = async (
  id: string,
): Promise<{ newsList: News[]; foundNews: News }> => {
  const newsList = await getNews();

  if (newsList.length === 0) {
    throw new RepositoryError(
      `There are no saved News`,
      RepositoryErrorType.Empty,
    );
  }
  let foundNews = newsList.find((news) => news.id === id);
  if (!foundNews) {
    throw new RepositoryError(
      `No news with ID ${id} found`,
      RepositoryErrorType.NotFound,
    );
  }
  return { newsList, foundNews };
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
  const createdAt = unixTimestamp();
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
export const updateNews = async (id: string, newsBody: NewsBody) => {
  let { newsList, foundNews } = await searchNewsForID(id);
  foundNews = { ...foundNews, ...newsBody, updatedAt: unixTimestamp() };
  const updatedNews = [...newsList.filter((news) => news.id !== id), foundNews];
  await saveNews(updatedNews);
  return foundNews;
};

export const deleteNews = async (id: string) => {
  const { newsList } = await searchNewsForID(id);
  let filteredList = newsList.filter((news) => news.id !== id);
  saveNews(filteredList);
};
