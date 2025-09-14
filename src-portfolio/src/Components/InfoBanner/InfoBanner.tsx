import { useState, type PropsWithChildren } from "react";
import "./InfoBanner.css";
import {
  FaCircleInfo,
  FaCircleXmark,
  FaSquareCaretDown,
  FaSquareCaretRight,
  FaTriangleExclamation,
} from "react-icons/fa6";
interface InfoBannerProps {
  level: "note" | "information" | "warning" | "error";
  title: string;
  content: string;
  details?: string;
}
const InfoIcon = ({ level }: { level: string }) => {
  switch (level) {
    case "note": {
      return <FaCircleInfo />;
    }
    case "information": {
      return <FaCircleInfo />;
    }
    case "warning": {
      return <FaTriangleExclamation />;
    }
    case "error": {
      return <FaCircleXmark />;
    }
  }
};
export const InfoBanner = (props: PropsWithChildren<InfoBannerProps>) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className={`info-banner info-banner--${props.level}`}>
      <div className="info-banner__header">
        <InfoIcon level={props.level} />
        {props.title}
      </div>

      <div className="info-banner__content">{props.content}</div>
      {!props.details ? (
        <></>
      ) : (
        <>
          <button
            type="button"
            className="info-banner__collapse-button"
            onClick={() => {
              setShowDetails(!showDetails);
            }}
          >
            <div className="info-banner__collapse-icon">
              {showDetails ? <FaSquareCaretDown /> : <FaSquareCaretRight />}
            </div>{" "}
            Detalhes
          </button>
          <div
            className={`info-banner__details ${showDetails ? "info-banner__details--open" : ""}`}
          >
            {props.details}
          </div>
        </>
      )}
    </div>
  );
};
