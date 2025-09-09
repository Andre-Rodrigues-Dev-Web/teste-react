import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { News } from "../../Entities/News";
import { getNews } from "../../API/newsApi";
import dayjs from "dayjs";
import "./SingleNews.css";

import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/pt-br";
import {
  FaCalendar,
  FaNewspaper,
  FaPenToSquare,
  FaUser,
} from "react-icons/fa6";
import { parseAPIError, type APIError } from "../../util";
import { InfoBanner } from "../../Components/InfoBanner/InfoBanner";
dayjs.extend(localizedFormat);
export const SingleNews = () => {
  const { id } = useParams();
  const [news, setNews] = useState<News | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<APIError | null>();
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
        setError(parseAPIError(error));
      }
      setLoading(false);
    };
    loadNews().catch((error) => {
      console.error(error);
    });
  }, [id]);
  return (
    <div className="single-news">
      {loading ? (
        <div className="loading"></div>
      ) : error ? (
        <div className="error">
          <InfoBanner
            level="error"
            title="Erro ao carregar notícia"
            content={error.message}
            details={error.details}
          />
        </div>
      ) : news ? (
        <main>
          <div className="news-container">
            <span className="news-indicator">
              <FaNewspaper /> Notícia
            </span>
            <div className="news-header">
              <h1 className="news-title">{news.title}</h1>
              <div className="info-row">
                <div className="date-row">
                  <div className="created-date">
                    <FaCalendar />
                    {dayjs.unix(news.createdAt).locale("pt-br").format("LLL")}
                  </div>
                  {news.updatedAt ? (
                    <div className="updated-date">
                      <FaPenToSquare />
                      {"Editado " +
                        dayjs
                          .unix(news.updatedAt)
                          .locale("pt-br")
                          .format("LLL")}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="author">
                  <FaUser />
                  {news.author.name}
                </div>
              </div>
            </div>
            <span className="news-content">{news.content}</span>
          </div>
        </main>
      ) : (
        <></>
      )}
    </div>
  );
};
