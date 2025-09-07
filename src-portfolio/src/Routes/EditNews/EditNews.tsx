import { useContext, useEffect, useState } from "react";
import "./EditNews.css";
import { useParams, useNavigate } from "react-router";
import { getNews, updateNews } from "../../API/newsApi";
import { AuthContext } from "../../Context/AuthContext";
import { parseAPIError, type APIError } from "../../util";
import { InfoBanner } from "../../Components/InfoBanner/InfoBanner";
export const EditNews = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sendingEdit, setSendingEdit] = useState(false);
  const [editError, setEditError] = useState<APIError | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<APIError | null>(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  useEffect(() => {
    if (!id) {
      navigate("/news");
      return;
    }
    setLoadError(null);
    setLoading(true);
    getNews(id)
      .then((news) => {
        setTitle(news.title);
        setContent(news.content);
      })
      .catch((e) => {
        setLoadError(parseAPIError(e));
      });
    setLoading(false);
  }, [id, navigate]);
  const onSave = () => {
    if (!id || !auth.userInfo) {
      return;
    }
    setSendingEdit(true);
    setEditError(null);
    updateNews(id, { title, content }, auth.userInfo.token)
      .then(() => {
        navigate(`/news/${id}`);
      })
      .catch((e) => {
        setEditError(parseAPIError(e));
      });
    setSendingEdit(false);
  };
  return (
    <div className="edit-news">
      {loading ? (
        <>Carregando...</>
      ) : loadError ? (
        <InfoBanner
          level="error"
          title="Erro ao carregar a notícia"
          content={loadError.message}
          details={loadError.details}
        />
      ) : (
        <>
          <form
            onSubmit={(e) => {
              onSave();
              e.preventDefault();
            }}
          >
            <h1> Editar Notícia</h1>
            <div className="labeled-input">
              <label htmlFor="text-input">Título</label>
              <input
                id="text-input"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="labeled-input">
              <label>Conteúdo</label>
              <textarea
                id="content-input"
                value={content}
                rows={6}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </div>
            <div className="form-button-row">
              <button type="submit" className="primary">
                Salvar
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate("/news");
                }}
                className="secondary"
              >
                Cancelar
              </button>
            </div>
          </form>
          <div className="status">
            {sendingEdit ? (
              <>Carregando...</>
            ) : editError ? (
              <InfoBanner
                level="error"
                title="Erro ao editar notícia"
                content={editError.message}
                details={editError.details}
              />
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </div>
  );
};
