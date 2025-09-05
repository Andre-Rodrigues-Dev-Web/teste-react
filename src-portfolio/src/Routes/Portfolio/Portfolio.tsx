import {
  FaAddressCard,
  FaArrowDown,
  FaBriefcase,
  FaCircle,
  FaCode,
  FaEnvelope,
  FaGraduationCap,
  FaHandPointDown,
} from "react-icons/fa6";
import "./Portfolio.css";
import { FaLinkedin, FaWrench } from "react-icons/fa";
import { techStackList } from "./techStackList";
import { TechStackItem } from "../../Components/TechStackItem";
import { Project } from "../../Components/Project";
interface InfoItemProps {
  title: string;
  place: string;
  location: string;
  date: string;
}
const InfoItem = (props: InfoItemProps) => (
  <>
    <div className="info-item">
      <div className="info-content">
        <h4> {props.title}</h4>
        <div className="info">
          <span className="place">{props.place}</span>
          <span className="separator">
            <FaCircle size={"0.3em"} />
          </span>
          <span className="location">{props.location}</span>
        </div>
        <span className="date">{props.date}</span>
      </div>
    </div>
  </>
);
export const Portfolio = () => {
  const scrollToAbout = (id: string) => {
    const aboutContainer = document.getElementById(id);
    if (aboutContainer) aboutContainer.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="portfolio">
      <main>
        <div className="hero-container">
          <div className="hero">
            <div className="hero-content">
              <div className="info-column">
                <h1 className="name">Gabriel Valeriano Gomes</h1>
                <span className="description"> Desenvolvedor de software</span>
              </div>
              <div className="photo-container">
                <img src="/photo.jpg" className="photo" />
              </div>
            </div>
          </div>
        </div>
        <div
          className="section-title"
          onClick={() => {
            scrollToAbout("about-container");
          }}
        >
          <FaArrowDown />
          <h2> Sobre mim</h2>
        </div>
        <div id="about-container" className="about-container">
          <div className="about">
            <p className="about-description">
              Olá! Sou um Dev de Minas Gerais, Brasil.
            </p>
            <div className="info-list">
              <div className="info-section">
                <h3 className="title">
                  <FaBriefcase /> Experiência Profissional
                </h3>
                <InfoItem
                  title="Desenvolvedor Full-Stack "
                  place="Cibus Tecnologia"
                  location="Araxá, MG"
                  date="dez/2020 - jul/2021"
                />
              </div>
              <div className="info-section">
                <h3 className="title">
                  <FaGraduationCap /> Formação
                </h3>
                <InfoItem
                  title="Bacharelado em Sistemas de Informação"
                  place="Centro Universitário do Planalto de Araxá (UNIARAXÁ)
"
                  location="Araxá, MG"
                  date="fev/2018 - dez/2022 (Completo)"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="tech-stack">
          <h2>
            <FaWrench /> Tecnologias
          </h2>
          <div className="tech-columns">
            <div className="tech-description">
              Dá uma olhada na minha caixa de ferramentas!
              <div className="hand-icon">
                <FaHandPointDown />
              </div>
            </div>
            <div className="tech-stack-list">
              {techStackList.map((stack) => (
                <div className="tech-stack-section" key={stack.title}>
                  <h3>
                    <stack.Icon /> {stack.title}
                  </h3>
                  <ul>
                    {stack.items.map((item) => (
                      <li key={item.name}>
                        <TechStackItem name={item.name} icon={item.svg} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className="section-title"
          onClick={() => {
            scrollToAbout("projects-container");
          }}
        >
          <FaCode />
          <h2> Projetos</h2>
        </div>
        <div id="projects-container" className="projects-container">
          <ul>
            <li className="project-container">
              <Project
                title="Esse portfólio"
                description="Legal né?"
                link="#"
                imageSrc="/portfolio.png"
              />
            </li>
            <li className="project-container">
              <Project
                title="Shhh"
                imageSrc="/shhhhScreenshot.png"
                description={`"Rede social" offline que permite a criação de "postagens"
                  salvas localmente`}
                link="https://github.com/Lummidev/shhhh"
              />
            </li>
          </ul>
        </div>
        <div
          className="section-title"
          onClick={() => {
            scrollToAbout("contact");
          }}
        >
          <FaAddressCard />
          <h2> Contato</h2>
        </div>
        <div id="contact" className="contact">
          <span>Entre em contato comigo via e-mail ou LinkedIn!</span>
          <div className="contact-info">
            <a>
              <FaEnvelope color="var(--theme-yellow)" />
              gabrielvaleriano18@outlook.com
            </a>
            <a href="https://www.linkedin.com/in/gabriel-valeriano-gomes-43a21a209/">
              <FaLinkedin color="var(--theme-blue)" /> LinkedIn
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};
