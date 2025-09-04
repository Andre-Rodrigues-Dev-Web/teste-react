import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { News } from "../../Entities/News";
import { getNews } from "../../API/newsApi";
import { AxiosError } from "axios";
import dayjs from "dayjs";

import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/pt-br";
dayjs.extend(localizedFormat);
export const SingleNews = () => {
  const { id } = useParams();
  const [news, setNews] = useState<News | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>();
  useEffect(() => {
    const loadNews = async () => {
      if (!id) return;
      setLoading(true);
      setNews(null);
      setError(null);
      try {
        const news = await getNews(id);
        setNews(news);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            setError(JSON.stringify(error.response.data));
          }
        } else {
          setError(JSON.stringify(error));
        }
      }
      setLoading(false);
    };
    loadNews().catch((error) => {
      console.error(error);
    });
  }, [id]);
  return (
    <div className="singleNews">
      {loading ? (
        <div className="loading"></div>
      ) : error ? (
        <code>{error}</code>
      ) : news ? (
        <main>
          <h1>{news.title}</h1>
          <div className="author">{news.author}</div>
          <div className="created-date">
            {dayjs.unix(news.createdAt).locale("pt-br").format("LLL")}
          </div>
          {news.updatedAt ? (
            <div className="updated-date">
              {"Editado " +
                dayjs.unix(news.updatedAt).locale("pt-br").format("LLL")}
            </div>
          ) : (
            <></>
          )}
          <span>{news.content}</span>
        </main>
      ) : (
        <></>
      )}
    </div>
  );
};
