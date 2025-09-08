import { useState, type PropsWithChildren } from "react";
import "./InfoBanner.css";
import {
  FaCaretDown,
  FaCaretRight,
  FaCircleInfo,
  FaCircleXmark,
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
    <div className={`info-banner ${props.level}`}>
      <div className="info-header">
        <div className="info-icon">
          <InfoIcon level={props.level} />{" "}
        </div>
        <div className="info-title">{props.title}</div>
      </div>

      <div className="info-content">{props.content}</div>
      {!props.details ? (
        <></>
      ) : (
        <>
          <button
            type="button"
            className="collapse-details"
            onClick={() => {
              setShowDetails(!showDetails);
            }}
          >
            <div className="collapse-details-icon">
              {showDetails ? <FaCaretDown /> : <FaCaretRight />}
            </div>{" "}
            Detalhes
          </button>
          <div
            className={`collapsible-details ${showDetails ? "open-details" : ""}`}
          >
            {props.details}
          </div>
        </>
      )}
    </div>
  );
};
