import { useContext, useEffect, useState } from "react";
import { addNews, deleteNews, getAllNews } from "../../API/newsApi";
import type { News } from "../../Entities/News";
import { parseAPIError, type APIError } from "../../util";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import { InfoBanner } from "../../Components/InfoBanner/InfoBanner";
import { FaNewspaper } from "react-icons/fa6";
import { Button } from "../../Components/Button/Button";
import { LabeledInput } from "../../Components/LabeledInput/LabeledInput";
import { NewsItem } from "../../Components/NewsItem/NewsItem";
import { FaCaretDown, FaCaretRight } from "react-icons/fa6";
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
      <main>
        <h1>
          <FaNewspaper /> Notícias
        </h1>
        {auth.userInfo ? (
          <form
            className="news-form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <button
              type="button"
              className={`collapse ${!showNewForm ? "closed" : ""}`}
              onClick={() => {
                setShowNewForm(!showNewForm);
              }}
            >
              <div className="collapse-indicator">
                {showNewForm ? <FaCaretDown /> : <FaCaretRight />}
              </div>
              Nova Notícia
            </button>
            <div className={`collapsible-form ${showNewForm ? "open" : ""}`}>
              <LabeledInput
                title="Título"
                id="title-input"
                value={title}
                placeholder="Título"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <LabeledInput
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
        <div className="published-news">
          <h2>Notícias Publicadas</h2>
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
              <div className="news-container">
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
        </div>
      </main>
    </div>
  );
};
export { NewsPage as News };
