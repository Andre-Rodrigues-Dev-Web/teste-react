import { useContext, useEffect, useState } from "react";
import "./EditNews.css";
import { useParams, useNavigate } from "react-router";
import { getNews, updateNews } from "../../API/newsApi";
import { AuthContext } from "../../Context/AuthContext";
export const EditNews = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  useEffect(() => {
    if (!id) {
      navigate("/news");
      return;
    }
    getNews(id)
      .then((news) => {
        setTitle(news.title);
        setContent(news.content);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [id]);
  const onSave = () => {
    if (!id || !auth.userInfo) {
      return;
    }

    updateNews(id, { title, content }, auth.userInfo.token)
      .then(() => {
        navigate(`/news/${id}`);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <div className="edit-news">
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
    </div>
  );
};
