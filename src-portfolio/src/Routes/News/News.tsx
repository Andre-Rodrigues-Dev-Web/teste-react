import { FaCircle, FaTrash } from "react-icons/fa6";
import "./News.css";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/pt-br";
import { useEffect, useState } from "react";
import { addNews, deleteNews, getAllNews } from "../../API/newsApi";
import type { News } from "../../Entities/News";
import { Link } from "react-router";
import { AxiosError } from "axios";
dayjs.extend(localizedFormat);
const NewsPage = () => {
  const [news, setNews] = useState<News[]>([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const onSave = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const saved = await addNews({ title, author, content });
      setNews([saved, ...news]);
      setAuthor("");
      setTitle("");
      setContent("");
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        setSaveError(JSON.stringify(e.response.data));
      } else {
        setSaveError(JSON.stringify(e));
      }
    }
    setSaving(false);
  };
  const onDelete = (id: string) => {
    setDeleteError(null);
    deleteNews(id)
      .then(() => {
        setNews(news.filter((news) => news.id !== id));
      })
      .catch((e) => {
        if (e instanceof AxiosError && e.response) {
          setError(JSON.stringify(e.response.data));
        } else {
          setError(JSON.stringify(e));
        }
      });
  };
  useEffect(() => {
    setLoading(true);
    getAllNews()
      .then((value) => {
        setNews(value);
      })
      .catch((e) => {
        if (e instanceof AxiosError && e.response) {
          setError(JSON.stringify(e.response.data));
        } else {
          setError(JSON.stringify(e));
        }
      });
    setLoading(false);
  }, []);
  return (
    <div className="news">
      <main>
        <h1> Notícias</h1>
        <h2> Nova Notícia</h2>
        <form
          className="news-form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="labeled-input">
            <label htmlFor="author-input">Autor</label>
            <input
              id="author-input"
              className="author-input"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
          </div>
          <div className="labeled-input">
            <label htmlFor="title-input">Título</label>
            <input
              id="title-input"
              className="title-input"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="labeled-input">
            <label htmlFor="content-input">Conteúdo</label>
            <textarea
              id="content-input"
              className="content-input"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            onClick={() => {
              onSave().catch((e) => {
                console.error(e);
              });
            }}
          >
            Salvar
          </button>
          {saving ? (
            <div>Salvando...</div>
          ) : saveError ? (
            <>
              <div>Erro ao salvar notícia:</div>
              <code>{saveError}</code>
            </>
          ) : (
            <></>
          )}
          {deleteError ? (
            <>
              <div>Erro ao deletar notícia:</div>
              <code>{deleteError}</code>
            </>
          ) : (
            <></>
          )}
        </form>
        <h2>Notícias Publicadas</h2>
        <div className="news-container">
          {loading ? (
            <div>Carregando...</div>
          ) : error ? (
            <>
              <div>Erro ao carregar notícias:</div>
              <code>{error}</code>
            </>
          ) : (
            news.map((news) => (
              <div className="news-item" key={news.id}>
                <span className="news-info">
                  <h2 className="news-title">
                    <Link to={`/news/${news.id}`}>{news.title}</Link>
                    <button
                      type="button"
                      onClick={() => {
                        onDelete(news.id);
                      }}
                    >
                      <FaTrash size={"1rem"} />
                    </button>
                  </h2>
                  <div>
                    <div className="author">{news.author}</div>
                    <div className="separator">
                      <FaCircle size={"0.2rem"} />
                    </div>
                    <div className="created-date">
                      {dayjs.unix(news.createdAt).locale("pt-br").format("LLL")}
                    </div>

                    {news.updatedAt ? (
                      <>
                        <div className="separator">
                          <FaCircle size={"0.2rem"} />
                        </div>
                        <div className="updated-date">
                          {"Editado " +
                            dayjs
                              .unix(news.updatedAt)
                              .locale("pt-br")
                              .format("LLL")}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </span>
                <div className="content">{news.content}</div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};
export { NewsPage as News };
