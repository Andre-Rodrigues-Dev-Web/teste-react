import { FaBriefcase, FaGraduationCap } from "react-icons/fa6";
import { Surface } from "../../../../Components/Surface/Surface";
import { AboutItem } from "./AboutItem/AboutItem";
import "./About.css";
export const About = () => {
  return (
    <Surface color="base" padding={2} shadow className="portfolio-section">
      <div className="about">
        <p className="about__header">
          Olá! Sou um Dev de Minas Gerais, Brasil.
        </p>
        <div className="about__list">
          <h3 className="about__list-title">
            <FaBriefcase /> Experiência Profissional
          </h3>
          <AboutItem
            title="Desenvolvedor Full-Stack "
            place="Cibus Tecnologia"
            location="Araxá, MG"
            date="dez/2020 - jul/2021"
          />
          <h3 className="about__list-title">
            <FaGraduationCap /> Formação
          </h3>
          <AboutItem
            title="Bacharelado em Sistemas de Informação"
            place="Centro Universitário do Planalto de Araxá (UNIARAXÁ)"
            location="Araxá, MG"
            date="fev/2018 - dez/2022 (Completo)"
          />
        </div>
      </div>
    </Surface>
  );
};
