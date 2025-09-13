import { useContext } from "react";
import { ThemeContext } from "../../../../../Context/ThemeContext";
import "./TechStackGridItem.css";
interface TechStackItemProps {
  name: string;
  icon: string;
  adaptive?: boolean;
}
export const TechStackGridItem = (props: TechStackItemProps) => {
  const theme = useContext(ThemeContext);
  return (
    <div className="tech-stack__grid-item">
      <img
        className="tech-stack__grid-item-icon"
        src={`/${props.icon}${props.adaptive ? `-${theme}` : ""}.svg`}
        alt={`Logo ${props.name}`}
      />
      <div className="tech-stack__grid-item-name">{props.name}</div>
    </div>
  );
};
