import { useContext, useEffect, useState } from "react";
import { addNews, deleteNews, getAllNews } from "../../API/newsApi";
import type { News } from "../../Entities/News";
import { parseAPIError, type APIError } from "../../util";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import { InfoBanner } from "../../Components/InfoBanner/InfoBanner";
import {
  FaNewspaper,
  FaSquareCaretDown,
  FaSquareCaretRight,
} from "react-icons/fa6";
import { Button } from "../../Components/Button/Button";
import { LabeledInput } from "../../Components/LabeledInput/LabeledInput";
import { NewsItem } from "../../Components/NewsItem/NewsItem";
import "./News.css";
const NewsPage = () => {
  const [news, setNews] = useState<News[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<APIError | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<APIError | null>(null);
  const [deleteError, setDeleteError] = useState<APIError | null>(null);
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
      setSaveError(parseAPIError(e));
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
        setDeleteError(parseAPIError(e));
      });
  };
  useEffect(() => {
    setLoading(true);
    getAllNews()
      .then((value) => {
        setNews(value);
      })
      .catch((e) => {
        setError(parseAPIError(e));
      });
    setLoading(false);
  }, []);

  return (
    <div className="news">
      <main className="news__main">
        <h1 className="news__page-title">
          <FaNewspaper /> Notícias
        </h1>
        {auth.userInfo ? (
          <form
            className="news__form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <button
              type="button"
              className={`news__form-collapse-button ${!showNewForm ? "news__form-collapse-button--closed" : ""}`}
              onClick={() => {
                setShowNewForm(!showNewForm);
              }}
            >
              <div className="news__form-collapse-button-icon">
                {showNewForm ? <FaSquareCaretDown /> : <FaSquareCaretRight />}
              </div>
              Nova Notícia
            </button>
            <div
              className={`news__form-area ${showNewForm ? "news__form-area--open" : ""}`}
            >
              <LabeledInput
                className="news__form-input"
                title="Título"
                id="title-input"
                value={title}
                placeholder="Título"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <LabeledInput
                className="news__form-input"
                title="Conteúdo"
                id="content-input"
                value={content}
                placeholder="Texto da notícia"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                rows={6}
                textarea
              />

              <Button
                className="news__form-button"
                type="submit"
                onClick={() => {
                  onSave().catch((e) => {
                    console.error(e);
                  });
                }}
                color="primary"
              >
                Salvar
              </Button>
            </div>

            {saving ? (
              <div>Salvando...</div>
            ) : saveError ? (
              <InfoBanner
                level="error"
                title="Erro ao salvar notícia"
                content={saveError.message}
                details={saveError.details}
              />
            ) : (
              <></>
            )}
            {deleteError ? (
              <InfoBanner
                level="error"
                title="Erro ao deletar notícia"
                content={deleteError.message}
                details={deleteError.details}
              />
            ) : (
              <></>
            )}
          </form>
        ) : (
          <InfoBanner
            level="note"
            title="Não é possível publicar notícias no momento"
            content="Faça login para escrever e publicar notícias."
          />
        )}
        <h2 className="news__page-subtitle">Notícias Publicadas</h2>
        {loading ? (
          <div>Carregando...</div>
        ) : error ? (
          <>
            <InfoBanner
              level="error"
              title="Erro ao carregar notícias"
              content={error.message}
              details={error.details}
            />
          </>
        ) : news.length === 0 ? (
          <InfoBanner
            level="information"
            title="Sem notícias"
            content="Não há notícias publicadas."
          />
        ) : (
          <>
            <div className="news__grid">
              {news.map((news) => (
                <NewsItem
                  key={news.id}
                  news={news}
                  showActions={
                    !!auth.userInfo && news.author.id === auth.userInfo.id
                  }
                  onDelete={(id) => {
                    onDelete(id);
                  }}
                  onEdit={(id) => {
                    navigate(`/news/${id}/edit`);
                  }}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};
export { NewsPage as News };
