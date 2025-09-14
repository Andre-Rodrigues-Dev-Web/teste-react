import { useContext, useEffect, useState } from "react";
import "./EditNews.css";
import { useParams, useNavigate } from "react-router";
import { getNews, updateNews } from "../../API/newsApi";
import { AuthContext } from "../../Context/AuthContext";
import { parseAPIError, type APIError } from "../../util";
import { InfoBanner } from "../../Components/InfoBanner/InfoBanner";
import { LabeledInput } from "../../Components/LabeledInput/LabeledInput";
import { Button } from "../../Components/Button/Button";
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
            className="edit-news__form"
            onSubmit={(e) => {
              onSave();
              e.preventDefault();
            }}
          >
            <h1> Editar Notícia</h1>
            <LabeledInput
              title="Título"
              placeholder="Título"
              id="title-input"
              type="text"
              value={title}
              className="edit-news__input"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <LabeledInput
              title="Conteúdo"
              placeholder="Conteúdo"
              id="content-input"
              rows={6}
              value={content}
              className="edit-news__input"
              onChange={(e) => {
                setContent(e.target.value);
              }}
              textarea
            />

            <div className="edit-news__button-row">
              <Button
                className="edit-news__button"
                type="submit"
                color="primary"
              >
                Salvar
              </Button>

              <Button
                className="edit-news__button"
                type="link"
                to="/news"
                color="secondary"
              >
                Cancelar
              </Button>
            </div>
          </form>
          <div className="edit-news__status">
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
