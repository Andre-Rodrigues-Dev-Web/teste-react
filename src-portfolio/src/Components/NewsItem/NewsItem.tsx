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
    <div
      className={`news-item ${showActionMenu ? "news-item--open-actions" : ""}`}
    >
      <Link to={`/news/${props.news.id}`} className="news-item__body">
        <h2 className="news-item__title">{truncatedTitle}</h2>
        <div className="news-item__authorship">
          {dayjs.unix(props.news.createdAt).locale("pt-br").format("L, HH:mm")}

          {props.news.updatedAt ? <> (Editado)</> : <></>}
          <FaCircle size={"0.2rem"} />
          {props.news.author.name}
        </div>
        <div>{truncatedContent}</div>
      </Link>
      {!props.showActions ? (
        <></>
      ) : (
        <div className="news-item__actions">
          <button
            type="button"
            onClick={() => setShowActionMenu(!showActionMenu)}
            className={`news-item__actions-collapse-button ${showActionMenu ? "" : "news-item__actions-collapse-button--closed"}`}
          >
            {showActionMenu ? <FaCaretDown /> : <FaCaretRight />}
            Ações
          </button>
          <div
            className={`news-item__action-list ${showActionMenu ? "news-item__action-list--open" : ""}`}
          >
            <button
              className="news-item__action-button"
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
              className="news-item__action-button news-item__action-button--delete"
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
