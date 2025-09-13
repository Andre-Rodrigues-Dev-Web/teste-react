import { Surface } from "../../../../Components/Surface/Surface";
import { Project } from "./Project/Project";
import "./Projects.css";
export const Projects = () => {
  return (
    <div className="portfolio-section">
      <div className="projects">
        <ul className="projects__list">
          <Surface
            padding={0}
            color="base"
            shadow
            className="projects__list-item"
          >
            <Project
              title="Esse portfólio"
              description="Legal né?"
              link="#"
              imageSrc="/portfolio.png"
              altText="Captura de tela da área inicial desse mesmo portfólio"
            />
          </Surface>
          <Surface
            padding={0}
            color="base"
            shadow
            className="projects__list-item"
          >
            <Project
              title="Shhhh"
              imageSrc="/shhhhScreenshot.png"
              description={`"Rede social" offline que permite a criação de "postagens"
                salvas localmente`}
              link="https://github.com/Lummidev/shhhh"
              altText={`Captura de tela do projeto "Shhhh", na tela inicial da aplicação onde é mostrada a linha do tempo do usuário`}
            />
          </Surface>
        </ul>
      </div>
    </div>
  );
};
