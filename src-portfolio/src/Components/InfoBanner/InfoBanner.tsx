import type { PropsWithChildren } from "react";
import "./InfoBanner.css";
import {
  FaCircleInfo,
  FaCircleXmark,
  FaTriangleExclamation,
} from "react-icons/fa6";
interface InfoBannerProps {
  level: "note" | "information" | "warning" | "error";
  title: string;
  content: string;
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
  return (
    <div className={`info-banner ${props.level}`}>
      <div className="info-header">
        <div className="info-icon">
          <InfoIcon level={props.level} />{" "}
        </div>
        <div className="info-title">{props.title}</div>
      </div>

      <div className="info-content">{props.content}</div>
    </div>
  );
};
