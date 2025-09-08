import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

interface TechStackItemProps {
  name: string;
  icon: string;
  adaptive?: boolean;
}
export const TechStackItem = (props: TechStackItemProps) => {
  const theme = useContext(ThemeContext);
  return (
    <div className="tech-stack-item">
      <img
        className="icon"
        src={`/${props.icon}${props.adaptive ? `-${theme}` : ""}.svg`}
        alt={`Logo ${props.name}`}
      />
      <div className="name">{props.name}</div>
    </div>
  );
};
