import { FaCircle, FaDownload } from "react-icons/fa6";
import "./Portfolio.css";
interface InfoItemProps {
  title: string;
  place: string;
  location: string;
  date: string;
}
const InfoItem = (props: InfoItemProps) => (
  <>
    <div className="infoItem">
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
  </>
);
export const Portfolio = () => {
  return (
    <div className="portfolio">
      <main>
        <div className="hero">
          <h1 className="name">Gabriel Valeriano Gomes</h1>
          <span className="description"> Desenvolvedor de software</span>
          <div className="download">
            <button type="button">
              <FaDownload />
            </button>
          </div>
          <div className="photo-container">
            <div className="photo"></div>
          </div>
        </div>
        <div className="about">
          <h2> Sobre mim</h2>
          <span>
            Meu nome é Gabriel Valeriano Gomes, sou um desenvolvedor de Campos
            Altos - Minas Gerais.
          </span>

          <div className="experience">
            <h3 className="title">Experiência profissional</h3>
            <InfoItem
              title="Desenvolvedor Full-Stack "
              place="Cibus Tecnologia"
              location="Araxá"
              date="dez/2020 - jul/2021"
            />
          </div>
          <div className="education">
            <h3 className="title">Formação</h3>
            <InfoItem
              title="Bacharelado em Sistemas de Informação"
              place="Centro Universitário do Planalto de Araxá (UNIARAXÁ)
"
              location="Araxá"
              date="fev/2018 - dez/2022"
            />
          </div>
        </div>
        <div className="tech-stack">
          <h2> Tecnologias</h2>
          <span>
            Linguagens, frameworks e bibliotecas que possuo experiência e/ou
            conhecimento
          </span>
          <div>
            <h3> Front-End </h3>
            <ul>
              <li>HTML</li>
              <li>CSS</li>
              <li>Javascript</li>
              <li>Typescript</li>
              <li>React</li>
              <li>Electron</li>
              <li>Tauri</li>
            </ul>
          </div>
          <div>
            <h3> Back-End </h3>
            <ul>
              <li>Node.js</li>
              <li>Deno</li>
              <li>Rust</li>
              <li>Python</li>
              <li>C#</li>
              <li>Java</li>
              <li>Express(JS)</li>
              <li>TypeORM</li>
              <li>Apollo GraphQL</li>
            </ul>
          </div>
          <div>
            <h3>Bancos de Dados</h3>
            <ul>
              <li>SQL</li>
              <li>MySQL</li>
              <li>Microsoft SQL Server (MSSQL)</li>
              <li>SQLite</li>
              <li>MongoDB</li>
            </ul>
          </div>
          <div>
            <h3>Ferramentas de Desenvolvimento e DevOps</h3>
            <ul>
              <li>Git</li>
              <li>Github</li>
              <li>BitBucket</li>
              <li>Docker</li>
            </ul>
          </div>
        </div>
        <div>
          <h2>Projetos</h2>
          <ul>
            <li>
              <div>
                <h3>Shhh</h3>
                <span>
                  "Rede social" offline que permite a criação de "postagens"
                  salvas localmente
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <h2>Contato</h2>
          <span>Entre em contato comigo via e-mail ou LinkedIn</span>
        </div>
      </main>
    </div>
  );
};
