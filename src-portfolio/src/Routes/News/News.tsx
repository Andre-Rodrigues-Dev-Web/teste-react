import {
  FaCaretDown,
  FaCaretRight,
  FaCircle,
  FaPenToSquare,
  FaTrash,
} from "react-icons/fa6";
import "./News.css";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/pt-br";
import { useContext, useEffect, useState } from "react";
import { addNews, deleteNews, getAllNews } from "../../API/newsApi";
import type { News } from "../../Entities/News";
import { Link } from "react-router";
import { AxiosError } from "axios";
import { truncateText } from "../../util";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";

dayjs.extend(localizedFormat);
const NewsPage = () => {
  const [news, setNews] = useState<News[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const onSave = async () => {
    if (!auth.userInfo) return;
    setSaving(true);
    setSaveError(null);
    try {
      const saved = await addNews(
        {
          title,
          content,
        },
        auth.userInfo.token,
      );
      setNews([saved, ...news]);
      setTitle("");
      setContent("");
      setShowNewForm(false);
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
    if (!auth.userInfo) return;
    setDeleteError(null);
    deleteNews(id, auth.userInfo.token)
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
        {auth.userInfo ? (
          <form
            className="news-form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div
              className="collapse"
              onClick={() => {
                setShowNewForm(!showNewForm);
              }}
            >
              <div className="collapse-indicator">
                {showNewForm ? <FaCaretDown /> : <FaCaretRight />}
              </div>
              Nova Notícia
            </div>
            <div className={`collapsible-form ${showNewForm ? "open" : ""}`}>
              <div className="labeled-input">
                <label htmlFor="title-input">Título</label>
                <input
                  id="title-input"
                  className="title-input"
                  value={title}
                  placeholder="Título"
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
                  placeholder="Texto da notícia"
                  rows={6}
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
            </div>

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
        ) : (
          <>Faça login para publicar notícias</>
        )}
        <div className="published-news">
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
                <Link
                  to={`/news/${news.id}`}
                  className="news-item"
                  key={news.id}
                >
                  <div className="news-info">
                    <div className="news-title-row">
                      <h2>{news.title}</h2>
                      {!auth.userInfo || news.author.id !== auth.userInfo.id ? (
                        <></>
                      ) : (
                        <div className="action-buttons">
                          <button
                            className="action-button"
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              navigate(`/news/${news.id}/edit`);
                            }}
                          >
                            <FaPenToSquare />
                          </button>
                          <button
                            className="action-button"
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              onDelete(news.id);
                            }}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="news-authorship">
                      <div className="author">{news.author.name}</div>
                      <div className="separator">
                        <FaCircle size={"0.2rem"} />
                      </div>
                      <div className="created-date">
                        {dayjs
                          .unix(news.createdAt)
                          .locale("pt-br")
                          .format("LLL")}
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
                  </div>
                  <div className="content">
                    {truncateText(news.content, 200)}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
export { NewsPage as News };
