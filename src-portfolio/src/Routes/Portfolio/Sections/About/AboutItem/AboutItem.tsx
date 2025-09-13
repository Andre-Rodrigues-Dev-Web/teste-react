import { FaCircle } from "react-icons/fa6";
import { Surface } from "../../../../../Components/Surface/Surface";
import "./AboutItem.css";
interface AboutItemProps {
  title: string;
  place: string;
  location: string;
  date: string;
}
export const AboutItem = (props: AboutItemProps) => (
  <Surface padding={1} color="surface-0">
    <div className="about__item">
      <h4 className="about__item-title"> {props.title}</h4>
      <div className="about__item-information">
        <span className="about__item-place">{props.place}</span>
        <span className="about__item-separator">
          <FaCircle />
        </span>
        <span className="about__item-location">{props.location}</span>
      </div>
      <span className="about__item-date">{props.date}</span>
    </div>
  </Surface>
);
