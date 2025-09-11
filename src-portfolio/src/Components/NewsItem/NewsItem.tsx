import type { News } from "../../Entities/News";
import { Link } from "react-router";
import {
  FaCaretDown,
  FaCaretRight,
  FaCircle,
  FaPenToSquare,
  FaTrash,
} from "react-icons/fa6";
import { truncateText } from "../../util";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "./NewsItem.css";
import "dayjs/locale/pt-br";
import { useState } from "react";
dayjs.extend(localizedFormat);

interface NewsItemProps {
  news: News;
  showActions: boolean;
  onDelete: (id: string) => unknown;
  onEdit: (id: string) => unknown;
}

export const NewsItem = (props: NewsItemProps) => {
  const [showActionMenu, setShowActionMenu] = useState(false);
  const truncatedContent = truncateText(props.news.content, 200);
  const truncatedTitle = truncateText(props.news.title, 150);
  return (
    <div className={`news-item${showActionMenu ? " open" : ""}`}>
      <Link to={`/news/${props.news.id}`} className="news-body">
        <div className="news-info">
          <div className="news-title-row">
            <h2>{truncatedTitle}</h2>
          </div>
          <div className="news-authorship">
            <div className="created-date">
              {dayjs
                .unix(props.news.createdAt)
                .locale("pt-br")
                .format("L, HH:mm")}

              {props.news.updatedAt ? <> (Editado)</> : <></>}
            </div>
            <div className="separator">
              <FaCircle size={"0.2rem"} />
            </div>
            <div className="author">{props.news.author.name}</div>
          </div>
        </div>
        <div className="content">{truncatedContent}</div>
      </Link>
      {!props.showActions ? (
        <></>
      ) : (
        <div className="news-actions">
          <button
            type="button"
            onClick={() => setShowActionMenu(!showActionMenu)}
            className={`collapse ${showActionMenu ? "" : "closed"}`}
          >
            {showActionMenu ? <FaCaretDown /> : <FaCaretRight />}
            Ações
          </button>
          <div className={`action-buttons${showActionMenu ? " open" : ""}`}>
            <button
              className="action-button"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                props.onEdit(props.news.id);
              }}
            >
              <FaPenToSquare />
              Editar Notícia
            </button>
            <button
              className="action-button delete"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                props.onDelete(props.news.id);
              }}
            >
              <FaTrash />
              Deletar Notícia
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
